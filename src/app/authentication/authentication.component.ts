import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { AuthServiceService } from '../services/auth-service.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-authentication',
  standalone: true,
  imports: [ReactiveFormsModule, MatInputModule, FormsModule, MatFormFieldModule, MatButtonModule, MatIconModule],
  templateUrl: './authentication.component.html',
  styleUrl: './authentication.component.scss'
})
export class AuthenticationComponent implements OnInit{
  loginForm!: FormGroup;
  signupForm!: FormGroup;
  isSignedIn: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthServiceService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  ngOnInit(): void {
  }

  onLogin() {
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    console.log(`Logging in with email: ${email} and password: ${password}`);
    this.authService.login({email, password}).subscribe((response: any) => {
      const token = response.token
      if (token) {
        localStorage.setItem("token", response.token)
      }
      this.router.navigate(["todos"], {queryParams: {id: "qwertyuiop"}})
      console.log(response)
    })
  }

  onSignup() {
    const email = this.signupForm.value.email;
    const password = this.signupForm.value.password;
    console.log(`Signing up with email: ${email}, and password: ${password}`);
    this.authService.signUp({email, password}).subscribe((response: any) => {
      console.log(response)
    })
  }

  switchForm() {
    this.isSignedIn = !this.isSignedIn;
  }

}
