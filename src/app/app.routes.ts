import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LogincheckComponent } from './logincheck/logincheck.component';
import { LoginComponent } from './home/login/login.component';
import { PostloginComponent } from './postlogin/postlogin.component';
import { OrdersComponent } from './postlogin/orders/orders.component';
import { DashboardComponent } from './postlogin/dashboard/dashboard.component';
import { UserCardComponent } from './postlogin/settings/userssetup/user-card/user-card.component';
import { UserListComponent } from './postlogin/settings/userssetup/user-list/user-list.component';
import { SettingsComponent } from './postlogin/settings/settings.component';
import { PortfoliosetupComponent } from './postlogin/settings/portfoliosetup/portfoliosetup.component';
import { PortfolioCardComponent } from './postlogin/settings/portfoliosetup/portfolio-card/portfolio-card.component';
import { PortfolioListComponent } from './postlogin/settings/portfoliosetup/portfolio-list/portfolio-list.component';


export const ROUTES: Routes = [
  
  { path: 'home',  component: HomeComponent},
  { path: 'securedpg',  component: PostloginComponent, children: [
    {path: 'orders',  component: OrdersComponent},
    {path: 'dashboard',  component: DashboardComponent},
    {path: 'settings',  component: SettingsComponent, children: [
         {path: 'usersetup',  component: UserListComponent},
         {path: 'portfoliosetup',  component: PortfolioListComponent}      
    ]},     
  ]},  
  {path: 'authchk', component: LogincheckComponent},
  {path: 'login', component: LoginComponent},
  { path: '',  component: HomeComponent}
];

