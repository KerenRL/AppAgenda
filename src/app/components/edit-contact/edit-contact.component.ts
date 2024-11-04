import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Contact } from '../../services/contact.service';

@Component({
  selector: 'app-edit-contact',
  standalone: true,
  imports:[FormsModule],
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent {
  @Input() contact: any = null;
  @Output() contactEdited = new EventEmitter<any>();
  @Output() exit = new EventEmitter<void>();

  editContact() {
    this.contactEdited.emit(this.contact);
  }

  exitDetails() {
    this.exit.emit(); 
  }
}
