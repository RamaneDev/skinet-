using Microsoft.AspNetCore.Identity;

namespace Core.Entities.Identity
{
    public class StoreUser : IdentityUser
    {
        public string DisplayName { get; set; }
        public Address Address { get; set; }
    }
}