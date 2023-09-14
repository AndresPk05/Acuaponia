using CustomTypes.Alertas;
using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Alertas
{
    public class AlertaRepository : IAlertaRepository
    {
        private readonly AcuoponiDb context;
        public AlertaRepository(AcuoponiDb context)
        {
            this.context = context;
        }

        public bool InsertAlerta(Alerta alerta)
        {
            var entity = new Entities.Alerta
            {
                IdAlerta = alerta.IdAlerta,
                FechaCreacion = alerta.FechaCreacion,
                IdUsuario = alerta.IdUsuario,
                Nombre = alerta.Nombre,
            };

            context.alertas.Add(entity);
            context.SaveChanges();
            return true;
        }
    }
}
