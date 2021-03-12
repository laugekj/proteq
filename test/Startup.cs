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

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddControllersWithViews();

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });


            //pull in connection string
           string connectionString = null;
           string envVar = Environment.GetEnvironmentVariable("DATABASE_URL");
           if (string.IsNullOrEmpty(envVar)){
               connectionString = Configuration["Connectionstrings:database"];
           }
           else{
               //parse database URL. Format is postgres://<username>:<password>@<host>/<dbname>
               var uri = new Uri(envVar);
               var username = uri.UserInfo.Split(':')[0];
               var password = uri.UserInfo.Split(':')[1];
               connectionString = 
               "; Database=" + uri.AbsolutePath.Substring(1) +
               "; Username=" + username +
               "; Password=" + password + 
               "; Port=" + uri.Port +
               "; SSL Mode=Require; Trust Server Certificate=true;";
           }

           services.AddDbContext<UserContext>(opt =>
            opt.UseNpgsql("connectionstring"));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
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
