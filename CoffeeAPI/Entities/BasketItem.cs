using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CoffeeAPI.Entities
{
    [Table("BasketItems")]
    public class BasketItem
    {
        [Key]
        public Guid Id { get; set; }
        public int Quantity { get; set; }
        
        // Navigation properties
        public Guid ProductId { get; set; }

        public Product Product { get; set; }

        public Guid BasketId { get; set; }
        public Basket Basket { get; set; }
    }
}