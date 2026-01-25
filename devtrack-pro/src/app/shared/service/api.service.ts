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
}
