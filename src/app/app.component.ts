
//import { UserDashboardComponent } from "./components/user-dashboard/user-dashboard.component";

import { RouterOutlet } from "@angular/router";
import { AllAttachmentsComponent } from "./components/admin-components/attachment/all-attachments/all-attachments.component";
import { UserDashboardComponent } from "./components/user-components/user-dashboard/user-dashboard.component";
import { AdminDashboardComponent } from "./components/admin-components/admin/admin-dashboard/admin-dashboard.component";
import { AdminNavbarComponent } from "./components/admin-components/admin/admin-navbar/admin-navbar.component";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { HeaderComponent } from "./components/user-components/layout/header/header.component";
import { TaskComponent } from "./components/user-components/task/task.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AllAttachmentsComponent, UserDashboardComponent, AdminDashboardComponent, AdminNavbarComponent, ReactiveFormsModule, CommonModule, HeaderComponent, TaskComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'TaskManagementsystemApplication';
  showForm: boolean = false;

  onCardSelected(type: string) {
    this.showForm = true;
    const adminCard = document.getElementById('admin-card');
    const userCard = document.getElementById('user-card');

    if (type === 'admin') {
      if (userCard) {
        userCard.style.opacity = '0';
        setTimeout(() => userCard.style.display = 'none', 300);
      }
    } else {
      if (adminCard) {
        adminCard.style.opacity = '0';
        setTimeout(() => adminCard.style.display = 'none', 300);
      }
    }
  }
}

