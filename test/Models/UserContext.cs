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
    
     public UserContext(DbContextOptions<UserContext> options)
            : base(options)
        {
        }



    }
    
    
}
       
