using Engram.Domain.Shared;

namespace Engram.Domain.Errors;

public static class AuthErrors
{
    public static readonly Error InvalidCredentials = Error.Unauthorized(
        "Auth.InvalidCredentials", 
        "The email or password you entered is incorrect.");

    public static readonly Error EmailAlreadyInUse = Error.Conflict(
        "Auth.EmailAlreadyInUse", 
        "The email address is already registered in our system.");

    public static readonly Error RefreshTokenMissing = Error.Validation(
        "Auth.RefreshTokenMissing", 
        "The refresh token is missing from the request cookies.");

    public static readonly Error RefreshTokenInvalid = Error.Unauthorized(
        "Auth.RefreshTokenInvalid", 
        "The provided refresh token is invalid or expired.");

    public static readonly Error RefreshTokenExpired = Error.Unauthorized(
        "Auth.RefreshTokenExpired", 
        "The refresh token has expired. Please log in again.");

    public static readonly Error SessionCompromised = Error.Unauthorized(
        "Auth.SessionCompromised", 
        "Security warning: This session has been compromised. All active sessions have been terminated.");

    public static readonly Error UserNotFound = Error.NotFound(
        "Auth.UserNotFound", 
        "The user associated with this session could not be found.");
}
