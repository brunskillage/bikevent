using MediatR;

namespace Bikevent.Core.handlers;

public class PingRequest : IRequest<PingResponse>
{
    public string Id { get; set; }
}