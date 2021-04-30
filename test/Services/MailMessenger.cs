using System.Net;
using System.Net.Mail;

namespace test.Services
{   

    public class MailMessenger
    {
        public static void SendWelcomeEmailToUser(string mail)
        {
            var smtpClient = new SmtpClient("smtp.gmail.com")
            {
                Port = 587,
                Credentials = new NetworkCredential("testmig002@gmail.com", "Password1324#"),
                EnableSsl = true,
            };
            smtpClient.Send("testmig002@gmail.com", mail, "Registration Complete", "Velkommen Til Simple GPDR");
        }

        public static void SendPasswordResetLink(string mail, string url, string token)
        {
            var smtpClient = new SmtpClient("smtp.gmail.com")
            {
                Port = 587,
                Credentials = new NetworkCredential("testmig002@gmail.com", "Password1324#"),
                EnableSsl = true,
            };
            smtpClient.Send("testmig002@gmail.com", mail, "Glemt Kodeord", "Tryk på dette link for at nulstille dit kodeord: \r\n" + TokenAndUrlService.getResetPasswordURL(url) + "?" + token);
        }
    }
}