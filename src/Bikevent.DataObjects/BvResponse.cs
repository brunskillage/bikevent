namespace Bikevent.DataObjects
{
    public class BvResponse
    {
        public string Error => string.Empty;
        public bool Success => string.IsNullOrWhiteSpace(Error);
        public object Data { get; set; }
    }
}
