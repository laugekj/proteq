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
    private readonly UserContext _context;

    public UserController(UserContext context)
    {
        _context = context;
     
        if (_context.Users.Count() == 0)
        {
            _context.Users.Add(new User {Id = 421, Name = "Latge", Phone = "2789927492", Email = "sum@emal.com", Company = "sumComp A/S"});
            _context.Users.Add(new User {Id = 120, Name = "Bejte", Phone = "12345678", Email = "Benjh@emal.com", Company = "Benhege A/S"});
            _context.SaveChanges();
        }
       
        
    }

        // /User
        // [HttpGet]
        // public IEnumerable<User> Get()
        // {
        //     var user1 = new User { Id = 1, Email = "Jens@Jensen.dk", Name = "Jens Jensen", Phone = "27420661" };
        //     var user2 = new User { Id = 2, Email = "Lars@Lars.dk", Name = "Lars Larsen", Phone = "27899660" };
        //     var user3 = new User { Id = 3, Email = "Ole@Olesen.dk", Name = "Ole Olesen", Phone = "27899662" };
        //     var user4 = new User { Id = 4, Email = "Jens@Jensen.dk", Name = "Jens Jensen", Phone = "27420661" };
        //     var user5 = new User { Id = 5, Email = "Lars@Lars.dk", Name = "Lars Larsen", Phone = "27899660" };
        //     var user6 = new User { Id = 6, Email = "Ole@Olesen.dk", Name = "Ole Olesen", Phone = "27899662" };

        //     var users = new User[] { user1, user2, user3, user4, user5, user6 };

        //     return users;
        // }

        [HttpPost]
        public ActionResult<User> Create([FromBody] User user) 
        { 
            return user;
        } 

        [HttpGet] 
        public ActionResult<List<User>> GetAll() 
        {     
            return _context.Users.ToList(); 
        } 


        [HttpGet("{id}", Name = "GetUser")] 
        public ActionResult<User> GetById(int id) 
        {    
            var item = _context.Users.Find(id);     
            if (item == null)    
            {         
                return NotFound();     
            }     
        return item; 
        }
   
    }
}
