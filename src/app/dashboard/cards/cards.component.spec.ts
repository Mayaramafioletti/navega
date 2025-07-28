import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsComponent } from './cards.component';

describe('CardsComponent', () => {
  let component: CardsComponent;
  let fixture: ComponentFixture<CardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardsComponent] // Componente standalone
    }).compileComponents();

    fixture = TestBed.createComponent(CardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve ser criado', () => {
    expect(component).toBeTruthy();
  });

  it('deve iniciar com valores padrão vazios', () => {
    expect(component.tipo).toBe('');
    expect(component.valor).toBe('');
    expect(component.percentual).toBe('');
  });

  it('deve aceitar valores de Input e refletir no componente', () => {
    component.tipo = 'Renda';
    component.valor = '1000';
    component.percentual = '10%';
    fixture.detectChanges();

    expect(component.tipo).toBe('Renda');
    expect(component.valor).toBe('1000');
    expect(component.percentual).toBe('10%');
  });

  it('deve atualizar os valores quando os inputs mudarem', () => {
    component.tipo = 'Despesa';
    component.valor = '500';
    component.percentual = '5%';
    fixture.detectChanges();

    expect(component.tipo).toBe('Despesa');
    expect(component.valor).toBe('500');
    expect(component.percentual).toBe('5%');
  });
});
