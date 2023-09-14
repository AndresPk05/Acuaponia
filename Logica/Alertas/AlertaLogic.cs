using CustomTypes.Alertas;
using Logica.Transversales;
using Repository;
using Repository.Alertas;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Logica
{
    public class AlertaLogic : IAlertaLogic
    {
        private readonly IAlertaRepository repository;
        private readonly IVariableRepository variableRepository;
        private readonly IAletaConfiguracionRepository aletaConfiguracionRepository;
        public AlertaLogic(IAlertaRepository repository, IVariableRepository variableRepository, IAletaConfiguracionRepository aletaConfiguracionRepository)
        {
            this.repository = repository;
            this.variableRepository = variableRepository;
            this.aletaConfiguracionRepository = aletaConfiguracionRepository;
        }

        public bool InsertAlerta(AlertaRequest request)
        {
            try
            {
                var idAlerta = Guid.NewGuid();
                var fechaCreacion = DateTimeColombiaUtc.GetDateTimeUtcColombia();
                var alerta = new Alerta
                {
                    EmailNotificacion = request.EmailNotificacion,
                    IdAlerta = idAlerta,
                    FechaCreacion = fechaCreacion,
                    Nombre = request.Nombre
                };

                var result = repository.InsertAlerta(alerta);
                InsertAlertaConfiguracionesRange(request.configuraciones, alerta.IdAlerta);
                return true;
            }
            catch (Exception ex)
            {
                Logger.WirteLog("Logica.AlertaLogic.InsertAlerta", ex.Message, Serilog.Events.LogEventLevel.Error);
                throw new ManejadorErrores(System.Net.HttpStatusCode.InternalServerError, ex);
            }
        }

        public bool InsertAlertaConfiguracionesRange(List<AlertaConfiguracionRequest> alerts, Guid idAlerta)
        {
            try
            {
                var alertasEntites = alerts.Select(x => new AlertaConfiguracion
                {
                    Id_Alerta = idAlerta,
                    Id_AlertaConfiguracion = Guid.NewGuid(),
                    Condicion = x.Condicion,
                    ValorLumbral = x.ValorCondicion,
                    Variable = new CustomTypes.Variable { 
                        Id_Variable = variableRepository.GetVariableByName(x.Variable)
                    }
                }).ToList();


                aletaConfiguracionRepository.InsertAlertaConfiguracionesRange(alertasEntites);
                return true;
            }
            catch (Exception ex)
            {

                Logger.WirteLog("Logica.AlertaLogic.InsertAlerta", ex.Message, Serilog.Events.LogEventLevel.Error);
                throw new ManejadorErrores(System.Net.HttpStatusCode.InternalServerError, ex);
            }
        }
    }
}
