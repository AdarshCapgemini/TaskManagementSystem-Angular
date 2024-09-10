import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { Attachment } from "../../../models/user-models/attachment";
import { AttachmentService } from "../../../service/user-service/attachment.service";
import { TaskService } from "../../../service/user-service/task.service";
import { Task } from "../../../models/user-models/task";
import { HeaderComponent } from "../layout/header/header.component";



@Component({
  selector: 'app-attachments',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent],
  templateUrl: './attachments.component.html',
  styleUrl: './attachments.component.css'
})
export class AttachmentsComponent implements OnInit{

  attachments!:Attachment[]
  task!:Task
  taskId!:number
  userId = parseInt(localStorage.getItem('userId') || '0', 10);

  constructor(
    private attachmentService:AttachmentService,
    private router:Router,
    private route:ActivatedRoute,
    private taskService:TaskService,
  ){}

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.taskId=params['taskId'],
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
