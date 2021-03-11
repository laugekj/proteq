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
            var user1 = new User { Id = 1, Email = "lakj@itu.dk", Name = "Lauge", Phone = 27899661 };
            var user2 = new User { Id = 2, Email = "lakj@iuu.dk", Name = "Lguge", Phone = 27899660 };
            var user3 = new User { Id = 3, Email = "lakj@iau.dk", Name = "Latge", Phone = 27899662 };

            var users = new User[] { user1, user2, user3 };

            return users;
        }

        [HttpPost]
        public ActionResult<User> Create(User user) 
        { 
            user = new User { Id = 1, Email = "lakj@itu.dk", Name = "Lauge", Phone = 27899661 };
            return user;
        } 
   
    }
}
