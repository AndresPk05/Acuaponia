using Entities.Menu;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model.Metadata.Menus
{
    public class IconMetadata : IEntityTypeConfiguration<ICons>
    {
        public void Configure(EntityTypeBuilder<ICons> builder)
        {
            builder.ToTable("Iconos");
            builder.HasKey(x => x.Id_ICons);
            builder.Property(x => x.Name).HasMaxLength(50);
        }
    }
}
