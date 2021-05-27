using System.Net;
using System.Net.Mail;

namespace test.Services
{   

    public class MailMessenger
    {
        public static void SendWelcomeEmailToUser(string mail)
        {
            MailMessage msg = new MailMessage("testmig002@gmail.com", mail);
            msg.Subject = "Velkommen til SimpleGDPR";
            msg.Body = 
            @"<h1>Velkommen til SimpleGDPR!</h1>
            <p></p>
            <p>Det glæder os at ønske dig velkommen til SimpleGDPR familien. Hos SimpleGDPR kan du få nem vejledning til love og retningslinjer omkring GDPR. Så kan du som virksomhed overholde GDPR og derved EU lovene. Gennemfør vores simple trin til trin guide så vil du blive en ny ekspert på GDPR. God fornøjelse med læsningen!</p>
            <p></p>
            <p>Venlig Hilsen, </p>
            <h1>SimpleGDPR</h1>
            <p></p>
            <p></p>
            ";
            msg.IsBodyHtml = true;

            var smtpClient = new SmtpClient("smtp.gmail.com")
            {
                Port = 587,
                Credentials = new NetworkCredential("testmig002@gmail.com", "Password1324#"),
                EnableSsl = true,
            };
            smtpClient.Send(msg);
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