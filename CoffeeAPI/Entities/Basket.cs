namespace CoffeeAPI.Entities
{
    public class Basket
    {
        public Guid BasketId { get; set; }
        public Guid BuyerId { get; set; }
        public ICollection<BasketItem> Items { get; set; } = new List<BasketItem>();

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

        // Method to remove item
        
        public void RemoveItem(Guid ProductId, int quantity)
        {
            var item = Items.FirstOrDefault(item => item.ProductId == ProductId);

            if(item == null) 
            {
                return;
            }

            item.Quantity -= quantity;

            // Can not delete to negative numbers
            if (item.Quantity <= 0)
            {
                Items.Remove(item);
            }
        }
    }
}