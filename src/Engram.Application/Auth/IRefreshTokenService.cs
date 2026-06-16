namespace Engram.Application.Auth;

public interface IRefreshTokenService
{
    string CreateRefreshToken();
    string HashRefreshToken(string refreshToken);
}
