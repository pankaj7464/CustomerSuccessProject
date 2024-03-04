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

  displayedColumns: string[] = [
    'level',
    'responsiblePerson',
    'Actions',
  ];
  dataSourceForFinantials!:any[];
  dataSourceForTechnicals!:any[];
  dataSourceForOperationals!:any[];

  form!: FormGroup;
  editDataId!: string;

  escalationType: string[] = this.apiService.escalationType;
  levels: string[] = this.apiService.levels;
  projects: any[] = ['Project 1', 'Project 2'];

  constructor(private apiService: ApiService, private fb: FormBuilder) { }

  submitForm(): void {
    if (this.form.valid) {
      if (this.editDataId) {
        this.apiService.updateEscalationMatrix(this.editDataId, this.form.value).subscribe((res) => {
          console.log(res);
          this.apiService.showSuccessToast(
            'Escalation Matrix  Successfully'
          );
        });
      }
      else {
        this.apiService.postEscalationMatrix(this.form.value).subscribe((res) => {
          console.log(res);
          this.apiService.showSuccessToast(
            'Escalation Matrix Added Successfully'
          );
        });
      }
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
      this.dataSourceForFinantials = res.items.filter(i=>i.escalationType==0).sort((a, b) => a.level - b.level);
      this.dataSourceForTechnicals = res.items.filter(i=>i.escalationType==1).sort((a, b) => a.level - b.level);
      this.dataSourceForOperationals = res.items.filter(i=>i.escalationType==2).sort((a, b) => a.level - b.level);
    });
    this.apiService.getAllProject().subscribe((res) => {
      this.projects = res.items;
    });
  }

  editItem(data: any) {

    this.editDataId = data.id;

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
