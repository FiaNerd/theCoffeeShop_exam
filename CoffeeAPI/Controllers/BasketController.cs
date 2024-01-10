using API.Extensions;
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

            return basket.ResponseMapBasketToDto();

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

                    var problemDetails = new ProblemDetails
                    {
                        Title = "Problem removing item from the basket",
                        Detail = ex.Message, 
                        Status = 400
                    };    
                      

                    return BadRequest(problemDetails);
            }
        }


        private async Task<Basket> RetrieveBasket(Guid buyerId)
        {
            if (buyerId == Guid.Empty)
            {
                Response.Cookies.Delete("buyerId");
                return null;
            }

            Console.WriteLine("BUYER ID API", buyerId);

            return await _context.Baskets
                .Include(i => i.Items)
                .ThenInclude(p => p.Product)
                .FirstOrDefaultAsync(basket => basket.BuyerId == buyerId);
        }

        private Guid GetBuyerId()
        {
            // Trying to get from the identity 
            if (Guid.TryParse(User.Identity?.Name, out Guid buyerIdFromIdentity))
            {
                return buyerIdFromIdentity;
            }

            // If the identity dons't exist, try get from Cookies
            if (Guid.TryParse(Request.Cookies["buyerId"], out Guid buyerIdFromCookies))
            {
                return buyerIdFromCookies;
            }

            // If not valid is returned, return Guid.Empty
            return Guid.Empty;
        }

        // private Basket CreateBasket()
        // {
        //     // Declare buyerId variable and assign it a default value
        //     var buyerId = string.Empty;

        //     if (User.Identity != null)
        //     {
        //         // Set buyerId to the user's username
        //         buyerId = User.Identity.Name;
        //     }
        //     else
        //     {
        //         // Generate a new Guid for anonymous user
        //         buyerId = Guid.NewGuid().ToString();

        //         // Store the generated Guid in a cookie
        //         var cookieOptions = new CookieOptions
        //         {
        //             IsEssential = true,
        //             Expires = DateTime.Now.AddDays(30)
        //         };

        //         Response.Cookies.Append("buyerId", buyerId, cookieOptions);
        //     }

        //     // Create a new Basket object and set its BuyerId
        //     var basket = new Basket
        //     {
        //         BuyerId = new Guid(buyerId)
        //     };

        //     // Add the Basket object to the database
        //     _context.Baskets.Add(basket);

        //     return basket;
        // }




            
        private Basket CreateBasket()
        {
         Basket basket = null;
            // if the user logedin and created a basket, then setting buyerid to the user name
            var buyerId = User.Identity?.Name;
             
             // if not user is Logedin, set it to guid
             if (string.IsNullOrEmpty(buyerId))
            {
                buyerId = Guid.NewGuid().ToString();
                var cookieOptions = new CookieOptions { IsEssential = true, Expires = DateTime.Now.AddDays(30) };
                Response.Cookies.Append("buyerId", buyerId, cookieOptions);
            }



            if (string.IsNullOrEmpty(buyerId))
            {
                buyerId = Guid.NewGuid().ToString();
                var cookieOptions = new CookieOptions { IsEssential = true, Expires = DateTime.Now.AddDays(30) };
                Response.Cookies.Append("buyerId", buyerId, cookieOptions);
            }

            if(Guid.TryParse(buyerId, out Guid buyerIdGuid)){

                        basket = new Basket { BuyerId = buyerIdGuid };
                        _context.Baskets.Add(basket);
                        return basket;
            }
            return basket;
        }
    }
}
