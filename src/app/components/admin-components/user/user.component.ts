import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { User } from '../../../models/admin-models/user';
import { UserService } from '../../../service/admin-service/user.service';
import { UpdateUserComponent } from './update-user/update-user.component';
import { RouterModule } from '@angular/router';
import { AdminNavbarComponent } from "../admin/admin-navbar/admin-navbar.component";

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, UpdateUserComponent, RouterModule, AdminNavbarComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit{
  user!:User

  constructor(private userService:UserService){}
  userId = parseInt(localStorage.getItem('userId') || '0', 10);

ngOnInit(): void {
  this.getUserById(this.userId)
}

getUserById(userId: number): void {
  this.userService.getUserById(userId).subscribe(
    (data) => { this.user = data; },
    (error) => { console.log(error); }
  );
}


}
