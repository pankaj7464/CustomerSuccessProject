import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-stakeholder-table',
  templateUrl: './stakeholder.component.html',
  styleUrls: ['./stakeholder.component.css'],
})
export class StakeholderComponent implements OnInit {
  form!: FormGroup;
projects: any;
  deleteItem(id: any) {
    this.apiService.deleteStakeholder(id).subscribe(
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
  displayedColumns: string[] = ['title', 'name', 'contact', 'Actions'];
  dataSource!: any[];
  constructor(private apiService: ApiService,private fb:FormBuilder) {}

  ngOnInit() {

    this.form = this.fb.group({
      name: ['', Validators.required],
      title: ['', Validators.required],
      contact: ['', Validators.required],
      projectId: ['', Validators.required ],
    });


    this.apiService.getAllStakeholder().subscribe((res) => {
      this.dataSource = res.items;
    });
  }

  submitForm(): void {
    console.log('Submit', this.form.value)
    if (this.form.valid) {
      console.log(this.form.value);
      this.apiService.postStakeholder(this.form.value).subscribe((res) => {
        console.log(res);
        this.apiService.showSuccessToast(
          'Escalation Matrix Added Successfully'
        );
      });
    } else {
      this.form.markAllAsTouched();
    }
  }
}
