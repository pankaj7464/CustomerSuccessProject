import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './services/api.service';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(public router: Router, public apiService: ApiService) { }

  navigateTo(path: any) {
    this.router.navigate([path]);
  }

  showFiller = false;

  Navigations = [
    { path: 'project', displayName: 'Project' },
    { path: 'project-manager', displayName: 'Project Manager' },
    { path: 'settings', displayName: 'Settings' },
  ];

  tabs: { path: string; displayName: string }[] = [
    { path: 'audit-history', displayName: 'Audit History' },
    { path: 'sprint', displayName: 'Sprint' },
    { path: 'stakeholder', displayName: 'Stakeholder' },
    { path: 'version-history', displayName: 'Version History' },
    { path: 'project-budget', displayName: 'Project Budget' },
    { path: 'escalation-matrix', displayName: 'Escalation Matrix' },
    { path: 'risk-profiling', displayName: 'Risk Profiling' },
    { path: 'phase-milestone', displayName: 'Phase Milestone' },
  ];

  ngOnInit(): void { }

  generatePdf() {
    this.apiService.getAllDataForPdf().subscribe(
      (data) => {
        const doc = new jsPDF();

        Object.keys(data).forEach((key) => {
          const items = data[key].items;
          

          if (items.length > 0) {
            const tableData = items.map((item: any) => {
              const rowData = [];
            
              switch (key) {
                case "projectBudgets": {
                  item.type = this.apiService.projectType[item.type]
                  break;

                }
                case "auditHistory": {
                  item.reviewedBy = "Test user"
                  item.dateOfAudit  = new Date(item.dateOfAudit).toLocaleDateString();
                  break;
                }
                case "phaseMilestone": {
                  item.endDate  = new Date(item.endDate).toLocaleDateString();
                  item.startDate  = new Date(item.startDate).toLocaleDateString();
                  item.status = this.apiService.phaseMilestoneStatus[item.status];
                  break;
                }
                case "escalationMatrix": {
                 const escalationType:string[] = this.apiService.escalationType;
                 const  levels: string[] =this.apiService.levels;
                  item.level = levels[item.level]
                  item.escalationType = escalationType[item.escalationType]

                  break;
                }
                case "riskProfile": {
                
                  item.impact = this.apiService.impacts[item.impact]
                  item.type = this.apiService.riskTypes[item.type]
                  item.severity = this.apiService.severities[item.severity]
                  break;
                }
                case "versionHistory": {
                  item.approvalDate  = new Date(item.approvalDate).toLocaleDateString();
                  item.revisionDate  = new Date(item.revisionDate).toLocaleDateString();
                  item.status = this.apiService.sprintStatuses[item.status];
                  break;
                }
                case "sprint": {
                  item.endDate  = new Date(item.endDate).toLocaleDateString();
                  item.startDate  = new Date(item.startDate).toLocaleDateString();
                  item.status = this.apiService.sprintStatuses[item.status];
                  break;
                }
                default:
                  "test"
              }
              for (const prop in item) {
                if (item.hasOwnProperty(prop) && !prop.toLowerCase().includes('id')) { 
                  rowData.push(item[prop]);
                }
              }
              return rowData;
            });
            const tableName = key.charAt(0).toUpperCase() + key.slice(1);

            doc.text(`Table: ${tableName}`, 10, 10);
            autoTable(doc, {
               // Exclude keys containing 'id' substring from header
              head: [Object.keys(items[0]).filter(key => !key.toLowerCase().includes('id'))],
              body: tableData,
              startY: 20,
            });

            // Add a page break after each table except for the last one
            if (key !== Object.keys(data)[Object.keys(data).length - 1]) {
              doc.addPage();
            }
          }
        });

        doc.save('Report.pdf');
      },
      (err) => console.log(err)
    );


  }
}
