using CoffeeAPI.Data;
using CoffeeAPI.DTOs;
using CoffeeAPI.Entities;
using CoffeeAPI.Entities.OrderAggregate;
using CoffeeAPI.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CoffeeAPI.Controllers
{
    [Authorize]
    public class OrdersController : BaseApiController
    {
        private readonly StoreContext _context;

        public OrdersController(StoreContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Order>>> GetOrders()
        {
            var orders = await _context.Orders
                .Include(o => o.OrderItems)
                .Where(x => x.BuyerId == User.Identity.Name)
                .ToListAsync();

            return orders;
        }

        [HttpGet("{id}", Name = "GetOrder")]
        public async Task<ActionResult<Order>> GetOrder(int id)
        {
            return await _context.Orders
                .Include(x => x.OrderItems)
                .Where(x => x.BuyerId == User.Identity.Name && x.Id == id)
                .FirstOrDefaultAsync();
        }

    }
}