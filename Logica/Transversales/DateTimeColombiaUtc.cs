using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Logica.Transversales
{
    public static class DateTimeColombiaUtc
    {
        public static DateTime GetDateTimeUtcColombia()
        {
            return TimeZoneInfo.ConvertTimeBySystemTimeZoneId(DateTime.UtcNow, "SA Pacific Standard Time");
        }
    }
}
