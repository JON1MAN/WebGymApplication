import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipsComponent } from './memberships.component';

describe('MembershipsComponent', () => {
  let component: MembershipsComponent;
  let fixture: ComponentFixture<MembershipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MembershipsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MembershipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
