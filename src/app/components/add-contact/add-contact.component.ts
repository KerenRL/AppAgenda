import { Component, Output, EventEmitter, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Contact } from '../../services/contact.service';

@Component({
  selector: 'app-add-contact',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent {
  contact: Contact = {
    id: 0,
    first_name: '',
    last_name: '',
    phone: '',
    email: '',
    category: 'Amigos',
    is_favorite: false,
    deleted: false,
    created_at: new Date().toISOString(),
    created_by: 'admin',
    updated_at: new Date().toISOString(),
    updated_by: 'admin'
  };

  @Output() contactAdded = new EventEmitter<Contact>();
  private http = inject(HttpClient);

  addContact() {
    this.http.post<Contact>('http://localhost:8000/api/contact/', this.contact)
      .subscribe({
        next: (response) => {
          this.contactAdded.emit(response);
          this.resetForm();
        },
        error: (error) => {
          console.error('Error al agregar contacto:', error);
        }
      });
  }

  resetForm() {
    this.contact = {
      id: 0,
      first_name: '',
      last_name: '',
      phone: '',
      email: '',
      category: 'Amigos',
      is_favorite: false,
      deleted: false,
      created_at: new Date().toISOString(),
      created_by: 'admin',
      updated_at: new Date().toISOString(),
      updated_by: 'admin'
    };
  }
}
