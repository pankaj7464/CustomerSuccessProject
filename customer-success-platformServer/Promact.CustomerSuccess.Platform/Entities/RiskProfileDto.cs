namespace Promact.CustomerSuccess.Platform.Entities
{
    public class RiskProfileDto
    {
        public Guid ProjectId { get; set; }
        public  RiskType Type { get; set; }
        public string Severity { get; set; }
        public RiskImpactDTO Impact { get; set; }
        public ICollection<RemediationStepDTO> RemediationSteps { get; set; }
    }
}
