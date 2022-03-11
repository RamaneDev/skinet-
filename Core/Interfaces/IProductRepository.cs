using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Entities;

namespace Core.Interfaces
{
    public interface IProductRepository
    {
         public Task<Product> GetProductByIdAsync(int id);
         public Task<IReadOnlyList<Product>> GetProductsAsync();
         public Task<IReadOnlyList<ProductBrand>> GetProductBrandsAsync();
         public Task<IReadOnlyList<ProductType>> GetProductTypesAsync();
    }
}