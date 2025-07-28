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
    this.setupCpfFormatting();
  }


  onSubmit(): void {
    this.loginError = false;

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { cpfEmail, password } = this.form.value;

    this.authService.login(cpfEmail!, password!).subscribe({
      next: (res) => {
        res.success ? this.router.navigate(['/dashboard']) :     this.loginError = true;
      },
      error: () =>     this.loginError = true,
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

private setupCpfFormatting(): void {
  const cpfEmailControl = this.form.get('cpfEmail');

  cpfEmailControl?.valueChanges.subscribe((value) => {
    if (!value) return;

    const digitsOnly = value.replace(/\D/g, '');

    if (digitsOnly.length > 0 && digitsOnly.length <= 11) {
      const formatted = this.formatCpf(digitsOnly);
      cpfEmailControl.setValue(formatted, { emitEvent: false });
    }
  });
}


  private formatCpf(value: string): string {
    const cpf = value.replace(/\D/g, '');

    if (cpf.length <= 3) {
      return cpf;
    }
    if (cpf.length <= 6) {
      return cpf.replace(/(\d{3})(\d+)/, '$1.$2');
    }
    if (cpf.length <= 9) {
      return cpf.replace(/(\d{3})(\d{3})(\d+)/, '$1.$2.$3');
    }
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d+)/, '$1.$2.$3-$4');
  }
}
