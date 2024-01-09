using CoffeeAPI.DTOs;
using CoffeeAPI.Entities;
using CoffeeAPI.Extensions;
using CoffeeAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CoffeeAPI.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly UserManager<User> _userManager;
        private readonly TokenService _tokenService;
        private readonly StoreContext _context;

        public AccountController(UserManager<User> userManager, TokenService tokenService, StoreContext context)
        {
            _tokenService = tokenService;
            _userManager = userManager;
            _context = context;
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _userManager.FindByNameAsync(loginDto.Username);

            if(user == null || !await _userManager.CheckPasswordAsync(user, loginDto.Password))
            {
                return Unauthorized();
            }

            var userBasket = await RetrieveBasket(loginDto.Username);
            var anonymousBasket = await RetrieveBasket(Request.Cookies["buyerId"]);

             if (anonymousBasket != null)
        {
            if (userBasket != null) _context.Baskets.Remove(userBasket);
            anonymousBasket.BuyerId = user.UserName;
            Response.Cookies.Delete("buyerId");
            await _context.SaveChangesAsync();
        }

        return new UserDto
        {
            Email = user.Email,
            Token = await _tokenService.GenerateToken(user),
            Basket = anonymousBasket != null ? anonymousBasket.ResponseMapBasketToDto() : userBasket?.ResponseMapBasketToDto()
        };

        }

        [HttpPost("register")]
        public async Task<ActionResult> Register(RegisterDto registerDto)
        {
            var user = new User { UserName = registerDto.Username, Email = registerDto.Email };

            var result = await _userManager.CreateAsync(user, registerDto.Password);

            if(!result.Succeeded)
            {
                foreach(var error in result.Errors)
                {
                    ModelState.AddModelError(error.Code, error.Description);
                }

                return ValidationProblem();
            }

            await _userManager.AddToRoleAsync(user, "Member");

            return StatusCode(201);
        }

            [Authorize]
            [HttpGet("currentUser")]
            public async Task<ActionResult<UserDto>> GetCurrentUser()
            {
            try
            {
                var user = await _userManager.FindByNameAsync(User.Identity.Name);
        

                if (user == null)
                {
                    return NotFound("User not found.");
                }

                return new UserDto
                {
                    Email = user.Email,
                    Token = await _tokenService.GenerateToken(user)
                };
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
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

    }
}