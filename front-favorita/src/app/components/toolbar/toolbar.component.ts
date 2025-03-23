import { Component, inject } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';

import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-toolbar',
  imports: [MatToolbarModule, MatIconModule,MatButtonModule,RouterModule,MatMenuModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {

  api=inject(AuthService)
  username='';
  router=inject(Router)

  cookieRemove=inject(CookieService);

  ngOnInit(): void {
    this.getSession()
  }

  getSession(){
    this.api.getSession().subscribe(response=>{
      console.log(response.user.username);
      this.username=response.user.username;
    })
  }

  logOut(){
    this.api.logout().subscribe(response=>{
      console.log(response)
    });
    this.router.navigate(['/login'])

  }

  getHome(){
    this.router.navigate(['/home']).then(() => {
      window.location.reload();
    })
  }
}
