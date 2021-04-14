using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using test.Models;


namespace test.Models
{

    public class UserContext : DbContext
    {
        public UserContext(DbContextOptions<UserContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                .HasOne(r => r.UserReg)
                .WithOne(i => i.User)
                .HasForeignKey<UserRegistration>(b => b.UserId);

            modelBuilder.Entity<UserRegistration>()
            .HasKey(u => u.RegrId);


        }

        public DbSet<User> Users { get; set; }

        public DbSet<UserRegistration> UserRegistrations { get; set; }


    
    


    }
    
    
}
       
