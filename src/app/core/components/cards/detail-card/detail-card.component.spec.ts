import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailCardComponent } from './detail-card.component';
import { ModalController, NavParams, IonicModule } from '@ionic/angular';
import { RickymortyService } from 'src/app/core/services/rickymorty.service';
import { of } from 'rxjs';
import { Character } from 'src/app/core/interfaces/character';
import { Episode } from 'src/app/core/interfaces/episode';

describe('DetailCardComponent', () => {
  let component: DetailCardComponent;
  let fixture: ComponentFixture<DetailCardComponent>;
  let modalCtrlMock: any;
  let rickymortyServiceMock: any;

  beforeEach(async () => {
    modalCtrlMock = { dismiss: jasmine.createSpy('dismiss') };
    rickymortyServiceMock = {
      getCharactersByUrls: jasmine.createSpy('getCharactersByUrls').and.returnValue(of([])),
      getEpisodesByUrls: jasmine.createSpy('getEpisodesByUrls').and.returnValue(of([])),
    };

    await TestBed.configureTestingModule({
      imports: [IonicModule.forRoot(), DetailCardComponent], // Importamos el componente aquí
      providers: [
        { provide: NavParams, useValue: { get: jasmine.createSpy().and.returnValue({}) } },
        { provide: ModalController, useValue: modalCtrlMock },
        { provide: RickymortyService, useValue: rickymortyServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailCardComponent);
    component = fixture.componentInstance;
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar correctamente el componente con la categoría "Episodios"', () => {
    component.item = { characters: ['url1'], episode: [] };
    component.category = 'Episodios';

    component.ngOnInit();

    expect(rickymortyServiceMock.getCharactersByUrls).toHaveBeenCalledWith(['url1']);
  });

  it('debería inicializar correctamente el componente con la categoría "Personajes"', () => {
    component.item = { episode: ['url2'] };
    component.category = 'Personajes';

    component.ngOnInit();

    expect(rickymortyServiceMock.getEpisodesByUrls).toHaveBeenCalledWith(['url2']);
  });

  it('debería inicializar correctamente el componente con la categoría "Locaciones"', () => {
    component.item = { residents: ['url3'] };
    component.category = 'Locaciones';

    component.ngOnInit();

    expect(rickymortyServiceMock.getCharactersByUrls).toHaveBeenCalledWith(['url3']);
  });

  it('debería manejar correctamente la respuesta de los personajes', () => {
    const mockCharacters: Character[] = [{ id: 1, name: 'Rick Sanchez' }];
    rickymortyServiceMock.getCharactersByUrls.and.returnValue(of(mockCharacters));
    component.item = { characters: ['url1'] };
    component.category = 'Episodios';

    component.ngOnInit();

    expect(component.characters).toEqual(mockCharacters);
  });

  it('debería manejar correctamente la respuesta de los episodios', () => {
    const mockEpisodes: Episode[] = [{ id: 1, name: 'Pilot' }];
    rickymortyServiceMock.getEpisodesByUrls.and.returnValue(of(mockEpisodes));
    component.item = { episode: ['url2'] };
    component.category = 'Personajes';

    component.ngOnInit();

    expect(component.episodes).toEqual(mockEpisodes);
  });

});
