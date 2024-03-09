import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthorizationService, Role } from '../../services/authorization.service';
export interface ClientFeedback {
  feedbackDate: Date;
  feedbackType: FeedbackType;
  details: string;
}
enum FeedbackType {
  Suggestion = 'Suggestion',
  Complaint = 'Complaint',
}
@Component({
  selector: 'app-client-feedback',
  templateUrl: './client-feedback.component.html',
  styleUrl: './client-feedback.component.css'
})
export class ClientFeedbackComponent {
  dataSource: ClientFeedback[] = [
    { feedbackDate: new Date('2023-01-15'), feedbackType: FeedbackType.Suggestion, details: 'Some feedback details' },
    { feedbackDate: new Date('2023-02-20'), feedbackType: FeedbackType.Complaint, details: 'More feedback details' },
  ];

  displayedColumns: string[] = ['feedbackDate', 'feedbackType', 'details', 'action'];


  form!: FormGroup;

  constructor(private fb: FormBuilder,private authorizationService:AuthorizationService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      feedbackDate: ['', Validators.required],
      feedbackType: ['', Validators.required],
      details: ['', Validators.required],
      action: ['', Validators.required]
    });
  }

  submitForm() {
    if (this.form.valid) {
      // Submit the form data
      console.log(this.form.value);
    } else {
      // Mark all fields as touched to trigger validation messages

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
  isClient(): boolean {
    const userRole = this.authorizationService.getCurrentUser()?.role;
    return userRole === Role.Client;
  }
}
