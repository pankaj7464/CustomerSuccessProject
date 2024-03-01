import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../../services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-escalation-matrix-table',
  templateUrl: './escalation-matrix.component.html',
  styleUrls: ['./escalation-matrix.component.css']
})
export class EscalationMatrixComponent implements OnInit {
[x: string]: any;
  displayedColumns: string[] = ['level', 'escalationType', 'projectId'];
  dataSource!: MatTableDataSource<any>;
  form!: FormGroup;

  escalationType:string[] = ["Type 1"," Type-2"];
  levels:string[] = ["Level 1","Level 2"];
  projects:string[] = ["Project 1","Project 2"]

  constructor(private apiService:ApiService,private fb: FormBuilder) { }

  submitForm() {
    if (this.form.valid) {
      
      console.log(this.form.value);
     
    } else {
     
      this.form.markAllAsTouched();
    }
  }

  ngOnInit() {
    this.form = this.fb.group({
      level: ['',Validators.required],
      escalationType: ['',Validators.required],
      projectId: ['',Validators.required],
    });
    this.apiService.getAllEscalationMatrix().subscribe(res=>{
      console.log(res)
      this.dataSource = new MatTableDataSource(res.items);
    })
  }
}
