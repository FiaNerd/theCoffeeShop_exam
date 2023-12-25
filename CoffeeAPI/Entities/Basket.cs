namespace CoffeeAPI.Entities
{
    public class Basket
    {
        public Guid BasketId { get; set; }
        public string BuyerId { get; set; }
        public List<BasketItem> Items { get; set; } = [];

         public void AddItem (Product product, int quantity)
        {
            if(Items.All(item => item.ItemId != product.ProductId))
            {
                Items.Add(new BasketItem { Product = product, Quantity = quantity });
            }

            var existingitem = Items.FirstOrDefault(item => item.ProductId == product.ProductId);

            if(existingitem != null)
            {
                existingitem.Quantity += quantity;
            }
        }
    }
}