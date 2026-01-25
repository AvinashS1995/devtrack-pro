import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../common/api-contant';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private commonService: CommonService,
  ) {}

  Login(payload: any): Observable<any> {
    return this.http.post<any>(
      `${this.baseUrl}${API_ENDPOINTS.SERVICE_LOGIN}`,
      payload,
    );
  }

  SaveWorkTrackings(payload: any): Observable<any> {
    return this.http.post<any>(
      `${this.baseUrl}${API_ENDPOINTS.SERVICE_SAVE_WORK_TRACKINGS}`,
      payload,
    );
  }

  GetWorkTrackingsKPI(payload: any): Observable<any> {
    return this.http.post<any>(
      `${this.baseUrl}${API_ENDPOINTS.SERVICE_GET_WORK_TRACKINGS_KPI}`,
      payload,
    );
  }

  GetWorkTrackings(payload: any): Observable<any> {
    return this.http.post<any>(
      `${this.baseUrl}${API_ENDPOINTS.SERVICE_GET_WORK_TRACKINGS}`,
      payload,
    );
  }
  UpdateWorkTrackings(payload: any): Observable<any> {
    return this.http.post<any>(
      `${this.baseUrl}${API_ENDPOINTS.SERVICE_UPDATE_WORK_TRACKINGS}`,
      payload,
    );
  }

  DeleteWorkTrackings(payload: any): Observable<any> {
    return this.http.post<any>(
      `${this.baseUrl}${API_ENDPOINTS.SERVICE_DELETE_WORK_TRACKINGS}`,
      payload,
    );
  }
}
