using API.Extensions;
using AutoMapper;
using CoffeeAPI.Data;
using CoffeeAPI.DTOs;
using CoffeeAPI.Entities;
using CoffeeAPI.Extensions;
using CoffeeAPI.RequestHelpers;
using CoffeeAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CoffeeAPI.Controllers;
public class ProductsController : BaseApiController
{
    private readonly StoreContext _context;
    private readonly IMapper _mapper;
    private readonly ImageService _imageService;
    public ProductsController(StoreContext context, IMapper mapper, ImageService imageSevice) 
    {
      _context = context;
      _mapper = mapper;
      _imageService = imageSevice;
      
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


       [HttpGet("{id}", Name="GetProduct")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product =  await _context.Products.FindAsync(id);

            if(product == null)
            {
                return NotFound();
            }

            return product;
        }


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


        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<ActionResult<Product>> CreateProduct([FromForm] CreateProductDto productDto)
        {
            var product = _mapper.Map<Product>(productDto);

            if (productDto.ImageFile != null)
            {
                var imageResult = await _imageService.AddImageAsync(productDto.ImageFile);

                if (imageResult.Error != null) 
                {
                    return BadRequest(new ProblemDetails{ Title = imageResult.Error.Message });
                }

                product.ImageUrl = imageResult.SecureUrl.ToString();
                product.PublicId = imageResult.PublicId;
            }

            _context.Products.Add(product);

            var result = await _context.SaveChangesAsync() > 0;

            if(result)
            {
                return CreatedAtRoute("GetProduct", new { Id = product.Id}, product);
            }
                return BadRequest(new ProblemDetails { Title = "Problem creating a new product"});
        }


        [Authorize(Roles = "Admin")]
        [HttpPut]
        public async Task<ActionResult<Product>> UpdateProduct([FromForm]UpdateProductDto productDto)
        {
            var product = await _context.Products.FindAsync(productDto.Id);

            if (product == null)
            {
                return NotFound();
            }

            _mapper.Map(productDto, product);

            if (productDto.ImageFile != null)
            {
                var imageResult = await _imageService.AddImageAsync(productDto.ImageFile);

                if (imageResult.Error != null) 
                {
                    return BadRequest(new ProblemDetails{ Title = imageResult.Error.Message });
                }

                if(!string.IsNullOrEmpty(product.PublicId))
                {
                    await _imageService.DeleteImageAsync(product.PublicId);
                }

                // Is Success -setting the old picture url to the new one
                product.ImageUrl = imageResult.SecureUrl.ToString();
                // and updating - use the new publicId that is given 
                product.PublicId = imageResult.PublicId;
            }

            var result = await _context.SaveChangesAsync() > 0;

            if (result)
            {
                return Ok(product);
            }

            return BadRequest(new ProblemDetails { Title = "Problem updating product" });
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);

            if (product == null)
            { 
                return NotFound();
            }
            
            _context.Products.Remove(product);

            var result = await _context.SaveChangesAsync() > 0;

            if (result)
            {
                return Ok();
            }

            return BadRequest(new ProblemDetails { Title = "Problem deleting product" });
        }
}