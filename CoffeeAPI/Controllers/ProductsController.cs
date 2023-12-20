using CoffeeAPI.Data;
using CoffeeAPI.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CoffeeAPI.Controllers;
public class ProductsController : BaseApiController
{
    private readonly StoreContext _context;
    public ProductsController(StoreContext context) 
    {
      _context = context;
      
    }

    [HttpGet]     
    public async Task<ActionResult<List<Product>>> GetProducts()
     {
      var products = await _context.Products.ToListAsync();

      if(products == null || products.Count == 0)
      {
        return NotFound();
      }

      return Ok(products);
     }
}
