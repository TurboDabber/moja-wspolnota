import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalContainerComponent } from './additional-container.component';

describe('AdditionalContainerComponent', () => {
  let component: AdditionalContainerComponent;
  let fixture: ComponentFixture<AdditionalContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdditionalContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdditionalContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
