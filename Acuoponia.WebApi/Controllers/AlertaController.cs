using CustomTypes.Alertas;
using Logica;
using Microsoft.AspNetCore.Mvc;

namespace Acuoponia.WebApi.Controllers
{
    [Route("Api/[controller]")]
    [ApiController]
    public class AlertaController
    {
        private readonly IAlertaLogic _alertaLogic;
        public AlertaController(IAlertaLogic alertaLogic)
        {
            _alertaLogic = alertaLogic;
        }

        [HttpPost("Create")]
        public bool InsertAlerta(AlertaRequest request)
        {
            return  _alertaLogic.InsertAlerta(request);
        }
    }
}
