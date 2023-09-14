using CustomTypes;

namespace Seguridad
{
    public interface ISeguridad<T> where T : IToken
    {
        string CrearToken(T dataToken, bool senDispositivo);
    }
}