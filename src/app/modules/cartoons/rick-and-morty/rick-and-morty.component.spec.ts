import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RickAndMortyComponent } from './rick-and-morty.component';
import { RickymortyService } from 'src/app/core/services/rickymorty.service';
import { of } from 'rxjs';
import { LoadingController, AlertController, IonicModule } from '@ionic/angular';
import { FilterComponent } from 'src/app/core/components/filter/filter.component'; // Importar el componente standalone
import { ActivatedRoute } from '@angular/router'; // Importar ActivatedRoute

describe('RickAndMortyComponent', () => {
  let component: RickAndMortyComponent;
  let fixture: ComponentFixture<RickAndMortyComponent>;
  let rickymortyServiceSpy: jasmine.SpyObj<RickymortyService>;
  let loadingControllerSpy: jasmine.SpyObj<LoadingController>;
  let alertControllerSpy: jasmine.SpyObj<AlertController>;

  beforeEach(async () => {
    // Crear spies de los servicios necesarios
    const rickyMortySpy = jasmine.createSpyObj('RickymortyService', ['getCharacters', 'getEpisodes', 'getLocations']);
    const loadingCtrlSpy = jasmine.createSpyObj('LoadingController', ['create']);
    const alertCtrlSpy = jasmine.createSpyObj('AlertController', ['create']);

    // Simular el método create de LoadingController
    loadingCtrlSpy.create.and.returnValue(Promise.resolve({
      present: jasmine.createSpy('present').and.returnValue(Promise.resolve()), // Simular present
      dismiss: jasmine.createSpy('dismiss').and.returnValue(Promise.resolve()), // Simular dismiss
    }));

    // Configurar el entorno de pruebas
    await TestBed.configureTestingModule({
      declarations: [RickAndMortyComponent],
      providers: [
        { provide: RickymortyService, useValue: rickyMortySpy },
        { provide: LoadingController, useValue: loadingCtrlSpy },
        { provide: AlertController, useValue: alertCtrlSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: '1' }), // Mock de los parámetros de la ruta
            // Puedes agregar más mocks de métodos o propiedades de ActivatedRoute si es necesario
          }
        }
      ],
      imports: [IonicModule.forRoot(), FilterComponent] // Importar FilterComponent
    }).compileComponents();

    // Inicializar el componente y fixture
    fixture = TestBed.createComponent(RickAndMortyComponent);
    component = fixture.componentInstance;
    rickymortyServiceSpy = TestBed.inject(RickymortyService) as jasmine.SpyObj<RickymortyService>;
    loadingControllerSpy = TestBed.inject(LoadingController) as jasmine.SpyObj<LoadingController>;
    alertControllerSpy = TestBed.inject(AlertController) as jasmine.SpyObj<AlertController>;
  });

  // Prueba para cargar personajes
  it('debería obtener personajes por URLs', fakeAsync(async () => {
    const mockCharacters = {
      info: { count: 2, pages: 1, next: null, prev: null },
      results: [
        { 
          id: 1, 
          name: 'Rick Sanchez', 
          status: 'Alive', 
          species: 'Human', 
          type: '', 
          gender: 'Male', 
          image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
          location: { name: 'Earth (C-137)', url: 'https://rickandmortyapi.com/api/location/1' },
          origin: { name: 'unknown', url: '' },
          episode: ['https://rickandmortyapi.com/api/episode/1']
        },
        { 
          id: 2, 
          name: 'Morty Smith', 
          status: 'Alive', 
          species: 'Human', 
          type: '', 
          gender: 'Male', 
          image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
          location: { name: 'Citadel of Ricks', url: 'https://rickandmortyapi.com/api/location/3' },
          origin: { name: 'unknown', url: '' },
          episode: ['https://rickandmortyapi.com/api/episode/2']
        }
      ]
    };

    rickymortyServiceSpy.getCharacters.and.returnValue(of(mockCharacters));

    component.selectedCategory = 'Personajes';
    await component.getData(); // Asegúrate de que getData es asíncrono y retorna una promesa

    tick(); // Simula el paso del tiempo para esperar las respuestas asíncronas

    expect(component.characters.length).toBe(2);
    expect(component.characters).toEqual(mockCharacters.results); // Compara con results
    expect(loadingControllerSpy.create).toHaveBeenCalled(); // Verifica que se llamó a create

    const loadingElement = await loadingControllerSpy.create(); // Espera el loading
    expect(loadingElement.dismiss).toHaveBeenCalled(); // Verifica que se cerró el loading
  }));

  // Prueba para cargar episodios
  it('debería cargar episodios desde el servicio', fakeAsync(async () => {
    const mockEpisodes = {
      info: { count: 126, pages: 7, next: 'https://rickandmortyapi.com/api/location?page=2', prev: null },
      results: [
        { 
          id: 1, 
          name: 'Pilot', 
          air_date: 'December 2, 2013',
          episode: 'S01E01',
          characters: [],
          url: 'https://rickandmortyapi.com/api/episode/1'
        }
      ]
    };

    rickymortyServiceSpy.getEpisodes.and.returnValue(of(mockEpisodes));

    component.selectedCategory = 'Episodios';
    await component.getData(); // Llama a getData para cargar los episodios

    tick(); // Simula el paso del tiempo para esperar las respuestas asíncronas

    console.log('Episodios desde el componente:', JSON.stringify(component.episodes)); // Log para verificar
    console.log('Mock de episodios:', JSON.stringify(mockEpisodes.results)); // Log para verificar

    expect(component.episodes.length).toBe(mockEpisodes.results.length); // Verifica la longitud
    expect(JSON.stringify(component.episodes)).toEqual(JSON.stringify(mockEpisodes.results)); // Compara los episodios

    expect(loadingControllerSpy.create).toHaveBeenCalled(); // Verifica que se llamó a create

    const loadingElement = await loadingControllerSpy.create(); // Espera el loading
    expect(loadingElement.dismiss).toHaveBeenCalled(); // Verifica que se cerró el loading
  }));

  // Prueba para cargar locaciones
  it('debería cargar locaciones desde el servicio', fakeAsync(async () => {
    const mockLocations = { results: [{ name: 'Earth', type: 'Planet' }] };
    rickymortyServiceSpy.getLocations.and.returnValue(of(mockLocations));

    component.selectedCategory = 'Locaciones';
    await component.getData(); // Asegúrate de que getData es asíncrono y retorna una promesa

    tick(); // Simula el paso del tiempo para esperar las respuestas asíncronas

    expect(component.locations.length).toBe(1);
    expect(component.locations[0].name).toBe('Earth');
    expect(loadingControllerSpy.create).toHaveBeenCalled(); // Verifica que se llamó a create

    const loadingElement = await loadingControllerSpy.create(); // Espera el loading
    expect(loadingElement.dismiss).toHaveBeenCalled(); // Verifica que se cerró el loading
  }));

  // Prueba para aplicar filtro de búsqueda
  it('debería aplicar el filtro de búsqueda correctamente', () => {
    const mockData = [{ name: 'Rick' }, { name: 'Morty' }];
    component.searchQuery = 'Rick';

    const filtered = component.applySearchFilter(mockData, ['name']);
    expect(filtered.length).toBe(1);
    expect(filtered[0].name).toBe('Rick');
  });
});
