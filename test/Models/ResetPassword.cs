namespace test.Models
{
    public class ResetPassword
    {
        public int Id { get; set; }

        public string Email { get; set; }

        public string Token { get; set; }
    }
}