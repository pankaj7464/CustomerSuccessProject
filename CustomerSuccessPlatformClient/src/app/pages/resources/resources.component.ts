import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthorizationService, Role } from '../../services/authorization.service';
export interface Resources {
  name: string;
  role: string;
  startDate: Date;
  endDate: Date;
  comment: string;
}
@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrl: './resources.component.css'
})
export class ResourcesComponent {
  dataSource: Resources[] = [
    { name: 'John Doe', role: 'Developer', startDate: new Date('2023-01-15'), endDate: new Date('2023-02-20'), comment: 'Some comment' },
    { name: 'Jane Smith', role: 'Tester', startDate: new Date('2023-03-10'), endDate: new Date('2023-04-15'), comment: 'Another comment' },
    // Add more data objects as needed
  ];

  displayedColumns: string[] = ['name', 'role', 'startDate', 'endDate', 'comment', 'action'];
  form!: FormGroup;

  constructor(private fb: FormBuilder,private authorizationService:AuthorizationService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      role: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      comment: ['', Validators.required],
   
    });
  }

  submitForm() {
    if (this.form.valid) {
      // Submit the form data
      console.log(this.form.value);
    } else {
   
    }
  }

  editItem(data: any) {

    // this.editDataId = data.id;

    this.form.patchValue(data);
  }
  deleteItem(id: any) {
    // this.apiService.deleteEscalationMatrix(id).subscribe(
    //   (res) => {
    //     this.getAllEscalationMatrix()
    //     this.apiService.showSuccessToast('Deleted Successfully');
    //   },
    //   (error) => {
    //     this.apiService.showSuccessToast('Error deleting ' + id + ': ' + error);
    //   }
    // );
  }

  isManager(): boolean {
    const userRole = this.authorizationService.getCurrentUser()?.role;
    return userRole === Role.Manager || userRole === Role.Admin;
  }
}
