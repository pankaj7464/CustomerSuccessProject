using System.ComponentModel.DataAnnotations;

namespace Promact.CustomerSuccess.Platform.Services.Dtos
{
    public class UpdateStakeholderDto
    {
        public Guid Id { get; set; }
        [Required]
        public string Title { get; set; }
        public string Name { get; set; }
        public string Contact { get; set; }
    }
}
