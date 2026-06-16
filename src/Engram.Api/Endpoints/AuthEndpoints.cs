using System.Security.Cryptography;
using Engram.Application.Auth;
using Engram.Domain.Entities;
using Engram.Domain.Settings;
using Engram.Infrastructure.Identity;
using Engram.Infrastructure.Persistence;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace Engram.Api.Endpoints;

public static class AuthEndpoints
{
    public static void MapAuthEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/auth").WithTags("Authentication");

        group.MapPost("/register", async (
            [FromBody] RegisterRequest request,
            UserManager<AppUser> userManager) =>
        {
            var user = new AppUser { UserName = request.Email, Email = request.Email };
            var result = await userManager.CreateAsync(user, request.Password);

            if (!result.Succeeded)
            {
                return Results.BadRequest(result.Errors);
            }

            return Results.Ok(new { Message = "User registered successfully." });
        });

        group.MapPost("/login", async (
            [FromBody] LoginRequest request,
            UserManager<AppUser> userManager,
            IJwtTokenService jwtService,
            IRefreshTokenService refreshService,
            AppDbContext dbContext,
            IOptions<AuthSettings> authSettings,
            HttpContext httpContext) =>
        {
            var user = await userManager.FindByEmailAsync(request.Email);
            if (user == null || !await userManager.CheckPasswordAsync(user, request.Password))
            {
                return Results.Unauthorized();
            }

            var roles = await userManager.GetRolesAsync(user);
            var accessToken = jwtService.GenerateToken(user.Id.ToString(), user.Email ?? string.Empty, roles);

            var refreshToken = refreshService.CreateRefreshToken();
            var refreshHash = refreshService.HashRefreshToken(refreshToken);

            dbContext.RefreshTokens.Add(new RefreshToken
            {
                Id = Guid.NewGuid(),
                UserId = user.Id,
                TokenHash = refreshHash,
                CreatedAtUtc = DateTime.UtcNow,
                ExpiresAtUtc = DateTime.UtcNow.Add(authSettings.Value.RefreshExpires)
            });

            await dbContext.SaveChangesAsync();

            SetTokenCookies(httpContext, accessToken, refreshToken, authSettings.Value);

            return Results.Ok(new { UserId = user.Id, Email = user.Email });
        });

        group.MapPost("/refresh", async (
            IRefreshTokenService refreshService,
            IJwtTokenService jwtService,
            UserManager<AppUser> userManager,
            AppDbContext dbContext,
            IOptions<AuthSettings> authSettings,
            HttpContext httpContext) =>
        {
            var refreshToken = httpContext.Request.Cookies["engram_refresh_token"];
            if (string.IsNullOrWhiteSpace(refreshToken))
            {
                return Results.Unauthorized();
            }

            var refreshHash = refreshService.HashRefreshToken(refreshToken);
            var existing = await dbContext.RefreshTokens.FirstOrDefaultAsync(t => t.TokenHash == refreshHash);

            if (existing == null)
            {
                return Results.Unauthorized();
            }

            // Reuse Detection (Token Hijacking Warning)
            if (existing.RevokedAtUtc is not null)
            {
                // Revoke all tokens for this compromised user
                var activeTokens = await dbContext.RefreshTokens
                    .Where(t => t.UserId == existing.UserId && t.RevokedAtUtc == null)
                    .ToListAsync();

                foreach (var token in activeTokens)
                {
                    token.RevokedAtUtc = DateTime.UtcNow;
                }

                await dbContext.SaveChangesAsync();
                ClearTokenCookies(httpContext);
                return Results.Unauthorized();
            }

            if (existing.ExpiresAtUtc <= DateTime.UtcNow)
            {
                return Results.Unauthorized();
            }

            var user = await userManager.FindByIdAsync(existing.UserId.ToString());
            if (user == null)
            {
                return Results.Unauthorized();
            }

            var roles = await userManager.GetRolesAsync(user);
            var newAccessToken = jwtService.GenerateToken(user.Id.ToString(), user.Email ?? string.Empty, roles);

            // Rotate tokens
            existing.RevokedAtUtc = DateTime.UtcNow;

            var newRefreshToken = refreshService.CreateRefreshToken();
            var newRefreshHash = refreshService.HashRefreshToken(newRefreshToken);
            existing.ReplacedByTokenHash = newRefreshHash;

            dbContext.RefreshTokens.Add(new RefreshToken
            {
                Id = Guid.NewGuid(),
                UserId = user.Id,
                TokenHash = newRefreshHash,
                CreatedAtUtc = DateTime.UtcNow,
                ExpiresAtUtc = DateTime.UtcNow.Add(authSettings.Value.RefreshExpires)
            });

            await dbContext.SaveChangesAsync();

            SetTokenCookies(httpContext, newAccessToken, newRefreshToken, authSettings.Value);

            return Results.Ok(new { UserId = user.Id, Email = user.Email });
        });

        group.MapPost("/logout", async (
            AppDbContext dbContext,
            HttpContext httpContext) =>
        {
            var refreshToken = httpContext.Request.Cookies["engram_refresh_token"];
            if (!string.IsNullOrWhiteSpace(refreshToken))
            {
                var refreshHash = SHA256Hash(refreshToken);
                var existing = await dbContext.RefreshTokens.FirstOrDefaultAsync(t => t.TokenHash == refreshHash);
                if (existing != null)
                {
                    existing.RevokedAtUtc = DateTime.UtcNow;
                    await dbContext.SaveChangesAsync();
                }
            }

            ClearTokenCookies(httpContext);
            return Results.Ok(new { Message = "Logged out successfully." });
        });
    }

    private static void SetTokenCookies(HttpContext context, string accessToken, string refreshToken, AuthSettings settings)
    {
        var accessOptions = new CookieOptions
        {
            HttpOnly = true,
            Secure = true,
            SameSite = SameSiteMode.Strict,
            Expires = DateTime.UtcNow.Add(settings.Expires)
        };

        var refreshOptions = new CookieOptions
        {
            HttpOnly = true,
            Secure = true,
            SameSite = SameSiteMode.Strict,
            Expires = DateTime.UtcNow.Add(settings.RefreshExpires)
        };

        context.Response.Cookies.Append("engram_access_token", accessToken, accessOptions);
        context.Response.Cookies.Append("engram_refresh_token", refreshToken, refreshOptions);
    }

    private static void ClearTokenCookies(HttpContext context)
    {
        context.Response.Cookies.Delete("engram_access_token");
        context.Response.Cookies.Delete("engram_refresh_token");
    }

    private static string SHA256Hash(string input)
    {
        var bytes = SHA256.HashData(System.Text.Encoding.UTF8.GetBytes(input));
        return Convert.ToBase64String(bytes);
    }
}
