using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Core.Entities.OrderAggregate;
using Core.Interfaces;
using Core.Specifications;

namespace Infrastructure.Services
{
    public class OrderService : IOrderService
    {
       // private readonly IGenericRepository<Order> orderRepo;
       // private readonly IGenericRepository<DeliveryMethod> dmRepo;
       // private readonly IGenericRepository<Product> pRepo;
        private readonly IBasketRepository basketRepo;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IPaymentService _paymentService;

        public OrderService(IGenericRepository<Order> orderRepo,
                            IGenericRepository<DeliveryMethod> dmRepo,
                            IGenericRepository<Product> pRepo,
                            IBasketRepository basketRepo,
                            IUnitOfWork unitOfWork,
                            IPaymentService paymentService)
        {     
            this.basketRepo = basketRepo;
            this._unitOfWork = unitOfWork;
            this._paymentService = paymentService;
        }
         

        public async Task<Order> CreateOrderAsync(string buyerEmail, int deliveryMethodId, string basketId, Address shippingAddress)
        {
            // get basket from the repo

            var basket = await basketRepo.GetBasketAsync(basketId);

            // get orderd items with price

            var items = new List<OrderItem>();
            foreach (var item in basket.Items)
            {
                var productItem = await _unitOfWork.Repository<Product>().GetByIdAsync(item.Id);
                var itemOrdered = new ProductItemOrdred(productItem.Id, productItem.Name, productItem.PictureUrl);
                var orderItem = new OrderItem(itemOrdered, productItem.Price, item.Quantity);
                items.Add(orderItem);
            }

            // get deliveryMethode

            var dm = await _unitOfWork.Repository<DeliveryMethod>().GetByIdAsync(deliveryMethodId);

            // calcul subtotal

            var subtotal = items.Sum(item => item.Price*item.Quantity);

            // check if order exists
            var spec = new OrdersByPaymentIntentIdSpecification(basket.PaymentIntentId);
            var existingOrder = await _unitOfWork.Repository<Order>().GetEntityWithSpec(spec);

            if(existingOrder != null)
            {
                _unitOfWork.Repository<Order>().Delete(existingOrder);
                await _paymentService.CreateOrUpdatePaymentIntent(basketId); 
            }

            // create order

            var order = new Order(items, buyerEmail, shippingAddress, dm, subtotal, basket.PaymentIntentId);
            _unitOfWork.Repository<Order>().Add(order);

            // save to db 

            var result = await _unitOfWork.Complete();

            if(result <=0) return null;

            // delete basket
            
            // await basketRepo.DeleteBasketAsync(basketId); to move some where else


            // return order

            return order;
        }

        public async Task<IReadOnlyList<DeliveryMethod>> GetDeliveryMethodsAsync()
        {
           return await _unitOfWork.Repository<DeliveryMethod>().ListAllAsync();
        }

        public async Task<Order> GetOrderByIdAsync(int id, string buyerEmail)
        {
             var spec = new OrdersByPaymentIntentIdSpecification(id, buyerEmail);

            return await _unitOfWork.Repository<Order>().GetEntityWithSpec(spec);
        }

        public async Task<IReadOnlyList<Order>> GetOrderForUsrAsync(string buyerEmail)
        {
            var spec = new OrdersByPaymentIntentIdSpecification(buyerEmail);

            return await _unitOfWork.Repository<Order>().ListAsync(spec);
        }
    }
}