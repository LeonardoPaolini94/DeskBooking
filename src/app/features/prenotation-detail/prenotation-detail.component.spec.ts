import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrenotationDetailComponent } from './prenotation-detail.component';

describe('PrenotationDetailComponent', () => {
  let component: PrenotationDetailComponent;
  let fixture: ComponentFixture<PrenotationDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrenotationDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrenotationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
