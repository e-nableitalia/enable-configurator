/// Enable Configurator
/// Api Controller for Manipulation of Parametric variables in OnShape
/// 
/// Kabir Lovero





using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Primitives;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Data;
using System.IO;

using System.Text.Json;


// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Configurator
{

    public class Configurations
    {
        public string ElbowLength { get; set; }
        public string ArcRadius { get; set; }

    }

    [Route("api/[controller]")]
    [ApiController]
    public class STLController : ControllerBase
    {
        


        // GET: api/<STLController>
        [HttpGet(Name = "test")]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<STLController>/5
        [HttpGet("new/{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // GET api/<STLController>/5
        [HttpGet("Document/{wid}/{eid}")]
        public string GetDocumentVersion(string wid, string eid)
        {
            FileVersion newCopy = new FileVersion();
            var ii = FileVersion.CreateNewFileVersion();

            return ii.Result ;
        }

        [HttpGet("DocumentEID/{did}/{wid}")]
        public string GetDocumentEID(string did, string wid)
        {
            var ii = FileVersion.GetDocumentEID(did, wid);
            return ii.Result;
        }


        [HttpPost("modify/{did}/{wid}/{eid}/{microversionid}")]
        public string SendNewConfig([FromBody] Configurations value, string did, string wid, string eid, string microversionid)
        {

             int ElbowL = 0 ;
             int radius = 0;
             if (!int.TryParse(value.ElbowLength, out ElbowL) ||  !int.TryParse(value.ArcRadius, out radius))
             {
                 return "Error. Not valid values";
             }
           var ii =  FileVersion.SendNewConfig(value, did, wid, eid, microversionid);


            return ii.Result;
        }

        [HttpGet("GetDocumentMicroversion/{did}")]
        public string GetDocument(string did)
        {
            var ii = FileVersion.GetDocumentMicroversion(did);
            return ii.Result;
        }


		[HttpGet("GetDownloadLink/{did}/{wid}/{eid}/{conf0}")]
		public string GetDownloadLink(string did, string wid, string eid, string conf0)
		{
			var ii = FileVersion.GetFile(did,wid, eid, conf0);
            var newFile = FileVersion.GetNewFile(ii);
			return newFile.Replace("wwwroot","").Replace("//","/").Replace("./", "/");
		}


		[HttpGet("CheckFile/{filename}")]
		public string DoesFileExist(string filename)
		{

			if (System.IO.File.Exists("./wwwroot/stlfiles/"+filename))
			{
				return "Success";
			}
            return "Error";
		}








		// POST api/<STLController>
		[HttpPost]
        public void Post([FromBody] string value)
        {
            
        }

        // PUT api/<STLController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<STLController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
