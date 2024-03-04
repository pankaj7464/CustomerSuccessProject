import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../../services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sprint-table',
  templateUrl: './sprint.component.html',
  styleUrls: ['./sprint.component.css']
})
export class SprintComponent implements OnInit {

  displayedColumns: string[] = ['phaseMilestoneId', 'startDate', 'endDate', 'status', 'comments', 'goals', 'sprintNumber', 'action'];
  dataSource!: any[];
  form!: FormGroup;
  editDataId!:string
  constructor(private apiService: ApiService, private fb: FormBuilder) { }
  phaseMilestone: any = []
  statuses: string[] =this.apiService.sprintStatuses
  ngOnInit() {

    this.form = this.fb.group({
      phaseMilestoneId: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      status: ['', Validators.required],
      comments: ['', Validators.required],
      goals: ['', Validators.required],
      sprintNumber: ['', Validators.required]
    });

    this.apiService.getAllSprint().subscribe(res => {
      console.log(res)
      this.dataSource = res.items;
    })
    this.apiService.getAllPhaseMilestone().subscribe(res => {
      console.log(res)
      this.phaseMilestone = res.items;
    })

  }
  deleteItem(id: any) {
    this.apiService.deleteSprint(id).subscribe(
      (res) => {
        this.apiService.showSuccessToast('Deleted Successfully');
      },
      (error) => {
        this.apiService.showSuccessToast('Error deleting ' + id + ': ' + error);
      }
    );
  }
  editItem(data: any) {
    this.editDataId = data.id
    this.form.patchValue(data);
  }

  submitForm(): void {
    if (this.form.valid) {
      if(this.editDataId){
        this.apiService.updateSprint(this.editDataId,this.form.value).subscribe((res) => {
          console.log(res);
          this.apiService.showSuccessToast("Audit History Updated Successfully");
        });
      }
      else {
        this.apiService.postSprint(this.form.value).subscribe((res) => {
          console.log(res);
          this.apiService.showSuccessToast("Audit History Added Successfully");
        });
      }
    } else {
      this.form.markAllAsTouched();
    }
  }
}
