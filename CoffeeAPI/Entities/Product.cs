using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CoffeeAPI.Entities
{
    public class Product
    {
        public Guid ProductId { get; set; }
        public string Name { get; set; }
        public string BlendDescription { get; set; }
        public string Description { get; set; }
        public string ImageUrl { get; set; }
        public List<string> Type { get; set; }
        public string RoastLevel { get; set; }
        public decimal Amount { get; set; }
        public int QuantityInStock { get; set; }
    }
}