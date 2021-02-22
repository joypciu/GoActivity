using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using persistence;

namespace application.Activities
{
    public class Delete
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
        }
        public class Handle : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handle(DataContext context)
            {
                _context = context;

            }
            async Task<Unit> IRequestHandler<Command, Unit>.Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities.FindAsync(request.Id);
                _context.Remove(activity);
                await _context.SaveChangesAsync();
                return Unit.Value;
            }
        }
    }
}