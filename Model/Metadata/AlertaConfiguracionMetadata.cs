using Entities.Alertas;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model.Metadata
{
    public class AlertaConfiguracionMetadata : IEntityTypeConfiguration<AlertaConfiguracion>
    {
        public void Configure(EntityTypeBuilder<AlertaConfiguracion> builder)
        {
            builder.ToTable("Alertas_Configuracion");
            builder.HasKey(x => x.Id_AlertaConfiguracion);
            builder.Property(x => x.ValorLumbral).HasMaxLength(100).IsRequired();
            builder.Property(x => x.Condicion).HasMaxLength(5).IsRequired();

            builder.HasOne(x => x.Alerta).WithMany(x => x.configuraciones).HasForeignKey(x => x.IdAlerta).IsRequired();
            builder.HasOne(x => x.Variable).WithMany(x => x.configuraciones).HasForeignKey(x => x.Id_Variable).IsRequired();
        }
    }
}
