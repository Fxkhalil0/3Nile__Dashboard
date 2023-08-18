import { TestBed } from '@angular/core/testing';

import { ShowboatsService } from './showboats.service';

describe('ShowboatsService', () => {
  let service: ShowboatsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShowboatsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
