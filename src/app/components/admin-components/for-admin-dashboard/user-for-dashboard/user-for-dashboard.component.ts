import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { User } from '../../../../models/admin-models/user';
import { AdminService } from '../../../../service/admin-service/admin.service';
import { UserService } from '../../../../service/admin-service/user.service';
import { AdminNavbarComponent } from "../../admin/admin-navbar/admin-navbar.component";
@Component({
  selector: 'app-user-for-dashboard',
  standalone: true,
  imports: [CommonModule, AdminNavbarComponent, RouterModule],
  templateUrl: './user-for-dashboard.component.html',
  styleUrl: './user-for-dashboard.component.css'
})
export class UserForDashboardComponent {
  users!: User[];
  countOfUsers!:number

  constructor(private adminService: AdminService, private userService: UserService) {}

  ngOnInit(): void {
    this.getAllUser();
    
  }

  getAllUser():void{
    this.userService.getAllUsers().subscribe(
      data=>{this.users=data;
        this.countOfUsers=data.length;        
      }
    )
  }


  deleteUser(userId: number): void {
    this.adminService.deleteUser(userId).subscribe(
      data => {
        this.users = data;
      },
      error => {
        console.error('Failed to delete user', error);
      }
    );
  }

}
