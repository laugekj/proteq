
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using test.Models;
using System.Net;
using System.Web;
using System.Net.Mail;

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

                // Catch all relevant user data
                var _firstname = _user.Firstname;
                var _lastname = _user.Lastname;
                var _email = _user.Email;
                var _phone = _user.Phone;
                var _company = _user.Company;
                var _token = _user.Token;
                var _hasPaid = _user.HasPaid;
                
                // Print out all user data
                Console.WriteLine("[DEVELOPER MODE] : User " + _user);
                Console.WriteLine("[DEVELOPER MODE] :   .userId " + _userId);
                Console.WriteLine("[DEVELOPER MODE] :   .firstName " + _firstname);
                Console.WriteLine("[DEVELOPER MODE] :   .lastname " + _lastname);
                Console.WriteLine("[DEVELOPER MODE] :   .email " + _email);
                Console.WriteLine("[DEVELOPER MODE] :   .phone " + _phone);
                Console.WriteLine("[DEVELOPER MODE] :   .company " + _company);
                Console.WriteLine("[DEVELOPER MODE] :   .token " + _token);
                Console.WriteLine("[DEVELOPER MODE] :   .hasPaid " + _hasPaid);
                return new User() { 
                    Id = _userId,
                    Firstname = _firstname,
                    Lastname = _lastname,
                    Email = _email,
                    Phone = _phone,
                    Company = _company,
                    Token = _token,
                    HasPaid = _hasPaid
                    }; 
            } 
            return Unauthorized();      
        } 




    }
}









