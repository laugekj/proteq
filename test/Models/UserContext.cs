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

        public DbSet<ResetPassword> ResetPasswords { get; set; }

        public DbSet<Step> Steps { get; set; }

        public DbSet<FileModel> Files { get; set; }

        public DbSet<UserStep> UserSteps { get; set; }

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


            modelBuilder.Entity<FileModel>()
                .HasOne<Step>(f => f.Step)
                .WithMany(s => s.Files)
                .HasForeignKey(f => f.StepId);

            modelBuilder.Entity<UserStep>()
                .HasOne(us => us.Step)
                .WithMany(u => u.UserSteps)
                .HasForeignKey(us => us.StepId);

            modelBuilder.Entity<UserStep>()
                .HasOne(us => us.User)
                .WithMany(s => s.UserSteps)
                .HasForeignKey(us => us.UserId);

        }



    }
    
    
}
       
