using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CustomTypes.Alertas
{
    public class AlertaConfiguracion
    {
        public Guid Id_AlertaConfiguracion { get; set; }
        public decimal ValorLumbral { get; set; }
        public string Condicion { get; set; }
        public Variable Variable { get; set; }
        public Alerta Alerta { get; set; }
        public Guid Id_Alerta { get; set; }
    }
}
