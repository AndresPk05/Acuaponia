using CustomTypes;
using Logica.Transversales;
using Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Logica
{
    public class VariableLogic : IVariableLogic
    {
        private readonly IVariableRepository _repository;
        public VariableLogic(IVariableRepository repository)
        {
            _repository = repository;
        }

        public Variable Create(CustomTypes.VariableRequest request)
        {
            try
            {
                var variable = new Variable
                {
                    Fecha_Registro = DateTimeColombiaUtc.GetDateTimeUtcColombia(),
                    Id_Variable = Guid.NewGuid(),
                    Nombre = request.NombreVarible,
                    MaximoValor = (request.MaximoValor ?? 0)
                };

                var resultInsert = _repository.Create(variable);
                if (!resultInsert)
                    throw new ManejadorErrores(System.Net.HttpStatusCode.InternalServerError, "No se pudo crear la variable");
                return variable;
            }
            catch (Exception ex)
            {
                throw new ManejadorErrores(System.Net.HttpStatusCode.InternalServerError, ex);
            }
        }
        public List<Variable> GetVariablesCreadas()
        {
            try
            {
                var variables = _repository.GetVariablesRegistradas();
                return variables;
            }
            catch (Exception ex)
            {
                Logger.WirteLog("Logica.VariableLogic.VariableLogic", ex.Message, Serilog.Events.LogEventLevel.Error);
                throw new ManejadorErrores(System.Net.HttpStatusCode.InternalServerError, ex);
            }
        }

        public Variable GetVariableCompletaByName(string name)
        {
            try
            {
                var variable = _repository.GetVariableCompletaByName(name);
                return variable;
            }
            catch (Exception ex)
            {

                Logger.WirteLog("Logica.VariableLogic.GetVariableCompletaByName", ex.Message, Serilog.Events.LogEventLevel.Error);
                throw new ManejadorErrores(System.Net.HttpStatusCode.InternalServerError, ex);
            }
        }

        public CustomTypes.Variable GetVariableById(string IdVariable)
        {
            try
            {
                var idVariable = Guid.Parse(IdVariable);
                var variable = _repository.GetVariableById(idVariable);
                return variable;
            }
            catch (Exception ex)
            {

                Logger.WirteLog("Logica.VariableLogic.GetVariableById", ex.Message, Serilog.Events.LogEventLevel.Error);
                throw new ManejadorErrores(System.Net.HttpStatusCode.InternalServerError, ex);
            }
        }
    }
}
