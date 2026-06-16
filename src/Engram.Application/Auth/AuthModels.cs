namespace Engram.Application.Auth;

public record LoginRequest(string Email, string Password);
public record RegisterRequest(string Email, string Password);
public record LoginTokens(string AccessToken, string RefreshToken);
