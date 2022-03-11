using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;
using Core.Interfaces;
using Core.Entities;

namespace API.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly IProductRepository _repo;

        public ProductsController(IProductRepository repo)
        {
            this._repo = repo;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProdcut(int id)
        {
            return await _repo.GetProductByIdAsync(id);
        }


        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<Product>>> GetProdcuts()
        {
            return Ok(await _repo.GetProductsAsync());
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