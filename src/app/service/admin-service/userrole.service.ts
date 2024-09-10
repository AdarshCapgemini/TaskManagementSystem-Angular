import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserroleService {

  private apiUrl1 = 'http://localhost:8083/api/userrole';
  private apiUrl2 = 'http://localhost:8083/api/userroles';
  
  constructor(private http: HttpClient) { }

  assignUserRoleToUser(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl2}/assign`, data);
  }

  getAllUserRoles(): Observable<any> {
    return this.http.get(`${this.apiUrl1}/all`);
  }
  
  revokeUserRoleFromUser(userRoleId: number, userId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl2}/revoke/${userRoleId}/${userId}`);
  }
  
  createNewUserRole(roleData:any): Observable<any>{
    return this.http.post(`${this.apiUrl1}/post`, roleData)
  }
  getAllRoleIds(): Observable<any> {
    return this.http.get<number[]>(`${this.apiUrl1}/allRoleIds`);
  }
}
