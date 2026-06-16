using Engram.Application.Auth;
using Engram.Domain.Shared;

namespace Engram.Application.Common.Interfaces;

public interface IIdentityService
{
    Task<Result> RegisterAsync(string email, string password);
    Task<Result<LoginTokens>> LoginAsync(string email, string password);
    Task<Result<LoginTokens>> RefreshAsync(string refreshToken);
    Task<Result> LogoutAsync(string refreshToken);
}
