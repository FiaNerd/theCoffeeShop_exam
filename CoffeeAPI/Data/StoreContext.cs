using Microsoft.EntityFrameworkCore;
using CoffeeAPI.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace CoffeeAPI.Data
{
    public class StoreContext : IdentityDbContext<User>
    {
        public StoreContext(DbContextOptions<StoreContext> options) : base(options)
        {
        }

        public DbSet<Product> Products { get; set; }
        public DbSet<Basket> Baskets { get; set; }
    }
}