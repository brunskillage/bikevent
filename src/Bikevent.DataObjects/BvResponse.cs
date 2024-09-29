namespace Bikevent.DataObjects
{
    public class BvResponse
    {
        public string Error { get; set; } = String.Empty;
        public bool Success => string.IsNullOrWhiteSpace(Error);
        public object Data { get; set; }
    }
}
