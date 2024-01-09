using CoffeeAPI.DTOs;
using CoffeeAPI.Entities;

namespace CoffeeAPI.Extensions
{
    public static class BaksetExtensions
    {
         private static BasketDto ResponseMapBasketToDto(this Basket basket)
        {
            return new BasketDto
            {
                Id = basket.Id,
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