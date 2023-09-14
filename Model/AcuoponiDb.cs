using Entities;
using Entities.Alertas;
using Entities.Email;
using Entities.Menu;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Model.Metadata;
using Model.Metadata.Menu;
using Model.Metadata.Menus;

namespace Model
{
    public class AcuoponiDb : IdentityDbContext<Usuario>
    {
        public AcuoponiDb(DbContextOptions<AcuoponiDb> options) : base(options) {
            AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
        }

        public DbSet<Dispositivo> dispositivos {get;set;}
        public DbSet<LecturaSensor> lecturaSensores { get; set; }
        public DbSet<Alerta> alertas { get; set; }
        public DbSet<Usuario> usuarios { get; set; }
        public DbSet<Variable> variables { get; set; }
        public DbSet<AlertaConfiguracion> alertaConfiguraciones { get; set; }
        public DbSet<Entities.Menu.Menu> Menus { get; set; }
        public DbSet<ICons> Iconos { get; set; }
        public DbSet<EmailApiCredentials> emailApiCredentials { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.ApplyConfiguration(new DispositivoMetadata());
            modelBuilder.ApplyConfiguration(new LecturaSensorMetadata());
            modelBuilder.ApplyConfiguration(new AlertaMetadata());
            modelBuilder.ApplyConfiguration(new VariableMetadata());
            modelBuilder.ApplyConfiguration(new AlertaConfiguracionMetadata());
            modelBuilder.ApplyConfiguration(new MenuMetadata());
            modelBuilder.ApplyConfiguration(new IconMetadata());
            modelBuilder.ApplyConfiguration(new EmailApiCredentialsMetadata());
        }
    }
}
