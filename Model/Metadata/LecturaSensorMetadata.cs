using Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Model.Metadata
{
    public class LecturaSensorMetadata : IEntityTypeConfiguration<LecturaSensor>
    {
        public void Configure(EntityTypeBuilder<LecturaSensor> builder)
        {
            builder.ToTable("LecturaSensores");
            builder.HasKey(x => x.IdLecturaSensor);
            builder.HasOne(x => x.dispositivo)
                .WithMany(x => x.Lecturas)
                .HasForeignKey(x => x.IdDispositivo).OnDelete(DeleteBehavior.Restrict);
            builder.HasOne(x => x.variable)
                .WithMany(x => x.Lecturas)
                .HasForeignKey(x => x.IdVariable).OnDelete(DeleteBehavior.Restrict);
        }
    }
}
