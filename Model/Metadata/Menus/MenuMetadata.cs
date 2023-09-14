using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model.Metadata.Menu
{
    public class MenuMetadata : IEntityTypeConfiguration<Entities.Menu.Menu>
    {
        public void Configure(Microsoft.EntityFrameworkCore.Metadata.Builders.EntityTypeBuilder<Entities.Menu.Menu> builder)
        {
            builder.ToTable("Menus");
            builder.HasKey(x => x.Id_Menu);
            builder.Property(x => x.Titulo).HasMaxLength(50);
            builder.Property(x => x.Path).HasMaxLength(100);
            builder.Property(x => x.Descripcion).HasMaxLength(250);

            builder.HasOne(x => x.Icono).WithMany(x => x.Menus).HasForeignKey(x => x.Id_ICons);
        }
    }
}
