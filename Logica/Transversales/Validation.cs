using CustomTypes;
using FluentValidation;

namespace Logica
{
    public class Validation
    {
        public class DisposiivoValidator : AbstractValidator<DispositivoRequest>
        {
            public DisposiivoValidator()
            {
                RuleFor(p=>p.Nombre)
                    .NotEmpty().WithMessage("El nombre del dispositivo es un parametro obligatorio")
                    .NotNull().WithMessage("El nombre del dispositivo es un parametro obligatorio");
            }
        }

        public class UsuarioValidator : AbstractValidator<UsuarioLogin>
        {
            public UsuarioValidator()
            {
                RuleFor(p => p.Email).NotEmpty().WithMessage("El correo no puede estar vacio");
                RuleFor(p => p.Password).NotEmpty().WithMessage("El password no puede estar vacio");
            }
        }

        public class UsuarioRegistroValidator : AbstractValidator<UsuarioRegistro>
        {
            public UsuarioRegistroValidator()
            {
                RuleFor(p => p.Email).NotEmpty().WithMessage("El correo no puede estar vacio");
                RuleFor(p => p.Password).NotEmpty().WithMessage("El password no puede estar vacio");
                RuleFor(p => p.Nombre).NotEmpty().WithMessage("El password no puede estar vacio");
                RuleFor(p => p.Apellido).NotEmpty().WithMessage("El password no puede estar vacio");
            }
        }

        public class LecturaSensorValidator : AbstractValidator<LecturaSensor>
        {
            public LecturaSensorValidator()
            {
                RuleFor(x => x.Valor_Leido).NotEmpty().NotNull();
                RuleFor(x => x.IdDispositivo).NotEmpty().NotNull();
            }
        }

        public class LecturaSensorRequestValidator : AbstractValidator<LecturaSensorRequest>
        {
            public LecturaSensorRequestValidator()
            {
                RuleFor(x => x.FechaInicio).NotEmpty().NotNull();
                RuleFor(x => x.FechaFinal).NotEmpty().NotNull();
                RuleFor(x => x.PageCount).NotEmpty().NotNull();
                RuleFor(x => x.PageSize).NotEmpty().NotNull();
                RuleFor(x => x.IdDispositivo).NotEmpty().NotNull();
            }
        }
    }
}
