import { ComponentFixture, TestBed, fakeAsync, tick } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { Router } from "@angular/router";
import { of, throwError } from "rxjs";
import { AuthService } from "src/app/core/auth.service";
import { LoginComponent } from "./login.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['login']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [
        LoginComponent,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatSelectModule,
         BrowserAnimationsModule,
      ],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve iniciar o formulário com campos vazios', () => {
    expect(component.form.value).toEqual({ cpfEmail: '', password: '' });
  });

  it('deve invalidar o formulário se campos estiverem vazios', () => {
    component.form.setValue({ cpfEmail: '', password: '' });
    expect(component.form.valid).toBeFalse();
  });

  it('deve formatar CPF corretamente ao digitar', fakeAsync(() => {
    const inputControl = component.form.get('cpfEmail');
    inputControl?.setValue('12345678901');
    tick(); // aguarda o valueChanges
    expect(inputControl?.value).toBe('123.456.789-01');
  }));

  it('não deve formatar se não for CPF', fakeAsync(() => {
    const inputControl = component.form.get('cpfEmail');
    inputControl?.setValue('user@email.com');
    tick();
    expect(inputControl?.value).toBe('user@email.com');
  }));

  it('deve fazer login com sucesso e redirecionar para dashboard', () => {
    component.form.setValue({ cpfEmail: 'user@navega.com', password: '123456' });
    authServiceSpy.login.and.returnValue(of({ success: true }));

    component.onSubmit();

    expect(authServiceSpy.login).toHaveBeenCalledWith('user@navega.com', '123456');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/dashboard']);
    expect(component.loginError).toBeFalse();
  });

  it('deve exibir erro se login for inválido (success: false)', () => {
    component.form.setValue({ cpfEmail: 'user@navega.com', password: '123456' });
    authServiceSpy.login.and.returnValue(of({ success: false }));

    component.onSubmit();

    expect(component.loginError).toBeTrue();
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });

it('deve exibir erro se o login lançar erro (ex: 500)', fakeAsync(() => {
  component.form.setValue({ cpfEmail: 'user@navega.com', password: '123456' });
  authServiceSpy.login.and.returnValue(throwError(() => new Error('Erro interno')));

  component.onSubmit();
  tick();

  expect(component.loginError).toBeTrue();
  expect(routerSpy.navigate).not.toHaveBeenCalled();
}));
  it('deve marcar campos como tocados se formulário for inválido', () => {
    spyOn(component.form, 'markAllAsTouched');
    component.onSubmit();
    expect(component.form.markAllAsTouched).toHaveBeenCalled();
  });

  it('deve alternar a visibilidade da senha', () => {
    expect(component.showPassword).toBeFalse();
    component.togglePasswordVisibility();
    expect(component.showPassword).toBeTrue();
    component.togglePasswordVisibility();
    expect(component.showPassword).toBeFalse();
  });

  it('deve formatar corretamente diferentes tamanhos de CPF', () => {
    expect(component['formatCpf']('1')).toBe('1');
    expect(component['formatCpf']('123')).toBe('123');
    expect(component['formatCpf']('1234')).toBe('123.4');
    expect(component['formatCpf']('123456')).toBe('123.456');
    expect(component['formatCpf']('123456789')).toBe('123.456.789');
    expect(component['formatCpf']('12345678901')).toBe('123.456.789-01');
  });
});
