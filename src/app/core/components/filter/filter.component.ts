import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  standalone:true,
  imports:[CommonModule,IonicModule]
})
export class FilterComponent  implements OnInit {

  @Input() categories: string[] = []; // Opciones de categoría
  @Input() selectedCategory: string = ''; // Categoría seleccionada
  @Input() selectedDate: string = ''; // Fecha seleccionada
  @Input() searchQuery: string = ''; // Texto de búsqueda
  @Output() filterChange = new EventEmitter<any>(); // Emitir los filtros seleccionados


  constructor() { }

  ngOnInit() {}

  //filtro por categoria
  onCategoryChange(event: any) {
    this.selectedCategory = event.detail.value;
    this.applyFilters(); 
  }

  //filtro por fecha seleccionada
  onDateChange(event: any) {
    this.selectedDate = event.detail.value;
  }

  //filtro de busqueda de texto 
  onSearchChange(event: any) {
    this.searchQuery = event.target.value;
  }

  // Emitir los filtros seleccionados cuando se hace clic en el botón
  applyFilters() {
    this.filterChange.emit({
      category: this.selectedCategory,
      selectedDate: this.selectedDate,
      searchQuery: this.searchQuery,
    });
  }

  // Limpiar todos los filtros
  clearFilters() {
    this.selectedCategory = ''; // Reiniciar la categoría seleccionada
    this.selectedDate = ''; // Reiniciar la fecha seleccionada
    this.searchQuery = ''; // Reiniciar el texto de búsqueda
    this.applyFilters(); // Emitir cambios para que se actualicen los resultados
  }


}
