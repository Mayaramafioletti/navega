import { TestBed } from '@angular/core/testing';

import { ChartComponent } from './chart.component';
import { SimpleChange } from '@angular/core';
import { ChartOptions, ChartConfiguration } from 'chart.js';

describe('ChartComponent', () => {
 let component: ChartComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartComponent]
    }).compileComponents();

    const fixture = TestBed.createComponent(ChartComponent);
    component = fixture.componentInstance;
  });

  it('deve ser criado', () => {
    expect(component).toBeTruthy();
  });

  it('deve iniciar com labels padrão', () => {
    expect(component.doughnutChartLabels).toEqual([
      'Contribuição mensal',
      'Contribuição voluntária'
    ]);
  });

  it('deve iniciar com doughnutChartData vazio (sem datasets)', () => {
    expect(component.doughnutChartData.labels).toEqual(component.doughnutChartLabels);
    expect(component.doughnutChartData.datasets).toEqual([]);
  });

  it('deve possuir chartOptions padrão esperadas', () => {
    const expected: ChartOptions<'doughnut'> = {
      responsive: true,
      cutout: '65%',
      plugins: {
        legend: {
          display: false
        }
      }
    };
    expect(component.chartOptions).toEqual(expected);
  });

  it('não deve atualizar doughnutChartData quando data estiver undefined ou vazio', () => {
    const initialRef = component.doughnutChartData;

    component.data = undefined;
    component.ngOnChanges({
      data: new SimpleChange(undefined, undefined, true)
    });
    expect(component.doughnutChartData).toBe(initialRef);
    expect(component.doughnutChartData.datasets.length).toBe(0);

    component.data = [];
    component.ngOnChanges({
      data: new SimpleChange(undefined, [], false)
    });
    expect(component.doughnutChartData).toBe(initialRef);
    expect(component.doughnutChartData.datasets.length).toBe(0);
  });

  it('deve atualizar doughnutChartData quando data possuir valores', () => {
    const prevRef = component.doughnutChartData;

    component.data = [100, 200];
    component.ngOnChanges({
      data: new SimpleChange(undefined, [100, 200], true)
    });

    expect(component.doughnutChartData).not.toBe(prevRef);
    expect(component.doughnutChartData.labels).toEqual(component.doughnutChartLabels);
    expect(component.doughnutChartData.datasets.length).toBe(1);
    expect(component.doughnutChartData.datasets[0].data).toEqual([100, 200]);
    expect(
      (component.doughnutChartData.datasets[0] as ChartConfiguration<'doughnut'>['data']['datasets'][number]).backgroundColor
    ).toEqual(['#E22E6F', '#594CBE']);
  });

  it('deve atualizar novamente ao mudar o input data (mantendo as cores)', () => {
    component.data = [10, 20];
    component.ngOnChanges({
      data: new SimpleChange(undefined, [10, 20], true)
    });

    const firstRef = component.doughnutChartData;

    component.data = [30, 70];
    component.ngOnChanges({
      data: new SimpleChange([10, 20], [30, 70], false)
    });

    expect(component.doughnutChartData).not.toBe(firstRef);
    expect(component.doughnutChartData.datasets[0].data).toEqual([30, 70]);
    expect(
      (component.doughnutChartData.datasets[0] as any).backgroundColor
    ).toEqual(['#E22E6F', '#594CBE']);
  });

  it('deve aceitar mais de dois valores em data sem quebrar (labels continuam as mesmas)', () => {
    component.data = [10, 20, 30];
    component.ngOnChanges({
      data: new SimpleChange(undefined, [10, 20, 30], true)
    });

    expect(component.doughnutChartData.datasets.length).toBe(1);
    expect(component.doughnutChartData.datasets[0].data).toEqual([10, 20, 30]);
    expect(component.doughnutChartData.labels).toEqual(component.doughnutChartLabels);
  });

  it('não deve quebrar quando ngOnChanges é chamado sem a chave "data"', () => {
    const initialRef = component.doughnutChartData;
    component.ngOnChanges({});
    expect(component.doughnutChartData).toBe(initialRef);
  });
});
