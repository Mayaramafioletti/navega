import { Component } from '@angular/core';
import { ChartComponent } from "./chart/chart.component";
import { CardsComponent } from "./cards/cards.component";
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../core/auth.service';
import { DashboardService } from '../core/dashboard.service';
interface MenuItem {
  nome: string;
  icone: string;
  caminho: string;
}

interface User {
  avatar: string;
  nome: string;
  email: string;
}
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

interface UserDashboardData {
  name: string;
  email: string;
  avatar: string;
  dashboard: DashboardData;
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less'],
  standalone: true,
  imports: [ChartComponent, CardsComponent, MatListModule, MatIconModule, RouterModule, CommonModule, MatButtonModule]
})
export class DashboardComponent {
  user: User | null = null;
  dashboardData: DashboardData | null = null;
  readonly menuItems: MenuItem[] = MENU_ITEMS;

  constructor(private authService: AuthService, private dashboardService: DashboardService) { }

 ngOnInit(): void {
    this.loadUserInfo();
    this.loadDashboardData();
  }

  private loadUserInfo(): void {
    this.user = this.authService.getUserInfo();
  }

  private loadDashboardData(): void {
    const token = localStorage.getItem('token');
    if (!token) return;

    this.dashboardService.getDashboardData(token).subscribe({
      next: (data) => (this.dashboardData = data),
      error: (err) => console.error('Erro ao carregar dados do dashboard', err),
    });
  }
}
const MENU_ITEMS: MenuItem[] = [
  { nome: 'Ver Extrato', icone: 'assets/icons/file-dollar.svg', caminho: '/extrato' },
  { nome: 'Contribuição Mensal', icone: 'assets/icons/envelope-dollar.svg', caminho: '/dashboard' },
  { nome: 'Contribuição Extra', icone: 'assets/icons/sack-dollar.svg', caminho: '/contribuicao-extra' },
  { nome: 'Documentos', icone: 'assets/icons/file.svg', caminho: '/documentos' },
  { nome: 'Regime de Tributação', icone: 'assets/icons/user-chart.svg', caminho: '/regime-tributacao' },
  { nome: 'Solicitar Benefício', icone: 'assets/icons/comment-dollar.svg', caminho: '/solicitar-beneficio' },
  { nome: 'Extrato Regressivo', icone: 'assets/icons/file-chart.svg', caminho: '/extrato-regressivo' },
  { nome: 'Informações', icone: 'assets/icons/info.svg', caminho: '/informacoes' },
];
