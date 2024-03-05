import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-stakeholder-table',
  templateUrl: './stakeholder.component.html',
  styleUrls: ['./stakeholder.component.css'],
})
export class StakeholderComponent implements OnInit {
  form: FormGroup;
  projects: any[] = [];
  editDataId: string = '';
  displayedColumns: string[] = ['title', 'name', 'contact', 'Actions'];
  dataSource!: any[];

  constructor(private apiService: ApiService, private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      title: ['', Validators.required],
      contact: ['', Validators.required],
      projectId: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.getAllStakeholder();
    this.apiService.getAllStakeholder().subscribe((res) => {
      this.dataSource = res.items;
    });
  }

  deleteItem(id: any) {
    this.apiService.deleteStakeholder(id).subscribe(
      (res) => {
        this.getAllStakeholder();
        this.apiService.showSuccessToast('Deleted Successfully');
      },
      (error) => {
        this.apiService.showSuccessToast('Error deleting ' + id + ': ' + error);
      }
    );
  }

  getAllStakeholder() {
    this.apiService.getAllStakeholder().subscribe((res) => {
      this.dataSource = res.items;
    });
  }

  editItem(data: any) {
    this.editDataId = data.id;
    this.form.patchValue(data);
  }

  submitForm(): void {
    console.log('Submit', this.form.value);
    if (this.form.valid) {
      console.log(this.form.value);
      if (this.editDataId) {
        this.apiService.updateStakeholder(this.editDataId, this.form.value).subscribe((res) => {
          this.getAllStakeholder();
          this.apiService.showSuccessToast('Escalation Matrix Updated Successfully');
        });
      } else {
        this.apiService.postStakeholder(this.form.value).subscribe((res) => {
          this.getAllStakeholder();
          this.apiService.showSuccessToast('Escalation Matrix Added Successfully');
        });
      }
    } else {
      this.form.markAllAsTouched();
    }
  }
}
