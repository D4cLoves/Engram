using System.Security.Cryptography;
using System.Text;
using Engram.Application.Auth;

namespace Engram.Infrastructure.Auth;

public class RefreshTokenService : IRefreshTokenService
{
    public string CreateRefreshToken()
    {
        return Convert.ToBase64String(RandomNumberGenerator.GetBytes(64));
    }

    public string HashRefreshToken(string refreshToken)
    {
        var hashBytes = SHA256.HashData(Encoding.UTF8.GetBytes(refreshToken));
        return Convert.ToBase64String(hashBytes);
    }
}
