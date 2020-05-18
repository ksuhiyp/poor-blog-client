import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-chips-autocompleat-input',
  templateUrl: './chips-autocompleat-input.component.html',
  styleUrls: ['./chips-autocompleat-input.component.scss'],
})
export class ChipsAutocompleatInputComponent implements AfterViewInit {
  @Input() allOptions: string[];
  @ViewChild('optionInput') optionInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  options: string[] = [];
  optionCtrl = new FormControl();
  filteredOptions: Observable<string[]> = of([]);
  separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor() {
    this.filteredOptions = this.optionCtrl.valueChanges.pipe(
      startWith(''),
      map((option: string | null) => (option ? this.filter(option) : this.allOptions.slice()))
    );
  }

  ngAfterViewInit(): void {}

  add(event: MatChipInputEvent) {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.options.push(value.trim());
    }

    // Reset the input value
    if (input) {
        input.value = '';
    }

    this.optionCtrl.setValue(null);
  }

  selected(event: MatAutocompleteSelectedEvent) {
    this.options.push(event.option.viewValue);
    this.optionInput.nativeElement.value = '';
    this.optionCtrl.setValue(null);
  }

  remove(option: string) {
    const index = this.options.indexOf(option);
    if (index !== -1) {
      this.options.splice(index, 1);
    }
  }

  private filter(value: string) {
    const filterValue = value.toLowerCase();
    return this.allOptions.filter((option) => option.toLowerCase().indexOf(filterValue) === 0);
  }
}
