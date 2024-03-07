import { AuthService } from './../services/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private authService: AuthService) {}
  login(form: any) {
    this.authService.login(form.value.email, form.value.password);
  }

  password: string = ''; // Initialize with an empty password
  showPassword: boolean = false; // Initially, password is hidden
  passwordFieldType: 'password' | 'text' = 'password'; // Initially, input type is 'password'

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
    this.passwordFieldType = this.showPassword ? 'text' : 'password';
  }
}
