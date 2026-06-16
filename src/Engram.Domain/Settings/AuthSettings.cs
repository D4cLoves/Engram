namespace Engram.Domain.Settings;

public class AuthSettings
{
    public string SecretKey { get; set; } = string.Empty;
    public string Issuer { get; set; } = string.Empty;
    public string Audience { get; set; } = string.Empty;
    public TimeSpan Expires { get; set; }
    public TimeSpan RefreshExpires { get; set; }
}
