import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdealSolutionComponent } from './ideal-solution.component';

describe('IdealSolutionComponent', () => {
  let component: IdealSolutionComponent;
  let fixture: ComponentFixture<IdealSolutionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdealSolutionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IdealSolutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
