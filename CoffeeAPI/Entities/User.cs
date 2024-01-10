using Microsoft.AspNetCore.Identity;

namespace CoffeeAPI.Entities
{
    public class User : IdentityUser<int>
    {
        public UserAddress Address { get; set; }

    }
}