import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../../services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-risk-profile-table',
  templateUrl: './risk-profiling.component.html',
  styleUrls: ['./risk-profiling.component.css'],
})
export class RiskProfileComponent implements OnInit {
  
  displayedColumns: string[] = [
    'projectId',
    'riskType',
    'severity',
    'impact',
    'remediationSteps',
    'Actions',
  ];
  dataSource!: any[];
  form!: FormGroup;
  projects: any[] = [];
  riskTypes: string[] = [
    'Financial',
    'Operational',
    'Technical',
    'HumanResource',
    'External',
    'Legal',
    'Reputational',
  ];
  severities: string[] = ['Low', 'Medium', 'High'];
  impacts: string[] = ['Low', 'Medium', 'High'];

  constructor(private apiService: ApiService, private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      projectId: ['', Validators.required],
      riskType: ['', Validators.required],
      severity: ['', Validators.required],
      impact: ['', Validators.required],
      remediationSteps: ['', Validators.required],
    });

    this.apiService.getAllRiskProfile().subscribe((res) => {
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
      this.apiService.postRiskProfile(this.form.value).subscribe((res) => {
        console.log(res);
        this.apiService.showSuccessToast('Risk Profile Added Successfully');
      });
    } else {
      this.form.markAllAsTouched();
    }
  }

  deleteItem(id: any) {
    this.apiService.deleteRiskProfile(id).subscribe(
      (res) => {
        this.apiService.showSuccessToast('Deleted Successfully');
      },
      (error) => {
        this.apiService.showSuccessToast('Error deleting ' + id + ': ' + error);
      }
    );
  }
  editItem(data: any) {
    this.form.patchValue(data);
  }
}
