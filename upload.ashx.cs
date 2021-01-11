using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace h5.audio
{
    /// <summary>
    /// upload 的摘要说明
    /// </summary>
    public class upload : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            var mp3name = context.Request.Params["mp3Name"];
            var dir = "\\audio\\upload\\";
            var path = dir + mp3name;
            var localPath = context.Server.MapPath("~/") + path;
            context.Request.Files[0].SaveAs(localPath);
            context.Response.Write(path);
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}