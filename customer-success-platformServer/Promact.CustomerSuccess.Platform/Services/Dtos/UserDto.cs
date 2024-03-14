using Promact.CustomerSuccess.Platform.Entities.Constants;
using Volo.Abp.Application.Dtos;

namespace Promact.CustomerSuccess.Platform.Services.Dtos
{
    public class UserDto:IEntityDto<Guid>
    {
        public Guid Id { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public Roles Role { get; set; }
    }
}
