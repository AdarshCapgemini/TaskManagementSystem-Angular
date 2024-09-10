import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonEngine } from '@angular/ssr';

import { Router } from '@angular/router';
import { LoginService } from '../../../service/login-service/login.service';
 
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  userLoginForm!: FormGroup;
  showPassword = false;
 
  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {
    this.userLoginForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
 
  login() {
    if (this.userLoginForm.invalid) {
      this.userLoginForm.markAllAsTouched();
      console.error('Form is invalid', this.userLoginForm.errors);
      return;
    }
 
    const { userName, password } = this.userLoginForm.value;
    this.loginService.login(userName, password).subscribe({
      next: response => {
        console.log('Login successful', response);
 
        // Ensure userRoleId is correctly set
        setTimeout(() => {
          const userRoleId = parseInt(localStorage.getItem('userRoleId') || '0', 10);
          if (userRoleId == 1) {
            this.router.navigate(['/admin-dashboard']);
          } else {
            this.router.navigate(['/userDashboard']);
          }
        }, 100); // Adjust timeout if necessary or use a more robust method to ensure completion
      },
      error: error => {
        console.error('Login failed', error);
      }
    });
  }
 
   
 
  navigateToRegister() {
    this.router.navigate(['/register']);
  }
 
  isAuthenticated(): boolean {
    return this.loginService.isAuthenticated();
  }
 
  toggleShowPassword(field: string): void {
    if (field === 'password') {
      this.showPassword = !this.showPassword;
    }
  }
}
 