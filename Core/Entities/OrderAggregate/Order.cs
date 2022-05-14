using System;
using System.Collections.Generic;

namespace Core.Entities.OrderAggregate
{
    public class Order : BaseEntities
    {
        public Order()
        {
        }

        public Order(string buyerEmail, DateTimeOffset orderDate, Address shipToAddress, DeliveryMethod deliveryMethod)
        {
            this.BuyerEmail = buyerEmail;
            this.OrderDate = orderDate;
            this.ShipToAddress = shipToAddress;
            this.DeliveryMethod = deliveryMethod;
        }
        
        public string BuyerEmail { get; set; }
        public DateTimeOffset OrderDate { get; set; } = DateTimeOffset.Now;
        public Address ShipToAddress { get; set; }
        public DeliveryMethod DeliveryMethod { get; set; }
        public IReadOnlyList<OrderItem> OrderItems { get; set; }
        public decimal Subtotal { get; set; }
        public OrderStatus Status { get; set; } = OrderStatus.Pending;
        public string PaymentIntentId { get; set; }

        public decimal GetTotal()
        {
            return Subtotal + DeliveryMethod.Price;
        }
    }
}