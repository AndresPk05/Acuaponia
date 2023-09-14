using Microsoft.EntityFrameworkCore;
using Model;
using Logica;
using Repository;
using Entities;
using Microsoft.AspNetCore.Identity;
using FluentValidation.AspNetCore;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Authorization;
using System.Reflection;
using Acuoponia.WebApi.Middleware;
using Logica.Usuarios;
using Repository.Alertas;
using Hangfire;
using Hangfire.PostgreSql;
using Resources;
using Repository.Email;
using Logica.TareasAsincronas;
using Acuoponia.WebApi;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(o => o.AddPolicy("corsApp", b =>
 {
     b.AllowAnyMethod().AllowAnyOrigin().AllowAnyHeader();
 }));
// Add services to the container.
builder.Services.AddDbContext<AcuoponiDb>(options => {
    options.UseNpgsql(builder.Configuration.GetConnectionString("AcuoDatabase"));
    });

builder.Services.AddIdentity<Usuario, IdentityRole>()
    .AddEntityFrameworkStores<AcuoponiDb>();
builder.Services.AddControllers( opt =>
{
    var policy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();
    opt.Filters.Add(new AuthorizeFilter(policy));
}
    ).AddFluentValidation(s =>
    {
        s.ImplicitlyValidateChildProperties = true;
        s.ImplicitlyValidateRootCollectionElements = true;
        s.RegisterValidatorsFromAssemblyContaining<Validation>();
});
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<IVariableLogic, VariableLogic>();
builder.Services.AddScoped<IVariableRepository, VariableRepository>();
builder.Services.AddScoped<IDispositivoLogic, DispositivoLogic>();
builder.Services.AddScoped<IDispositivoRepository, DispositivoRepository>();
builder.Services.AddScoped<ILecturaSensorLogic, LecturaSensorLogic>();
builder.Services.AddScoped<ILecturaSensorRepository, LecturaSensorRepository>();
builder.Services.AddScoped<ILoginLogic, LoginLogic>();
builder.Services.AddScoped<IRegistrarUsuarioLogic, RegistrarUsuarioLogic>();
builder.Services.AddScoped<IUsuarioRepository, UsuarioRepository>();
builder.Services.AddScoped<IUsuarioSesion, UsuarioSesion>();
builder.Services.AddScoped<IAlertaLogic, AlertaLogic>();
builder.Services.AddScoped<IAlertaRepository, AlertaRepository>();
builder.Services.AddScoped<IAletaConfiguracionRepository, AletaConfiguracionRepository>();
builder.Services.AddScoped<ISendEmail, SendEmail>();
builder.Services.AddScoped<IEmailRepository, EmailRepository>();
builder.Services.AddScoped<ITareasLogic, TareasLogic>();

builder.Services.TryAddSingleton<ISystemClock, SystemClock>();
var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("4cu0p0ni422**Uni$$"));
builder.Services.AddAuthentication(options => {
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(opt =>
{
    opt.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = key,
        ValidateAudience = false,
        ValidateIssuer = false
    };
});

builder.Services.AddHostedService<TareasBackGroud>();

builder.Services.AddHangfire(x =>
    x.UsePostgreSqlStorage(builder.Configuration.GetConnectionString("AcuoDatabase")));

builder.Services.AddHangfireServer();

var app = builder.Build();

app.UseCors("corsApp");
using (var ambiente = app.Services.CreateScope())
{
    var services = ambiente.ServiceProvider;

    try
    {
        var userManager = services.GetRequiredService<UserManager<Usuario>>();
        var context = services.GetRequiredService<AcuoponiDb>();
        context.Database.Migrate();
        DataPrueba.InsertData(context, userManager).Wait();
    }
    catch (Exception ex)
    {
        var loggin = services.GetRequiredService<ILogger<Program>>();
        loggin.LogError($"Ocurrio un error en la migracion, exccepcion {ex}");
    }
}

app.UseMiddleware<ManejadorErrorMiddleware>();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHangfireDashboard();

app.UseAuthentication();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();