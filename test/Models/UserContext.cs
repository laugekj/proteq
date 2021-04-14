using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using test.Models;


namespace test.Models
{

    public class UserContext : DbContext
    {
        public DbSet<User> Users { get; set; }

        public DbSet<UserRegistration> UserRegistrations { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserRegistration>()
                .HasKey(p => p.Mail)
                .HasName("PrimaryKey_Mail");
        }

    
        public UserContext(DbContextOptions<UserContext> options)
            : base(options)
        {
        }



    }
    
    
}
       
