import { Component, OnInit } from '@angular/core';
import { Attachment } from '../../../../models/admin-models/attachment';
import { AttachmentService } from '../../../../service/admin-service/attachment.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-attachment-for-dashboard',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './attachment-for-dashboard.component.html',
  styleUrl: './attachment-for-dashboard.component.css'
})
export class AttachmentForDashboardComponent implements OnInit {

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

}
