using System.Text.Json;
using CoffeeAPI.RequestHelpers;

namespace API.Extensions;

public static class HttpExtensions
    {
        public static void AddPaginationHeader(this HttpResponse response, ResponseMetaData responsemetaData)
        {
            var options = new JsonSerializerOptions{PropertyNamingPolicy = JsonNamingPolicy.CamelCase};

            response.Headers.Append("Pagination", JsonSerializer.Serialize(responsemetaData, options));
            response.Headers.Append("Access-Control-Expose-Headers", "Pagination");
        }
    }