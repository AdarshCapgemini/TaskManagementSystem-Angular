import { Component } from '@angular/core';
import { AllAttachmentsComponent } from "../../attachment/all-attachments/all-attachments.component";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [AllAttachmentsComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

}
