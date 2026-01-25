import { Component } from '@angular/core';
import { SHARED_MATERIAL_MODULES } from '../../shared/common/shared-material';
import { TopBarComponent } from '../../auth/top-bar/top-bar.component';

export interface Work {
  date: string;
  projectName: string;
  moduleName: string;
  taskName: string;
  taskType: string;
  priority: string;
  jiraId: string;
  layer: string;
  frontendTech: string;
  backendTech: string;
  componentOrApi: string;
  apiIntegrated: string;
  status: string;
  estimatedHours: number;
  actualHours: number;
  blocker: string;
  repo: string;
  branch: string;
  baseBranch: string;
  prNo: string;
  reviewer: string;
  prStatus: string;
  mergeType: string;
  mergeDate: string;
  deployedTo: string;
  deploymentDate: string;
  deployedBy: string;
  releaseVersion: string;
  verifiedBy: string;
  prodIssue: string;
  prodIssueDesc: string;
  fixApplied: string;
  collaborationWith: string;
  communicationMode: string;
  remarks: string;
}

@Component({
  selector: 'app-work-tracker',
  standalone: true,
  imports: [SHARED_MATERIAL_MODULES, TopBarComponent],
  templateUrl: './work-tracker.component.html',
  styleUrl: './work-tracker.component.scss',
})
export class WorkTrackerComponent {
  works: Work[] = [];
  projects: string[] = ['HRMS', 'SFA', 'DevTrack'];

  totalEntries = 0;
  inProgressCount = 0;
  completedCount = 0;
  totalHours = 0;

  ngOnInit(): void {
    this.works = [
      {
        date: '2026-01-10',
        projectName: 'HRMS',
        moduleName: 'Leave',
        taskName: 'Leave approval UI',
        taskType: 'Feature',
        priority: 'High',
        jiraId: 'HRMS-101',
        layer: 'UI',
        frontendTech: 'Angular',
        backendTech: 'Node.js',
        componentOrApi: 'LeaveApprovalComponent',
        apiIntegrated: 'Yes',
        status: 'Completed',
        estimatedHours: 6,
        actualHours: 7,
        blocker: 'No',
        repo: 'hrms-ui',
        branch: 'feature/leave-ui',
        baseBranch: 'develop',
        prNo: 'PR-45',
        reviewer: 'Tech Lead',
        prStatus: 'Merged',
        mergeType: 'Squash',
        mergeDate: '2026-01-12',
        deployedTo: 'Staging',
        deploymentDate: '2026-01-13',
        deployedBy: 'CI/CD',
        releaseVersion: 'v1.2.0',
        verifiedBy: 'QA',
        prodIssue: 'No',
        prodIssueDesc: '',
        fixApplied: '',
        collaborationWith: 'Backend Team',
        communicationMode: 'Teams',
        remarks: 'Delivered on time',
      },

      {
        date: '2026-01-11',
        projectName: 'SFA',
        moduleName: 'Orders',
        taskName: 'Order list optimization',
        taskType: 'Improvement',
        priority: 'Medium',
        jiraId: 'SFA-203',
        layer: 'UI',
        frontendTech: 'Angular',
        backendTech: 'Java',
        componentOrApi: 'OrderListComponent',
        apiIntegrated: 'Yes',
        status: 'In Progress',
        estimatedHours: 5,
        actualHours: 3,
        blocker: 'API delay',
        repo: 'sfa-ui',
        branch: 'improve/order-list',
        baseBranch: 'develop',
        prNo: '',
        reviewer: '',
        prStatus: 'Pending',
        mergeType: '',
        mergeDate: '',
        deployedTo: '',
        deploymentDate: '',
        deployedBy: '',
        releaseVersion: '',
        verifiedBy: '',
        prodIssue: 'No',
        prodIssueDesc: '',
        fixApplied: '',
        collaborationWith: 'API Team',
        communicationMode: 'Slack',
        remarks: 'Waiting for API fix',
      },

      {
        date: '2026-01-12',
        projectName: 'DevTrack',
        moduleName: 'Tracker',
        taskName: 'Work tracker grid',
        taskType: 'Feature',
        priority: 'High',
        jiraId: 'DT-12',
        layer: 'UI',
        frontendTech: 'Angular',
        backendTech: 'Node.js',
        componentOrApi: 'WorkTrackerComponent',
        apiIntegrated: 'No',
        status: 'Completed',
        estimatedHours: 8,
        actualHours: 9,
        blocker: 'No',
        repo: 'devtrack-ui',
        branch: 'feature/work-grid',
        baseBranch: 'main',
        prNo: 'PR-12',
        reviewer: 'Architect',
        prStatus: 'Merged',
        mergeType: 'Rebase',
        mergeDate: '2026-01-14',
        deployedTo: 'Production',
        deploymentDate: '2026-01-15',
        deployedBy: 'DevOps',
        releaseVersion: 'v1.0.0',
        verifiedBy: 'Product Owner',
        prodIssue: 'No',
        prodIssueDesc: '',
        fixApplied: '',
        collaborationWith: 'Design Team',
        communicationMode: 'Meeting',
        remarks: 'Core feature completed',
      },

      {
        date: '2026-01-13',
        projectName: 'HRMS',
        moduleName: 'Payroll',
        taskName: 'Salary slip API',
        taskType: 'API',
        priority: 'High',
        jiraId: 'HRMS-145',
        layer: 'Backend',
        frontendTech: '',
        backendTech: 'Node.js',
        componentOrApi: 'salarySlipAPI',
        apiIntegrated: 'Yes',
        status: 'Completed',
        estimatedHours: 6,
        actualHours: 6,
        blocker: 'No',
        repo: 'hrms-api',
        branch: 'feature/salary-slip',
        baseBranch: 'main',
        prNo: 'PR-78',
        reviewer: 'Backend Lead',
        prStatus: 'Merged',
        mergeType: 'Merge',
        mergeDate: '2026-01-14',
        deployedTo: 'Production',
        deploymentDate: '2026-01-15',
        deployedBy: 'CI/CD',
        releaseVersion: 'v2.1.0',
        verifiedBy: 'QA',
        prodIssue: 'No',
        prodIssueDesc: '',
        fixApplied: '',
        collaborationWith: 'Finance Team',
        communicationMode: 'Email',
        remarks: 'No issues',
      },
      ...Array.from({ length: 6 }).map((_, i) => ({
        date: `2026-01-${16 + i}`,
        projectName: 'DevTrack',
        moduleName: 'Reports',
        taskName: `Report enhancement ${i + 1}`,
        taskType: 'Enhancement',
        priority: 'Low',
        jiraId: `DT-${20 + i}`,
        layer: 'UI',
        frontendTech: 'Angular',
        backendTech: 'Node.js',
        componentOrApi: 'ReportsModule',
        apiIntegrated: 'Yes',
        status: i % 2 === 0 ? 'Completed' : 'In Progress',
        estimatedHours: 4,
        actualHours: i % 2 === 0 ? 4 : 2,
        blocker: 'No',
        repo: 'devtrack-ui',
        branch: 'feature/reports',
        baseBranch: 'main',
        prNo: '',
        reviewer: '',
        prStatus: '',
        mergeType: '',
        mergeDate: '',
        deployedTo: '',
        deploymentDate: '',
        deployedBy: '',
        releaseVersion: '',
        verifiedBy: '',
        prodIssue: 'No',
        prodIssueDesc: '',
        fixApplied: '',
        collaborationWith: 'QA',
        communicationMode: 'Teams',
        remarks: 'Minor changes',
      })),
    ];

    this.calculateKpis();
  }

  calculateKpis(): void {
    this.totalEntries = this.works.length;
    this.inProgressCount = this.works.filter(
      (w) => w.status === 'In Progress',
    ).length;
    this.completedCount = this.works.filter(
      (w) => w.status === 'Completed',
    ).length;
    this.totalHours = this.works.reduce(
      (sum, w) => sum + (w.actualHours || 0),
      0,
    );
  }
}
