using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;
using Infrastructure.Interfaces;

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

        [HttpGet]
        public async Task<IActionResult> GetProdcut()
        {
            return Ok(await _repo.GetProductByIdAsync(1));
        }

    }
}