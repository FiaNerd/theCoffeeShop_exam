using CoffeeAPI.Entities;
using System.Linq;

namespace CoffeeAPI.Extensions
{
    public static class ProductExtensions
    {
        public static IQueryable<Product> Sort(this IQueryable<Product> query, string orderBy)
        {
            if(string.IsNullOrEmpty(orderBy))
            {
                    return query.OrderBy(p => p.Name);
            }

            switch (orderBy)
            {
                case "price":
                    return query.OrderBy(p => p.Price);
                case "priceDesc":
                    return query.OrderByDescending(p => p.Price);
                default:
                    return query.OrderByDescending(p => p.Name);
            }
        }

        public static IQueryable<Product> Search(this IQueryable<Product> query, string searchTerm)
        {
            if(string.IsNullOrEmpty(searchTerm))
            {
                return query;
            }

            var lowerCaseSearchTerm = searchTerm.Trim().ToLower();

            return query.Where(p => p.Name.ToLower().Contains(lowerCaseSearchTerm));
        }
    }
}
