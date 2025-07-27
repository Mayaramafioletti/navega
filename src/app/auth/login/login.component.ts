import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AuthService } from 'src/app/core/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule
  ],
  standalone: true,
})
export class LoginComponent {
  loginError = false;
  showPassword = false;

  form = this.fb.group({
    cpfEmail: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.form.get('cpfEmail')?.valueChanges.subscribe(value => {
      if (!value) return;

      const isCpf = /^\d{0,11}$/.test(value.replace(/\D/g, ''));
      if (isCpf) {
        const formatted = this.formatCpf(value);
        this.form.get('cpfEmail')?.setValue(formatted, { emitEvent: false });
      }
    });
  }


  onSubmit() {
    this.loginError = false;

    if (this.form.valid) {
      const { cpfEmail, password } = this.form.value;

      this.authService.login(cpfEmail!, password!).subscribe({
        next: (res) => {
          if (res.success) {
            this.router.navigate(['/dashboard']);
          } else {
            this.loginError = true;
            console.log('Login inválido: exibindo erro');
          }
        },
        error: () => {
          this.loginError = true;
        }
      });
    } else {
      this.form.markAllAsTouched();
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  private formatCpf(value: string): string {
    value = value.replace(/\D/g, '');

    if (value.length <= 3) {
      return value;
    } else if (value.length <= 6) {
      return value.replace(/(\d{3})(\d+)/, '$1.$2');
    } else if (value.length <= 9) {
      return value.replace(/(\d{3})(\d{3})(\d+)/, '$1.$2.$3');
    } else {
      return value.replace(/(\d{3})(\d{3})(\d{3})(\d+)/, '$1.$2.$3-$4');
    }
  }
}
