import { Routes } from '@angular/router';
import { TodoComponent } from '../todo/todo.component';
import { LoginComponent } from '../login/login.component';
import { SingupComponent } from '../singup/singup.component';

export const routes:Routes = [
    {
        path:"", component:TodoComponent, 
    },
    {
        path:"login", component:LoginComponent
    },
    {
        path:"signup", component:SingupComponent
    }
]