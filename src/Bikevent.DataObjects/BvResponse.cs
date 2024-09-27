namespace Bikevent.DataObjects
{
    public class BvResponse<T>
    {
        public string Error { get; set; }
        public bool Success => !string.IsNullOrWhiteSpace(Error);
        public T? Data { get; set; }
    }
}
