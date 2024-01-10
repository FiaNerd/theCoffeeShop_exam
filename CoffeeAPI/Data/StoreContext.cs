using CoffeeAPI.Entities;
using CoffeeAPI.Entities.OrderAggregate;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;


namespace CoffeeAPI.Data
{
  
    public class StoreContext : IdentityDbContext<User, Role, int>
    {
        /* Behöver generer en konstruktor */
        public StoreContext(DbContextOptions options) : base(options)
        {
        }
        // vår DbSet representer en tabell i vår databas
        public DbSet<Product> Products { get; set; }
        public DbSet<Basket> Baskets { get; set; }

        public DbSet<Order> Orders { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            /* 1:1 realtion, 1 user har en Adress med en User*/
            builder.Entity<User>()
                .HasOne(a => a.Address)
                .WithOne()
                .HasForeignKey<UserAddress>(a => a.Id)
                .OnDelete(DeleteBehavior.Cascade);

            // denna lägger till identiteter till databasen
            /* TODO: har ändrat denna! */
            builder.Entity<Role>()
                .HasData(
                    new Role{ Id = 1, Name = "Member", NormalizedName = "MEMBER"},
                    new Role{ Id = 2, Name = "Admin", NormalizedName = "ADMIN"}
                );
        }
    }
}