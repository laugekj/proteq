using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data;
using Npgsql; 

namespace test
{
    public class Program
    {
        public static void Main(string[] args)
        {
            InsertRecord();
            Console.Read(); 
            CreateHostBuilder(args).Build().Run();
       

        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });

       private static void TestConnection()
       { 
           using(NpgsqlConnection con=GetConnection())
           {
               con.Open();
               if(con.State==ConnectionState.Open)
               {
                   Console.WriteLine("Connected");
               }
               
           }
       }
       
        private static NpgsqlConnection GetConnection()
        {
            return new NpgsqlConnection(@"Server=ec2-34-240-75-196.eu-west-1.compute.amazonaws.com;Port=5432;User Id=ongggporwmcbyy;Password=8ce076823bd198d23b9cea1cee785dedfdf384ff0aa0630e93ad6feac2e2fefe;Database=dchglbie3su9s0;sslmode=Require;Trust Server Certificate=true;");
        }

        private static void InsertRecord()
        {
            using (NpgsqlConnection con = GetConnection())
            {
                string query = @"insert into public.Students(Name,Fees)values('test4',200.0)";
                NpgsqlCommand cmd = new NpgsqlCommand(query, con);
                con.Open();
                int n = cmd.ExecuteNonQuery();
                if(n==1)    
                {
                    Console.WriteLine("ja tak");
                }

            }
        }
    }
}
