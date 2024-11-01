import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-contact-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css']
})
export class ContactDetailsComponent {
  @Input() contact: any;
  @Output() toggleFavorite = new EventEmitter<void>(); // Asegúrate de que esté aquí

  onToggleFavorite() {
    this.toggleFavorite.emit();
  }
}
