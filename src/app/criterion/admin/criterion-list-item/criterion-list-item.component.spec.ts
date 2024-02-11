import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriterionListItemComponent } from './criterion-list-item.component';

describe('CriterionListItemComponent', () => {
  let component: CriterionListItemComponent;
  let fixture: ComponentFixture<CriterionListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CriterionListItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CriterionListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
