using Entities;
using Microsoft.EntityFrameworkCore;
using Model;

namespace Repository
{
    public class DispositivoRepository : IDispositivoRepository
    {
        private readonly AcuoponiDb _ctx;
        public DispositivoRepository(AcuoponiDb ctx)
        {
            this._ctx = ctx;
        }

        public Task<List<Dispositivo>> GetAll()
        {
            return _ctx.dispositivos.ToListAsync();
        }

        public bool Create(CustomTypes.Dispositivo dispositivo)
        {
            var entity = new Dispositivo
            {
                FechaInscripcion = dispositivo.FechaInscripcion,
                IdDispositivo = dispositivo.IdDispositivo,
                Nombre = dispositivo.Nombre,
                Token = dispositivo.Token
            };

            _ctx.dispositivos.Add(entity);
            return _ctx.SaveChanges() > 0;
        }

        public bool ExistDispositivoByName(string Name)
        {
            return _ctx.dispositivos.Any(x => x.Nombre == Name);
        }

        public List<CustomTypes.Dispositivo> GetDispositivosSinRegistrosRecientes(IList<Guid> idsDispositivos)
        {
            var query = from di in _ctx.dispositivos
                        where !idsDispositivos.Contains(di.IdDispositivo)
                        select new CustomTypes.Dispositivo
                        {
                            Nombre = di.Nombre
                        };
            return query.ToList();
        }
    }
}
