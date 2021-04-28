
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using test.Models;
using System.Net;
using System.Web;
using System.Net.Mail;
using Microsoft.AspNetCore.Http;
using System.Net.Mime;

namespace test.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class UserLoginController : ControllerBase
    { 
    private readonly UserContext _context;

    public UserLoginController(UserContext context)
    {
        _context = context;

    
    }



        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public ActionResult<User> Login(UserLogin typedUser)    
        {    
            var _passWord = encryptPassword.textToEncrypt(typedUser.Password);    
            bool Isvalid = _context.UserRegistrations.Any(x => x.Mail == typedUser.Mail && x.Password == _passWord);
        
            if (Isvalid)    
            {    
                //User user = new User();
                // [DEVELOPER MODE]: CATCH THE USER DATA

                // Catch userId from context : 'UserRegistrations'
                var _userId = _context.UserRegistrations.FirstOrDefault(x => x.Mail == typedUser.Mail && x.Password == _passWord).UserId;

                // Catch all user information from table : 'Users'
                User _user = _context.Users.FirstOrDefault(x => x.Id == _userId);
                Console.WriteLine("userRegr table: " + _userId);
                Console.WriteLine("user table: " + _user.Id);
                return _user;
            } 
            return Unauthorized();      
        } 





    }
}









