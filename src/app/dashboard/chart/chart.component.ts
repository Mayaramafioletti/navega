import { Component, Input, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
    standalone: true,
  imports: [CommonModule, NgChartsModule],
  styleUrls: ['./chart.component.less']
})
export class ChartComponent {
   @Input() data?: number[] = [] ;
  doughnutChartLabels: string[] = ['Contribuição mensal', 'Contribuição voluntária'];
  doughnutChartData: ChartConfiguration<'doughnut'>['data'] = {
    labels: this.doughnutChartLabels,
    datasets: [
    ]
  };

  chartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    cutout: '65%',
    plugins: {
      legend: {
        display: false
      }
    }
  };
 ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && this.data?.length) {
      this.doughnutChartData = {
        labels: this.doughnutChartLabels,
        datasets: [
          {
            data: this.data,
            backgroundColor: ['#E22E6F', '#594CBE']
          }
        ]
      };
    }
  }
}
