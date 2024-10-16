import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InfoCardComponent } from './info-card.component'; // Importa el componente standalone
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

describe('InfoCardComponent', () => {
  let component: InfoCardComponent;
  let fixture: ComponentFixture<InfoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ // Importar el componente standalone aquí
        CommonModule,
        IonicModule.forRoot(),
        InfoCardComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(InfoCardComponent);
    component = fixture.componentInstance;
  });

  // Prueba para verificar que el componente se inicializa correctamente
  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  // Prueba para asignar el item correctamente
  it('debería asignar el item correctamente', () => {
    const mockItem = { name: 'Episodio 1', details: 'Detalles del episodio' }; // Mock de un item
    component.item = mockItem; // Asignar el item
    expect(component.item).toEqual(mockItem); // Verificar que el item se haya asignado correctamente
  });

  // Prueba para verificar la categoría
  it('debería asignar la categoría correctamente', () => {
    component.category = 'Episodios'; // Asignar una categoría
    expect(component.category).toBe('Episodios'); // Verificar que la categoría se haya asignado correctamente
  });
});
