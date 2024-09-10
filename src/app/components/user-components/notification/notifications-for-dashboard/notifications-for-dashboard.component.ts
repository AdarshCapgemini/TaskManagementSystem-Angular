import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../../../service/user-service/notification.service';
import { CommonModule } from '@angular/common';
import { Notification } from '../../../../models/user-models/notification';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-notifications-for-dashboard',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './notifications-for-dashboard.component.html',
  styleUrl: './notifications-for-dashboard.component.css'
})
export class NotificationsForDashboardComponent implements OnInit{
  notifications!:Notification[]
  notificationCount!:number
  userId = parseInt(localStorage.getItem('userId') || '0', 10);
constructor(private notificationService:NotificationService){}

  ngOnInit(): void {
    this.notificationService.getNotificationByUserId(this.userId).subscribe(
      data=>{this.notifications=data;
        this.notificationCount=data.length;
      },
      error=>{}
    )
  }

}
