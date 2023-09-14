namespace Repository
{
    public interface IUsuarioRepository
    {
        bool ValidateExistUser(string Email);
    }
}