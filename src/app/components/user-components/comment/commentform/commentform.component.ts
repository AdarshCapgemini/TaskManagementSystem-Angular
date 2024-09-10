import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { CommentService } from "../../../../service/user-service/comment.service";
import { HeaderComponent } from "../../layout/header/header.component";

@Component({
  selector: 'app-commentform',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HeaderComponent],
  templateUrl: './commentform.component.html',
  styleUrls: ['./commentform.component.css']
})
export class CommentformComponent implements OnInit {

  commentForm!: FormGroup;
  userId = parseInt(localStorage.getItem('userId') || '0', 10);
  taskId!: number;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  currentDate!: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private commentService: CommentService,
  ) { }

  ngOnInit(): void {
    this.currentDate = this.getCurrentDateTime();
    this.commentForm = this.fb.group({
      userId: [this.userId, Validators.required],
      taskId: [null, Validators.required],
      commentId: ['', Validators.required],
      text: ['', Validators.required],
      createdAt: [{ value: this.currentDate, disabled: true }, Validators.required]
    });

    this.route.params.subscribe(params => {
      this.taskId = params['taskId'];
      console.log(this.taskId);
      this.openForm(this.userId, this.taskId, this.currentDate);
    });

    this.getCommentIdToRegister();
  }

  openForm(userId: number, taskId: number, date: string): void {
    this.commentForm.patchValue({
      userId: userId,
      taskId: taskId,
      createdAt: date
    });
  }

  getCurrentDateTime(): string {
    const now = new Date();
    return now.toISOString(); // Formats the date as 'YYYY-MM-DDTHH:mm:ss.sssZ'
  }

  onSubmit(): void {
    if (this.commentForm.valid) {
      const commentData = this.commentForm.getRawValue(); // Get the raw value to include disabled fields
      this.commentService.addComment(commentData).subscribe(
        response => {
          this.successMessage = 'Comment added successfully';
          this.errorMessage = null;
          setTimeout(()=>{
            this.router.navigate([`/comments/${this.taskId}`]);

          },2000);
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

  getCommentIdToRegister() {
    this.commentService.getAllCommentIds().subscribe(commentId => {
      let nextId = 1;
      while (commentId.includes(nextId)) {
        nextId++;
      }
      this.commentForm.patchValue({ commentId: nextId });
    });
  }
}
