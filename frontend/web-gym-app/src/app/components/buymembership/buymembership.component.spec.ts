import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuymembershipComponent } from './buymembership.component';

describe('BuymembershipComponent', () => {
  let component: BuymembershipComponent;
  let fixture: ComponentFixture<BuymembershipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuymembershipComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuymembershipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
