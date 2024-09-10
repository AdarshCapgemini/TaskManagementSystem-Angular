import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { AllAttachmentsComponent } from "../attachment/all-attachments/all-attachments.component";
import { HeaderComponent } from '../layout/header/header.component';
import { SidebarComponent } from "../layout/sidebar/sidebar.component";
import { UserComponent } from "../user/user.component";
import { ProjectComponent } from "../project/project.component";
import { TaskComponent } from "../task/task.component";
import { User } from '../../../models/admin-models/user';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule, HeaderComponent, AllAttachmentsComponent, SidebarComponent, UserComponent, ProjectComponent, TaskComponent],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent implements OnInit {
  user!: User

  constructor() { }

  ngOnInit(): void {

  }


}
