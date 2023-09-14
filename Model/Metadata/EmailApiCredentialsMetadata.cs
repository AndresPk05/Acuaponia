using Entities.Email;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model.Metadata
{
    public class EmailApiCredentialsMetadata : IEntityTypeConfiguration<EmailApiCredentials>
    {
        public void Configure(EntityTypeBuilder<EmailApiCredentials> builder)
        {
            builder.ToTable("Email_Credenciales_Api");
            builder.HasKey(x => x.Id_EmailApiCredentials);
        }
    }
}
