using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;

public class MyMiddleware2
{
    private readonly RequestDelegate _next;
    private readonly ILogger _logger;

    public MyMiddleware2(RequestDelegate next, ILoggerFactory logFactory)
    {
        _next = next;

        _logger = logFactory.CreateLogger("MyMiddleware2");
    }

    public async Task Invoke(HttpContext httpContext)
    {
        _logger.LogInformation("MyMiddleware 2 executing.. before");

        await _next(httpContext); // calling next middleware

        _logger.LogInformation("MyMiddleware 2 executing.. after");

    }
}

// Extension method used to add the middleware to the HTTP request pipeline.
public static class MyMiddlewareExtensions2
{
    public static IApplicationBuilder UseMyMiddleware2(this IApplicationBuilder builder)
    {
        return builder.UseMiddleware<MyMiddleware2>();
    }
} 