using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using test.Models;

namespace test.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    { 
    private readonly UserContext _context;

    public UserController(UserContext context)
    {
        _context = context;
     
        if (_context.Users.Count() == 0)
        {
            Create(new User {Firstname = "Latge", Phone = "12345678", Email = "sumEmail@mail.dk"});
            Create(new User {Firstname = "Latge", Phone = "12345678", Email = "sumEmail@mail.dk"});
        }
    
    }


        [HttpPost]
        public ActionResult<User> Create(User user) 
        { 
            user.Id = _context.Users.Any() ? _context.Users.Max(p => p.Id) + 1 : 1;
            
            _context.Users.Add(user);
            _context.SaveChanges();
            return CreatedAtAction(nameof(GetById), new { id = user.Id}, user);
        } 

        [HttpDelete("{id}")]
        public ActionResult<User> Delete(int id)
        {
            var user = _context.Users.Where(x => x.Id == id).Single<User>();
            _context.Users.Remove(user);
            _context.SaveChanges();
            return Ok();
        }

        // /user
        [HttpGet] 
        public ActionResult<List<User>> GetAll() 
        {     
            return _context.Users.ToList(); 
        } 

        // /user/id
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
