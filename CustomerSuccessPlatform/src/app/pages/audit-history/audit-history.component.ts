import { Component } from '@angular/core';
export const AUDIT_DATA: any[] = [
  { 
    dateOfAudit: new Date('2024-02-28'), 
    reviewedBy: 'John Doe', 
    status: 'Completed', 
    reviewedSection: 'Security', 
    commentOrQueries: 'No comments', 
    actionItem: 'None' 
  },
  { 
    dateOfAudit: new Date('2024-02-27'), 
    reviewedBy: 'Jane Smith', 
    status: 'In Progress', 
    reviewedSection: 'Performance', 
    commentOrQueries: 'Need clarification on section 2', 
    actionItem: 'Follow up with team' 
  }
];

@Component({
  selector: 'app-audit-history',
  templateUrl: './audit-history.component.html',
  styleUrl: './audit-history.component.css'
})
export class AuditHistoryComponent {
  displayedColumns: string[] = ['dateOfAudit', 'reviewedBy', 'status', 'reviewedSection', 'commentOrQueries', 'actionItem'];
  dataSource: any[] = AUDIT_DATA;
}
