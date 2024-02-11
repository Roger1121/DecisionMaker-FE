import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriteriaWeightsComponent } from './criteria-weights.component';

describe('CriteriaWeightsComponent', () => {
  let component: CriteriaWeightsComponent;
  let fixture: ComponentFixture<CriteriaWeightsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CriteriaWeightsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CriteriaWeightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
