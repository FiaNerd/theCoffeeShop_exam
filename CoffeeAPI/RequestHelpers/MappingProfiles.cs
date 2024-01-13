using AutoMapper;
using CoffeeAPI.DTOs;
using CoffeeAPI.Entities;

namespace CoffeeAPI.RequestHelpers
{
   public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        CreateMap<CreateProductDto, Product>();
        CreateMap<UpdateProductDto, Product>();
    }
}
}