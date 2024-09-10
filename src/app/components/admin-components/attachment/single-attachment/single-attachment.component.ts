import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import { RouterModule } from '@angular/router';
import { Attachment } from '../../../../models/admin-models/attachment';

@Component({
  selector: 'app-single-attachment',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './single-attachment.component.html',
  styleUrl: './single-attachment.component.css'
})
export class SingleAttachmentComponent {
  @Input({required:true}) attachment!:Attachment

}
