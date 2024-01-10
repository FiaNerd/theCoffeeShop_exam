using CoffeeAPI.Entities.OrderAggregate;

namespace CoffeeAPI.DTOs
{
    public class CreateOrderDto
    {
        public bool SaveAddress {get; set; }
        public ShippingAddress ShippingAddress { get; set; }
    }
    
}