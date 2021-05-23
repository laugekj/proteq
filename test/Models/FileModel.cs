namespace test.Models
{
    public class FileModel
    {
        public int Id { get; set; }

        public string FileName { get; set; }
        public string FileType { get; set; } 

        public byte[] FileData { get; set; }

        
        public int StepId { get; set; }
        public Step Step { get; set; }

    }
}