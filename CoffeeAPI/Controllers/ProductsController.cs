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
public async Task<ActionResult<List<Product>>> GetProducts(string orderBy)
{
    var query = _context.Products.AsQueryable();

    var productList = await query.ToListAsync();

    switch (orderBy)
    {
        case "price":
            productList = productList.OrderBy(p => p.Price).ToList();
            break;
        case "priceDesc":
            productList = productList.OrderByDescending(p => p.Price).ToList();
            break;
        default:
            productList = productList.OrderByDescending(p => p.Name).ToList();
            break;
    }

    return productList;
}



       [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(Guid id)
        {
            var product =  await _context.Products.FindAsync(id);

            if(product == null)
            {
                return NotFound();
            }

            return product;
        }
}
