namespace Core.Entities.OrderAggregate
{
    public class OrderItem
    {
        public OrderItem()
        {
        }

        public OrderItem(ProductItemOrdred itemOrdred, decimal price, int quantity)
        {
            ItemOrdred = itemOrdred;
            Price = price;
            Quantity = quantity;
        }

        public ProductItemOrdred ItemOrdred { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }      
        
    }
}