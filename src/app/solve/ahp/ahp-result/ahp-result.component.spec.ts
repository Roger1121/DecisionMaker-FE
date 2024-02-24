import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AhpResultComponent } from './ahp-result.component';

describe('AhpResultComponent', () => {
  let component: AhpResultComponent;
  let fixture: ComponentFixture<AhpResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AhpResultComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AhpResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
