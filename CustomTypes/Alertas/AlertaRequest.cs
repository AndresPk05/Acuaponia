using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CustomTypes.Alertas
{
    public class AlertaRequest
    {
        public string Nombre { get; set; }
        public string EmailNotificacion { get; set; }
        public List<AlertaConfiguracionRequest> configuraciones { get; set; }
    }
}
