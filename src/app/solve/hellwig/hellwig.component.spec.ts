import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HellwigComponent } from './hellwig.component';

describe('HellwigComponent', () => {
  let component: HellwigComponent;
  let fixture: ComponentFixture<HellwigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HellwigComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HellwigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
