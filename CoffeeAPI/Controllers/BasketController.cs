using CoffeeAPI.Controllers;
using CoffeeAPI.Data;
using CoffeeAPI.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CoffeeAPI.Entities
{
    public class BasketController: BaseApiController
    {   
        private readonly StoreContext _context;

        public BasketController(StoreContext context)
        {
             _context = context;
        }

        [HttpGet(Name = "GetBasket")]
        public async Task<ActionResult<BasketDto>> GetBasketAsync()
        {
            Basket basket = await RetrieveBasket();

            if (basket == null)
            {
                return NotFound();
            }

            return ResponseMapBasketToDto(basket);
        }


        [HttpPost] // api/basket?productId=1&quantity=2
        public async Task<ActionResult<BasketDto>> AddItemToBasket(Guid productId, int quantity)
        {
            var basket = await RetrieveBasket() ?? CreateBasket();

            if (quantity < 0)
            {
                // Negative quantity is not allowed
                return BadRequest(new ProblemDetails { Title = "Quantity must be non-negative." });
            }

            var product = await _context.Products.FindAsync(productId);

            if(product == null)
            {
                return NotFound();
            }

            basket.AddItem(product, quantity);

            var result = await _context.SaveChangesAsync() > 0;

            if(result)
            {
                // Add loaction header to the response
                return CreatedAtRoute("GetBasket", ResponseMapBasketToDto(basket));
            }

            return BadRequest(new ProblemDetails{ Title = "Problem saving item to basket" });
        }


        [HttpDelete]
        public async Task<ActionResult<BasketDto>> RemoveBasketItem(Guid productId, int quantity)
        {
            if (quantity <= 0)
            {
                // Negative quantity is not allowed
                return BadRequest(new ProblemDetails { Title = "Quantity must be non-negative." });
            }

            // Get basket from basket methods
            var basket = await RetrieveBasket();

            if (basket == null)
            {
                return NotFound();
            }

            // Remove item from basket and reduce quantity
            basket.RemoveItem(productId, quantity);

            // Save changes
            var result = await _context.SaveChangesAsync() > 0;

            if (result)
            {
                return Ok();
            }

            return BadRequest(new ProblemDetails { Title = "Problem removing item from the basket" });
        }



        private async Task<Basket> RetrieveBasket()
        {
            var buyerIdString = Request.Cookies["buyerId"];

            if (Guid.TryParse(buyerIdString, out Guid buyerIdGuid))
            {
                return await _context.Baskets
                                .Include(i => i.Items)
                                .ThenInclude(p => p.Product)
                                .FirstOrDefaultAsync(x => x.BuyerId == buyerIdGuid);
            }

            return null;
        }

        private Basket CreateBasket()
        {
            var buyerId = Guid.NewGuid().ToString();

            var cookieOptions = new CookieOptions
            {
                IsEssential = true,
                Expires = DateTime.Now.AddDays(30)
            };

            Response.Cookies.Append("buyerId", buyerId, cookieOptions);

            var basket = new Basket
            {
                BuyerId = new Guid(buyerId)
            };

            _context.Baskets.Add(basket);

            return basket;
        }

         private BasketDto ResponseMapBasketToDto(Basket basket)
        {
            return new BasketDto
            {
                BasketDtoId = basket.BasketId,
                BuyerId = basket.BuyerId,
                Items = basket.Items.Select(item => new BasketItemDto
                {
                    ProductId = item.ProductId,
                    Name = item.Product.Name,
                    Price = item.Product.Price,
                    ImageUrl = item.Product.ImageUrl,
                    Type = item.Product.Type,
                    RoastLevel = item.Product.RoastLevel,
                    Quantity = item.Quantity
                }).ToList()
            };
        } 

    }
}
