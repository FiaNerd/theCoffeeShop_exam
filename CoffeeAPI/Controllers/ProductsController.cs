using System.Text.Json;
using API.Extensions;
using CoffeeAPI.Data;
using CoffeeAPI.Entities;
using CoffeeAPI.Extensions;
using CoffeeAPI.RequestHelpers;
using Microsoft.AspNetCore.Mvc;

namespace CoffeeAPI.Controllers;
public class ProductsController : BaseApiController
{
    private readonly StoreContext _context;
    public ProductsController(StoreContext context) 
    {
      _context = context;
      
    }

    [HttpGet]
public async Task<ActionResult<PagedList<Product>>> GetProducts([FromQuery]ProductParams productParams)
{
    var query = _context.Products
        .Sort(productParams.OrderBy)
        .Search(productParams.SearchTerm)
        .Filter(productParams.Types, productParams.RoastLevels)
        .AsQueryable();
    
        var products = await PagedList<Product>.ToPagedList(query, 
            productParams.PageNumber, 
            productParams.PageSize);

          Response.AddPaginationHeader(products.ResponseMetaData);
          
        return products;
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
