using Volo.Abp.Application.Dtos;

namespace Promact.CustomerSuccess.Platform.Services.Dtos
{
    public class MeetingMinuteDto:IEntityDto<Guid>
    {
        public Guid Id { get; set; }
    }
}