import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-delete-contact',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete-contact.component.html',
  styleUrls: ['./delete-contact.component.css']
})
export class DeleteContactComponent {
  @Input() contacts: any[] = [];
  @Output() contactDeleted = new EventEmitter<any>();

  deleteContact(contact: any) {
    this.contactDeleted.emit(contact);
  }
}
