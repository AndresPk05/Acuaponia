using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository
{
    public class UsuarioRepository : IUsuarioRepository
    {
        private readonly AcuoponiDb _ctx;
        public UsuarioRepository(AcuoponiDb ctx)
        {
            this._ctx = ctx;
        }

        public bool ValidateExistUser(string Email)
        {
            return _ctx.Users.Any(x => x.Email == Email);
        }
    }
}
