using Volo.Abp.Application.Dtos;
using Volo.Abp.Domain.Entities;

namespace Promact.CustomerSuccess.Platform.Services.Dtos
{
    public class VersionHistoryDto : IEntityDto<Guid>
    {
        public int Version { get; set; }
        public string Type { get; set; }
        public string Change { get; set; }
        public string ChangeReason { get; set; }
        public string CreatedBy { get; set; }
        public DateTime RevisionDate { get; set; }
        public DateTime? ApprovalDate { get; set; }
        public string ApprovedBy { get; set; }
        public Guid Id { get; set; }

        public object?[] GetKeys()
        {
            throw new NotImplementedException();
        }
    }
}
