import { Task } from "./task";

export class Project {
    projectId: number;
    projectName: string;
    description: string;
    startDate: Date;
    endDate: Date;
    taskcount !: number
    tasks!:Task
  
    constructor(
      projectId: number,
      projectName: string,
      description: string,
      startDate: Date,
      endDate: Date
    ) {
      this.projectId = projectId;
      this.projectName = projectName;
      this.description = description;
      this.startDate = startDate;
      this.endDate = endDate;
    }
  }
  