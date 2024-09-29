import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventEmmiterService {

  getCartCount = new EventEmitter<void>();
  constructor() { }

  getCount(){
    this.getCartCount.emit();
  }
}
