using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Core
{
    public class AppException
    {
        public int Code { get; set; }

        public string Message { get; set; } 

        public string? Details { get; set; }

        public AppException(string message, string details, int code)
        {
            Message = message;
            Code = code;
            Details = details;
        }
    }
}
