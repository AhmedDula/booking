import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { AuthService } from './auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly loading = signal(false);
  readonly errorMessage = signal<string | null>(null);

  readonly form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

 submit(): void {
  if (this.form.invalid) {
    this.form.markAllAsTouched();
    return;
  }

  this.loading.set(true);
  this.errorMessage.set(null);

  this.authService.login(this.form.getRawValue()).subscribe({
    next: () => {
      const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') ?? '/home';
      this.router.navigateByUrl(returnUrl);
    },
    error: (err: HttpErrorResponse) => {
      this.errorMessage.set(
        err.status === 429
          ? 'Too many attempts. Please wait a moment and try again.'
          : `${err.error.message || 'Could not log you in. Please try again.'}`
      );
      this.loading.set(false);
    }
  });
}
}