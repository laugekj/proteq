using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using test.Models;
using System.IO;

namespace test.Controllers
{
    [Route("api/file")]
    [ApiController]
    public class FileController : ControllerBase
    {


    private readonly UserContext _context;

    public FileController(UserContext context)
    {
        _context = context;    
    }

    // /api/file/id
    [HttpGet("{id}", Name = "GetStep")] 
    public IActionResult GetById(int id) 
    {    
        // returns file
        var step = _context.Steps.Find(id);     
        if (step == null)    
        {         
            return NotFound();     
        }

        
        // save locally (not relevant)
        //System.IO.File.WriteAllBytes(step.FilePath, step.File);

        return File(step.File, step.FileType);  
    }



    [HttpPost]
    public ActionResult Post([FromForm] StepModel data)
    {
        Console.WriteLine("--- Data --- ");
        Console.WriteLine("DesignId: " + data.DesignId);
        Console.WriteLine("Title: " + data.Title);
        Console.WriteLine("Body: " + data.Body);
        Console.WriteLine("Video: " + data.Video);
        Console.WriteLine("FileName: " + data.FileName);
        Console.WriteLine("FileType: " + data.type);

        try
        {
            string path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", data.FileName);

             using (Stream stream = new FileStream(path, FileMode.Create))
            {
                data.FormFile.CopyTo(stream);

            }
                // save online 


                Step step = new Step();
                byte[] fileToBytes = System.IO.File.ReadAllBytes(path);
                step.File = fileToBytes;
                step.FileType = data.type;

                step.DesignId = data.DesignId;
                step.Title = data.Title;
                step.Body = data.Body;
                step.Video = data.Video;

                _context.Steps.Add(step);
                _context.SaveChanges();
            return StatusCode(StatusCodes.Status201Created);
        }
        catch (Exception)
        {
            return StatusCode(StatusCodes.Status500InternalServerError);
        }
    }

    /*[HttpPost]
    [Route("[action]")]
    public ActionResult uploadFile(StepModel data) 
    { 
        Console.WriteLine("[DEVELOPER MODE] Backend uploadFile() called");
        Console.WriteLine("[# DesignId] " + data.DesignId);
        Console.WriteLine("[# Title] " + data.Title);
        Console.WriteLine("[# Body] " + data.Body);
        Console.WriteLine("[# Video] " + data.Video);
        //Console.WriteLine("[# File] " + data.file);

        _context.Steps.Add(new Step() {
            DesignId = data.DesignId,
            Title = data.Title,
            Body = data.Body,
            Video = data.Video
            
        });

        _context.SaveChanges();

        return Accepted();
    }*/


    


    private string getFileType(string fileName) {
        string fileType = fileName; // XXXX.jpg
        fileType = fileType.Substring(fileName.IndexOf('.')+1); // jpg

        return fileType;
    }

    }
}