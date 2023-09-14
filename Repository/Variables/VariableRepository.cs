using Entities;
using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository
{
    public class VariableRepository : IVariableRepository
    {
        private readonly AcuoponiDb _ctx;
        public VariableRepository(AcuoponiDb ctx)
        {
            this._ctx = ctx;
        }

        public bool Create(CustomTypes.Variable variable)
        {
            var entity = new Variable
            {
                Id_Variable = variable.Id_Variable,
                Fecha_Registro = variable.Fecha_Registro,
                Nombre = variable.Nombre,
                MaximoValor = variable.MaximoValor
            };

            _ctx.variables.Add(entity);
            return _ctx.SaveChanges() > 0;
        }

        public List<CustomTypes.Variable> GetVariablesRegistradas()
        {
            var query = _ctx.variables.Select(x => new CustomTypes.Variable
            {
                Id_Variable = x.Id_Variable,
                Nombre = x.Nombre,
                Fecha_Registro = x.Fecha_Registro
            }).ToList();

            return query;
        }

        public bool ExistVariableWithName(string Name)
        {
            return _ctx.variables.Any(x => x.Nombre == Name);
        }

        public Guid GetVariableByName(string name)
        {
            var query = _ctx.variables
                .Where(x => x.Nombre == name)
                .Select(x => x.Id_Variable)
                .FirstOrDefault();

            return query;
        }

        public CustomTypes.Variable GetVariableCompletaByName(string name)
        {
            var query = _ctx.variables.Where(x=> x.Nombre == name).Select(x => new CustomTypes.Variable{ 
                Id_Variable = x.Id_Variable,
                Nombre = x.Nombre
            
            }).FirstOrDefault();

            return query;
        }

        public CustomTypes.Variable GetVariableById(Guid IdVariable)
        {
            var query = _ctx.variables.Where(x=> x.Id_Variable == IdVariable).Select(x => new CustomTypes.Variable
            {
                Id_Variable = x.Id_Variable,
                Nombre = x.Nombre

            }).FirstOrDefault();

            return query;
        }
    }
}
