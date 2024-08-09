import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { UsersComponent } from './components/users/users.component';
import { ChatComponent } from './components/chat/chat.component';
import { LogoutComponent } from './components/logout/logout.component';
import { MembershipsComponent } from './components/memberships/memberships.component';
import { BuymembershipComponent } from './components/buymembership/buymembership.component';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'users',
        component: UsersComponent
    },
    {
        path: 'chats',
        component: ChatComponent
    },
    {
        path: 'logout',
        component: LogoutComponent
    },
    {
        path: 'memberships',
        component: MembershipsComponent
    },
    {
        path: 'buymembership',
        component: BuymembershipComponent
    },
    {
        path: '', redirectTo: 'home', pathMatch: 'full'
    }
];
