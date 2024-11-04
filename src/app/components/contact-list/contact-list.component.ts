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
  
  contacts: Contact[] = []; // Lista de contactos
  @Input() searchText: string = ''; // Texto de búsqueda

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchContacts(); // Cargar contactos al inicializar
  }

  // Método para obtener los contactos desde la API
  fetchContacts() {
    this.http.get<Contact[]>('http://54.204.239.6:8000/api/contact/') // Cambia la URL si es necesario
      .subscribe(data => {
        this.contacts = data;
      });
  }

  // Filtro de contactos según categoría y texto de búsqueda
  get filteredContacts() {
    return this.contacts.filter(contact =>
      (this.category ? contact.category === this.category : true) &&
      `${contact.first_name} ${contact.last_name}`
        .toLowerCase()
        .includes(this.searchText.toLowerCase())
    );
  }

  // Actualiza el texto de búsqueda
  searchContacts(value: string) {
    this.searchText = value;
  }

  // Emite el evento al seleccionar un contacto
  selectContact(contact: Contact) {
    this.contactSelected.emit(contact);
  }
}
