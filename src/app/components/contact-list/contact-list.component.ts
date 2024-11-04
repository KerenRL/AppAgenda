import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contact } from '../../services/contact.service';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  @Input() category: string = '';
  @Output() contactSelected = new EventEmitter<Contact>();
  
  contacts: Contact[] = []; 
  @Input() searchText: string = ''; 

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchContacts(); 
  }

  fetchContacts() {
    this.http.get<Contact[]>('http://localhost:8000/api/contact/') 
      .subscribe(data => {
        this.contacts = data;
      });
  }

  get filteredContacts() {
    return this.contacts.filter(contact =>
      (this.category ? contact.category === this.category : true) &&
      `${contact.first_name} ${contact.last_name}`
        .toLowerCase()
        .includes(this.searchText.toLowerCase())
    );
  }

  searchContacts(value: string) {
    this.searchText = value;
  }

  selectContact(contact: Contact) {
    this.contactSelected.emit(contact);
  }
}
