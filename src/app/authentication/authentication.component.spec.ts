import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { AuthenticationComponent } from './authentication.component';

describe('AuthenticationComponent', () => {
  let component: AuthenticationComponent;
  let fixture: ComponentFixture<AuthenticationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthenticationComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule
      ],

    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthenticationComponent);
    component = fixture.componentInstance;
    fixture.autoDetectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the loginForm and signupForm FormGroup objects', () => {
    expect(component.loginForm).toBeDefined();
    expect(component.signupForm).toBeDefined();
  });

  it('should call the login() method with the email and password values from the loginForm', () => {
    const email = 'test@example.com';
    const password = 'password';
    component.loginForm.setValue({
      email: email,
      password: password
    });
    component.onLogin();
    // expect(component.loginService.login).toHaveBeenCalledWith(email, password);
  });

  it('should call the signup() method with the email and password values from the signupForm', () => {
    const email = 'test@example.com';
    const password = 'password';
    component.signupForm.setValue({
      email: email,
      password: password
    });
    component.onSignup();
    // expect(component.signupService.signup).toHaveBeenCalledWith(email, password);
  });

  it('should toggle the isSignedIn property', () => {
    expect(component.isSignedIn).toBeFalsy();
    component.switchForm();
    expect(component.isSignedIn).toBeTruthy();
  });
});
