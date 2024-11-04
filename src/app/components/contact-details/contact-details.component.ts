import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact-details',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css']
})
export class ContactDetailsComponent {
  @Input() contact: any;
  @Output() contactUpdated = new EventEmitter<any>();
  @Output() contactDeleted = new EventEmitter<void>();
  @Output() exit = new EventEmitter<void>();

  editMode = false;

  saveContact() {
    this.contactUpdated.emit(this.contact);
    this.editMode = false;
  }

  onExitDetails() {
    this.editMode = false;
    this.exit.emit(); // Emitir el evento para que el componente padre maneje la salida
  }
}
