using CustomTypes.Alertas;
using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Alertas
{
    public class AletaConfiguracionRepository : IAletaConfiguracionRepository
    {
        private readonly AcuoponiDb context;
        public AletaConfiguracionRepository(AcuoponiDb context)
        {
            this.context = context;
        }

        public bool InsertAlertaConfiguracionesRange(List<AlertaConfiguracion> alerts)
        {
            var entities = alerts.Select(x => new Entities.Alertas.AlertaConfiguracion
            {
                Id_AlertaConfiguracion = x.Id_AlertaConfiguracion,
                Condicion = x.Condicion,
                ValorLumbral = x.ValorLumbral,
                IdAlerta = x.Id_Alerta,
                Id_Variable = x.Variable.Id_Variable
            }).ToList();

            context.alertaConfiguraciones.AddRange(entities);
            context.SaveChanges();
            return true;
        }

        public List<Alerta> GetAlertasConfiguradas()
        {
            var query = from al in context.alertas
                        join alc in context.alertaConfiguraciones on al.IdAlerta equals alc.IdAlerta
                        select new Alerta
                        {
                            IdAlerta = al.IdAlerta,
                            configuraciones = al.configuraciones.Select(x=> new AlertaConfiguracion
                                {
                                    Id_AlertaConfiguracion = alc.Id_AlertaConfiguracion,
                                    Condicion = alc.Condicion,
                                    ValorLumbral = alc.ValorLumbral,
                                    Variable = new CustomTypes.Variable
                                    {
                                        Id_Variable = alc.Variable.Id_Variable,
                                        Nombre = alc.Variable.Nombre
                                    }
                                }
                            ).ToList() 
                        };
            return query.ToList();
        }
    }
}
