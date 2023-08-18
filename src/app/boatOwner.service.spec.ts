/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BoatOwnerService } from './boatOwner.service';

describe('Service: BoatOwner', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BoatOwnerService]
    });
  });

  it('should ...', inject([BoatOwnerService], (service: BoatOwnerService) => {
    expect(service).toBeTruthy();
  }));
});
