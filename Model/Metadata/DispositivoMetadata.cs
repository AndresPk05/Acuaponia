using Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Model.Metadata
{
    public class DispositivoMetadata : IEntityTypeConfiguration<Dispositivo>
    {
        public void Configure(EntityTypeBuilder<Dispositivo> builder)
        {
            builder.ToTable("Dispositivos");
            builder.HasKey(x => x.IdDispositivo);
            builder.Property(x => x.Nombre).HasMaxLength(250);
            builder.Property(x => x.Token).HasMaxLength(1000);
        }
    }
}
