import { TestBed } from '@angular/core/testing';

import { SiteStatsServiceService } from './site-stats.service.service';

describe('SiteStatsServiceService', () => {
  let service: SiteStatsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SiteStatsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
