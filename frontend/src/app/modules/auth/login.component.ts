import { Component, inject, signal } from '@angular/core';
import {
  form,
  FormField,
  submit,
  required,
  email,
  minLength
} from '@angular/forms/signals';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { AuthService } from './auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

interface LoginModel {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormField, RouterLink],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly errorMessage = signal<string | null>(null);

  readonly loginModel = signal<LoginModel>({ email: '', password: '' });

  readonly loginForm = form(this.loginModel, (schema) => {
    required(schema.email, { message: 'Email is required' });
    email(schema.email, { message: 'Please enter a valid email address' });
    required(schema.password, { message: 'Password is required' });
    minLength(schema.password, 6, {
      message: 'Password must be at least 6 characters'
    });
  });

  get loading() {
    return this.loginForm().submitting;
  }

  async onSubmit(event: Event): Promise<void> {
    event.preventDefault();
    this.errorMessage.set(null);

    await submit(this.loginForm, async (field) => {
      try {
        await firstValueFrom(this.authService.login(field().value()));

        const returnUrl =
          this.route.snapshot.queryParamMap.get('returnUrl') ?? '/home';
        this.router.navigateByUrl(returnUrl);
        return undefined;
      } catch (err) {
        const httpErr = err as HttpErrorResponse;
        this.errorMessage.set(
          httpErr.status === 429
            ? 'Too many attempts. Please wait a moment and try again.'
            : httpErr.error?.message || 'Could not log you in. Please try again.'
        );
        return undefined;
      }
    });
  }
}