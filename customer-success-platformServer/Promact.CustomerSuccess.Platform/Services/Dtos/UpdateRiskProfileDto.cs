using Promact.CustomerSuccess.Platform.Entities;

namespace Promact.CustomerSuccess.Platform.Services.Dtos
{
    public class UpdateRiskProfileDto
    {
   
   
        public Guid ProjectId { get; set; }
        public RiskType Type { get; set; }
        public RiskSeverity Severity { get; set; }
        public RiskImpact Impact { get; set; }
        public ICollection<RemediationStep> RemediationSteps { get; set; }
    }
}
