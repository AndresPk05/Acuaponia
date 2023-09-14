using CustomTypes;

namespace Logica
{
    public interface IRegistrarUsuarioLogic
    {
        Task<UsuarioData> CreateUser(UsuarioRegistro usuario);
    }
}