using System;
using System.Linq;



namespace test.Services
{
    public class TokenAndUrlService
    {
        public static string getResetPasswordURL(string URL) 
        {
        
            return URL.Replace("request", "");
        }

        public static string generateToken(int userId) 
        {   
            // example of ??? token generated date 28 / 04 / 2021 with userId 19
            // pt_28042021_uid_19_XXXXXX__64_Characters_Long__XXXXXX
            string resetToken = "pt_" + DateTime.Now.ToString("ddMMyyyy") + "_";
            resetToken += "uid_" + userId + "_";
            resetToken += RandomString(64);


            return resetToken;
        }

        private static Random random = new Random();
        public static string RandomString(int length)
        {
            // Created with help from: https://stackoverflow.com/a/1344242
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            return new string(Enumerable.Repeat(chars, length)
            .Select(s => s[random.Next(s.Length)]).ToArray());
        }

    }
}