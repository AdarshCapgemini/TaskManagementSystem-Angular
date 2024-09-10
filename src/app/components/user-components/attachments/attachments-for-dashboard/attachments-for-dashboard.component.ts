import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { Attachment } from '../../../../models/user-models/attachment';
import { Task } from '../../../../models/user-models/task';
import { AttachmentService } from '../../../../service/user-service/attachment.service';
import { TaskService } from '../../../../service/user-service/task.service';

@Component({
  selector: 'app-attachments-for-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './attachments-for-dashboard.component.html',
  styleUrl: './attachments-for-dashboard.component.css'
})
export class AttachmentsForDashboardComponent implements OnInit{

  attachments!:Attachment[]
  task!:Task
  userId = parseInt(localStorage.getItem('userId') || '0', 10);

  constructor(
    private attachmentService:AttachmentService,
    private router:Router,
    private route:ActivatedRoute,
    private taskService:TaskService,
  ){}

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.getAttachmentByTaskId(params['taskId'])
    });
   
  }

  getAttachmentByTaskId(taskId:number):void{
    this.taskService.getTaskByTaskId(taskId).subscribe(
      data=>{this.task=data},
      error=>{}
    )
    this.attachmentService.getAttachmentByTaskId(taskId).subscribe(
      data=>{this.attachments=data},
      error=>{}
    )
  }

}
