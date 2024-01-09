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
            Basket basket = await RetrieveBasket(GetBuyerId());

            if (basket == null)
            {
                return NotFound();
            }

            return basket.ResponseMapBasketToDto(basket);
        }


        [HttpPost] // api/basket?productId=1&quantity=2
        public async Task<ActionResult<BasketDto>> AddItemToBasket(Guid productId, int quantity = 1)
        {
            var basket = await RetrieveBasket(GetBuyerId()) ?? CreateBasket();

            if (quantity < 0)
            {
                // Negative quantity is not allowed
                return BadRequest(new ProblemDetails { Title = "Quantity must be non-negative." });
            }

            var product = await _context.Products.FindAsync(productId);

            if(product == null)
            {
                return BadRequest(new ProblemDetails{Title = "Product Not Found"});
            }

            basket.AddItem(product, quantity);

            var result = await _context.SaveChangesAsync() > 0;

            if(result)
            {
                // Add loaction header to the response
                return CreatedAtRoute("GetBasket", basket.ResponseMapBasketToDto());
            }

            return BadRequest(new ProblemDetails{ Title = "Problem saving item to basket" });
        }


        [HttpDelete]
        public async Task<ActionResult> RemoveBasketItem(Guid productId, int quantity = 1)
        {
            try
            {
                if (quantity <= 0)
                {
                    // Negative quantity is not allowed
                    return BadRequest(new ProblemDetails { Title = "Quantity must be non-negative." });
                }

                // Get basket from basket methods
                var basket = await RetrieveBasket(GetBuyerId());

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
                else
                {
                    return BadRequest(new ProblemDetails { Title = "Unable to save changes to the database." });
                }
            }
            catch (Exception ex)
            {

                    var problemDetails = new Microsoft.AspNetCore.Mvc.ProblemDetails
                    {
                        Title = "Problem removing item from the basket",
                        Detail = ex.Message, 
                        Status = 400
                    };    
                        return BadRequest(new ProblemDetails { Title = "Problem removing item from the basket", Detail = ex.Message });

                    return BadRequest(problemDetails);
            }
        }


        private async Task<Basket> RetrieveBasket(string buyerId)
        {
            if (string.IsNullOrEmpty(buyerId))
            {
                Response.Cookies.Delete("buyerId");
                return null;
            }

            return await _context.Baskets
                .Include(i => i.Items)
                .ThenInclude(p => p.Product)
                .FirstOrDefaultAsync(basket => basket.BuyerId == buyerId);
        }


        private string GetBuyerId()
        {
            return User.Identity?.Name ?? Request.Cookies["buyerId"];
        }


         private Basket CreateBasket()
        {
            var buyerId = User.Identity?.Name;

            if (string.IsNullOrEmpty(buyerId))
            {
                buyerId = Guid.NewGuid().ToString();
                var cookieOptions = new CookieOptions { IsEssential = true, Expires = DateTime.Now.AddDays(30) };
                Response.Cookies.Append("buyerId", buyerId, cookieOptions);
            }

            var basket = new Basket { BuyerId = buyerId };
            _context.Baskets.Add(basket);
            return basket;
        }
    }
}
