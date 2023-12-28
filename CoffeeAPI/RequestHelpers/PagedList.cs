using Microsoft.EntityFrameworkCore;

namespace CoffeeAPI.RequestHelpers
{
    public class PagedList<T> : List<T>
    {
        public PagedList(List<T> items, int count, int pageNumber, int pageSize)
        {
            ResponseMetaData = new ResponseMetaData
            {
                CurrentPage = pageNumber,
                TotalPages = (int)Math.Ceiling(count / (double)pageSize),
                TotalCount = count,
                PageSize = pageSize,
            };

            AddRange(items);
        }
        public ResponseMetaData ResponseMetaData { get; set; }

        public static async Task<PagedList<T>> ToPagedList(IQueryable<T> query, 
            int pageNumber, int pageSize)
        {
            var count = await query.CountAsync();
            var items = await query.Skip((pageNumber-1)*pageSize).Take(pageSize).ToListAsync();

            return new PagedList<T>(items, count, pageNumber, pageSize);

        }
    }
}