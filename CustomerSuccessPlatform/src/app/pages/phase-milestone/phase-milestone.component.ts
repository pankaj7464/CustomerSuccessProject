import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../../services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-phase-milestone-table',
  templateUrl: './phase-milestone.component.html',
  styleUrls: ['./phase-milestone.component.css']
})
export class PhaseMilestoneComponent implements OnInit {
  form!: FormGroup;
  statuses: string[] = ["Completed", "Pending"];

  displayedColumns: string[] = ['projectId', 'title', 'startDate', 'endDate', 'description', 'comments', 'status'];
  dataSource!: any[];
  projects: string[] = ["Project 1", "Project 2"]
  constructor(private apiService: ApiService, private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      projectId: ['', Validators.required],
      title: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      description: ['', Validators.required],
      comments: ['', Validators.required],
      status: ['', Validators.required]
    });
    this.apiService.getAllPhaseMilestone().subscribe(res => {
      console.log(res)
      this.dataSource = res.items;
    })
  }

  submitForm() {
    if (this.form.valid) {

      console.log(this.form.value);

    } else {

      this.form.markAllAsTouched();
    }
  }
}
