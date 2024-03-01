import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../../services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-risk-profile-table',
  templateUrl: './risk-profiling.component.html',
  styleUrls: ['./risk-profiling.component.css']
})
export class RiskProfileComponent implements OnInit {
  displayedColumns: string[] = [ 'projectId', 'riskType', 'severity', 'impact', 'remediationSteps'];
  dataSource!:any[];
  form!: FormGroup;


  constructor(private apiService:ApiService,private fb: FormBuilder) { }

  ngOnInit() {

    this.form = this.fb.group({
      projectId: ['', Validators.required],
      riskType: ['', Validators.required],
      severity: ['', Validators.required],
      impact: ['', Validators.required],
      remediationSteps: ['', Validators.required]
    });


    this.apiService.getAllRiskProfile().subscribe(res=>{
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
