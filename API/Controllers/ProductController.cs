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
    [Route("[controller]")]
    public class ProductController : ControllerBase
    {
        private readonly IProductRepository _repo;

        public ProductController(IProductRepository repo)
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

    }
}