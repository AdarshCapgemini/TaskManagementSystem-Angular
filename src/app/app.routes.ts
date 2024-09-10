
////////////////////////////

import { Routes } from "@angular/router";
import { AllAttachmentsComponent } from "./components/admin-components/attachment/all-attachments/all-attachments.component";
import { AdminDashboardComponent } from "./components/admin-components/admin/admin-dashboard/admin-dashboard.component";
import { CommentformComponent } from "./components/user-components/comment/commentform/commentform.component";
import { NotificationComponent } from "./components/user-components/notification/notification.component";
import { CommentComponent } from "./components/user-components/comment/comment.component";
import { AttachmentsComponent } from "./components/user-components/attachments/attachments.component";
import { UserFormComponent } from "./components/user-components/user/user-form/user-form.component";
import { TaskComponent } from "./components/user-components/task/task.component";
import { ProjectComponent } from "./components/user-components/project/project.component";
import { UserDashboardComponent } from "./components/user-components/user-dashboard/user-dashboard.component";
import { AddNewUserroleComponent } from "./components/admin-components/user/add-new-userrole/add-new-userrole.component";
import { RevokeUserroleComponent } from "./components/admin-components/user/revoke-userrole/revoke-userrole.component";
import { AddUserroleComponent } from "./components/admin-components/user/add-userrole/add-userrole.component";
import { ViewTasksByProjectIdComponent } from "./components/admin-components/project/view-tasks-by-project-id/view-tasks-by-project-id.component";
import { UpdateProjectComponent } from "./components/admin-components/project/update-project/update-project.component";
import { AddProjectComponent } from "./components/admin-components/project/add-project/add-project.component";
import { AllProjectsComponent } from "./components/admin-components/project/all-projects/all-projects.component";
import { UpdateUserComponent } from "./components/admin-components/user/update-user/update-user.component";
import { AddTaskToProjectComponent } from "./components/admin-components/project/add-task-to-project/add-task-to-project.component";
import { UserlistComponent } from "./components/admin-components/user/userlist/userlist.component";
import { AllUsersComponent } from "./components/admin-components/user/all-users/all-users.component";
import { AddUserComponent } from "./components/admin-components/user/add-user/add-user.component";
import { AuthenticateComponent } from "./components/admin-components/login/authenticate/authenticate.component";
import { LoginComponent } from "./components/login-component/login/login.component";
import { adminGuard } from "./admin.guard";
import { authGuard } from "./auth.guard";
import { RegistrationComponent } from "./components/login-component/registration/registration.component";
import { AttachmentFormComponent } from "./components/user-components/attachments/attachment-form/attachment-form.component";
import { ViewTasksComponent } from "./components/admin-components/task/view-tasks/view-tasks.component";


export const routes: Routes = [
    //ADMIN ROUTES
    {path:'allAttachments', component:AllAttachmentsComponent },
   // {path:'dashboard', component:UserDashboardComponent},
    {path:'admin-dashboard', component:AdminDashboardComponent, canActivate: [adminGuard]},
    {path:'',component:LoginComponent},
    {path:'register',component:RegistrationComponent},
    {path:'add-user', component:AddUserComponent, canActivate: [adminGuard]},
    {path:'all-users', component:AllUsersComponent, canActivate: [adminGuard]},
    {path:'userlist', component:UserlistComponent, canActivate: [adminGuard]},
    {path: 'allTasks', component:ViewTasksComponent, canActivate: [adminGuard]},
    {path:'add-task-to-project/:projectId', component:AddTaskToProjectComponent, canActivate: [adminGuard]},
    {path:'update-user/:id', component:UpdateUserComponent, canActivate: [adminGuard]},
    {path:'all-projects', component:AllProjectsComponent, canActivate: [adminGuard]},
    {path:'add-project', component:AddProjectComponent, canActivate: [adminGuard]},
    {path:'update-project/:id', component:UpdateProjectComponent, canActivate: [adminGuard]},
    {path:'view-tasks-by-projectId/:projectId', component:ViewTasksByProjectIdComponent, canActivate: [adminGuard]},
    {path:'add-userrole/:userId', component:AddUserroleComponent, canActivate: [adminGuard]},
    {path:'revoke-role/:userId', component:RevokeUserroleComponent, canActivate: [adminGuard]},
    {path:'add-new-userrole', component:AddNewUserroleComponent, canActivate: [adminGuard]},
    {path:'allAttachments',component:AllAttachmentsComponent, canActivate: [adminGuard]},

    //USER ROUTES
    {path:'userDashboard',component:UserDashboardComponent,canActivate: [authGuard]},
    {path:'userProjects', component:ProjectComponent, canActivate: [authGuard] },
    {path:'tasks',component:TaskComponent, canActivate: [authGuard]},
    {path:'task/:projectId', component: TaskComponent, canActivate: [authGuard] },
    {path:'updateUser/:id', component: UserFormComponent, canActivate: [authGuard] },
    {path:'attachments/:taskId', component:AttachmentsComponent, canActivate: [authGuard]},
    {path:'comments/:taskId', component:CommentComponent, canActivate: [authGuard]},
    {path:'notifications', component:NotificationComponent, canActivate: [authGuard]},
    {path:'postComment/:taskId', component:CommentformComponent, canActivate: [authGuard]},
    {path:'postAttachments/:taskId', component:AttachmentFormComponent, canActivate: [authGuard]},
];
