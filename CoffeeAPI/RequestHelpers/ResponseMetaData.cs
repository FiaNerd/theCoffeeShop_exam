namespace CoffeeAPI.RequestHelpers
{
    public class ResponseMetaData
    {
        public int CurrentPage { get; set; }
        public int TotalPages { get; set; }
        public int PageSize { get; set; }
        public int TotalCountPages { get; set; }
    }
}