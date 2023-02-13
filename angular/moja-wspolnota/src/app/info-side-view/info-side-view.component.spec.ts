import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoSideViewComponent } from './info-side-view.component';

describe('InfoSideViewComponent', () => {
  let component: InfoSideViewComponent;
  let fixture: ComponentFixture<InfoSideViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoSideViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoSideViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
