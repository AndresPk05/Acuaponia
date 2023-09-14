using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Email
{
    public class EmailApiCredentials
    {
        public Guid Id_EmailApiCredentials { get; set; }
        public string UserName { get; set; }
        public string ApiKey { get; set; }
        public string ServidorSmtp { get; set; }
        public int Puerto { get; set; }

    }
}
