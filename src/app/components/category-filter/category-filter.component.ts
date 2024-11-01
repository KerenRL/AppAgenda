import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-category-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-filter.component.html',
  styleUrls: ['./category-filter.component.css']
})
export class CategoryFilterComponent {
  @Output() filterCategory = new EventEmitter<string>();

  categories = ['Todos', 'Amigo', 'Familia', 'Trabajo'];

  filterByCategory(category: string) {
    this.filterCategory.emit(category === 'Todos' ? '' : category);
  }
}