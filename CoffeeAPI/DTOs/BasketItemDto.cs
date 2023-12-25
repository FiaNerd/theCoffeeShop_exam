using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CoffeeAPI.DTOs
{
    public class BasketItemDto
    {
        public Guid ProductId { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public string ImageUrl { get; set; }
        public List<string> Type { get; set; }
        public string RoastLevel { get; set; } 
        public int Quantity { get; set; }
    }
}