import { Component, OnInit } from '@angular/core';
import { SingleAttachmentComponent } from '../single-attachment/single-attachment.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Attachment } from '../../../../models/admin-models/attachment';
import { AttachmentService } from '../../../../service/admin-service/attachment.service';
import { ActivatedRoute } from '@angular/router';
import { AdminNavbarComponent } from "../../admin/admin-navbar/admin-navbar.component";


@Component({
  selector: 'app-all-attachments',
  standalone: true,
  imports: [SingleAttachmentComponent, CommonModule, FormsModule, AdminNavbarComponent],
  templateUrl: './all-attachments.component.html',
  styleUrl: './all-attachments.component.css'
})
export class AllAttachmentsComponent implements OnInit {

  attachments!: Attachment[];
  attach!: Attachment;
  attachmentId: number = 1;

  constructor(private attachmentService: AttachmentService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getAllAttachments();
    // Uncomment if you want to fetch a specific attachment by ID on init
    // this.getAttachmentById(this.attachmentId);
  }

  getAllAttachments(): void {
    this.attachmentService.getAllAttachments().subscribe(
      (data) => { this.attachments = data; },
      (error) => { console.log(error); }
    );
  }

  getAttachmentById(attachmentId: number): void {
    this.attachmentService.getAttachmentById(attachmentId).subscribe(
      (data) => { this.attach = data; },
      (error) => { console.log(error); }
    );
  }

  uploadAttachment(attachment: FormData): void {
    this.attachmentService.uploadAttachment(attachment).subscribe(
      (response) => { console.log('Upload successful', response); },
      (error) => { console.log(error); }
    );
  }

  updateAttachment(attachmentId: number, attachment: Attachment): void {
    this.attachmentService.updateAttachment(attachmentId, attachment).subscribe(
      (response) => { console.log('Update successful', response); },
      (error) => { console.log(error); }
    );
  }

  deleteAttachment(attachmentId: number): void {
    this.attachmentService.deleteAttachment(attachmentId).subscribe(
      (response) => { console.log('Delete successful', response); },
      (error) => { console.log(error); }
    );
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      this.uploadAttachment(formData);
    }
  }
}
