import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import {  Router, RouterModule } from '@angular/router';
import { User } from '../../../models/user-models/user';
import { UserService } from '../../../service/user-service/user.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit{
  user!:User
  userId = parseInt(localStorage.getItem('userId') || '0', 10);

  constructor(private userService:UserService,private router:Router){}

ngOnInit(): void {
  this.getUserById(this.userId)
}

getUserById(userId: number): void {
  this.userService.getUserById(userId).subscribe(
    (data) => { this.user = data; },
    (error) => { console.log(error); }
  );
}

updateUser(userId:number,updatedUser:any)
  {
    this.userService.updateUser(userId,updatedUser).subscribe(
      data => {this.user=data;
      },
      error=>{}
    )
    
  }


}
