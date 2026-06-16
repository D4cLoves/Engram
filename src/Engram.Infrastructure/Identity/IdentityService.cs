using System.Security.Cryptography;
using System.Text;
using Engram.Application.Auth;
using Engram.Application.Common.Interfaces;
using Engram.Domain.Entities;
using Engram.Domain.Errors;
using Engram.Domain.Shared;
using Engram.Domain.Settings;
using Engram.Infrastructure.Persistence;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace Engram.Infrastructure.Identity;

public class IdentityService : IIdentityService
{
    private readonly UserManager<AppUser> _userManager;
    private readonly IJwtTokenService _jwtService;
    private readonly IRefreshTokenService _refreshService;
    private readonly AppDbContext _dbContext;
    private readonly AuthSettings _authSettings;

    public IdentityService(
        UserManager<AppUser> userManager,
        IJwtTokenService jwtService,
        IRefreshTokenService refreshService,
        AppDbContext dbContext,
        IOptions<AuthSettings> authSettings)
    {
        _userManager = userManager;
        _jwtService = jwtService;
        _refreshService = refreshService;
        _dbContext = dbContext;
        _authSettings = authSettings.Value;
    }

    public async Task<Result> RegisterAsync(string email, string password)
    {
        var existingUser = await _userManager.FindByEmailAsync(email);
        if (existingUser != null)
        {
            return Result.Failure(AuthErrors.EmailAlreadyInUse);
        }

        var user = new AppUser { UserName = email, Email = email };
        var result = await _userManager.CreateAsync(user, password);

        if (!result.Succeeded)
        {
            var errors = string.Join("; ", result.Errors.Select(e => e.Description));
            return Result.Failure(Error.Validation("Auth.RegistrationFailed", errors));
        }

        return Result.Success();
    }

    public async Task<Result<LoginTokens>> LoginAsync(string email, string password)
    {
        var user = await _userManager.FindByEmailAsync(email);
        if (user == null || !await _userManager.CheckPasswordAsync(user, password))
        {
            return AuthErrors.InvalidCredentials;
        }

        var roles = await _userManager.GetRolesAsync(user);
        var accessToken = _jwtService.GenerateToken(user.Id.ToString(), user.Email ?? string.Empty, roles);

        var refreshToken = _refreshService.CreateRefreshToken();
        var refreshHash = _refreshService.HashRefreshToken(refreshToken);

        _dbContext.RefreshTokens.Add(new RefreshToken
        {
            Id = Guid.NewGuid(),
            UserId = user.Id,
            TokenHash = refreshHash,
            CreatedAtUtc = DateTime.UtcNow,
            ExpiresAtUtc = DateTime.UtcNow.Add(_authSettings.RefreshExpires)
        });

        await _dbContext.SaveChangesAsync();

        return new LoginTokens(accessToken, refreshToken);
    }

    public async Task<Result<LoginTokens>> RefreshAsync(string refreshToken)
    {
        var refreshHash = _refreshService.HashRefreshToken(refreshToken);
        var existing = await _dbContext.RefreshTokens.FirstOrDefaultAsync(t => t.TokenHash == refreshHash);

        if (existing == null)
        {
            return AuthErrors.RefreshTokenInvalid;
        }

        // Reuse Detection (Token Hijacking Warning)
        if (existing.RevokedAtUtc is not null)
        {
            var activeTokens = await _dbContext.RefreshTokens
                .Where(t => t.UserId == existing.UserId && t.RevokedAtUtc == null)
                .ToListAsync();

            foreach (var token in activeTokens)
            {
                token.RevokedAtUtc = DateTime.UtcNow;
            }

            await _dbContext.SaveChangesAsync();
            return AuthErrors.SessionCompromised;
        }

        if (existing.ExpiresAtUtc <= DateTime.UtcNow)
        {
            return AuthErrors.RefreshTokenExpired;
        }

        var user = await _userManager.FindByIdAsync(existing.UserId.ToString());
        if (user == null)
        {
            return AuthErrors.UserNotFound;
        }

        var roles = await _userManager.GetRolesAsync(user);
        var newAccessToken = _jwtService.GenerateToken(user.Id.ToString(), user.Email ?? string.Empty, roles);

        // Rotate tokens
        existing.RevokedAtUtc = DateTime.UtcNow;

        var newRefreshToken = _refreshService.CreateRefreshToken();
        var newRefreshHash = _refreshService.HashRefreshToken(newRefreshToken);
        existing.ReplacedByTokenHash = newRefreshHash;

        _dbContext.RefreshTokens.Add(new RefreshToken
        {
            Id = Guid.NewGuid(),
            UserId = user.Id,
            TokenHash = newRefreshHash,
            CreatedAtUtc = DateTime.UtcNow,
            ExpiresAtUtc = DateTime.UtcNow.Add(_authSettings.RefreshExpires)
        });

        await _dbContext.SaveChangesAsync();

        return new LoginTokens(newAccessToken, newRefreshToken);
    }

    public async Task<Result> LogoutAsync(string refreshToken)
    {
        var hashBytes = SHA256.HashData(Encoding.UTF8.GetBytes(refreshToken));
        var refreshHash = Convert.ToBase64String(hashBytes);

        var existing = await _dbContext.RefreshTokens.FirstOrDefaultAsync(t => t.TokenHash == refreshHash);
        if (existing != null)
        {
            existing.RevokedAtUtc = DateTime.UtcNow;
            await _dbContext.SaveChangesAsync();
        }

        return Result.Success();
    }
}
