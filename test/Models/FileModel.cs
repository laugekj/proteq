namespace test.Models
{
    public class FileModel
    {
        public string Id { get; set; }

        public Step step { get; set; }
        public string FileType { get; set; } 

        public byte[] FileData { get; set; }

    }
}