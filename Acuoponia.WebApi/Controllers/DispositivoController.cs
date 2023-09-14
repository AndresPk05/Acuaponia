using CustomTypes;
using Logica;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Acuoponia.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DispositivoController : ControllerBase
    {
        private readonly IDispositivoLogic _dispositivoLogic;
        public DispositivoController(IDispositivoLogic dispositivoLogic)
        {
            _dispositivoLogic = dispositivoLogic;
        }
        [HttpGet]
        public List<DispositivoGrid> GetDispositivos()
        {
            return _dispositivoLogic.GetDispositivos();
        }

        [HttpPost("Crear")]
        public Dispositivo CrearDispositivo(DispositivoRequest dispositivo)
        {
            return _dispositivoLogic.CreateDispositivo(dispositivo);
        }
    }
}
