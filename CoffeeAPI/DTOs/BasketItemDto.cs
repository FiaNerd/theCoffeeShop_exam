namespace CoffeeAPI.DTOs
{
    public class BasketItemDto
    {
        public int ProductId { get; set; }
        public string Name { get; set; }
        public int Price { get; set; }
        public string ImageUrl { get; set; }
        public List<string> Type { get; set; }
        public string RoastLevel { get; set; } 
        public int Quantity { get; set; }
    }
}