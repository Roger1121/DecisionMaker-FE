import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HellwigResultComponent } from './hellwig-result.component';

describe('HellwigResultComponent', () => {
  let component: HellwigResultComponent;
  let fixture: ComponentFixture<HellwigResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HellwigResultComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HellwigResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
