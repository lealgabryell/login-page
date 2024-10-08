import { Component } from '@angular/core';
import { DefaultLoginLayoutComponent } from '../../components/default-login-layout/default-login-layout.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';
interface signupForm {
  email: FormControl;
  password: FormControl;
}
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    DefaultLoginLayoutComponent,
    ReactiveFormsModule,
    PrimaryInputComponent,
  ],
  providers: [LoginService, ToastrService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm!: FormGroup<signupForm>;
  constructor(
    private router: Router,
    private LoginService: LoginService,
    private ToastService: ToastrService
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  submit() {
    this.LoginService.login(
      this.loginForm.value.email,
      this.loginForm.value.password
    ).subscribe({
      next: () => this.ToastService.success('Login feito com sucesso!'),
      error: () =>
        this.ToastService.error('Erro inesperado! tente novamente mais tarde.'),
    });
  }
  navigate() {
    this.router.navigate(['/signup']);
  }
}
