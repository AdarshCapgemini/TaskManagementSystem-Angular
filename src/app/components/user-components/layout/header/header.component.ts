import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { LoginComponent } from '../../../login-component/login/login.component';
import { LoginService } from '../../../../service/login-service/login.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private loginService:LoginService, private route:ActivatedRoute, private router:Router) {}
  userRoleId= parseInt(localStorage.getItem('userRoleId') || '0', 10);
  logout()
  {
    this.loginService.logout();
    this.router.navigate(['']);
  }

  visible(){
    if(this.userRoleId===1){
      return true;
    }
    else{
      return false
    }
  }
}
