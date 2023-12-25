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

        [HttpGet]
        public async Task<ActionResult<BasketDto>> GetBasketAsync()
        {
            Basket basket = await RetrieveBasket();

            if (basket == null)
            {
                return NotFound();
            }

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

        [HttpPost] // api/basket?productId=1&quantity=2
        public async Task<ActionResult> AddItemToBasketAsync(Guid productId, int quantity)
        {
            var basket = await RetrieveBasket() ?? CreateBasket();

            var product = await _context.Products.FindAsync(productId);

            if(product == null)
            {
                return NotFound();
            }

            basket.AddItem(product, quantity);

            var result = await _context.SaveChangesAsync() > 0;

            if(result)
            {
                return StatusCode(201);
            }

            return BadRequest(new ProblemDetails{ Title = "Problem saving item to basket" });
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

    }
}
