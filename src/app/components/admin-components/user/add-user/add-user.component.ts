import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../../service/admin-service/user.service';
import { AdminNavbarComponent } from "../../admin/admin-navbar/admin-navbar.component";

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AdminNavbarComponent],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent implements OnInit{
  userForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';
 
  constructor(private fb: FormBuilder, private userService: UserService,private route:ActivatedRoute,private router:Router) {
    this.userForm = this.fb.group({
      userId:['', Validators.required],
      fullName: ['', Validators.required],
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  ngOnInit(): void {
    this.getUserIdToRegister();
  }
 
  onSubmit() {
    if (this.userForm.valid) {
      this.userService.createUser(this.userForm.value).subscribe(
        response => {
          this.successMessage = 'User added successfully';
          this.errorMessage = ''; // Clear any previous error message

          setTimeout(() => {
            this.router.navigate(['/userlist']); // Redirect to home or another page
          }, 2000);
        },
        error => {
          this.successMessage = ''; // Clear any previous success message
          this.errorMessage = 'Something went wrong. Please try again.';
        }
      );
    }
  }
  isPasswordVisible = false;

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    passwordInput.type = this.isPasswordVisible ? 'text' : 'password';
  }

  getUserIdToRegister() {
    this.userService.getAllUserIds().subscribe(userIds => {
      let nextId = 1;
      while (userIds.includes(nextId)) {
        nextId++;
      }
      this.userForm.patchValue({ userId: nextId });
    });
  }
}
