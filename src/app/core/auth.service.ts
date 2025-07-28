import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
interface User {
  email: string;
  cpf: string;
  password: string;
  nome: string;
  token: string;
  avatar: string;
}

interface LoginResponse {
  success: boolean;
  token?: string;
  nome?: string;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
 private readonly mockUser: User = {
    email: 'user@navega.com',
    cpf: '987.987.987-99',
    password: '123456',
    nome: 'Adimin User',
    token: 'mocked-jwt-token',
    avatar: './../../assets/avatar.png'
  };
 login(cpfOrEmail: string, password: string): Observable<LoginResponse> {
    if (this.isValidCredentials(cpfOrEmail, password)) {
      this.storeSessionData();
      return of({
        success: true,
        token: this.mockUser.token,
        nome: this.mockUser.nome
      });
    }

    return of({ success: false });
  }

  getUserInfo(): User | null {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  }

  private isValidCredentials(identifier: string, password: string): boolean {
    const isCpfOrEmailMatch =
      identifier === this.mockUser.email || identifier === this.mockUser.cpf;

    return isCpfOrEmailMatch && password === this.mockUser.password;
  }

  private storeSessionData(): void {
    localStorage.setItem('token', JSON.stringify(this.mockUser.token));
    localStorage.setItem('user', JSON.stringify({
      nome: this.mockUser.nome,
      email: this.mockUser.email,
      avatar: this.mockUser.avatar
    }));
  }
}
