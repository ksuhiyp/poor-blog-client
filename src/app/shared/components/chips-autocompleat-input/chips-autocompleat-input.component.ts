import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of, Subject, BehaviorSubject } from 'rxjs';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-chips-autocompleat-input',
  templateUrl: './chips-autocompleat-input.component.html',
  styleUrls: ['./chips-autocompleat-input.component.scss'],
})
export class ChipsAutocompleatInputComponent {
  private _allOptions: string[] = [];
  @Input()
  set allOptions(value: string[]) {
    this._allOptions = value || [];
  }
  get allOptions() {
    return this._allOptions;
  }
  @Input() selectedOptions: string[];
  @Output() selectedOptionsChange = new BehaviorSubject<string[]>([]);
  @ViewChild('optionInput') optionInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  optionCtrl = new FormControl();
  filteredOptions: Observable<string[]> = of([]);
  separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor() {
    this.filteredOptions = this.optionCtrl.valueChanges.pipe(
      startWith(''),
      map((option: string | null) => (option ? this.filter(option) : this._allOptions?.slice()))
    );
  }

  add(event: MatChipInputEvent) {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.selectedOptions.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.optionCtrl.setValue(null);
    this.selectedOptionsChange.next(this.selectedOptions);
  }

  selected(event: MatAutocompleteSelectedEvent) {
    this.selectedOptions.push(event.option.viewValue);
    this.optionInput.nativeElement.value = '';
    this.optionCtrl.setValue(null);
    this.selectedOptionsChange.next(this.selectedOptions);
  }

  remove(option: string) {
    const index = this.selectedOptions.indexOf(option);
    if (index !== -1) {
      this.selectedOptions.splice(index, 1);
      this.selectedOptionsChange.next(this.selectedOptions);
    }
  }

  private filter(value: string) {
    const filterValue = value.toLowerCase();
    return this._allOptions.filter((option) => option.toLowerCase().indexOf(filterValue) === 0);
  }
}
