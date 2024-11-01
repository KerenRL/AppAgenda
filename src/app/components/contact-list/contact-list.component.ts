import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent {
  @Input() contacts: any[] = []; // Propiedad de entrada
  @Output() selectedContact = new EventEmitter<any>();

  searchText: string = '';

  filteredContacts() {
    return this.contacts.filter(contact => 
      contact.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  searchContacts(value: string) {
    this.searchText = value;
  }

  selectContact(contact: any) {
    this.selectedContact.emit(contact);
  }
}