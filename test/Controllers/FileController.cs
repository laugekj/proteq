using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.IO;
using test.Models;

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

    // /file/id
    /*[HttpGet("{id}", Name = "GetUser")] 
    public ActionResult<step> GetById(int id) 
    {    
        // returns file
        var step = _context.Steps.Find(id);     
        if (step == null)    
        {         
            return NotFound();     
        }  
        return step;
     //   File file = new File();
//https://docs.microsoft.com/en-us/dotnet/api/system.io.file.writeallbytes?view=net-5.0
    //return step; 
    }*/

    [HttpPost]
    public ActionResult Post([FromForm] FileModel file)
    {
        try
        {
            string path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", file.FileName);

            using (Stream stream = new FileStream(path, FileMode.Create))
            {
                file.FormFile.CopyTo(stream);

            }
                // save online 
                Step step = new Step();
                byte[] fileToBytes = System.IO.File.ReadAllBytes(path);
                step.File = fileToBytes;
                step.FilePath = path;
                _context.Steps.Add(step);
                _context.SaveChanges();
            return StatusCode(StatusCodes.Status201Created);
        }
        catch (Exception)
        {
            return StatusCode(StatusCodes.Status500InternalServerError);
        }
    }

    [HttpPost]
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
    }


    }
}