import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute ,Router} from '@angular/router';
import { HeaderComponent } from '../../layout/header/header.component';
import { AttachmentService } from '../../../../service/user-service/attachment.service';
 
@Component({
  selector: 'app-attachment-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HeaderComponent],
  templateUrl: './attachment-form.component.html',
  styleUrl: './attachment-form.component.css'
})
export class AttachmentFormComponent {
 
 
  attachmentForm!: FormGroup;
  userId = parseInt(localStorage.getItem('userId') || '0', 10);
  taskId!: number;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  attachId!:number
 
 
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private attachmentService: AttachmentService
  ) { }
 
  ngOnInit(): void {
    this.attachmentForm = this.fb.group({
      taskId: [null, Validators.required],
      attachmentId: ['', Validators.required],
      fileName: ['', Validators.required],
      filePath: ['', Validators.required]
    });

    this.getAttachmentIdToRegister();

    this.route.params.subscribe(params => {
      this.taskId = params['taskId'];
      console.log(this.taskId);
      this.openForm( this.taskId);
    });
    
  }
 
  openForm(taskId: number): void {
    this.attachmentForm.patchValue({
      taskId: this.taskId,
      
     
    });
  }
 
 
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.attachmentForm.patchValue({
        fileName: file.name,
        filePath: file.webkitRelativePath || `C:/angular/TaskManagementSystemApplication/public/`+file.name // webkitRelativePath is used for directory uploads
      });
    }
  }
 
  onSubmit(): void {
    if (this.attachmentForm.valid) {
      const attachmentData = this.attachmentForm.getRawValue(); // Get the raw value to include disabled fields
      this.attachmentService.uploadAttachment(attachmentData).subscribe(
        response => {
          this.successMessage = 'Attachment added successfully';
          this.errorMessage = null;
          setTimeout(()=>{
            this.router.navigate([`/attachments/${this.taskId}`]);
 
          },1000);
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

  getAttachmentIdToRegister() {
    this.attachmentService.getAllAttachmentIds().subscribe(attachmentIds => {
      let nextId = 1;
      while (attachmentIds.includes(nextId)) {
        nextId++;
      }
      this.attachmentForm.patchValue({ attachmentId: nextId });
    });
  }
}