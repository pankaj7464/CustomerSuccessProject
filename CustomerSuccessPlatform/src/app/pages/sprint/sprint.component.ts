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
  constructor(private apiService: ApiService, private fb: FormBuilder) { }
  phaseMilestone: any = []
  statuses: string[] = ["Pending", "Done", "In Progress"]
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
  deleteItem(id: string) {
    console.log(id)
  }
  editItem(data: any) {
    this.form.patchValue(data);
  }

  submitForm() {
    if (this.form.valid) {
      console.log(this.form.value)
      this.apiService.postSprint(this.form.value).subscribe(res => {
       this.apiService.showSuccessToast("Sprint added Successfully")
      })
    } else {
      console.log('Form is invalid');
    }
  }
}
