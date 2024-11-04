import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Contact } from './services/contact.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CategoryFilterComponent } from './components/category-filter/category-filter.component';
import { ContactDetailsComponent } from './components/contact-details/contact-details.component';
import { ContactListComponent } from './components/contact-list/contact-list.component';
import { AddContactComponent } from './components/add-contact/add-contact.component';
import { DeleteContactComponent } from './components/delete-contact/delete-contact.component';
import { EditContactComponent } from './components/edit-contact/edit-contact.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [
    CommonModule,
    RouterOutlet,
    CategoryFilterComponent,
    ContactDetailsComponent,
    ContactListComponent,
    HttpClientModule,
    AddContactComponent,
    DeleteContactComponent,
    EditContactComponent
  ]
})
export class AppComponent {
  title = 'agenda';
  selectedCategory: string = '';
  selectedContact: Contact | null = null;
  contacts: Contact[] = [];
  isEditing: boolean = false;

  constructor(private http: HttpClient) {
    this.fetchContacts(); // Cargar contactos al iniciar
  }

  fetchContacts() {
    this.http.get<Contact[]>('http://54.204.239.6:8000/api/contact/')
      .subscribe(data => {
        this.contacts = data;
      });
  }

  onCategoryChange(category: string) {
    this.selectedCategory = category;
  }

  onSelectContact(contact: Contact) {
    this.selectedContact = contact;
    this.isEditing = false; // Resetear el estado de edición
  }

  onEditContact() {
    this.isEditing = true; // Activar la edición
  }

  onExitContactDetails() {
    this.selectedContact = null; // Limpiar la selección
    this.isEditing = false; // Desactivar la edición
  }

  updateContact(updatedContact: Contact) {
    this.http.put(`http://54.204.239.6:8000/api/contact/${updatedContact.id}`, updatedContact)
      .subscribe({
        next: () => {
          this.fetchContacts(); // Refresca la lista de contactos
          this.selectedContact = null; // Limpia la selección después de actualizar
          this.isEditing = false; // Desactivar edición
        },
        error: (err) => {
          console.error('Error al actualizar el contacto:', err); // Manejo de errores
        }
      });
  }

  deleteContact(contact: Contact) {
    if (contact) {
      this.http.delete(`http://54.204.239.6:8000/api/contact/${contact.id}`)
        .subscribe(() => {
          this.fetchContacts(); // Refrescar la lista de contactos después de eliminar
        });
    }
  }

  addContact(contact: Contact) {
    this.fetchContacts();
  }

  removeContact(contact: Contact) {
    this.http.delete(`http://54.204.239.6:8000/api/contact/${contact.id}`)
      .subscribe({
        next: () => {
          this.contacts = this.contacts.filter(c => c.id !== contact.id);
        },
        error: (err) => {
          console.error('Error al eliminar el contacto:', err); // Manejo de errores
        }
      });
  }
}
