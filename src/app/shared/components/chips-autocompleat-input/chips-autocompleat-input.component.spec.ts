import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChipsAutocompleatInputComponent } from './chips-autocompleat-input.component';

describe('ChipsAutocompleatInputComponent', () => {
  let component: ChipsAutocompleatInputComponent;
  let fixture: ComponentFixture<ChipsAutocompleatInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChipsAutocompleatInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChipsAutocompleatInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
