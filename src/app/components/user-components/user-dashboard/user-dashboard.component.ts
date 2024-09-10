import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { FooterComponent } from "../layout/footer/footer.component";
import { HeaderComponent } from '../layout/header/header.component';
import { SidebarComponent } from "../layout/sidebar/sidebar.component";
import { DashBoardProjectComponent } from "../project/dash-board-project/dash-board-project.component";
import { ProjectComponent } from "../project/project.component";
import { DashBoardTaskComponent } from "../task/dash-board-task/dash-board-task.component";
import { TaskComponent } from "../task/task.component";
import { UserComponent } from "../user/user.component";
import { error } from 'console';
import { CommentComponent } from "../comment/comment.component";
import { RouterModule } from '@angular/router';
import { NotificationComponent } from "../notification/notification.component";
import { User } from '../../../models/user-models/user';
import { ProjectService } from '../../../service/user-service/project.service';
import { TaskService } from '../../../service/user-service/task.service';
import { AttachmentsForDashboardComponent } from "../attachments/attachments-for-dashboard/attachments-for-dashboard.component";
import { NotificationsForDashboardComponent } from "../notification/notifications-for-dashboard/notifications-for-dashboard.component";

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [RouterModule, CommonModule, HeaderComponent, SidebarComponent, UserComponent, ProjectComponent, TaskComponent, FooterComponent, DashBoardTaskComponent, DashBoardProjectComponent, CommentComponent, NotificationComponent, AttachmentsForDashboardComponent, NotificationsForDashboardComponent],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent implements OnInit {
  user!: User
  projectCount!:number
  TaskCount!:number
  completedTaskCount!:number
  overdueTaskCount!:number
  userId = parseInt(localStorage.getItem('userId') || '0', 10);

  constructor(private projectService:ProjectService, private taskService:TaskService) { }

  ngOnInit(): void {
    this.projectService.getProjectByUserId(this.userId).subscribe(
      data => {this.projectCount=data.length},
      error=>{}
    )
    this.taskService.getTaskByUserId(this.userId).subscribe(
      data =>{this.TaskCount =data.length},
      error =>{}
    )
    this.taskService.getTaskByUserIdAndStatus(this.userId,'Completed').subscribe(
      data =>{this.completedTaskCount=data.length},
      error=>{}
    )
    this.taskService.getTaskByUserIdAndStatus(this.userId,'Pending').subscribe(
      data => { this.overdueTaskCount=data.length},
      error=>{}
    )

  }

  
  


}
