using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using API.Middelwares;
using API.Extensions;
using StackExchange.Redis;
using Infrastructure.Identity;
using Microsoft.Extensions.FileProviders;
using System.IO;

namespace API
{
    public class Startup
    {
        private readonly IConfiguration _configuration;
        public Startup(IConfiguration configuration)
        {
            _configuration = configuration;            
        }



        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddControllers();            
            services.AddDbContext<StoreContext>(x => x.UseNpgsql(_configuration.GetConnectionString("DefaultConnection")));

            services.AddDbContext<StoreIdentityDbContext>(x => 
            {
                x.UseNpgsql(_configuration.GetConnectionString("IdentityConnection"));
            });
            
            services.AddSingleton<IConnectionMultiplexer>(c => {
                var configuration = ConfigurationOptions.Parse(_configuration.GetConnectionString("Redis"), true);
                return ConnectionMultiplexer.Connect(configuration);
            });
            
            services.AddIdentityServices(_configuration);
            services.AddApplicationServices();
            services.AddSwaggerDocumentation();
            services.AddCors(opt => 
            {
                opt.AddPolicy("CorsPolicy", policy => 
                {
                    policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("https://localhost:4200");
                });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            
            
            app.UseMiddleware<ExceptionMiddleware>();        

            app.UseSwaggerDocumention();

            app.UseStatusCodePagesWithReExecute("/errors/{0}"); // for end point doesn't existe this methode will be triggred

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors("CorsPolicy");

            app.UseStaticFiles();

            app.UseStaticFiles(new StaticFileOptions{
                FileProvider = new PhysicalFileProvider(
                    Path.Combine(Directory.GetCurrentDirectory(), "Content")
                ), RequestPath = "/content"
            });

            //app.UseMyMiddleware(); test middelware / Filters executing inside middelwares arround actions
            //app.UseMyMiddleware2();                  we can specify filters class in attribute for actions
            //                                         or in attribute of the controller to apply to all actions
            //                                         in this controller
            // exp of calling : Midl1 -> filter 1 -> filter 2 -> MVC API -> filter 2 -> filter 1 -> Midl1

            app.UseAuthentication();            

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();

                endpoints.MapFallbackToController("Index", "Fallback");
            });
        }
    }
}
