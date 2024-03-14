using Promact.CustomerSuccess.Platform.Entities;
using Promact.CustomerSuccess.Platform.Services.Dtos;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace Promact.CustomerSuccess.Platform.Services.Users
{
    public class UserService :  CrudAppService<User, UserDto, Guid, PagedAndSortedResultRequestDto, CreateUpdateUserDto, CreateUpdateUserDto>, IUserService
    {
        IRepository<User, Guid> _repository;
        public UserService(IRepository<User, Guid> repository) : base(repository)
        {
            _repository = repository;
        }

        public async Task<UserDto> GetDetailByEmailAsync(string email)
        {
            var user = (await _repository.GetListAsync(u => u.Email == email)).FirstOrDefault();
            return ObjectMapper.Map<User, UserDto>(user);
        }
    }
}
