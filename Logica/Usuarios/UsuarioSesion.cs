using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Logica.Usuarios
{
    public class UsuarioSesion : IUsuarioSesion
    {
        private readonly IHttpContextAccessor httpContextAccessor;
        public UsuarioSesion(IHttpContextAccessor httpContextAccessor)
        {
            this.httpContextAccessor = httpContextAccessor;
        }

        public ClaimsPrincipal ObtenerUsuarioActual()
        {
            var userName = httpContextAccessor.HttpContext.User;
            return userName;
        }
    }
}
