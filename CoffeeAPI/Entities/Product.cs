using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static System.Guid;


namespace CoffeeAPI.Entities
{
   public enum RoastLevel
{   
    LättRost,
    Mellanrost,
    Mörkrost

}
    public class Product
    {
        public Guid ProductId { get; set; }
        public string Name { get; set; }
        public string BlendDescription { get; set; }
        public string Description { get; set; }
        public string ImageUrl { get; set; }
        public List<string> Type { get; set; }
        public RoastLevel RoastLevel { get; set; }
        public decimal Price { get; set; }
        public int QuantityInStock { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
    }
}