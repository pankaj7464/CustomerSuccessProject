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
  constructor(private router: Router, private apiService: ApiService) {}

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

  ngOnInit(): void {}

  generatePdf() {
    this.apiService.getAllDataForPdf().subscribe(
      (data) => {
        const doc = new jsPDF();

        Object.keys(data).forEach((key) => {
          const items = data[key].items;
          if (items.length > 0) {
            const tableData = items.map((item: any) => {
              const rowData = [];
              console.log(item );
              for (const prop in item) {
                if (item.hasOwnProperty(prop)) {
                 
                  rowData.push(item[prop]);
                }
              }
              return rowData;
            });
            const tableName = key.charAt(0).toUpperCase() + key.slice(1); // Capitalize the first letter of the key

            doc.text(`Table: ${tableName}`, 10, 10);
            autoTable(doc, {
              head: [Object.keys(items[0])], // Dynamic table headers
              body: tableData,
              startY: 20,
            });

            // Add a page break after each table except for the last one
            if (key !== Object.keys(data)[Object.keys(data).length - 1]) {
              doc.addPage();
            }
          }
        });

        doc.save('data.pdf');
      },
      (err) => console.log(err)
    );
  }
}
