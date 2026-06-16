using Engram.Domain.Shared;

namespace Engram.Api.Extensions;

public static class ResultExtensions
{
    public static IResult ToProblemDetails(this Result result)
    {
        if (result.IsSuccess)
        {
            throw new InvalidOperationException("Can't convert successful result to problem details.");
        }

        var status = result.Error.Type switch
        {
            ErrorType.Validation => StatusCodes.Status400BadRequest,
            ErrorType.Unauthorized => StatusCodes.Status401Unauthorized,
            ErrorType.NotFound => StatusCodes.Status404NotFound,
            ErrorType.Conflict => StatusCodes.Status409Conflict,
            _ => StatusCodes.Status500InternalServerError
        };

        return Results.Problem(
            statusCode: status,
            title: GetTitleForErrorType(result.Error.Type),
            type: GetTypeForErrorType(result.Error.Type),
            detail: result.Error.Description,
            extensions: new Dictionary<string, object?>
            {
                { "error", new { code = result.Error.Code } }
            });
    }

    private static string GetTitleForErrorType(ErrorType type) => type switch
    {
        ErrorType.Validation => "Bad Request",
        ErrorType.Unauthorized => "Unauthorized",
        ErrorType.NotFound => "Not Found",
        ErrorType.Conflict => "Conflict",
        _ => "Server Error"
    };

    private static string GetTypeForErrorType(ErrorType type) => type switch
    {
        ErrorType.Validation => "https://tools.ietf.org/html/rfc7231#section-6.5.1",
        ErrorType.Unauthorized => "https://tools.ietf.org/html/rfc7235#section-3.1",
        ErrorType.NotFound => "https://tools.ietf.org/html/rfc7231#section-6.5.4",
        ErrorType.Conflict => "https://tools.ietf.org/html/rfc7231#section-6.5.8",
        _ => "https://tools.ietf.org/html/rfc7231#section-6.6.1"
    };
}
