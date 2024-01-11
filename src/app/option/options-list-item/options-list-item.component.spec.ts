import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionsListItemComponent } from './options-list-item.component';

describe('OptionsListItemComponent', () => {
  let component: OptionsListItemComponent;
  let fixture: ComponentFixture<OptionsListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OptionsListItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OptionsListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
