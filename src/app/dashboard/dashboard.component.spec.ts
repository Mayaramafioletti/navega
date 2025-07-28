import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of, throwError } from 'rxjs';
import { AuthService } from '../core/auth.service';
import { DashboardService } from '../core/dashboard.service';
import { ActivatedRoute } from '@angular/router';
interface DashboardStatistics {
  orders: number;
  revenue: number;
  activePlans: number;
}

interface DashboardCard {
  tipo: string;
  valor: string;
  percentual: string;
  cor: string;
}

interface DashboardData {
  statistics: DashboardStatistics;
  cards: DashboardCard[];
  chartData: number[];
}

interface User {
  avatar: string;
  nome: string;
  email: string;
}

describe('DashboardComponent', () => {
 let fixture: ComponentFixture<DashboardComponent>;
  let component: DashboardComponent;

  let authServiceMock: jasmine.SpyObj<AuthService>;
  let dashboardServiceMock: jasmine.SpyObj<DashboardService>;

  const mockUser: User = {
    avatar: 'assets/avatar.png',
    nome: 'Usuário Teste',
    email: 'teste@example.com',
  };

  const mockDashboardData: DashboardData = {
    statistics: {
      orders: 10,
      revenue: 3200,
      activePlans: 2,
    },
    cards: [
      { tipo: 'Contribuição mensal', valor: 'R$ 500,00', percentual: '5%', cor: 'red' },
      { tipo: 'Contribuição voluntária', valor: 'R$ 500,00', percentual: '', cor: 'blue' },
    ],
    chartData: [499999.99, 499999.99],
  };

  beforeEach(waitForAsync(() => {
    authServiceMock = jasmine.createSpyObj<AuthService>('AuthService', ['getUserInfo']);
    dashboardServiceMock = jasmine.createSpyObj<DashboardService>('DashboardService', ['getDashboardData']);

    TestBed.configureTestingModule({
      imports: [DashboardComponent], // componente standalone
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: DashboardService, useValue: dashboardServiceMock },
         { provide: ActivatedRoute, useValue: { params: of({}) } },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(DashboardComponent);
        component = fixture.componentInstance;
      });
  }));

  afterEach(() => {
    // limpa possíveis spies no localStorage
    if ((localStorage.getItem as any).and) {
      (localStorage.getItem as any).and.stub();
    }
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve inicializar user como null e dashboardData como null antes do ngOnInit', () => {
    expect(component.user).toBeNull();
    expect(component.dashboardData).toBeNull();
  });

  it('deve carregar as informações do usuário via AuthService ao inicializar (com detectChanges)', () => {
    authServiceMock.getUserInfo.and.returnValue(mockUser);
    spyOn(localStorage, 'getItem').and.returnValue(null); // sem token, não chama o service do dashboard

    fixture.detectChanges(); // dispara ngOnInit

    expect(authServiceMock.getUserInfo).toHaveBeenCalledTimes(1);
    expect(component.user).toEqual(mockUser);
    expect(dashboardServiceMock.getDashboardData).not.toHaveBeenCalled();
    expect(component.dashboardData).toBeNull();
  });

  it('deve carregar o dashboardData quando houver token no localStorage', fakeAsync(() => {
    authServiceMock.getUserInfo.and.returnValue(mockUser);
    spyOn(localStorage, 'getItem').and.returnValue('fake-token');
    dashboardServiceMock.getDashboardData.and.returnValue(of(mockDashboardData));

    fixture.detectChanges(); // ngOnInit
    tick();

    expect(dashboardServiceMock.getDashboardData).toHaveBeenCalledWith('fake-token');
    expect(component.dashboardData).toEqual(mockDashboardData);
  }));

  it('não deve chamar getDashboardData quando não houver token', () => {
    authServiceMock.getUserInfo.and.returnValue(mockUser);
    spyOn(localStorage, 'getItem').and.returnValue(null);

    fixture.detectChanges();

    expect(dashboardServiceMock.getDashboardData).not.toHaveBeenCalled();
    expect(component.dashboardData).toBeNull();
  });

  it('deve tratar erro ao carregar o dashboardData e logar no console', fakeAsync(() => {
    authServiceMock.getUserInfo.and.returnValue(mockUser);
    spyOn(localStorage, 'getItem').and.returnValue('fake-token');

    const consoleErrorSpy = spyOn(console, 'error');
    dashboardServiceMock.getDashboardData.and.returnValue(
      throwError(() => new Error('Falha na API'))
    );

    fixture.detectChanges();
    tick();

    expect(dashboardServiceMock.getDashboardData).toHaveBeenCalledTimes(1);
    expect(consoleErrorSpy).toHaveBeenCalled();
    expect(component.dashboardData).toBeNull();
  }));

  it('deve possuir 8 itens de menu conforme configuração', () => {
    // como menuItems é readonly, basta validar o conteúdo
    expect(component.menuItems.length).toBe(8);

    const labels = component.menuItems.map(i => i.nome);
    expect(labels).toContain('Ver Extrato');
    expect(labels).toContain('Contribuição Mensal');
    expect(labels).toContain('Contribuição Extra');
    expect(labels).toContain('Documentos');
    expect(labels).toContain('Regime de Tributação');
    expect(labels).toContain('Solicitar Benefício');
    expect(labels).toContain('Extrato Regressivo');
    expect(labels).toContain('Informações');
  });

  it('template: não deve renderizar seção de cards quando dashboardData for null', () => {
    authServiceMock.getUserInfo.and.returnValue(mockUser);
    spyOn(localStorage, 'getItem').and.returnValue(null);

    fixture.detectChanges();

    const compiled: HTMLElement = fixture.nativeElement;
    const cardsSection = compiled.querySelector('.cards-section');
    expect(cardsSection).toBeNull();
  });

  it('template: deve renderizar seção de cards quando dashboardData possuir cards', fakeAsync(() => {
    authServiceMock.getUserInfo.and.returnValue(mockUser);
    spyOn(localStorage, 'getItem').and.returnValue('fake-token');
    dashboardServiceMock.getDashboardData.and.returnValue(of(mockDashboardData));

    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    const compiled: HTMLElement = fixture.nativeElement;
    const cardsSection = compiled.querySelector('.cards-section');
    expect(cardsSection).not.toBeNull();
  }));
});
