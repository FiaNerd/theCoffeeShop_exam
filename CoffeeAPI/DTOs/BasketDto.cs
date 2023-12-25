namespace CoffeeAPI.DTOs
{
    public class BasketDto
    {
        public Guid BasketDtoId { get; set; }
        public Guid BuyerId { get; set; }
        public ICollection<BasketItemDto> Items { get; set; } = new List<BasketItemDto>();
    }

}