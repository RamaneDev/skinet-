using System;
using System.Linq.Expressions;
using Core.Entities;

namespace Core.Specifications
{
    public class ProductWithFiltersForCountSpecificication : BaseSpecification<Product>
    {
        public ProductWithFiltersForCountSpecificication(ProductSpecParams productParams) 
        : base(x => 
                   (string.IsNullOrEmpty(productParams.Search) || x.Name.ToLower().Contains(productParams.Search)) &&
                   (!productParams.BrandId.HasValue || x.ProductBrand.Id == productParams.BrandId)                 &&
                   (!productParams.TypeId.HasValue || x.ProductType.Id == productParams.TypeId)
                )
        {
        }
    }
}