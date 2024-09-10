import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Userrole } from '../../../../models/admin-models/userrole';
import { UserService } from '../../../../service/admin-service/user.service';
import { UserroleService } from '../../../../service/admin-service/userrole.service';
import { AdminNavbarComponent } from "../../admin/admin-navbar/admin-navbar.component";


@Component({
  selector: 'app-revoke-userrole',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AdminNavbarComponent],
  templateUrl: './revoke-userrole.component.html',
  styleUrls: ['./revoke-userrole.component.css']
})
export class RevokeUserroleComponent implements OnInit {
  userRoles!: Userrole[];
  userRoleId!:number;
  userId!:number;
  constructor(private userService: UserService,private route:ActivatedRoute, private userRoleService: UserroleService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userRoleId = +params['userRoleId'];
      this.userId = +params['userId']; 
      this.loadUserRoles();
    });
  }

  revokeUserRoleFromUser(userRoleId: number, userId: number): void {
    this.userRoleService.revokeUserRoleFromUser(userRoleId, userId).subscribe(
      response => {
        console.log('User role revoked successfully', response);
        // Reload user roles after successful deletion
        this.loadUserRoles();
      },
      error => {
        console.error('Error revoking user role', error);
      }
    );
  }

  loadUserRoles(): void {
    this.userService.getUserRolesWithUserId(this.userId).subscribe(
      data => {
        this.userRoles = data;
        console.log(this.userRoles);
      },
      error => {
        console.error('Failed to fetch user roles', error);
      }
    );
  }

  getUserRolesWithUserId(userId:number): void {
    this.userService.getUserRolesWithUserId(userId).subscribe(response => {
      console.log("UserRoles populated");
    });
  }
}
