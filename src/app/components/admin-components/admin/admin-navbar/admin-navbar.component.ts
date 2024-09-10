import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { UserLoginService } from "../../../../service/admin-service/user-login.service";


@Component({
  selector: 'app-admin-navbar',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './admin-navbar.component.html',
  styleUrl: './admin-navbar.component.css'
})
export class AdminNavbarComponent{
  constructor(private userLoginService:UserLoginService,private router: Router) {}

  logout()
  {
    this.userLoginService.logout();
    this.router.navigate(['']);
  }
}
