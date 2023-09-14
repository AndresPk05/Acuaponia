using Entities;
using Entities.Alertas;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Model.Metadata
{
    public class AlertaMetadata : IEntityTypeConfiguration<Alerta>
    {
        public void Configure(EntityTypeBuilder<Alerta> builder)
        {
            builder.ToTable("Alertas");
            builder.HasKey(x => x.IdAlerta);
            builder.Property(x => x.Nombre).HasMaxLength(300);
        }
    }
}
