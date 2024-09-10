export class Project {
    projectId: number;
    projectName: string;
    description: string;
    startDate: Date;
    endDate: Date;
    userId!:number;

    constructor(
      projectId: number,
      projectName: string,
      description: string,
      startDate: Date,
      endDate: Date,
    ) {
      this.projectId = projectId;
      this.projectName = projectName;
      this.description = description;
      this.startDate = startDate;
      this.endDate = endDate;
    }
  }
  