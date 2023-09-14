using CustomTypes;
using Logica;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Acuoponia.WebApi.Controllers
{
    [Route("Api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class UsuarioController : ControllerBase
    {
        private readonly ILoginLogic _loginLogic;
        private readonly IRegistrarUsuarioLogic _registrarUsuarioLogic;
        public UsuarioController(ILoginLogic loginLogic, IRegistrarUsuarioLogic registrarUsuarioLogic)
        {
            _loginLogic = loginLogic;   
            _registrarUsuarioLogic = registrarUsuarioLogic;
        }

        [HttpPost("login")]
        public async Task<UsuarioData> LoginUser(UsuarioLogin usuario)
        {
            return await _loginLogic.LoginUser(usuario);
        }

        [HttpPost("registrar")]
        public async Task<UsuarioData> RegistrarUser(UsuarioRegistro usuario)
        {
            return await _registrarUsuarioLogic.CreateUser(usuario);
        }
        [HttpGet("usuariologeado")]
        public async Task<UsuarioData> GetUserLogeado()
        {
            return await _loginLogic.GetUserLogeado();  
        }
        [HttpGet("logout")]

        public async Task logout()
        {
            await _loginLogic.SignOutAsync();
        }
    }
}
