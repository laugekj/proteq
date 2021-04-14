
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
        public ActionResult Login(UserLogin user)    
        {    
            var _passWord = encryptPassword.textToEncrypt(user.Password);    
            bool Isvalid = _context.UserRegistrations.Any(x => x.Mail == user.Mail && x.Password == _passWord);    
            if (Isvalid)    
            {    
                return Accepted(); 
            } 
            return Unauthorized();      
        } 




    }
}









