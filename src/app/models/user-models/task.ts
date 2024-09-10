import { Attachment } from "./attachment";

export class Task {
    taskId!: number;
    taskName!: string;
    description!: string;
    dueDate!: Date;
    priority!: string;
    status!: string;
    countOfComment!:number;
    comments!:Comment;
    countOfAttachment!:number;
    attachments!:Attachment;
}
