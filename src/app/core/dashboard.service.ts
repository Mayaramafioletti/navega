import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
private mockUserDataByToken: { [token: string]: any } = {
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
      // Usuário não autenticado ou token inválido
      return of(null);
    }
  }
}
