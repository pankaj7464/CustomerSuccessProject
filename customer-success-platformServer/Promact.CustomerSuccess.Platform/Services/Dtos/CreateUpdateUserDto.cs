using Promact.CustomerSuccess.Platform.Entities.Constants;

namespace Promact.CustomerSuccess.Platform.Services.Dtos
{
    public class CreateUpdateUserDto
    {
        public string Password { get; set; }
        public string Email { get; set; }
        public Roles Role { get; set; }
    }
}
