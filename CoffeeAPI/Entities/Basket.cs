namespace CoffeeAPI.Entities
{
    public class Basket
    {
        public Guid BasketId { get; set; }
        public Guid BuyerId { get; set; }
        public ICollection<BasketItem> Items { get; set; } = new List<BasketItem>();

        public void AddItem(Product product, int quantity)
        {
           
            if(Items.All(item => item.ProductId != product.ProductId))
            {
                Items.Add(new BasketItem{ Product = product, Quantity = quantity });
                return;
            }

            var existingItem = Items.FirstOrDefault(item => item.ProductId == product.ProductId);

            if(existingItem != null)
            {
                existingItem.Quantity += quantity;
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


            if (item.Quantity >= 0)
            {
                Items.Remove(item);
            }
        }
    }
}