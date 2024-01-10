using API.Extensions;
using CoffeeAPI.Data;
using CoffeeAPI.Entities;
using CoffeeAPI.Extensions;
using CoffeeAPI.RequestHelpers;
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
        public async Task<ActionResult<PagedList<Product>>> GetProducts([FromQuery]ProductParams productParams)
        {
            System.Diagnostics.Debug.WriteLine($"PageNumber: {productParams.PageNumber}, PageSize: {productParams.PageSize}");

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
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product =  await _context.Products.FindAsync(id);

            if(product == null)
            {
                return NotFound();
            }

            return product;
        }

        // [HttpGet("filters")]
        // public async Task<ActionResult> GetFilters()
        // {
        //   var types = await _context.Products.Select(p => p.Type).Distinct().ToListAsync();
        //   var roastLevel = await _context.Products.Select(p => p.RoastLevel).Distinct().ToListAsync();

        //   return Ok(new {types, roastLevel});
        // }

      [HttpGet("filters")]
      public async Task<ActionResult> GetFilters()
      {
          var products = await _context.Products.ToListAsync();

          var searchTerms = new List<string> { "Bryggkaffe", "Hela bönor",  "Presskaffe",  "Ekologiskt" };

          var filteredProducts = products
              .Where(p => p.Type.Any(term => searchTerms.Contains(term)))
              .ToList();

          var combinedTypes = filteredProducts
              .SelectMany(p => p.Type)
              .Distinct()
              .ToList();

          var roastLevel = products
              .Select(p => p.RoastLevel)
              .Distinct()
              .ToList();

          return Ok(new { type = combinedTypes, roastLevel });
      }

}