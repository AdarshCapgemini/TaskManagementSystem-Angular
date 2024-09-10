import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private baseUrl = 'http://localhost:8083/api/notifications';
  constructor(private http: HttpClient) { }

  getNotificationByUserId(userId:number):Observable<any>{
    return this.http.get(`${this.baseUrl}/byUserId/${userId}`);
  }
}
