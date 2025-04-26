import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  cards = [
    { name: 'John Doe John Doe John Doe John Doe John Doe John Doe John Doe John Doe John Doe  John Doe John Doe John Doe John Doe John Doe John Doe John Doe John Doe John Doe John Doe John Doe John Doe John Doe John Doe John Doe', email: 'john@example.com', phone: '123', address: '123 Street', company: 'ABC Corp' },
    { name: 'Jane Smith', email: 'jane@example.com', phone: '456', address: '456 Street', company: 'XYZ Ltd' },
    // { name: 'Bob Johnson', email: 'bob@example.com', phone: '789', address: '789 Street', company: '123 Inc' },
    { name: 'Alice Brown', email: 'alice@example.com', phone: '101', address: '101 Street', company: 'DEF LLC' },
    { name: 'Tom Clark', email: 'tom@example.com', phone: '202', address: '202 Street', company: 'GHI GmbH' },
    { name: 'Tom Clark', email: 'tom@example.com', phone: '202', address: '202 Street', company: 'GHI GmbH' },
    // Add more or remove to test
  ];

 
  emptySlots: any[] = [];
   ngOnInit() {
    const cardsPerRow = 2; // You want 3 cards per row
    const remainder = this.cards.length % cardsPerRow;
    const emptyCount = remainder === 0 ? 0 : cardsPerRow - remainder;
    this.emptySlots = new Array(emptyCount);
  }
}
