using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using test.Models;


namespace test.Models
{
    public interface IUserContext
    {
        DbSet<User> Superheroes { get; set; }

        int SaveChanges();
    }



    public class UserContext : DbContext, IUserContext
    {
        public DbSet<User> Superheroes { get; set; }
    
     public UserContext(DbContextOptions<UserContext> options)
            : base(options)
        {
        }



        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder
                .Entity<User>();
                

    
        }
    }
    
    
}
       
