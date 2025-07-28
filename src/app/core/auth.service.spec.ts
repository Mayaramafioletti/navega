import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  const mockUser = {
    email: 'user@navega.com',
    cpf: '987.987.987-99',
    password: '123456',
    nome: 'Adimin User',
    token: 'mocked-jwt-token',
    avatar: './../../assets/avatar.png'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
    localStorage.clear();
  });

  describe('login', () => {
    it('should return success true and store session data with valid email and password', (done) => {
      service.login(mockUser.email, mockUser.password).subscribe(res => {
        expect(res.success).toBeTrue();
        expect(res.token).toBe(mockUser.token);
        expect(res.nome).toBe(mockUser.nome);

        const storedToken = JSON.parse(localStorage.getItem('token')!);
        const storedUser = JSON.parse(localStorage.getItem('user')!);

        expect(storedToken).toBe(mockUser.token);
        expect(storedUser.nome).toBe(mockUser.nome);
        expect(storedUser.email).toBe(mockUser.email);
        expect(storedUser.avatar).toBe(mockUser.avatar);

        done();
      });
    });

    it('should return success true with valid CPF and password', (done) => {
      service.login(mockUser.cpf, mockUser.password).subscribe(res => {
        expect(res.success).toBeTrue();
        expect(res.token).toBe(mockUser.token);
        expect(res.nome).toBe(mockUser.nome);
        done();
      });
    });

    it('should return success false with invalid credentials', (done) => {
      service.login('wrong@email.com', 'wrongpassword').subscribe(res => {
        expect(res.success).toBeFalse();
        done();
      });
    });
  });

  describe('getUserInfo', () => {
    it('should return user object when data is in localStorage', () => {
      const storedUser = {
        nome: mockUser.nome,
        email: mockUser.email,
        avatar: mockUser.avatar
      };
      localStorage.setItem('user', JSON.stringify(storedUser));

      const result = service.getUserInfo();
      expect(result).toEqual(jasmine.objectContaining(storedUser));
    });

    it('should return null when no user data is in localStorage', () => {
      localStorage.removeItem('user');
      const result = service.getUserInfo();
      expect(result).toBeNull();
    });
  });
});
