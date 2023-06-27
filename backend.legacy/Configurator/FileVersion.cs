/// Enable Configurator
/// File Controller for Manipulation of Parametric variables in OnShape & File Copying
/// 
/// Kabir Lovero

using Azure;
using System.Text.Json;
using System;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Reflection.Metadata;
using System.Text;
using System.Threading.Tasks;
using static System.Net.WebRequestMethods;
using Newtonsoft.Json;
using System.Diagnostics;
using Azure.Core;
using System.Security.Cryptography;


namespace Configurator
{
    public class FileCopy
    {
        public bool isPublic { get; set; }
        public string newName { get; set; }
        public string ownerId { get; set; }
        public int ownerTypeIndex { get; set; }

    }

   

    public class FileVersion
    {
        string wid = "";
        string eid = "";
        string docId = "";

        
        const string OriginalDId = "09ad66c72f341475d98367a7";
        const string OriginalWiD = "31e95c9533cf897ae28d75ee";
        const string OriginalEid = "7d3b2fe75f015ca284359205";


		static HttpClient client = new HttpClient();

        public FileVersion()
        {

        }
        FileVersion(string workspaceId, string EID, string DocumentId)
        {

        }

        public static string RandomString(int len)
        {
            Random res = new Random();

            // String of alphabets 
            String str = "abcdefghijklmnopqrstuvwxyz";
            int size = len;

            // Initializing the empty string
            String ran = "";

            for (int i = 0; i < size; i++)
            {

                // Selecting a index randomly
                int x = res.Next(26);

                // Appending the character at the 
                // index to the random string.
                ran = ran + str[x];
            }
            return ran;
        }



        public static string Base64Encode(string textToEncode)
        {
            byte[] textAsBytes = Encoding.UTF8.GetBytes(textToEncode);
            return Convert.ToBase64String(textAsBytes);
        }


        public static async Task<string> GetDocumentEID(string docId, string newwId)
        {


            ///need to change authentication method
            string Username = AuthDeclaration.USERNAME ;
            string Password = AuthDeclaration.PASSWORD;
			client.DefaultRequestHeaders.Clear();
			client.DefaultRequestHeaders.Add("Authorization", $"Basic {Base64Encode($"{AuthDeclaration.USERNAME}:{AuthDeclaration.PASSWORD}")}");

            var content = await client.GetStringAsync("https://cad.onshape.com/api/v5/documents/d/" + docId + "/w/" + newwId + "/elements?withThumbnails=false");
            
            return content;

        }
        public static async Task<string> CreateFileAsync(FileCopy newFile)
        {
            ///need to change authentication method
            
            client.DefaultRequestHeaders.Clear();
            client.DefaultRequestHeaders.Add("Authorization", $"Basic {Base64Encode($"{AuthDeclaration.USERNAME}:{AuthDeclaration.PASSWORD}")}");
            HttpResponseMessage response = await client.PostAsJsonAsync(
                "copy/", newFile);


            
            response.EnsureSuccessStatusCode();
            
            var contents = await response.Content.ReadAsStringAsync();
            
            return contents;
        }




        public static async Task<string> ModifyFileConfiguration(FileCopy newFile)
        {
            ///need to change authentication method
            
            client.DefaultRequestHeaders.Clear();
            client.DefaultRequestHeaders.Add("Authorization", $"Basic {Base64Encode($"{AuthDeclaration.USERNAME}:{AuthDeclaration.PASSWORD}")}");
            HttpResponseMessage response = await client.PostAsJsonAsync(
                "copy/", newFile);

            response.EnsureSuccessStatusCode();

            var contents = await response.Content.ReadAsStringAsync();
            
            return contents;
        }




        static async Task<FileCopy> GetFileAsync(string path)
        {

            FileCopy filecopy = null;
            HttpResponseMessage response = await client.GetAsync(path);
            if (response.IsSuccessStatusCode)
            {
                filecopy = await response.Content.ReadAsAsync<FileCopy>();
            }
            return filecopy;

        }

        static async Task<HttpStatusCode> DeleteFileAsync(string id)
        {
            HttpResponseMessage response = await client.DeleteAsync(
                $"api/products/{id}");
            return response.StatusCode;
        }

        public static async Task<string> CreateNewFileVersion()
        {
            // Update port # in the following line.
            if (client.BaseAddress == null)
            {
                client.BaseAddress = new Uri("https://cad.onshape.com/api/v5/documents/"+ OriginalDId+"/workspaces/"+OriginalWiD+"/");
            }
            
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(
                new MediaTypeWithQualityHeaderValue("application/json"));

            try
            {
                FileCopy newFileCopy = new FileCopy
                {
                    isPublic = true,
                    newName = "newGeneratedfilenet" + RandomString(5),
                    ownerId = "enableitalia",
                    ownerTypeIndex = 0
                };



                
                var url = await CreateFileAsync(newFileCopy);
                return url;
               
            }
            catch (Exception e)
            {
                Console.WriteLine("error.Something went wrong");
                Console.WriteLine(e.Message);
            }


            Console.ReadLine();
            return "error";
        }


        public static async Task<string> SendNewConfig(Configurations newConfigVals, string did, string wid, string eid, string microversionid)
        {
            
            
            client.DefaultRequestHeaders.Clear();
            client.DefaultRequestHeaders.Add("Authorization", $"Basic {Base64Encode($"{AuthDeclaration.USERNAME}:{AuthDeclaration.PASSWORD}")}"); //new Version testing
            try
            {
                var reqUrl =   "https://username:Ly8ecTyHFSE8QS0TztFNCHrf:@cad.onshape.com/api/v5/elements/d/" + did + "/w/" + wid + "/e/" + eid + "/configuration";
                //var reqUrl = "https://username:Ly8ecTyHFSE8QS0TztFNCHrf:@cad.onshape.com/api/v5/elements/d/597142e0b884c441ad13218d/w/0cc2fff3d1d9ecd06d23eb15/e/92cab5948e7d1f4ba739b4ce/configuration";
                var urlPart = did + "/w/" + wid + "/e/" + eid + "/configuration";
                string Obj = System.IO.File.ReadAllText("wwwroot/baseConfig.json");
                BaseConfiguration currentConfig = Newtonsoft.Json.JsonConvert.DeserializeObject<BaseConfiguration>(Obj);


                BaseConfiguration NewConfig = new BaseConfiguration();


                ///here we set the new values
                
                currentConfig.currentConfiguration[1].value = Int32.Parse(newConfigVals.ElbowLength);
                currentConfig.currentConfiguration[1].expression = newConfigVals.ElbowLength + " mm";

                currentConfig.currentConfiguration[2].value = Int32.Parse(newConfigVals.ArcRadius);
                currentConfig.currentConfiguration[2].expression = newConfigVals.ArcRadius + " mm";
                currentConfig.sourceMicroversion = microversionid;


                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));  

                //new verion sstem
                HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Post, reqUrl);
                  var s = new JsonSerializerSettings { DateFormatHandling = DateFormatHandling.MicrosoftDateFormat };
                request.Content = new StringContent(Newtonsoft.Json.JsonConvert.SerializeObject(currentConfig, s),Encoding.UTF8,"application/json");
                
                Console.WriteLine(" mew workspace  url is {0}", reqUrl);
                Console.WriteLine("configurationVal: {0}", Newtonsoft.Json.JsonConvert.SerializeObject(currentConfig));


                

                var ii = await client.SendAsync(request);
                return ii.Content.ReadAsStringAsync().Result;

               

            }
            catch (Exception e)
            {
                Console.WriteLine("error.Something went wrong");
                return e.Message;
            }

        }

        // save serialized JSON to file
        public static void  SaveJSONToFile(String JSONValue)
        {
        //create random string and file name
        string fileName = "config" + RandomString(5) + ".json";
            string path = Path.Combine(Directory.GetCurrentDirectory(), "TempFiles", fileName);
            //write string to file
            System.IO.File.WriteAllText(path, JSONValue);
        }

        public static string  StartPythonProcess( String JSONConfig, String Newurl)
        {
            ProcessStartInfo start = new ProcessStartInfo("venv/bin/python3");


            start.Arguments = string.Format("{0} {1}  {2}", "Scripts/test.py", JSONConfig, Newurl );
            start.UseShellExecute = false;
            start.RedirectStandardOutput = true;
            using (Process process = Process.Start(start))
            {
                using (StreamReader reader = process.StandardOutput)
                {
                    string result = reader.ReadToEnd();
                    
                    Console.Write(result);
                    return result;

                }
            }
            return "error";
        }

        

        //request to get correct microversionId
        public static async Task<string> GetDocumentMicroversion(string did)
        {
            ///need to change authentication method
            
            string encoded = System.Convert.ToBase64String(Encoding.GetEncoding("ISO-8859-1")
							   .GetBytes(AuthDeclaration.USERNAME + ":" + AuthDeclaration.PASSWORD));
			HttpWebRequest request = (HttpWebRequest)WebRequest.Create("https://cad.onshape.com/api/v5/documents/d/"+did+"/workspaces");
            request.Headers.Add("Authorization", "Basic " + encoded);
            
            request.AutomaticDecompression = DecompressionMethods.GZip | DecompressionMethods.Deflate;
            //request.DefaultRequestHeaders.Add("Authorization", $"Basic {Base64Encode($"{Username}:{Password}")}");

            using (HttpWebResponse response = (HttpWebResponse)await request.GetResponseAsync())
            using (Stream stream = response.GetResponseStream())
            using (StreamReader reader = new StreamReader(stream))
            {
                return await reader.ReadToEndAsync();
            }
        }


		public static string  GetFile(string did, string wid, string eid, string conf0)
		{
			
			string encoded = System.Convert.ToBase64String(Encoding.GetEncoding("ISO-8859-1")
							   .GetBytes(AuthDeclaration.USERNAME + ":" + AuthDeclaration.PASSWORD));
			string fileUrl = "./wwwroot/stlfiles/newfile.stl";
			string downloadReq = "https://cad.onshape.com/api/v5/parts/d/" + did + "/w/" + wid + "/e/" + eid + "/partid/JRD/stl?mode=text&grouping=true&scale=1&units=millimeter";
            downloadReq += "&configuration=" + conf0;
            string newUrl = downloadReq;
			System.Net.HttpWebRequest request = null;
			System.Net.HttpWebResponse response = null;
            int maxRedirCount = 0 ;
            do { 
            try
			{
				

				request = (System.Net.HttpWebRequest)System.Net.HttpWebRequest.Create(downloadReq);

				request.Headers.Add("Authorization", "Basic " + encoded);
                request.AllowAutoRedirect = false;
				request.AutomaticDecompression = DecompressionMethods.GZip | DecompressionMethods.Deflate;


				response = (System.Net.HttpWebResponse)request.GetResponse();


				switch (response.StatusCode)
				{
					case HttpStatusCode.OK:
						return newUrl;
					case HttpStatusCode.Redirect:
					case HttpStatusCode.MovedPermanently:
					case HttpStatusCode.RedirectKeepVerb:
					case HttpStatusCode.RedirectMethod:
						newUrl = response.Headers["Location"];
						if (newUrl == null)
							return newUrl;

						if (newUrl.IndexOf("://", System.StringComparison.Ordinal) == -1)
						{
							// Doesn't have a URL Schema, meaning it's a relative or absolute URL
							Uri u = new Uri(new Uri(downloadReq), newUrl);
							newUrl = u.ToString();
						}
						break;
					default:
						return newUrl;
				}
				downloadReq = newUrl;
			}
			catch (WebException)
			{
				// Return the last known good URL
				return newUrl;
			}
			catch (Exception ex)
			{
				return null;
			}
			finally
			{
				if (response != null)
					response.Close();
			}
		} while (maxRedirCount-- > 0);

        return newUrl;




		}

        public static string GetNewFile(string redirectedurl)
        {

			
			string encoded = System.Convert.ToBase64String(Encoding.GetEncoding("ISO-8859-1")
							   .GetBytes(AuthDeclaration.USERNAME + ":" + AuthDeclaration.PASSWORD));
			string fileUrl = "./wwwroot/stlfiles/" + RandomString(5)+"newfile.stl";
            //string downloadReq = "https://cad.onshape.com/api/v5/parts/d/" + did + "/w/" + wid + "/e/" + eid + "/partid/JRD/stl?mode=text&grouping=true&scale=1&units=millimeter";
            string downloadReq = redirectedurl;
			try
			{
				System.Net.HttpWebRequest request = null;
				System.Net.HttpWebResponse response = null;

				request = (System.Net.HttpWebRequest)System.Net.HttpWebRequest.Create(downloadReq);

				request.Headers.Add("Authorization", "Basic " + encoded);

				request.AutomaticDecompression = DecompressionMethods.GZip | DecompressionMethods.Deflate;
				request.Timeout = 30000;  //8000 Not work

				response = (System.Net.HttpWebResponse)request.GetResponse();
				Console.WriteLine("Content length is {0}", response.ContentLength);
				Stream s = response.GetResponseStream();
				if (System.IO.File.Exists(fileUrl))
				{
					System.IO.File.Delete(fileUrl);
				}
				FileStream os = new FileStream(fileUrl, FileMode.OpenOrCreate, FileAccess.Write);
				byte[] buff = new byte[102400];
				int c = 0;
				while ((c = s.Read(buff, 0, 10400)) > 0)
				{
					
					os.Write(buff, 0, c);
					os.Flush();

				}
				os.Close();
				s.Close();

			}
			catch (Exception e)
			{
				return e.Message + Directory.GetCurrentDirectory();
			}
			finally
			{

			}


			return fileUrl;
		}
	
	}
	
}
