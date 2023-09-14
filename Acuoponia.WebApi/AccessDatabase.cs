using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Acuoponia.WebApi;

public static class AccessDatabase
{
    public static string GetConectionDatabase()
    {
        var conexion = System.Configuration.ConfigurationManager.ConnectionStrings["AcuoDatabase"].ConnectionString;
        return conexion;
    }
}
