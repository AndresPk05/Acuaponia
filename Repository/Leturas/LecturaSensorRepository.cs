using CustomTypes;
using Dapper;
using Microsoft.EntityFrameworkCore;
using Model;
using Npgsql;
using System.Configuration;

namespace Repository
{
    public class LecturaSensorRepository : ILecturaSensorRepository
    {
        private readonly AcuoponiDb _ctx;
        public LecturaSensorRepository(AcuoponiDb ctx)
        {
            this._ctx = ctx;
        }

        public void InsertLecturaSensor(LecturaSensor lecturaSensor)
        {
            var entity = new Entities.LecturaSensor
            {
                IdLecturaSensor = lecturaSensor.Id,
                Valor_Lectura = lecturaSensor.Valor_Leido,
                IdDispositivo = lecturaSensor.IdDispositivo,
                FechaLectura = lecturaSensor.FechaLectura,
                IdVariable = lecturaSensor.IdVariable
            };

            _ctx.lecturaSensores.Add(entity);
            _ctx.SaveChanges();
        }

        public List<LecturaSensor> GetLecturasByDispostivoAndFecha(Guid IdDispostivo, LecturaSensorRequest request)
        {
            var start = request.FechaInicio.ToUniversalTime();
            var end = request.FechaFinal.ToUniversalTime();
            var query = _ctx.lecturaSensores.Where(x => x.IdDispositivo == IdDispostivo &&
            (x.FechaLectura >= start && x.FechaLectura <= end))
                .Select(x => new LecturaSensor
                {
                    Id = x.IdLecturaSensor,
                    IdDispositivo = x.IdDispositivo,
                    IdVariable = x.IdVariable,
                    Valor_Leido = x.Valor_Lectura
                });
            request.RowCount = query.Count();
            var result = query;
            return result.Skip(((request.PageCount - 1) * request.PageSize))
                .Take(request.PageSize)
                .ToList();
        }


        public List<LecturaSensor> GetLecturasByDispostivoFechaVariable(Guid IdDispositivo, LecturaSensorRequest request, Guid IdVariable)
        {
            var start = request.FechaInicio.ToUniversalTime();
            var end = request.FechaFinal.ToUniversalTime();
            var query = _ctx.lecturaSensores
                .FromSqlRaw($@"SELECT *
                            FROM public.""LecturaSensores""
                            WHERE CAST(public.""LecturaSensores"".""FechaLectura"" AS DATE) >= '{start.ToString("dd-MM-yyyy")}'
                            AND CAST(public.""LecturaSensores"".""FechaLectura"" AS DATE) <= '{end.ToString("dd-MM-yyyy")}'
                            AND public.""LecturaSensores"".""IdDispositivo"" = '{IdDispositivo}'
                            AND public.""LecturaSensores"".""IdVariable"" = '{IdVariable}'");
            var result = query.Select(x=> new LecturaSensor
            {
                Id = x.IdLecturaSensor,
                FechaLectura = x.FechaLectura,
                IdDispositivo = x.IdDispositivo,
                IdVariable = x.IdVariable,
                Valor_Leido = x.Valor_Lectura
            });

            return result.ToList();
        }

        public List<Dispositivo> GetDispositivosConRegistrosRecientes(DateTime fecha)
        {
            var query = from le in _ctx.lecturaSensores
                        join di in _ctx.dispositivos on le.IdDispositivo equals di.IdDispositivo
                        where le.FechaLectura > fecha
                        select new Dispositivo
                        {
                            IdDispositivo = di.IdDispositivo
                        };

            return query.Distinct().ToList();
        }

        public List<Dispositivo> GetDispositivosConAlertas(string query)
        {
            var conexion = _ctx.Database.GetDbConnection().ConnectionString;
            conexion += ";Password=123456";
            using (var conection = new NpgsqlConnection(conexion))
            {
                var result = conection.Query<Dispositivo>(query);
                return result.ToList();
            }
        }

        public decimal GetMaximoValorByVariableDispostivo(Guid IdDispositivo, Guid IdVariable, DateTime FechaBuscar)
        {
            var query = _ctx.lecturaSensores
                .FromSqlRaw($@"SELECT *
                            FROM public.""LecturaSensores""
                            WHERE CAST(public.""LecturaSensores"".""FechaLectura"" AS DATE) = '{FechaBuscar.ToString("dd-MM-yyyy")}'
                            AND public.""LecturaSensores"".""IdDispositivo"" = '{IdDispositivo}'
                            AND public.""LecturaSensores"".""IdVariable"" = '{IdVariable}'");
            var result = query.ToList();
            return result.Any() ? result.Max(x => x.Valor_Lectura) : 0;
        }

        public List<Guid> GetIdVariablesByDispositivo(Guid IdDispositivo)
        {
            var query = _ctx.lecturaSensores.Where(x=> x.IdDispositivo == IdDispositivo).Select(x=> x.IdVariable).Distinct().ToList();
            return query;
        }
    }
}
