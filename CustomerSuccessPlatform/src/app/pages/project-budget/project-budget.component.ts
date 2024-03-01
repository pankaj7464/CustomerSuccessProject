import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../../services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-project-budget-table',
  templateUrl: './project-budget.component.html',
  styleUrls: ['./project-budget.component.css']
})
export class ProjectBudgetComponent implements OnInit {
  displayedColumns: string[] = ['type', 'durationInMonths', 'contractDuration', 'budgetedHours', 'budgetedCost', 'currency', 'projectId'];
  dataSource!: MatTableDataSource<any>;
  form!: FormGroup;

  

  constructor(private apiService:ApiService,private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      type: ['', Validators.required],
      durationInMonths: ['', Validators.required],
      contractDuration: ['', Validators.required],
      budgetedHours: ['', Validators.required],
      budgetedCost: ['', Validators.required],
      currency: ['', Validators.required],
      projectId: ['', Validators.required]
    });
    this.apiService.getProjectBudgets().subscribe(res=>{
      this.dataSource = new MatTableDataSource(res.items);
    })
  }

  submitForm(){
    if (this.form.valid) {
      
      console.log(this.form.value);
     
    } else {
     
      this.form.markAllAsTouched();
    }
  }
}
