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
    }
        [HttpPost]
        public ActionResult<User> Create(User user) 
        { 

            if (DoesEmailExists(user.Email))
            {
                return BadRequest();
            }
            user.Id = _context.Users.Any() ? _context.Users.Max(p => p.Id) + 1 : 1;
            _context.Users.Add(user);
            _context.SaveChanges();
            return CreatedAtAction(nameof(GetById), new { id = user.Id}, user);
        } 

        [HttpPut("{id}")]
        public ActionResult<User> Put(int id, User user) 
        {
           var entity = _context.Users.FirstOrDefault(e => e.Id == id);
           if (entity == null) {
               return BadRequest("id must match id");
           } else {
               entity.Firstname = user.Firstname;
               entity.Lastname = user.Lastname;
               entity.Phone = user.Phone;
               entity.Email = user.Email;
               entity.Company = user.Company;
               entity.IsAdmin = user.IsAdmin;
               _context.SaveChanges();
               return Ok();
           }
        }

        [HttpDelete("{id}")]
        public ActionResult<User> Delete(int id)
        {
            var user = _context.Users.Where(x => x.Id == id).Single<User>();
            _context.Users.Remove(user);
            _context.SaveChanges();
            return Ok();
        }

        ///api/user
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


        // [HttpPut("{id}")]
        // [Route("[action]")]
        // public ActionResult<User> setHasPaid(int id, bool hasPaid) 
        // {
        //    var entity = _context.Users.FirstOrDefault(e => e.Id == id);
        //    if (entity == null) {
        //        return BadRequest("id must match id");
        //    } else {
        //        entity.HasPaid = hasPaid;
        //        _context.SaveChanges();
        //        return Ok();
        //    }
        // }

        public bool DoesEmailExists(string mail)
        {
            var tmp = _context.Users.Where(u => u.Email == mail).SingleOrDefault<User>();
            if (tmp != null)
            {
                return true;
            }
            return false;
        }
   
    }
}
