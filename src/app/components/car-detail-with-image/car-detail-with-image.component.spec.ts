import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarDetailWithImageComponent } from './car-detail-with-image.component';

describe('CarDetailWithImageComponent', () => {
  let component: CarDetailWithImageComponent;
  let fixture: ComponentFixture<CarDetailWithImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarDetailWithImageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarDetailWithImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
