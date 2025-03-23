import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';

import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule,MatCardModule,MatButtonModule,MatInputModule,MatFormFieldModule,FormsModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm!: FormGroup;
  errorMessage: string = '';
  fb=inject(FormBuilder);
  api=inject(AuthService);
  router=inject(Router);

  constructor(){
    this.loginForm = this.fb.group({
      username: [undefined],
      password: [undefined]
    });
  }

  onLogin() {
    const { username, password } = this.loginForm.value;
    this.api.login(username,password).subscribe({
      next:(response)=>{
        console.log(response)
        this.errorMessage='';
        this.router.navigate(['/home']).then(() => {
          window.location.reload();
        })
      },error:(err)=>{
        console.log(err.error.message)
        this.errorMessage=err.error.message
      }
    })
  }

}
