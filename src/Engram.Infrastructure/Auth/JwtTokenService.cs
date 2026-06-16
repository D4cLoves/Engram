using System.Security.Claims;
using System.Text;
using Engram.Application.Auth;
using Engram.Domain.Settings;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.JsonWebTokens;
using Microsoft.IdentityModel.Tokens;

namespace Engram.Infrastructure.Auth;

public class JwtTokenService : IJwtTokenService
{
    private readonly AuthSettings _authSettings;
    private readonly JsonWebTokenHandler _tokenHandler;

    public JwtTokenService(IOptions<AuthSettings> authOptions)
    {
        _authSettings = authOptions.Value;
        _tokenHandler = new JsonWebTokenHandler();
    }

    public string GenerateToken(string userId, string email, IEnumerable<string> roles)
    {
        var claims = new Dictionary<string, object>
        {
            [JwtRegisteredClaimNames.Sub] = userId,
            [JwtRegisteredClaimNames.Email] = email,
            [ClaimTypes.NameIdentifier] = userId
        };

        var roleList = roles.ToList();
        if (roleList.Any())
        {
            claims[ClaimTypes.Role] = roleList.Count == 1 ? roleList.First() : roleList;
        }

        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_authSettings.SecretKey));
        var signingCredentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Claims = claims,
            Expires = DateTime.UtcNow.Add(_authSettings.Expires),
            SigningCredentials = signingCredentials,
            Issuer = _authSettings.Issuer,
            Audience = _authSettings.Audience
        };

        return _tokenHandler.CreateToken(tokenDescriptor);
    }
}
