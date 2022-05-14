namespace Core.Entities.OrderAggregate
{
    public class DeliveryMethod : BaseEntities
    {
        public string ShortName { get; set; }
        public string DeliveryTime { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }       
    }
}