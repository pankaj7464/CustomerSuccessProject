using System;
using System.Threading.Tasks;
using AutoMapper;
using Promact.CustomerSuccess.Platform.Entities;
using Promact.CustomerSuccess.Platform.Services.Dtos;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace Promact.CustomerSuccess.Platform.Services.ProjectBudgets
{
    public class ProjectBudgetService :
                       CrudAppService<ProjectBudget,
                       ProjectBudgetDto, 
                       Guid, 
                       PagedAndSortedResultRequestDto, 
                       CreateProjectBudgetDto, 
                       UpdateProjectBudgetDto>, 
        IProjectBudgetService
    {
        private readonly IRepository<ProjectBudget, Guid> _projectBudgetRepository;

        public ProjectBudgetService(IRepository<ProjectBudget, Guid> projectBudgetRepository)
            : base(projectBudgetRepository) 
        {
            _projectBudgetRepository = projectBudgetRepository;
        }
    }
}
