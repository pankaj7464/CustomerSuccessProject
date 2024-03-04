using Promact.CustomerSuccess.Platform.Entities;

namespace Promact.CustomerSuccess.Platform.Services.Dtos
{
    public class UpdateVersionHistoryDto
    {
  
        public int Version { get; set; }
        public string Type { get; set; }
        public string Change { get; set; }
        public string ChangeReason { get; set; }
        public ApplicationUser CreatedBy { get; set; }
        public DateTime RevisionDate { get; set; }
        public DateTime? ApprovalDate { get; set; }
        public ApplicationUser ApprovedBy { get; set; }
    }
}
