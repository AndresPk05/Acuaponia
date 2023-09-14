using Entities.Email;
using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Email
{
    public class EmailRepository : IEmailRepository
    {
        private readonly AcuoponiDb context;
        public EmailRepository(AcuoponiDb context)
        {
            this.context = context;
        }

        public EmailApiCredentials getEmailCredentials()
        {
            var query = from email in context.emailApiCredentials
                        select new EmailApiCredentials
                        {
                            Id_EmailApiCredentials = email.Id_EmailApiCredentials,
                            ApiKey = email.ApiKey,
                            ServidorSmtp = email.ServidorSmtp,
                            UserName = email.UserName,
                            Puerto = email.Puerto
                        };
            return query.FirstOrDefault();
        }
    }
}
