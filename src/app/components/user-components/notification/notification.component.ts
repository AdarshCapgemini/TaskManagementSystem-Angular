import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Notification } from '../../../models/user-models/notification';
import { NotificationService } from '../../../service/user-service/notification.service';
import { HeaderComponent } from '../layout/header/header.component';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule,HeaderComponent],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent implements OnInit{
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
