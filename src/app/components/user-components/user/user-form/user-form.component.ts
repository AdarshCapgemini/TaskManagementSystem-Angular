import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../../models/user-models/user';
import { UserService } from '../../../../service/user-service/user.service';
import { HeaderComponent } from "../../layout/header/header.component";


@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HeaderComponent],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent implements OnInit{

  userForm!: FormGroup;
  user!: User
  successMessage: string | null = null;
  errorMessage: string | null = null;
  constructor(private fb: FormBuilder, private userService: UserService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.getUserById(params['id'])
    });

    this.userForm = this.fb.group({
      userId: ['', Validators.required],
      userName: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
      password: ['', [Validators.required, Validators.maxLength(500)]],
      email: ['', Validators.required],
      fullName: ['', Validators.required]
    });


  }
  getUserById(userId: number): void {
    this.userService.getUserById(userId).subscribe(
      data => {
        this.user = data;
        this.openForm(this.user)
      }
    )
  }

  openForm(user: User): void {
    this.userForm.patchValue({
      userId: user.userId,
      userName: user.userName,
      password: user.password,
      fullName: user.fullName,
      email: user.email
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const userId = this.userForm.value.userId;
      const user = this.userForm.value;
      this.userService.updateUser(userId, user).subscribe(
        response => {
          this.successMessage = 'User updated successfully';
          this.errorMessage = null;
          setTimeout(() => {
            this.router.navigate(['/userDashboard']);
          }, 2000);
        },
        error => {
          this.errorMessage = 'Something went wrong';
          this.successMessage = null;
        }
      );
    } else {
      this.errorMessage = 'Invalid form';
      this.successMessage = null;
    }
  }


}

