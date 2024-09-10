import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Attachment } from '../../models/user-models/attachment';

@Injectable({
  providedIn: 'root'
})
export class AttachmentService {
  private apiUrl = 'http://localhost:8083/api/attachments';             

  constructor(private http: HttpClient) { }

  getAttachmentByTaskId(taskId:number):Observable<any>{
    return this.http.get(`${this.apiUrl}/bytaskId/${taskId}`);
  }

  // Get a list of all attachments
  getAllAttachments(): Observable<Attachment[]> {
    return this.http.get<Attachment[]>(`${this.apiUrl}/all`);
  }

  // Get details of a specific attachment by ID
  getAttachmentById(attachmentId: number): Observable<Attachment> {
    return this.http.get<Attachment>(`${this.apiUrl}/${attachmentId}`);
  }

  // Upload a new attachment
  uploadAttachment(attachment: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/post`, attachment);
  }

  // Update attachment details
  updateAttachment(attachmentId: number, attachment: Attachment): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${attachmentId}`, attachment);
  }

  // Delete an attachment
  deleteAttachment(attachmentId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${attachmentId}`);
  }

  getAllAttachmentIds(): Observable<any> {
    return this.http.get<number[]>(`${this.apiUrl}/allattachmentIds`);
  }
}
