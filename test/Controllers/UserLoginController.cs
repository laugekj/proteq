
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


        // /api/userlogin/createresetmodel
        [HttpPost]
        [Route("[action]")]
        public ActionResult CreateResetModel(MailUrlModel mailUrlModel) {
            ResetPassword model = new ResetPassword();
            model.Id = _context.ResetPasswords.Any() ? _context.ResetPasswords.Max(p => p.Id) + 1 : 1;
            Console.WriteLine("print lige min mail G");
            Console.WriteLine(mailUrlModel.Mail);
            model.Email = mailUrlModel.Mail;
            model.Token = generatePasswordResetToken(model.Id);

            _context.ResetPasswords.Add(model);

            _context.SaveChanges();
          
           SendPasswordResetLink(mailUrlModel.Mail, mailUrlModel.Url, model.Token);


            return Ok();
        }

        private string generatePasswordResetToken(int userId) 
        {   
             // example of payment token generated date 28 / 04 / 2021 with userId 19
             // pt_28042021_uid_19_XXXXXX__64_Characters_Long__XXXXXX
        string resetToken = "pt_" + DateTime.Now.ToString("ddMMyyyy") + "_";
        resetToken += "uid_" + userId + "_";
        resetToken += RandomString(64);


         return resetToken;
        }

        private string retrieveDomainNameFromURL(string URL) 
        {
        
            return URL.Replace("request", "");
        }
        private static Random random = new Random();
        public static string RandomString(int length)
        {
            // Created with help from: https://stackoverflow.com/a/1344242
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            return new string(Enumerable.Repeat(chars, length)
            .Select(s => s[random.Next(s.Length)]).ToArray());
        }

        public void SendPasswordResetLink(string mail, string url, string token)
        {
        

            Console.WriteLine(mail);
            var smtpClient = new SmtpClient("smtp.gmail.com")
            {
                Port = 587,
                Credentials = new NetworkCredential("testmig002@gmail.com", "Password1324#"),
                EnableSsl = true,
            };
            smtpClient.Send("testmig002@gmail.com", mail, "Glemt Kodeord", "Tryk på dette link for at nulstille dit kodeord: \r\n" + retrieveDomainNameFromURL(url) + "?" + token);
        }


    }
}









