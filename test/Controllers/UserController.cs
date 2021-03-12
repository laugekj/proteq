using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using test.Models;

namespace test.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {

            // /User
        [HttpGet]
        public IEnumerable<User> Get()
        {
            var user1 = new User { Id = 1, Email = "Jens@Jensen.dk", Name = "Jens Jensen", Phone = "27420661" };
            var user2 = new User { Id = 2, Email = "Lars@Lars.dk", Name = "Lars Larsen", Phone = "27899660" };
            var user3 = new User { Id = 3, Email = "Ole@Olesen.dk", Name = "Ole Olesen", Phone = "27899662" };
            var user4 = new User { Id = 4, Email = "Jens@Jensen.dk", Name = "Jens Jensen", Phone = "27420661" };
            var user5 = new User { Id = 5, Email = "Lars@Lars.dk", Name = "Lars Larsen", Phone = "27899660" };
            var user6 = new User { Id = 6, Email = "Ole@Olesen.dk", Name = "Ole Olesen", Phone = "27899662" };

            var users = new User[] { user1, user2, user3, user4, user5, user6 };

            return users;
        }

        [HttpPost]
        public ActionResult<User> Create(User user) 
        { 
            user = new User { Id = 1, Email = "lakj@itu.dk", Name = "Lauge", Phone = "27899661" };
            return user;
        } 
   
    }
}
