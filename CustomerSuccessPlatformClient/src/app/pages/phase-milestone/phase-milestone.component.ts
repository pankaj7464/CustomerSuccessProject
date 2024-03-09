import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthorizationService, Role } from '../../services/authorization.service';

@Component({
  selector: 'app-phase-milestone-table',
  templateUrl: './phase-milestone.component.html',
  styleUrls: ['./phase-milestone.component.css'],
})
export class PhaseMilestoneComponent implements OnInit {
  form!: FormGroup;
  statuses: string[] =this.apiService.phaseMilestoneStatus

  displayedColumns: string[] = [
   
    'title',
    'startDate',
    'endDate',
    'description',
    'comments',
    'status'
    ,"Actions"
  ];
  dataSource!: any[];
  projects: any[] = [];
  editDataId!:string
  constructor(private apiService: ApiService, private fb: FormBuilder,private authorizationService:AuthorizationService) {}

  ngOnInit() {
    this.form = this.fb.group({
      projectId: ['', Validators.required],
      title: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      description: ['', Validators.required],
      comments: ['', Validators.required],
      status: ['', Validators.required],
    });
    this.getAllPhaseMilestone()
    this.apiService.getAllProject().subscribe((res) => {
      console.log(res);
      this.projects = res.items;
    });
  }

getAllPhaseMilestone(){
  this.apiService.getAllPhaseMilestone().subscribe((res) => {
    console.log(res);
    this.dataSource = res.items;
  });
}

  submitForm(): void {
    if (this.form.valid) {
      console.log(this.form.value);
     if(this.editDataId){
      this.apiService.updatePhaseMilestone(this.editDataId,{...this.form.value,sprints:[]}).subscribe((res) => {
        this.getAllPhaseMilestone()
        this.apiService.showSuccessToast("Phase/Milestone Updated Successfully");
      });
     }
     else{
      this.apiService.postPhaseMilestone({...this.form.value,sprints:[]}).subscribe((res) => {
        this.getAllPhaseMilestone()
        this.apiService.showSuccessToast("Phase/Milestone Added Successfully");
      });
     }
    } else {
      this.form.markAllAsTouched();
    }
  }
  editItem(data : any) {
    this.editDataId = data.id
    this.form.patchValue(data);
  }
  deleteItem(id: any) {
    this.apiService.deletePhaseMilestone(id).subscribe(
      (res) => {
        this.getAllPhaseMilestone()
        this.apiService.showSuccessToast('Deleted Successfully');
      },
      (error) => {
        this.apiService.showSuccessToast('Error deleting ' + id + ': ' + error);
      }
    );
  }

  isManager(): boolean {
    const userRole = this.authorizationService.getCurrentUser()?.role;
    return userRole === Role.Manager || userRole === Role.Admin;
  }
}
