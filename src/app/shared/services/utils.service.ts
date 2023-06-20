import { Injectable } from '@angular/core';

@Injectable()
export class UtilsService {
  constructor() {}

  rangeArray(start: number, end: number): number[] {
    if (start >= end) {
      // throw new Error('Invalid input: start value must be less than end value');
      return [];
    }
    return Array.from({ length: end - start + 1 }, (_, i) => i + start);
  }
}
