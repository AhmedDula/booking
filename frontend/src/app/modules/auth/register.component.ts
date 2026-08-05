import { Component, inject, signal } from '@angular/core';
import {
  form,
  FormField,
  submit,
  required,
  email,
  minLength,
  validate,
  
} from '@angular/forms/signals';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from './auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

interface RegisterModel {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormField, RouterLink],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  readonly errorMessage = signal<string | null>(null);
  readonly showPassword = signal(false);
  readonly showConfirmPassword = signal(false);

  readonly registerModel = signal<RegisterModel>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  });

 readonly registerForm = form(this.registerModel, (schema) => {
  required(schema.name, { message: 'Name is required' });

  required(schema.email, { message: 'Email is required' });
  email(schema.email, { message: 'Please enter a valid email address' });

  required(schema.password, { message: 'Password is required' });
  minLength(schema.password, 8, {
    message: 'Password must be at least 8 characters',
  });

  required(schema.confirmPassword, { message: 'Please confirm your password' });
  validate(schema.confirmPassword, ({ value, valueOf }) => {
    return value() !== valueOf(schema.password)
      ? { kind: 'mismatch', message: 'Passwords do not match' }
      : null;
  });

  validate(schema.agreeToTerms, ({ value }) => {
    return value() !== true
      ? { kind: 'required', message: 'You must agree to the terms' }
      : null;
  });
});

  get loading() {
    return this.registerForm().submitting;
  }

  togglePassword(): void {
    this.showPassword.update((v) => !v);
  }

  toggleConfirmPassword(): void {
    this.showConfirmPassword.update((v) => !v);
  }

  async onSubmit(event: Event): Promise<void> {
    event.preventDefault();
    this.errorMessage.set(null);

    await submit(this.registerForm, async (field) => {
      try {
        const { name, email, password } = field().value();
        await firstValueFrom(
          this.authService.register({ name, email, password })
        );
        this.router.navigateByUrl('/home');
        return undefined;
      } catch (err) {
        const httpErr = err as HttpErrorResponse;
        this.errorMessage.set(
          httpErr.status === 429
            ? 'Too many attempts. Please wait a moment and try again.'
            : httpErr.error?.message || 'Could not create your account. Please try again.'
        );
        return undefined;
      }
    });
  }
}