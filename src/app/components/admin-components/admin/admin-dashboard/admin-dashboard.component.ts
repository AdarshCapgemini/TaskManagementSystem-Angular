import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { ProjectService } from "../../../../service/admin-service/project.service";
import { TaskService } from "../../../../service/admin-service/task.service";
import { FooterComponent } from "../../../user-components/layout/footer/footer.component";
import { NotificationComponent } from "../../../user-components/notification/notification.component";
import { DashBoardProjectComponent } from "../../../user-components/project/dash-board-project/dash-board-project.component";
import { DashBoardTaskComponent } from "../../../user-components/task/dash-board-task/dash-board-task.component";
import { UserForDashboardComponent } from "../../for-admin-dashboard/user-for-dashboard/user-for-dashboard.component";
import { AllProjectsComponent } from "../../project/all-projects/all-projects.component";
import { ViewTasksComponent } from "../../task/view-tasks/view-tasks.component";
import { UserComponent } from "../../user/user.component";
import { AdminNavbarComponent } from "../admin-navbar/admin-navbar.component";

import { RouterModule } from "@angular/router";
import { AttachmentsForDashboardComponent } from "../../../user-components/attachments/attachments-for-dashboard/attachments-for-dashboard.component";
import { AllAttachmentsComponent } from "../../attachment/all-attachments/all-attachments.component";
import { AttachmentForDashboardComponent } from "../../for-admin-dashboard/attachment-for-dashboard/attachment-for-dashboard.component";
import { ProjectForDashboardComponent } from "../../for-admin-dashboard/project-for-dashboard/project-for-dashboard.component";
import { TaskComponent } from "../../for-admin-dashboard/task/task.component";
import { NotificationsForDashboardComponent } from "../../../user-components/notification/notifications-for-dashboard/notifications-for-dashboard.component";




@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, AdminNavbarComponent,
    ViewTasksComponent, NotificationComponent,
    AllProjectsComponent, FooterComponent,
    DashBoardProjectComponent, DashBoardTaskComponent,
    UserComponent, UserForDashboardComponent,
    AttachmentsForDashboardComponent,
    AllAttachmentsComponent,
    TaskComponent, ProjectForDashboardComponent, RouterModule, AttachmentForDashboardComponent, NotificationsForDashboardComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {
  
  // user!: User
  projectCountOfAdmin!:number
  taskCountOfAdmin!:number
  completedTaskCountOfAdmin!:number
  overdueTaskCountOfAdmin!:number
  pendingTaskCountOfAdmin!:number
  dueSoonCountAdmin!:number
  highPriorityCount!:number
  MediumPriorityCount!:number
  LowPriorityCount!:number
  userId = parseInt(localStorage.getItem('userId') || '0', 10);

  constructor(private projectUserService:ProjectService, private taskAdminService:TaskService) { }

  ngOnInit(): void {
    this.projectUserService.getAllProjects().subscribe(
      data => {this.projectCountOfAdmin=data.length},
      error=>{}
    )
    this.taskAdminService.getAllTask().subscribe(
      data =>{this.taskCountOfAdmin =data.length},
      error =>{}
    )
    this.taskAdminService.getOverdueTasks().subscribe(
      data =>{this.overdueTaskCountOfAdmin=data.length},
      error=>{}
    )
    this.taskAdminService.getTaskByStatus('Pending').subscribe(
      data => { this.pendingTaskCountOfAdmin=data.length},
      error=>{}
    )
    this.taskAdminService.getTaskByStatus('Completed').subscribe(
      data=>{this.completedTaskCountOfAdmin=data.length},
      error=>{}
    )
    this.taskAdminService.getTasksDueSoon().subscribe(
      data=>{this.dueSoonCountAdmin=data.length},
      error=>{}
    )
    this.taskAdminService.getTasksByPriority('High').subscribe(
      data=>{this.highPriorityCount=data.length},
      error=>{}
    )
    this.taskAdminService.getTasksByPriority('Medium').subscribe(
      data=>{this.MediumPriorityCount=data.length},
      error=>{}
    )
    this.taskAdminService.getTasksByPriority('Low').subscribe(
      data=>{this.LowPriorityCount=data.length},
      error=>{}
    )
    
  }
}
