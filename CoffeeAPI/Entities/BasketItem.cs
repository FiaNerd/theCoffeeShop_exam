using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CoffeeAPI.Entities
{
    public class BasketItem
    {
     public int Id { get; set; }
     public int Quantity { get; set; }
     
     // Navigation properties
     public int ProductId { get; set; }

     public Product  Product { get; set; }
    }
}