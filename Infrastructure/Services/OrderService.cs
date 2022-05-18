using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Core.Entities.OrderAggregate;
using Core.Interfaces;

namespace Infrastructure.Services
{
    public class OrderService : IOrderService
    {
        private readonly IGenericRepository<Order> orderRepo;
        private readonly IGenericRepository<DeliveryMethod> dmRepo;
        private readonly IGenericRepository<Product> pRepo;
        private readonly IBasketRepository basketRepo;

        public OrderService(IGenericRepository<Order> orderRepo,
                            IGenericRepository<DeliveryMethod> dmRepo,
                            IGenericRepository<Product> pRepo,
                            IBasketRepository basketRepo)
        {
            this.pRepo = pRepo;
            this.basketRepo = basketRepo;
            this.orderRepo = orderRepo;
            this.dmRepo = dmRepo;
        }

        public async Task<Order> CreateOrderAsync(string buyerEmail, int deliveryMethodId, string basketId, Address shippingAddress)
        {
            // get basket from the repo

            var basket = await basketRepo.GetBasketAsync(basketId);

            // get orderd items with price

            var items = new List<OrderItem>();
            foreach (var item in basket.Items)
            {
                var productItem = await pRepo.GetByIdAsync(item.Id);
                var itemOrdered = new ProductItemOrdred(productItem.Id, productItem.Name, productItem.PictureUrl);
                var orderItem = new OrderItem(itemOrdered, productItem.Price, item.Quantity);
                items.Add(orderItem);
            }

            // get deliveryMethode

            var dm = await dmRepo.GetByIdAsync(deliveryMethodId);

            // calcul subtotal

            var subtotal = items.Sum(item => item.Price*item.Quantity);

            // create order

            var order = new Order(items, buyerEmail, shippingAddress, dm, subtotal);

            // save to db 

            // return order

            return order;
        }

        public Task<IReadOnlyList<DeliveryMethod>> GetDeliveryMethodsAsync()
        {
            throw new System.NotImplementedException();
        }

        public Task<Order> GetOrderByIdAsync(int id, string buyerEmail)
        {
            throw new System.NotImplementedException();
        }

        public Task<IReadOnlyList<Order>> GetOrderForUsrAsync(string buyerEmail)
        {
            throw new System.NotImplementedException();
        }
    }
}