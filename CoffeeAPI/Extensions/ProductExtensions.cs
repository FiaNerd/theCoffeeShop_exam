using CoffeeAPI.Entities;

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

       public static IQueryable<Product> Filter(this IQueryable<Product> query, string types, string roastLevels)
        {
            var typesList = new List<string>();
            var roastLevelList = new List<string>();

            if (!string.IsNullOrEmpty(types))
            {
                typesList.AddRange(types.ToLower().Split(",").ToList());
            }

            if (!string.IsNullOrEmpty(roastLevels))
            {
                roastLevelList.AddRange(roastLevels.ToLower().Split(",").ToList());
            }

            query = query.Where(p => typesList.Count == 0 || p.Type.Any(t => typesList.Contains(t.ToLower())));
            
            query = query.Where(p => roastLevelList.Count == 0 || roastLevelList.Contains(p.RoastLevel.ToLower()));

            return query;
        }

    }
}
