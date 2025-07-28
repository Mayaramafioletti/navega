import { TestBed } from '@angular/core/testing';

import { DashboardService } from './dashboard.service';

describe('DashboardService', () => {
 let service: DashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return dashboard data for a valid token without quotes', done => {
    const token = 'mocked-jwt-token';

    service.getDashboardData(token).subscribe(data => {
      expect(data).toBeTruthy();
      expect(data?.statistics.orders).toBe(10);
      expect(data?.cards.length).toBeGreaterThan(0);
      done();
    });
  });

  it('should return dashboard data for a valid token with quotes', done => {
    const token = '"mocked-jwt-token"';

    service.getDashboardData(token).subscribe(data => {
      expect(data).toBeTruthy();
      expect(data?.statistics.revenue).toBe(3200);
      done();
    });
  });

  it('should return null for invalid token', done => {
    const invalidToken = 'invalid-token';

    service.getDashboardData(invalidToken).subscribe(data => {
      expect(data).toBeNull();
      done();
    });
  });

  it('should trim token before processing', done => {
    const tokenWithSpaces = '   mocked-jwt-token   ';

    service.getDashboardData(tokenWithSpaces).subscribe(data => {
      expect(data).toBeTruthy();
      expect(data?.statistics.activePlans).toBe(2);
      done();
    });
  });
});
