using System.Threading;
using System.Threading.Tasks;
using application.Core;
using domain;
using FluentValidation;
using MediatR;
using persistence;

namespace application.Activities
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Activity Activity { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Activity).SetValidator(new ActivityValidator());
            }
        }
        public class Handle : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            public Handle(DataContext context)
            {
                _context = context;

            }

            async Task<Result<Unit>> IRequestHandler<Command, Result<Unit>>.Handle(Command request, CancellationToken cancellationToken)
            {
                _context.Activities.Add(request.Activity);
                var result = await _context.SaveChangesAsync() > 0;
                if(!result) {
                    return Result<Unit>.Failure("Failed to create activity");
                }
                return Result<Unit>.Success(Unit.Value);
            }
           
        }
    }
}