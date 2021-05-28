using Microsoft.AspNetCore.Builder;
using System;
using System.Collections;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using test.Models;

namespace test
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {

            services.AddControllersWithViews();

            services.AddControllers().AddNewtonsoftJson(options =>
                options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
            );

            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });       
            string host = "Server=" + "ec2-54-74-60-70.eu-west-1.compute.amazonaws.com" + ";";
            string port = "Port=" + "5432" + ";";
            string userId = "User Id=" + "ehhpdgiueuvyss" + ";";
            string password = "Password=" + "c7680442125c139b0f6ee1893b1523ddc57868124c265978876e525440016f63" + ";";
            string database = "Database=" + "d635bhlt52j1bk" + ";";
            string sslmode = "sslmode=Require" + ";";
            string trustServer = "Trust Server Certificate=true" + ";";
            var connectionString = @"" + host + port + userId + password + database + sslmode + trustServer;
            services.AddDbContext<UserContext>(options =>
            options.UseNpgsql(connectionString));
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
            }

            app.UseStaticFiles();
            
            app.UseSpaStaticFiles();

            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
        }
    }
}
