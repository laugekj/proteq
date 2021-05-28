namespace test.Models
{
    public class UserStep
    {
        public int Id { get; set; }

        public int UserId { get; set; }

        public User User { get; set; }

        public int StepId { get; set; }

        public Step Step { get; set; }
    }
}