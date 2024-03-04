import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../../services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-project-budget-table',
  templateUrl: './project-budget.component.html',
  styleUrls: ['./project-budget.component.css'],
})
export class ProjectBudgetComponent implements OnInit {
  displayedColumns: string[] = [
    'type',
    'durationInMonths',
    'contractDuration',
    'budgetedHours',
    'budgetedCost',
    'currency',
    'Actions',
  ];
  dataSource!: any[];
  form!: FormGroup;
  projects: any[] = [];
  projectType: string[] =this.apiService.projectType;
  editDataId!: string

  constructor(private apiService: ApiService, private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      type: ['', Validators.required],
      durationInMonths: ['', Validators.required],
      contractDuration: ['', Validators.required],
      budgetedHours: ['', Validators.required],
      budgetedCost: ['', Validators.required],
      currency: ['', Validators.required],
      projectId: ['', Validators.required],
    });
    this.apiService.getProjectBudgets().subscribe((res) => {
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
      if (this.editDataId) {
        this.apiService.updateProjectBudget(this.editDataId, this.form.value).subscribe(
          (res) => {
            console.log(res);
            this.apiService.showSuccessToast('Project Budget Updated Successfully');
          },

          (error) => {
            console.log(error);
          }
        );
      }
      else {
        this.apiService.postProjectBudget(this.form.value).subscribe(
          (res) => {
            console.log(res);
            this.apiService.showSuccessToast('Project Budget Added Successfully');
          },

          (error) => {
            console.log(error);
          }
        );
      }

    } else {
      this.form.markAllAsTouched();
    }
  }

  deleteItem(id: any) {
    this.apiService.deleteProjectBudget(id).subscribe(
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
}
