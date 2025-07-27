import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private mockUser = {
    email: 'user@navega.com',
    cpf: '987.987.987-99',
    password: '123456',
    name: 'Adimin User',
    token: 'mocked-jwt-token',
    avatar: './../../assets/avatar.png'
  };

  login(cpfEmail: string, password: string): Observable<{ success: boolean; token?: string; name?: string }> {
    const isValid = (cpfEmail === this.mockUser.email || cpfEmail === this.mockUser.cpf) &&
      password === this.mockUser.password;

    if (isValid) {
      localStorage.setItem('token', JSON.stringify(this.mockUser.token));
      if (isValid) {
        localStorage.setItem('token', JSON.stringify(this.mockUser.token));
        localStorage.setItem('user', JSON.stringify({
          name: this.mockUser.name,
          email: this.mockUser.email,
          avatar: this.mockUser.avatar
        }));
        return of({
          success: true,
          token: this.mockUser.token,
          name: this.mockUser.name
        });
      }

    }

    return of({ success: false });
  }
  getUserInfo() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
}
