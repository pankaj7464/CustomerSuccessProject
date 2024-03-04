import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ProjectBudget } from '../../models/project-budget';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-audit-history',
  templateUrl: './audit-history.component.html',
  styleUrl: './audit-history.component.css',
})
export class AuditHistoryComponent {
  displayedColumns: string[] = [
    'dateOfAudit',
    'reviewedBy',
    'status',
    'reviewedSection',
    'commentOrQueries',
    'actionItem',
    'Actions',
  ];
  dataSource!: ProjectBudget[];
  statuses: string[] = [
    'InProgress',
    'Completed',
    'Delayed',
    'OnTrack',
    'SignOffPending',
  ];
  form: FormGroup;

  Users:{name:string,id:string}[] = [{
    name:"Pankaj Kumar",
    id:"3fa85f64-5717-4562-b3fc-2c963f66afa6"
  }]

  editDataId!: string;
  
   
  constructor(private apiService: ApiService, private fb: FormBuilder) {
    this.form = this.fb.group({
      dateOfAudit: ['', Validators.required],
      reviewedBy: ['', Validators.required],
      status: ['', Validators.required],
      reviewedSection: ['', Validators.required],
      commentOrQueries: ['', Validators.required],
      actionItem: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.apiService.getAllAuditHistory().subscribe((res) => {
      this.dataSource = res.items;
    });

    
  }

  submitForm(): void {
    if (this.form.valid) {
     if(!this.editDataId){ 
      this.apiService.postAuditHistory(this.form.value).subscribe((res) => {
        console.log(res);
        this.apiService.showSuccessToast('Audit History Added Successfully');
      });
    }
      else{
        this.apiService.updateAuditHistory(this.editDataId,this.form.value).subscribe((res) => {
          console.log(res);
          this.apiService.showSuccessToast('Audit History updated Successfully');
        });
      }
    } else {
      this.form.markAllAsTouched();
    }
  }

  deleteItem(id: any) {
    this.apiService.deleteAuditHistory(id).subscribe(
      (res) => {
        this.apiService.showSuccessToast('Deleted Successfully');
      },
      (error) => {
        this.apiService.showSuccessToast('Error deleting ' + id + ': ' + error);
      }
    );
  }
  editItem(data: any) {
    this.editDataId =data.id
    this.form.patchValue(data);
  }
}
