using CustomTypes;
using Logica;
using Microsoft.AspNetCore.Mvc;

namespace Acuoponia.WebApi.Controllers
{
    [Route("Api/[controller]")]
    [ApiController]
    public class VariableController :ControllerBase
    {
        private readonly IVariableLogic _variableLogic;
        public VariableController(IVariableLogic dispositivoLogic)
        {
            _variableLogic = dispositivoLogic;
        }

        [HttpPost("Crear")]
        public Variable CrearDispositivo(VariableRequest variable)
        {
            return _variableLogic.Create(variable);
        }

        [HttpGet]
        public List<Variable> GetVariablesCreadas()
        {
            return _variableLogic.GetVariablesCreadas();
        }

        [HttpGet("VariableName/{name}")]

        public Variable GetVariableCompletaByName(string name)
        {
            return _variableLogic.GetVariableCompletaByName(name);
        }

        [HttpGet("GetVariableById/{IdVariable}")]

        public CustomTypes.Variable GetVariableById(string IdVariable)
        {
            return _variableLogic.GetVariableById(IdVariable);
        }
    }
}
