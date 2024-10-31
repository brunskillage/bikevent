using MediatR;

namespace Bikevent.Core.handlers;

public class PingHandler : IRequestHandler<PingRequest, PingResponse>
{
    public Task<PingResponse> Handle(PingRequest request, CancellationToken cancellationToken)
    {
        return Task.FromResult(new PingResponse { Date = DateTime.Now, Message = "Pong!" });
    }
}