import { Component } from '@angular/core';
import { ChartComponent } from "./chart/chart.component";
import { CardsComponent } from "./cards/cards.component";
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less'],
  standalone: true,
  imports: [ChartComponent, CardsComponent, MatListModule, MatIconModule,  RouterModule, CommonModule, MatButtonModule  ]
})
export class DashboardComponent {
menuItems = [
    {
      nome: 'Ver Extrato',
      icone: 'assets/icons/file-dollar.svg',
      caminho: '/extrato'
    },
    {
      nome: 'Contribuição Mensal',
      icone: 'assets/icons/envelope-dollar.svg',
      caminho: '/contribuicao-mensal'
    },
    {
      nome: 'Contribuição Extra',
      icone: 'assets/icons/sack-dollar.svg',
      caminho: '/contribuicao-extra'
    },
    {
      nome: 'Documentos',
      icone: 'assets/icons/file.svg',
      caminho: '/documentos'
    },
    {
      nome: 'Regime de Tributação',
      icone: 'assets/icons/user-chart.svg',
      caminho: '/regime-tributacao'
    },
    {
      nome: 'Solicitar Benefício',
      icone: 'assets/icons/comment-dollar.svg',
      caminho: '/solicitar-beneficio'
    },
    {
      nome: 'Extrato Regressivo',
      icone: 'assets/icons/file-chart.svg',
      caminho: '/extrato-regressivo'
    },
    {
      nome: 'Informações',
      icone: 'assets/icons/info.svg',
      caminho: '/informacoes'
    }
  ];
}
