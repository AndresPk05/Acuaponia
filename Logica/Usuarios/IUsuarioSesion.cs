using System.Security.Claims;

namespace Logica.Usuarios
{
    public interface IUsuarioSesion
    {
        ClaimsPrincipal ObtenerUsuarioActual();
    }
}