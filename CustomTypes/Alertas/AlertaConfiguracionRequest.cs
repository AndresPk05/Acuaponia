using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CustomTypes.Alertas
{
    public class AlertaConfiguracionRequest
    {
        public decimal ValorCondicion { get; set; }
        public string Condicion { get; set; }
        public string Variable { get; set; }
    }
}
