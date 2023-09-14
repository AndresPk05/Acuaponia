using CustomTypes;
using CustomTypes.Lecturas;
using Logica;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Acuoponia.WebApi.Controllers
{
    [Route("Api/[controller]")]
    [ApiController]
    [Authorize]
    public class LecturaController : ControllerBase
    {
        private readonly ILecturaSensorLogic _lecturaSensorLogic;
        public LecturaController(ILecturaSensorLogic lecturaSensorLogic)
        {
            _lecturaSensorLogic = lecturaSensorLogic;
        }
        [AllowAnonymous]
        [HttpPost("insert")]
        public void InsertLecturaSensores(InsertLecturaRequest lectura)
        {
            _lecturaSensorLogic.InsertLecturaSensores(lectura);
        }

        [HttpPost("getByDispostivo")]
        public LecturaSensorResponse GetLecturaSensor(LecturaSensorRequest request)
        {
            return _lecturaSensorLogic.GetLecturaSensor(request);
        }

        [HttpPost("GetLecturasByDispostivoFechaVariable")]
        public LecturaSensorResponse GetLecturasByDispostivoFechaVariable(LecturaSensorRequest request)
        {
            return _lecturaSensorLogic.GetLecturasByDispostivoFechaVariable(request);
        }

        [HttpPost("getMaximoValor")]
        public decimal GetMaximoValorByVariableDispostivo(LecturaMaximaRequest request)
        {
            return _lecturaSensorLogic.GetMaximoValorByVariableDispostivo(request);
        }

        [HttpGet("GetIdVariablesByDispositivo/{idDispositivo}")]
        public List<Guid> GetIdVariablesByDispositivo(Guid idDispositivo) {
            return _lecturaSensorLogic.GetIdVariablesByDispositivo(idDispositivo);
        }
    }
}
