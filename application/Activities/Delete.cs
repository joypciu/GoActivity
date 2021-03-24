using System;
using System.Threading;
using System.Threading.Tasks;
using application.Core;
using MediatR;
using persistence;

namespace application.Activities
{
    public class Delete
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
        }
        public class Handle : IRequestHandler<Command,Result<Unit>>
        {
            private readonly DataContext _context;
            public Handle(DataContext context)
            {
                _context = context;

            }
            async Task<Result<Unit>> IRequestHandler<Command,Result<Unit>>.Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities.FindAsync(request.Id);
                // if (activity == null) return null;
                _context.Remove(activity);
                var result = await _context.SaveChangesAsync() > 0;
                if(!result) return Result<Unit>.Failure("Failed to delete the activity");
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}