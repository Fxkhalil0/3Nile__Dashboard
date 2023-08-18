import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoatdetailsComponent } from './boatdetails.component';

describe('BoatdetailsComponent', () => {
  let component: BoatdetailsComponent;
  let fixture: ComponentFixture<BoatdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoatdetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoatdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
