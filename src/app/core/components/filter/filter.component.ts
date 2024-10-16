import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IonicModule } from '@ionic/angular';

/**
 * Componente FilterComponent
 * 
 * Este componente permite aplicar filtros para buscar personajes, episodios y locaciones en la API de Rick y Morty.
 * 
 * Respuestas:
 * - Respuestas positivas:
 *   - Cuando se aplica un filtro, los resultados se actualizan y se muestran en la interfaz.
 *   - Si no hay resultados para la búsqueda, se muestra un mensaje informativo (por ejemplo, "No se encontraron resultados").
 * 
 * - Respuestas negativas:
 *   - Si se intenta aplicar un filtro sin seleccionar una categoría: se muestra un mensaje de advertencia como "Por favor, selecciona una categoría."
 *   - Si hay un error en el filtrado: se mostrará un mensaje de error específico.
 * 
 * Ejemplos de uso:
 * ```html
 * <app-filter [categories]="['Personajes', 'Episodios', 'Locaciones']" 
 *             (filterChange)="onFilterSelected($event)">
 * </app-filter>
 * ```
 * 
 * Mensajes de error:
 * - "Por favor, selecciona una categoría." si se intenta aplicar un filtro sin categoría.
 * - "Error al aplicar filtros." si hay un problema en el proceso de filtrado.
 */
@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class FilterComponent implements OnInit {

  @Input() categories: string[] = []; // Opciones de categoría
  @Input() selectedCategory: string = ''; // Categoría seleccionada
  @Input() selectedDate: string = ''; // Fecha seleccionada
  @Input() searchQuery: string = ''; // Texto de búsqueda
  @Output() filterChange = new EventEmitter<any>(); // Emitir los filtros seleccionados

  constructor() { }

  ngOnInit() {}

  // Filtro por categoría
  onCategoryChange(event: any) {
    this.selectedCategory = event.detail.value;
    this.applyFilters();
  }

  // Filtro por fecha seleccionada
  onDateChange(event: any) {
    this.selectedDate = event.detail.value;
  }

  // Filtro de búsqueda de texto 
  onSearchChange(event: any) {
    this.searchQuery = event.target.value;
  }

  // Emitir los filtros seleccionados cuando se hace clic en el botón
  applyFilters() {
    // Verificar si se ha seleccionado una categoría antes de aplicar los filtros
    if (!this.selectedCategory) {
      console.warn('Por favor, selecciona una categoría.'); // Mensaje de advertencia
      return; // No se aplica el filtro si no hay categoría
    }

    this.filterChange.emit({
      category: this.selectedCategory,
      date: this.selectedDate,
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
