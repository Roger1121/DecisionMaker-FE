import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableListItemComponent } from './available-list-item.component';

describe('AvailableListItemComponent', () => {
  let component: AvailableListItemComponent;
  let fixture: ComponentFixture<AvailableListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvailableListItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AvailableListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
