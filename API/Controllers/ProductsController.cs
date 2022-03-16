using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;
using Core.Interfaces;
using Core.Entities;
using Core.Specifications;
using AutoMapper;
using API.Dtos;
using API.Errors;

namespace API.Controllers
{  
    public class ProductsController : BaseApiController
    {
        private readonly IProductRepository _repo;
        private readonly IGenericRepository<Product> _prodcutRepo;
        private readonly IMapper _mapper;

        public ProductsController(IProductRepository repo,
                                  IGenericRepository<Product> prodcutRepo,
                                  IMapper mapper)
        {
            this._mapper = mapper;
            this._prodcutRepo = prodcutRepo;
            this._repo = repo;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ProductToReturnDto>> GetProduct(int id)
        {
            var spec = new ProductsWithTypesAndBrandsSpecification(id);

            var product = await _prodcutRepo.GetEntityWithSpec(spec);

            if(product == null)
               return NotFound(new ApiResponse(404));

            return  _mapper.Map<Product, ProductToReturnDto>(product);          
        }


        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<Product>>> GetProdcuts()
        {
            var spec = new ProductsWithTypesAndBrandsSpecification();

            var products = await _prodcutRepo.ListAsync(spec);

            return Ok(_mapper.Map<IReadOnlyList<Product>, IReadOnlyList<ProductToReturnDto>>(products));
        }

        [HttpGet("brands")]
        public async Task<ActionResult<IReadOnlyList<ProductBrand>>> GetProdcutBrands()
        {
            return Ok(await _repo.GetProductBrandsAsync());
        }

        [HttpGet("types")]
        public async Task<ActionResult<IReadOnlyList<ProductType>>> GetProdcutTypes()
        {
            return Ok(await _repo.GetProductTypesAsync());
        }

    }
}