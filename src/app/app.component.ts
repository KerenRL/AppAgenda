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
    this.fetchContacts();
  }

  fetchContacts() {
    this.http.get<Contact[]>('http://localhost:8000/api/contact/')
      .subscribe(data => {
        this.contacts = data;
      });
  }

  onCategoryChange(category: string) {
    this.selectedCategory = category;
  }

  onSelectContact(contact: Contact) {
    this.selectedContact = contact;
    this.isEditing = false;
  }

  onEditContact() {
    this.isEditing = true;
  }

  onExitContactDetails() {
    this.selectedContact = null;
    this.isEditing = false;
  }

  updateContact(updatedContact: Contact) {
    this.http.put(`http://localhost:8000/api/contact/${updatedContact.id}`, updatedContact)
      .subscribe({
        next: () => {
          this.fetchContacts();
          this.selectedContact = null;
          this.isEditing = false;
        },
        error: (err) => {
          console.error('Error al actualizar el contacto:', err);
        }
      });
  }

  deleteContact(contact: Contact) {
    if (contact) {
      this.http.delete(`http://localhost:8000/api/contact/${contact.id}`)
        .subscribe(() => {
          this.fetchContacts();
        });
    }
  }

  addContact(contact: Contact) {
    this.fetchContacts();
  }

  removeContact(contact: Contact) {
    this.http.delete(`http://localhost:8000/api/contact//${contact.id}`)
      .subscribe({
        next: () => {
          this.contacts = this.contacts.filter(c => c.id !== contact.id);
        },
        error: (err) => {
          console.error('Error al eliminar el contacto:', err);
        }
      });
  }
}
