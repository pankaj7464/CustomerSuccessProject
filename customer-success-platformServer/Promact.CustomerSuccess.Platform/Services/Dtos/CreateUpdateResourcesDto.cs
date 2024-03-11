namespace Promact.CustomerSuccess.Platform.Services.Dtos
{
    public class CreateUpdateResourcesDto
    {
        public string Name { get; set; }
        public string Role { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string Comment { get; set; }
        public required Guid ProjectId { get; set; }
    }
}
