import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../../services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-escalation-matrix-table',
  templateUrl: './escalation-matrix.component.html',
  styleUrls: ['./escalation-matrix.component.css'],
})
export class EscalationMatrixComponent implements OnInit {
  [x: string]: any;
  displayedColumns: string[] = [
    'level',
    'escalationType',
    'responsiblePerson',
    'Actions',
  ];
  dataSource!: MatTableDataSource<any>;
  form!: FormGroup;

  escalationType: string[] = ['Operational', ' Financial', 'Technical'];
  levels: string[] = ['Level1', 'Level2', 'Level3', 'Level4', 'Level5'];
  projects: any[] = ['Project 1', 'Project 2'];

  constructor(private apiService: ApiService, private fb: FormBuilder) {}

  submitForm(): void {
    if (this.form.valid) {
      this.apiService.postEscalationMatrix(this.form.value).subscribe((res) => {
        console.log(res);
        this.apiService.showSuccessToast(
          'Escalation Matrix Added Successfully'
        );
      });
    } else {
      this.form.markAllAsTouched();
    }
  }

  ngOnInit() {
    this.form = this.fb.group({
      level: ['', Validators.required],
      escalationType: ['', Validators.required],
      responsiblePerson: ['', Validators.required],
      projectId: ['', Validators.required],
    });
    this.apiService.getAllEscalationMatrix().subscribe((res) => {
      this.dataSource = new MatTableDataSource(res.items);
    });
    this.apiService.getAllProject().subscribe((res) => {
      this.projects = res.items;
    });
  }

  editItem(data: any) {
    this.form.patchValue(data);
  }
  deleteItem(id: any) {
    this.apiService.deleteEscalationMatrix(id).subscribe(
      (res) => {
        this.apiService.showSuccessToast('Deleted Successfully');
      },
      (error) => {
        this.apiService.showSuccessToast('Error deleting ' + id + ': ' + error);
      }
    );
  }
}
