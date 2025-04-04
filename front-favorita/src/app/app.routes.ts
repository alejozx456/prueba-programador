import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { authGuard } from './guards/auth.guard';
import { TransactionsComponent } from './pages/transactions/transactions.component';

export const routes: Routes = [
  {
    path: 'home',component:HomeComponent,canActivate:[authGuard]
  },
  {
    path:'transactions',component:TransactionsComponent,canActivate:[authGuard]
  },
  {
    path:'login',component:LoginComponent
  },
  {
    path:'**',component:LoginComponent
  }
];
