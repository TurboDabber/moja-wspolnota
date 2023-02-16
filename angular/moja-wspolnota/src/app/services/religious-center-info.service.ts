import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { ReligiousCenterModel } from '../models/religious-center-model';

@Injectable({
  providedIn: 'root'
})
export class ReligiousCenterInfoService {

  private currentReligiousCenter!: ReligiousCenterModel;
  public currentReligiousCenter$ = of(this.currentReligiousCenter);

  constructor() { }

  public setCurrentReligiousCenter(center: ReligiousCenterModel): void {
    this.currentReligiousCenter = center;
  }
}
