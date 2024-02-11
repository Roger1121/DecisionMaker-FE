import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCriterionFormComponent } from './add-criterion-form.component';

describe('AddCriterionFormComponent', () => {
  let component: AddCriterionFormComponent;
  let fixture: ComponentFixture<AddCriterionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCriterionFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddCriterionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
