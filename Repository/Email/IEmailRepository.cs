using Entities.Email;

namespace Repository.Email
{
    public interface IEmailRepository
    {
        EmailApiCredentials getEmailCredentials();
    }
}