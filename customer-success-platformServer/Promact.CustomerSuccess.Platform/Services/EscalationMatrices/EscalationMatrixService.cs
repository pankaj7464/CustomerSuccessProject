using Promact.CustomerSuccess.Platform.Entities;
using Promact.CustomerSuccess.Platform.Services.Dtos;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace Promact.CustomerSuccess.Platform.Services.EscalationMatrices
{
    public class EscalationMatrixService:
        CrudAppService<EscalationMatrix,EscalationMatrixDto,Guid,
                        PagedAndSortedResultRequestDto, // TGetListInput
                       CreateEscalationMatrix, 
                       UpdateEscalationMatrix> 
        , IEscalationMatrixService
    {
        public EscalationMatrixService(IRepository<EscalationMatrix,Guid> escalationMatrix):base(escalationMatrix) { }
    }
}
