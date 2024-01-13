using System.ComponentModel.DataAnnotations;

namespace CoffeeAPI.DTOs
{
    public class UpdateProductDto
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "Fältet är obligatoriskt.")]
        public string Name { get; set; }

        [Required(ErrorMessage = "Fältet är obligatoriskt.")]
        public string BlendDescription { get; set; }

        [Required(ErrorMessage = "Fältet är obligatoriskt.")]
        public string Description { get; set; }

        [Required(ErrorMessage = "Fältet är obligatoriskt.")]
        public IFormFile ImageUrl { get; set; }

        [Required(ErrorMessage = "Fältet är obligatoriskt.")]
        public List<string> Type { get; set; }

        [Required(ErrorMessage = "Fältet är obligatoriskt.")]
        public string RoastLevel { get; set; } 

        // [Range(100, Double.PositiveInfinity)]
        [Required(ErrorMessage = "Fältet är obligatoriskt.")]
        [RegularExpression(@"^[1-9]\d*$", ErrorMessage = "Vänligen ange ett positivt heltal.")]
        public int Price { get; set; }

        [Required(ErrorMessage = "Fältet är obligatoriskt.")]
        [Range(0, 200)]
        public int QuantityInStock { get; set; }
    }
}