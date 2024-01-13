using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CoffeeAPI.Entities
{

    public class Product
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string BlendDescription { get; set; }
        public string Description { get; set; }
        public string ImageUrl { get; set; }
        public List<string> Type { get; set; }
        public string RoastLevel { get; set; } 
        public int Price { get; set; }
        public int QuantityInStock { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
        public string PublicId { get; set; }
    }
}