using System.Security.Claims;
using System.Threading.Tasks;
using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions
{
    public static class UserManagerExtentions
    {
        public static async Task<StoreUser> FindCurrentUserByEmailWithAdress(this UserManager<StoreUser> input, ClaimsPrincipal user )
        {           
            var email = user.FindFirstValue(ClaimTypes.Email);

            return await input.Users.Include(x => x.Address).SingleOrDefaultAsync(x => x.Email == email);
        }

         public static async Task<StoreUser> FindCurrentUserByEmail(this UserManager<StoreUser> input, ClaimsPrincipal user )
        {           
           var email = user.FindFirstValue(ClaimTypes.Email);

            return await input.FindByEmailAsync(email);
        }
    }
}