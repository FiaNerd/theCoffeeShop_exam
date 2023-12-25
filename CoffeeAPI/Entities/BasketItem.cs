namespace CoffeeAPI.Entities
{
    public class BasketItem
    {
     public Guid ItemId { get; set; }
     public int Quantity { get; set; }
     
     // Navigation properties
     public Guid ProductId { get; set; }

     public Product  Product { get; set; }
    }
}