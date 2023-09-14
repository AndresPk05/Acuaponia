using Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model.Metadata
{
    public class VariableMetadata : IEntityTypeConfiguration<Variable>
    {
        public void Configure(EntityTypeBuilder<Variable> builder)
        {
            builder.ToTable("Variables");
            builder.HasKey(x => x.Id_Variable);
            builder.Property(x => x.Nombre).HasMaxLength(50);

            
        }
    }
}
