using CoffeeAPI.Controllers;
using CoffeeAPI.Data;
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
        public async Task<ActionResult<Basket>> GetBasket()
        {
            var basket = await _context.Baskets
                .Include(i => i.Items)
                .ThenInclude(p => p.Product)
                .FirstOrDefaultAsync(x => x.BuyerId == Request.Cookies["buyerId"]);
            
            if(basket == null)
            {
                return NotFound();
            }

            return basket;
        }
    }
}