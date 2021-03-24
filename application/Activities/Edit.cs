using System.Threading;
using System.Threading.Tasks;
using application.Core;
using AutoMapper;
using domain;
using FluentValidation;
using MediatR;
using persistence;

namespace application.Activities
{
    public class Edit
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

        public class Handle : IRequestHandler<Command,Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handle(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }
            async Task<Result<Unit>> IRequestHandler<Command, Result<Unit>>.Handle(Command request, CancellationToken cancellationToken)
            {
                // _context.Activities.Update(request.Activity);
                var activity =  await _context.Activities.FindAsync(request.Activity.Id);
                // activity.Title = request.Activity.Title ??= activity.Title;
                if(activity == null) return null;
                _mapper.Map(request.Activity,activity);
                var result = await _context.SaveChangesAsync() > 0;
                if(!result) return Result<Unit>.Failure("Failed to update/edit activity");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}