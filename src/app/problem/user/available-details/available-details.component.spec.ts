import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableDetailsComponent } from './available-details.component';

describe('AvailableDetailsComponent', () => {
  let component: AvailableDetailsComponent;
  let fixture: ComponentFixture<AvailableDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvailableDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AvailableDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
