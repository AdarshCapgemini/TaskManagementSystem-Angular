import { CommonModule } from '@angular/common';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AdminNavbarComponent } from "../../admin/admin-navbar/admin-navbar.component";
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { User } from '../../../../models/admin-models/user';
import { AdminService } from '../../../../service/admin-service/admin.service';
import { UserService } from '../../../../service/admin-service/user.service';

declare var bootstrap: any;

@Component({
  selector: 'app-all-users',
  standalone: true,
  imports: [CommonModule, AdminNavbarComponent, RouterModule, MatButtonModule, MatIconModule, MatMenuModule],
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit, AfterViewInit {
  users!: User[];

  constructor(private adminService: AdminService, private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getAllUserWithRoleName().subscribe(
      data => {
        this.users = data;
        console.log(this.users);
      },
      error => {
        console.error('Failed to fetch users', error);
      }
    );
  }

  ngAfterViewInit(): void {
    // Ensure that Bootstrap is loaded and used only in the browser
    if (typeof bootstrap !== 'undefined') {
      const dropdownElements = document.querySelectorAll('.dropdown-toggle');
      dropdownElements.forEach((element) => {
        try {
          new bootstrap.Dropdown(element);
        } catch (e) {
          console.error('Failed to create dropdown', e);
        }
      });
    }
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

  updateUser(userId: number, updatedUser: any): void {
    this.adminService.updateUser(userId, updatedUser).subscribe(
      data => {
        this.users = data;
      },
      error => {
        console.error('Failed to update user', error);
      }
    );
  }

  deleteRole(userRoleId: number, userId: number): void {
    this.userService.revokeUserRoleFromUser(userRoleId, userId).subscribe(
      data => {
        this.users = data;
      },
      error => {
        console.error('Failed to revoke user role', error);
      }
    );
  }
}
