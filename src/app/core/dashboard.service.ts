import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
export interface DashboardStatistics {
  orders: number;
  revenue: number;
  activePlans: number;
}

export interface DashboardCard {
  tipo: string;
  valor: string;
  percentual?: string;
  cor: string;
}

export interface DashboardData {
  statistics: DashboardStatistics;
  cards: DashboardCard[];
  chartData: number[];
}

export interface UserDashboardData {
  name: string;
  email: string;
  avatar: string;
  dashboard: DashboardData;
}
@Injectable({
  providedIn: 'root'
})
export class DashboardService {
 private readonly mockUserDataByToken: Record<string, UserDashboardData> = {
  'mocked-jwt-token': {
    name: 'Adimin User',
    email: 'user@navega.com',
    avatar: './../../assets/avatar.png',
    dashboard: {
      statistics: {
        orders: 10,
        revenue: 3200,
        activePlans: 2
      },
      cards: [
        {
          tipo: 'Contribuição mensal',
          valor: 'R$ 500,00',
          percentual: '5%',
          cor: 'red'
        },
        {
          tipo: 'Contribuição voluntária',
          valor: 'R$ 500,00',
          percentual: '',
          cor: 'blue'
        }
      ],
      chartData:  [499999.99, 499999.99]
    }
  }
};
  constructor() { }
    getDashboardData(token: string): Observable<any> {
      const trimmedToken = token.trim().replace(/^"|"$/g, '');
    const userData = this.mockUserDataByToken[trimmedToken];
      console.log(userData)
    if (userData) {
      return of(userData.dashboard);
    } else {
      return of(null);
    }
  }
}
