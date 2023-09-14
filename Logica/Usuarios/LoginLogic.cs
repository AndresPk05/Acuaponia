using CustomTypes;
using Entities;
using Logica.Usuarios;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Seguridad;
using System.Security.Claims;

namespace Logica
{
    public class LoginLogic : ILoginLogic
    {
        private readonly UserManager<Usuario> _userManager;
        private readonly SignInManager<Usuario> _signInManager;
        private readonly IUsuarioSesion _usuarioSesion;
        private readonly IHttpContextAccessor httpContextAccessor;
        public LoginLogic(UserManager<Usuario> userManager, SignInManager<Usuario> singInManager, IUsuarioSesion usuarioSesion, IHttpContextAccessor httpContextAccessor)
        {
            _userManager = userManager;
            _signInManager = singInManager;
            _usuarioSesion = usuarioSesion;
            this.httpContextAccessor = httpContextAccessor;
        }

        public async Task<UsuarioData> LoginUser(UsuarioLogin usuario)
        {
            try
            {
                
                var resultUsuario = await _userManager.FindByEmailAsync(usuario.Email);
                if (resultUsuario == null) throw new ManejadorErrores(System.Net.HttpStatusCode.Unauthorized);
                
                var resultCkeckPassword = await _signInManager.CheckPasswordSignInAsync(resultUsuario, usuario.Password, false);
                if (resultCkeckPassword.Succeeded)
                {
                    return new UsuarioData {
                        NombreCompleto = resultUsuario.NombreCompleto,
                        Email = resultUsuario.Email,
                        Token = new SeguridadToken<User>().CrearToken(new User { Name = resultUsuario.NombreCompleto}, false)
                    };
                }

                throw new ManejadorErrores(System.Net.HttpStatusCode.Unauthorized);
            }
            catch (Exception ex)
            {

                throw new ManejadorErrores(System.Net.HttpStatusCode.InternalServerError, ex);
            }
        }

        public async Task<UsuarioData> GetUserLogeado()
        {
            try
            {
                var usuarioAutenticado = httpContextAccessor.HttpContext?.User?.Identity?.IsAuthenticated;
                if (!(usuarioAutenticado ?? false)) return null;
                var nombreUsuario = httpContextAccessor.HttpContext?.User?.Claims.FirstOrDefault(x=> x.Type == ClaimTypes.NameIdentifier)?.Value;
                if (nombreUsuario == null) return null;
                return new UsuarioData
                {
                    NombreCompleto = nombreUsuario,
                    Token = new SeguridadToken<User>().CrearToken(new User { Name = nombreUsuario }, false)
                };
            }
            catch (Exception ex)
            {
                throw new ManejadorErrores(System.Net.HttpStatusCode.InternalServerError, ex);
                throw;
            }
        }

        public async Task SignOutAsync()
        {
            await _signInManager.SignOutAsync();
        }
    }
}
