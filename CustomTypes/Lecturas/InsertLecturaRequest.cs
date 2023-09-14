using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CustomTypes
{
    public class InsertLecturaRequest
    {
        public Guid IdVariable { get; set; }
        public decimal ValorLeido { get; set; }
        public Guid IdDispositivo { get; set; }
    }
}
