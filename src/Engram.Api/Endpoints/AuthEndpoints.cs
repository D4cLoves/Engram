using Engram.Api.Extensions;
using Engram.Application.Auth;
using Engram.Application.Common.Interfaces;
using Engram.Domain.Settings;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace Engram.Api.Endpoints;

public static class AuthEndpoints
{
    public static void MapAuthEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/auth").WithTags("Authentication");

        group.MapPost("/register", async (
            [FromBody] RegisterRequest request,
            IIdentityService identityService) =>
        {
            var result = await identityService.RegisterAsync(request.Email, request.Password);

            if (result.IsFailure)
            {
                return result.ToProblemDetails();
            }

            return Results.Ok(new { Message = "User registered successfully." });
        });

        group.MapPost("/login", async (
            [FromBody] LoginRequest request,
            IIdentityService identityService,
            IOptions<AuthSettings> authSettings,
            HttpContext httpContext) =>
        {
            var result = await identityService.LoginAsync(request.Email, request.Password);

            if (result.IsFailure)
            {
                return result.ToProblemDetails();
            }

            SetTokenCookies(httpContext, result.Value.AccessToken, result.Value.RefreshToken, authSettings.Value);

            return Results.Ok(new { Message = "Logged in successfully." });
        });

        group.MapPost("/refresh", async (
            IIdentityService identityService,
            IOptions<AuthSettings> authSettings,
            HttpContext httpContext) =>
        {
            var refreshToken = httpContext.Request.Cookies["engram_refresh_token"];
            if (string.IsNullOrWhiteSpace(refreshToken))
            {
                return Results.Unauthorized();
            }

            var result = await identityService.RefreshAsync(refreshToken);

            if (result.IsFailure)
            {
                ClearTokenCookies(httpContext);
                return result.ToProblemDetails();
            }

            SetTokenCookies(httpContext, result.Value.AccessToken, result.Value.RefreshToken, authSettings.Value);

            return Results.Ok(new { Message = "Token refreshed successfully." });
        });

        group.MapPost("/logout", async (
            IIdentityService identityService,
            HttpContext httpContext) =>
        {
            var refreshToken = httpContext.Request.Cookies["engram_refresh_token"];
            if (!string.IsNullOrWhiteSpace(refreshToken))
            {
                await identityService.LogoutAsync(refreshToken);
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
}
