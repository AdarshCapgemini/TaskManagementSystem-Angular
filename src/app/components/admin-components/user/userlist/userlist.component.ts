import { AfterViewInit, Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminNavbarComponent } from '../../admin/admin-navbar/admin-navbar.component';
import { RouterModule } from '@angular/router';
import { User } from '../../../../models/admin-models/user';
import { AdminService } from '../../../../service/admin-service/admin.service';
import { UserService } from '../../../../service/admin-service/user.service';

declare var bootstrap: any;

@Component({
  selector: 'app-userlist',
  standalone: true,
  imports: [CommonModule, AdminNavbarComponent, RouterModule, FormsModule],
  templateUrl: './userlist.component.html',
  styleUrl: './userlist.component.css'
})
export class UserlistComponent implements OnInit,AfterViewInit{
  users!: User[];
  user!:User[];
  userId = parseInt(localStorage.getItem('userId') || '0', 10);
  searchQuery: string = '';

  constructor(private adminService: AdminService, private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(
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

  getAllUsers(): void {
    this.userService.getAllUsers().subscribe(
      data => {
        this.users = data;
        this.users.forEach(user => {
          // Add any additional processing if needed
        });
      },
      error => { console.log(error); }
    );
  }
 
 
  filterUsers(): void {
    console.log('Search Query:', this.searchQuery);
    if (this.searchQuery) {
      this.userService.getAllUsers().subscribe(
        data => {
          this.users = data.filter((user: { fullName: string; }) =>
            user.fullName.toLowerCase().includes(this.searchQuery.toLowerCase())
          );
          console.log('Filtered Users:', this.users);
        },
        error => { console.log(error); }
      );
    } else {
      this.getAllUsers();
    }
  }

}
