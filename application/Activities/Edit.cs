using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using domain;
using MediatR;
using persistence;

namespace application.Activities
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Activity Activity { get; set; }
        }

        public class Handle : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handle(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }
            async Task<Unit> IRequestHandler<Command, Unit>.Handle(Command request, CancellationToken cancellationToken)
            {
                // _context.Activities.Update(request.Activity);
                var activity =  await _context.Activities.FindAsync(request.Activity.Id);
                // activity.Title = request.Activity.Title ??= activity.Title;
                _mapper.Map(request.Activity,activity);
                await _context.SaveChangesAsync();
                return Unit.Value;
            }
        }
    }
}