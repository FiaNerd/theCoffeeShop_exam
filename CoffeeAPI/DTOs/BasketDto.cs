namespace CoffeeAPI.DTOs
{
    public class BasketDto
    {
        public Guid BasketDtoId { get; set; }
        public Guid BuyerId { get; set; }
        public List<BasketItemDto> Items { get; set; }
    }

}