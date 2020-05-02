import { Injectable } from '@angular/core';
import { UrlSegment } from '@angular/router';
import { of, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommunicatorService {
  constructor() {}

  urlSegmant = new Subject<UrlSegment[]>();
}
