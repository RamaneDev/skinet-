using System;
using System.Linq.Expressions;
using Core.Entities.OrderAggregate;

namespace Core.Specifications
{
    public class OrdersByPaymentIntentIdSpecification : BaseSpecification<Order>
    {
        public OrdersByPaymentIntentIdSpecification(string email): base(o => o.BuyerEmail == email)
        {
            AddInclude(o => o.OrderItems);
            AddInclude(o => o.DeliveryMethod);
            AddOrderByDescending(o => o.OrderDate);
        }

        public OrdersByPaymentIntentIdSpecification(int id, string email) 
          : base(o => o.BuyerEmail == email && o.Id== id)
        {
            AddInclude(o => o.OrderItems);
            AddInclude(o => o.DeliveryMethod);
        }
    }
}