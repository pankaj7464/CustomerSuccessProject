import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './services/api.service';
import * as pdfMake from 'pdfmake/build/pdfmake';
import { TDocumentDefinitions } from 'pdfmake/interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
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
    { path: 'settings', displayName: 'Settings' }
  ];

  tabs: { path: string, displayName: string }[] = [
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
    const dummyData = [
      { name: 'John Doe', age: 30, city: 'New York' },
      { name: 'Jane Smith', age: 25, city: 'Los Angeles' },
      { name: 'Bob Johnson', age: 35, city: 'Chicago' }
    ];

    // Construct PDF content
    const documentDefinition: TDocumentDefinitions = {
      content: [
        { text: 'Dummy Data Table', style: 'header' },
        {
          table: {
            headerRows: 1,
            widths: ['*', '*', '*'],
            body: [
              ['Name', 'Age', 'City'],
              ...dummyData.map(item => [item.name, item.age, item.city])
            ]
          }
        }
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10]
        }
      },
      defaultStyle: {
        font: 'Arial' 
      }
    };

    // Create PDF
    const pdfDocGenerator = pdfMake.createPdf(documentDefinition);
    // Download PDF
    pdfDocGenerator.download('Report.pdf');
  }

  title = 'CustomerSuccessPlatformClient';
}
