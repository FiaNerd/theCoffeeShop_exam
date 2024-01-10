using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CoffeeAPI.Entities
{
    [Table("BasketItems")]
    public class BasketItem
    {
        [Key]
        public int Id { get; set; }
        public int Quantity { get; set; }
        
        // Navigation properties
        public int ProductId { get; set; }

        public Product Product { get; set; }

        public int BasketId { get; set; }
        public Basket Basket { get; set; }
    }
}