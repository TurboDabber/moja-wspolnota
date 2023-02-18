import { Component } from '@angular/core';

@Component({
  selector: 'app-additional-container',
  templateUrl: './additional-container.component.html',
  styleUrls: ['./additional-container.component.scss']
})
export class AdditionalContainerComponent {
  items: string[] = ['Item 1', 'Item 2', 'Item 3','Item 1', 'Item 2', 'Item 3','Item 1', 'Item 2', 'Item 3','Item 1', 'Item 2', 'Item 3'];

  constructor() { }

  getItems() {
    return this.items;
  }

  addItem(item: string) {
    this.items.push(item);
  }

  removeItem(item: string) {
    const index = this.items.indexOf(item);
    if (index !== -1) {
      this.items.splice(index, 1);
    }
  }
}
