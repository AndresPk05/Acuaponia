using CustomTypes;

namespace Logica
{
    public interface ILoginLogic
    {
        Task<UsuarioData> GetUserLogeado();
        Task<UsuarioData> LoginUser(UsuarioLogin usuario);
        Task SignOutAsync();
    }
}