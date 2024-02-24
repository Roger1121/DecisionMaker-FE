import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionComparisonComponent } from './option-comparison.component';

describe('OptionComparisonComponent', () => {
  let component: OptionComparisonComponent;
  let fixture: ComponentFixture<OptionComparisonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OptionComparisonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OptionComparisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
