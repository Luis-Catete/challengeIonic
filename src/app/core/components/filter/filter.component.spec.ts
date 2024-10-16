import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilterComponent } from './filter.component';
import { IonicModule } from '@ionic/angular';

describe('FilterComponent', () => {
  let component: FilterComponent;
  let fixture: ComponentFixture<FilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IonicModule.forRoot(), FilterComponent] // Importar FilterComponent aquí
    }).compileComponents();

    fixture = TestBed.createComponent(FilterComponent);
    component = fixture.componentInstance;
  });

  it('debería actualizar la categoría seleccionada al cambiar el filtro de categoría', () => {
    const event = { detail: { value: 'Episodios' } };
    component.onCategoryChange(event); // Llama al método de cambio de categoría

    expect(component.selectedCategory).toBe('Episodios'); // Verifica que la categoría seleccionada se actualice
  });

  it('debería actualizar la fecha seleccionada al cambiar el filtro de fecha', () => {
    const event = { detail: { value: '2024-10-16' } };
    component.onDateChange(event); // Llama al método de cambio de fecha

    expect(component.selectedDate).toBe('2024-10-16'); // Verifica que la fecha seleccionada se actualice
  });

  it('debería emitir filtros correctamente al aplicar filtros', () => {
    spyOn(component.filterChange, 'emit'); // Espiar el método emit

    component.selectedCategory = 'Personajes';
    component.selectedDate = '2024-10-16';
    component.searchQuery = 'Rick';
    component.applyFilters(); // Llama a aplicar filtros

    expect(component.filterChange.emit).toHaveBeenCalledWith({
      category: 'Personajes',
      date: '2024-10-16',
      searchQuery: 'Rick',
    }); // Verifica que se emitan los filtros correctos
  });

  it('debería limpiar todos los filtros', () => {
    component.selectedCategory = 'Episodios';
    component.selectedDate = '2024-10-16';
    component.searchQuery = 'Morty';

    component.clearFilters(); // Llama a limpiar filtros

    expect(component.selectedCategory).toBe(''); // Verifica que la categoría esté vacía
    expect(component.selectedDate).toBe(''); // Verifica que la fecha esté vacía
    expect(component.searchQuery).toBe(''); // Verifica que la búsqueda esté vacía
  });
});
