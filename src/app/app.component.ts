import { Component } from '@angular/core';
import { CategoryFilterComponent } from './components/category-filter/category-filter.component';
import { ContactListComponent } from './components/contact-list/contact-list.component';
import { ContactDetailsComponent } from './components/contact-details/contact-details.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [
    CategoryFilterComponent, 
    ContactListComponent, 
    ContactDetailsComponent, 
    FavoritesComponent,
    FormsModule
  ]
})
export class AppComponent {
  title = 'agenda'; 
  selectedCategory: string = '';
  selectedContact: any = null;
  favorites: any[] = [];
  
  contacts: any[] = []; // Inicializa la lista de contactos aquí
  newContact = { firstName: '', lastName: '', phone: '', email: '', category: '', photo: '', favorite: false };
  isAdding = false;  // Para mostrar el formulario de agregar contacto

  filterCategory(category: string) {
    this.selectedCategory = category;
  }

  displayContactDetails(contact: any) {
    this.selectedContact = contact;
  }

  toggleFavoriteHandler(contact: any) {
    const index = this.favorites.indexOf(contact);
    if (index === -1) {
      this.favorites.push(contact);
    } else {
      this.favorites.splice(index, 1);
    }
  }

  addContact() {
    if (this.newContact.firstName && this.newContact.phone) {
      const contactToAdd = { ...this.newContact };
      this.contacts.push(contactToAdd);
      this.newContact = { firstName: '', lastName: '', phone: '', email: '', category: '', photo: '', favorite: false };
      this.isAdding = false; // Ocultar formulario
    }
  }

  startAddContact() {
    this.isAdding = true; // Mostrar formulario
  }

  cancelAdd() {
    this.isAdding = false; // Ocultar formulario
  }

  editContact() {
    if (this.selectedContact) {
      this.newContact = { ...this.selectedContact }; // Cargar los datos del contacto seleccionado
      this.isAdding = true; // Mostrar formulario
    }
  }

  deleteContact() {
    if (this.selectedContact) {
      const index = this.contacts.indexOf(this.selectedContact);
      if (index !== -1) {
        this.contacts.splice(index, 1); // Eliminar el contacto
        this.selectedContact = null; // Limpiar el contacto seleccionado
      }
    }
  }
}