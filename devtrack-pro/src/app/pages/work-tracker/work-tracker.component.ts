import { Component, ViewChild } from '@angular/core';
import { SHARED_MATERIAL_MODULES } from '../../shared/common/shared-material';
import { TopBarComponent } from '../../auth/top-bar/top-bar.component';
import { DxDataGridComponent } from 'devextreme-angular';
import { ApiService } from '../../shared/service/api.service';
import { CommonService } from '../../shared/service/common.service';
import { exportDataGrid } from 'devextreme/excel_exporter';
import * as ExcelJS from 'exceljs';
import saveAs from 'file-saver';

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
  @ViewChild(DxDataGridComponent) dataGrid!: DxDataGridComponent;

  works: Work[] = [];
  projects: string[] = ['HRMS', 'SFA', 'DevTrack'];

  totalEntries = 0;
  inProgressCount = 0;
  completedCount = 0;
  totalHours = 0;

  /* DROPDOWN DATA */
  priorityList = [
    { value: 'High', label: 'High' },
    { value: 'Medium', label: 'Medium' },
    { value: 'Low', label: 'Low' },
  ];

  statusList = [
    { value: 'In Progress', label: 'In Progress' },
    { value: 'Completed', label: 'Completed' },
    { value: 'Blocked', label: 'Blocked' },
  ];

  yesNoList = [
    { value: 'Yes', label: 'Yes' },
    { value: 'No', label: 'No' },
  ];

  deployList = [
    { value: 'Dev', label: 'Dev' },
    { value: 'Staging', label: 'Staging' },
    { value: 'Production', label: 'Production' },
  ];

  constructor(
    private apiService: ApiService,
    private commonService: CommonService,
  ) {}

  ngOnInit(): void {
    this.loadWorks();
    this.loadKpis();
  }

  loadWorks() {
    this.apiService
      .GetWorkTrackings({
        empNo: this.commonService.getCurrentUserDetails().empNo || '',
      })
      .subscribe((res) => {
        this.works = res.data || [];
      });
  }

  loadKpis() {
    this.apiService
      .GetWorkTrackingsKPI({
        empNo: this.commonService.getCurrentUserDetails().empNo || '',
      })
      .subscribe((res) => {
        const kpi = res.data;
        this.totalEntries = kpi.totalEntries;
        this.inProgressCount = kpi.inProgressCount;
        this.completedCount = kpi.completedCount;
        this.totalHours = kpi.totalHours;
      });
  }

  onRowInserted(e: any) {
    const payload = {
      date: e.data.date || '',
      projectName: e.data.projectName || '',
      moduleName: e.data.moduleName || '',
      taskName: e.data.taskName || '',
      taskType: e.data.taskType || '',
      priority: e.data.priority || '',
      jiraId: e.data.jiraId || '',

      layer: e.data.layer || '',
      frontendTech: e.data.frontendTech || '',
      backendTech: e.data.backendTech || '',
      componentOrApi: e.data.componentOrApi || '',
      apiIntegrated: e.data.apiIntegrated || '',

      status: e.data.status || '',
      estimatedHours: e.data.estimatedHours || 0,
      actualHours: e.data.actualHours || 0,

      startDate: e.data.startDate || '',
      endDate: e.data.endDate || '',

      blocker: e.data.blocker || '',

      repo: e.data.repo || '',
      branch: e.data.branch || '',
      baseBranch: e.data.baseBranch || '',
      prNo: e.data.prNo || '',
      reviewer: e.data.reviewer || '',
      prStatus: e.data.prStatus || '',
      mergeType: e.data.mergeType || '',
      mergeDate: e.data.mergeDate || '',

      deployedTo: e.data.deployedTo || '',
      deploymentDate: e.data.deploymentDate || '',
      deployedBy: e.data.deployedBy || '',
      releaseVersion: e.data.releaseVersion || '',
      verifiedBy: e.data.verifiedBy || '',

      prodIssue: e.data.prodIssue || '',
      prodIssueDesc: e.data.prodIssueDesc || '',
      fixApplied: e.data.fixApplied || '',

      collaborationWith: e.data.collaborationWith || '',
      communicationMode: e.data.communicationMode || '',
      remarks: e.data.remarks || '',

      empNo: this.commonService.getCurrentUserDetails().empNo || '',
    };

    console.log('INSERT PAYLOAD', payload);

    this.apiService.SaveWorkTrackings(payload).subscribe(() => {
      this.loadKpis();
    });
  }

  onRowUpdated(e: any) {
    const payload = {
      id: e.key || '',
      date: e.data.date || '',
      projectName: e.data.projectName || '',
      moduleName: e.data.moduleName || '',
      taskName: e.data.taskName || '',
      taskType: e.data.taskType || '',
      priority: e.data.priority || '',
      jiraId: e.data.jiraId || '',

      layer: e.data.layer || '',
      frontendTech: e.data.frontendTech || '',
      backendTech: e.data.backendTech || '',
      componentOrApi: e.data.componentOrApi || '',
      apiIntegrated: e.data.apiIntegrated || '',

      status: e.data.status || '',
      estimatedHours: e.data.estimatedHours || 0,
      actualHours: e.data.actualHours || 0,

      startDate: e.data.startDate || '',
      endDate: e.data.endDate || '',

      blocker: e.data.blocker || '',

      repo: e.data.repo || '',
      branch: e.data.branch || '',
      baseBranch: e.data.baseBranch || '',
      prNo: e.data.prNo || '',
      reviewer: e.data.reviewer || '',
      prStatus: e.data.prStatus || '',
      mergeType: e.data.mergeType || '',
      mergeDate: e.data.mergeDate || '',

      deployedTo: e.data.deployedTo || '',
      deploymentDate: e.data.deploymentDate || '',
      deployedBy: e.data.deployedBy || '',
      releaseVersion: e.data.releaseVersion || '',
      verifiedBy: e.data.verifiedBy || '',

      prodIssue: e.data.prodIssue || '',
      prodIssueDesc: e.data.prodIssueDesc || '',
      fixApplied: e.data.fixApplied || '',

      collaborationWith: e.data.collaborationWith || '',
      communicationMode: e.data.communicationMode || '',
      remarks: e.data.remarks || '',
    };

    console.log('Update PAYLOAD', payload);

    this.apiService.UpdateWorkTrackings(payload).subscribe(() => {
      this.loadKpis();
    });
  }

  onRowRemoved(e: any) {
    const payload = {
      id: e.key || '',
    };

    console.log('DELETE PAYLOAD', payload);

    this.apiService.DeleteWorkTrackings(payload).subscribe(() => {
      this.loadKpis();
    });
  }

  onExporting(e: any) {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Work Tracker');

    exportDataGrid({
      component: e.component,
      worksheet,
      autoFilterEnabled: true,
    }).then(() => {
      workbook.xlsx.writeBuffer().then((buffer) => {
        saveAs(
          new Blob([buffer], { type: 'application/octet-stream' }),
          `Work_Tracker_${new Date().toISOString().slice(0, 10)}.xlsx`,
        );
      });
    });

    e.cancel = true;
  }
}
