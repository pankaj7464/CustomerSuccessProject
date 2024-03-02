import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../../services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-phase-milestone-table',
  templateUrl: './phase-milestone.component.html',
  styleUrls: ['./phase-milestone.component.css'],
})
export class PhaseMilestoneComponent implements OnInit {
  form!: FormGroup;
  statuses: string[] = [
    'NotStarted',
    'InProgress',
    'Completed',
    'OnHold',
    'Cancelled',
    'Deferred',
    'Delayed',
    'OnTrack',
    'SignOffPending',
    'InvoicePending',
    'PaymentPending',
    'PaymentReceived',
    'PaymentDelayed',
  ];

  displayedColumns: string[] = [
    'projectId',
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
  constructor(private apiService: ApiService, private fb: FormBuilder) {}

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
    this.apiService.getAllPhaseMilestone().subscribe((res) => {
      console.log(res);
      this.dataSource = res.items;
    });
    this.apiService.getAllProject().subscribe((res) => {
      console.log(res);
      this.projects = res.items;
    });
  }

  submitForm(): void {
    if (this.form.valid) {
      console.log(this.form.value);
      this.apiService.postPhaseMilestone({...this.form.value,sprints:[]}).subscribe((res) => {
        console.log(res);
        this.apiService.showSuccessToast("Phase/Milestone Added Successfully");
      });
    } else {
      this.form.markAllAsTouched();
    }
  }
  editItem(data : any) {
    this.form.patchValue(data);
  }
  deleteItem(id: any) {
    this.apiService.deletePhaseMilestone(id).subscribe(
      (res) => {
        this.apiService.showSuccessToast('Deleted Successfully');
      },
      (error) => {
        this.apiService.showSuccessToast('Error deleting ' + id + ': ' + error);
      }
    );
  }
}
