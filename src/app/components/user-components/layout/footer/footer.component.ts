import { Component } from '@angular/core';
import { LoginService } from '../../../../service/login-service/login.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
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


  isSubscribed = false;
  isNotified = false;

  toggleSubscribe() {
    this.isSubscribed = !this.isSubscribed;
  }

  toggleNotification() {
    this.isNotified = !this.isNotified;
  }

}
