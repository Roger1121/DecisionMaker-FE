import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOptionCriterionModalComponent } from './add-option-criterion-modal.component';

describe('AddOptionCriterionModalComponent', () => {
  let component: AddOptionCriterionModalComponent;
  let fixture: ComponentFixture<AddOptionCriterionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddOptionCriterionModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddOptionCriterionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
