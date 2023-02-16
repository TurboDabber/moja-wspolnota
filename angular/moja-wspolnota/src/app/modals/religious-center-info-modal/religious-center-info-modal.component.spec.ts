import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReligiousCenterInfoModalComponent } from './religious-center-info-modal.component';

describe('ReligiousCenterInfoModalComponent', () => {
  let component: ReligiousCenterInfoModalComponent;
  let fixture: ComponentFixture<ReligiousCenterInfoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReligiousCenterInfoModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReligiousCenterInfoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
