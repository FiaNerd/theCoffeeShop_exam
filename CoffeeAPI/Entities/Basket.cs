namespace CoffeeAPI.Entities
{
    public class Basket
    {
        public int Id { get; set; }
        public string BuyerId { get; set; }
        public ICollection<BasketItem> Items { get; set; } = new List<BasketItem>();

        // Method to AddItems
        public void AddItem(Product product, int quantity)
        {
           
            if(Items.All(item => item.ProductId != product.Id))
            {
                Items.Add(new BasketItem{ Product = product, Quantity = quantity });
                return;
            }

            var existingItem = Items.FirstOrDefault(item => item.ProductId == product.Id);

            if(existingItem != null)
            {
                existingItem.Quantity += quantity;
            }
        }

        public void RemoveItem(int productId, int quantity)
        {
            var item = Items.FirstOrDefault(item => item.ProductId == productId);

            if(item == null) 
            {
                return;
            }

            item.Quantity -= quantity;


            if (item.Quantity == 0)
            {
                Items.Remove(item);
            }
        }
    }
}