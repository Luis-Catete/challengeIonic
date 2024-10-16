import { Component, OnInit } from '@angular/core';
import { RickymortyService } from 'src/app/core/services/rickymorty.service';
import { LoadingController, AlertController, ModalController } from '@ionic/angular';
import * as moment from 'moment';
import { Episode } from 'src/app/core/interfaces/episode';
import { Character } from 'src/app/core/interfaces/character';
import { Location } from 'src/app/core/interfaces/location';
import { DetailCardComponent } from 'src/app/core/components/cards/detail-card/detail-card.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-rick-and-morty',
  templateUrl: './rick-and-morty.component.html',
  styleUrls: ['./rick-and-morty.component.scss'],
})
export class RickAndMortyComponent implements OnInit {
  categories: string[] = ['Personajes', 'Episodios', 'Locaciones'];
  selectedCategory = 'Locaciones';
  characters: Character[] = [];
  episodes: Episode[] = [];
  locations: Location[] = [];
  error: string = '';
  selectedDate: string = '';//fecha para filtro
  searchQuery: string = ''; //texto de busqueda para filtro
  page: number = 1; // Para manejar la paginación
  itemsPerPage: number = 10; // Número de ítems a cargar por vez
  moreData: boolean = true; // Controla si hay más datos para cargar


  constructor(
    private rickyMortyEndPoint: RickymortyService,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private modalCtrl: ModalController,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    // Leer el parámetro de consulta al iniciar si recibe algun parametro
    this.activatedRoute.queryParams.subscribe(params => {
      if (params['category']) {
        this.selectedCategory = params['category']; // Asignar la categoría seleccionada
      }
      this.getData(); // Obtener datos según la categoría
    });
  }

  // Método para recibir los filtros del componente hijo (app-filter)
  onFilterSelected(filters: any) {
    this.selectedCategory = filters.category;
    this.selectedDate = filters.date;
    this.searchQuery = filters.searchQuery;
    this.page = 1; // Reiniciar la página al aplicar un nuevo filtro
    this.getData();
  }

  async getData() {
    // Restablecer los resultados
    if (this.page === 1) {
      this.characters = [];
      this.episodes = [];
      this.locations = [];
      this.moreData = true; // Reiniciar el control de datos
    }
  
    // Restablecer el filtro de fecha si no estamos en la categoría de episodios
    if (this.selectedCategory !== 'Episodios') {
      this.selectedDate = ''; // Resetear la fecha si se cambia a otra categoría
    }
  
    this.error = ''; // Resetear errores
    const loading = await this.loadingController.create({
      message: 'Cargando datos...',
      spinner: 'crescent',
    });
    await loading.present(); // Mostrar el diálogo de carga
  
    switch (this.selectedCategory) {
      case 'Personajes':
        this.rickyMortyEndPoint.getCharacters(this.page).subscribe({
          next: response => {
            if (response.results.length < this.itemsPerPage) {
              this.moreData = false; // No hay más datos
            }
            let filteredCharacters = response.results;
  
            // Aplicar filtro de búsqueda si hay una palabra clave ingresada
            if (this.searchQuery) {
              filteredCharacters = this.applySearchFilter(filteredCharacters, ['name', 'status']);
            }
  
            this.characters = [...this.characters, ...filteredCharacters];
          },
          error: async () => {
            this.error = 'Error al cargar personajes';
            await loading.dismiss(); // Asegurarse de ocultar el diálogo
            this.showErrorAlert('Error al cargar personajes'); // Mostrar alerta de error
          },
          complete: async () => {
            console.log('Petición de personajes completada');
            await loading.dismiss(); // Mover aquí para asegurarse de que se cierra en complete
          }
        });
        break;
  
        case 'Episodios':
          this.rickyMortyEndPoint.getEpisodes(this.page).subscribe({
            next: response => {
              // Establece `moreData` en `false` si no hay resultados
              if (response.results.length < this.itemsPerPage) {
                this.moreData = false; // No hay más datos
              } else {
                this.moreData = true; // Hay más datos disponibles
              }
        
              let filteredEpisodes = response.results;
        
              // Aplicar el filtro de fecha para mostrar los episodios por fecha de emisión si estan disponibles
          if (this.selectedDate) {
            const selectedDateMoment = moment(this.selectedDate);

            filteredEpisodes = filteredEpisodes.filter((episode: Episode) => {
              const episodeAirDate = moment(episode.air_date, 'MMMM D, YYYY');
              return episodeAirDate.isSame(selectedDateMoment, 'day'); //se 
            });

          }
        
              // Lógica de filtro de búsqueda
              if (this.searchQuery) {
                filteredEpisodes = this.applySearchFilter(filteredEpisodes, ['name', 'episode']);
              }
        
              this.episodes = [...this.episodes, ...filteredEpisodes];
            },
            error: async () => {
              this.error = 'Error al cargar episodios';
              await loading.dismiss();
              this.showErrorAlert('Error al cargar episodios');
            },
            complete: async () => {
              console.log('Petición de episodios completada');
              await loading.dismiss();
            }
          });
          break;
        
      case 'Locaciones':
        this.rickyMortyEndPoint.getLocations(this.page).subscribe({
          next: response => {
            if (response.results.length < this.itemsPerPage) {
              this.moreData = false; // No hay más datos
            }
  
            let filteredLocations = response.results;
  
            // Aplicar filtro de búsqueda si hay una palabra clave ingresada
            if (this.searchQuery) {
              filteredLocations = this.applySearchFilter(filteredLocations, ['name', 'type']);
            }
            this.locations = [...this.locations, ...filteredLocations];
          },
          error: async () => {
            this.error = 'Error al cargar locaciones';
            await loading.dismiss();
            this.showErrorAlert('Error al cargar locaciones');
          },
          complete: async () => {
            console.log('Petición de locaciones completada');
            await loading.dismiss(); // Mover aquí para asegurarse de que se cierra en complete
          }
        });
        break;
  
      default:
        await loading.dismiss(); // Ocultar el diálogo si no hay categoría seleccionada
        break;
    }
  }
  

  // Metodo para cargar mas datos al hacer scroll infinito
  loadData(event: any) {
    if (!this.moreData) {
      event.target.complete(); // Completa la acción de carga si no hay más datos
      console.log('No hay más episodios para cargar.'); // Log para depurar
      return;
    }
  
    this.page++; // Incrementar la página
    this.getData().then(() => {
      event.target.complete(); // Completar la acción de carga
    });
  }
  

  // Método para mostrar alerta de error
  async showErrorAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  applySearchFilter(data: any[], properties: string[]): any[] {
    // Si no hay ningún término de búsqueda, devuelve todos los datos sin filtrar.
    if (!this.searchQuery) {
      return data;
    }
  
    // Convierte el término de búsqueda en minúsculas para hacer una búsqueda insensible a mayúsculas o minúsculas
    const searchTermLower = this.searchQuery.toLowerCase();
  
    // Filtra el array de datos. Por cada elemento en 'data', se verifica si alguna de las propiedades especificadas contiene el término de búsqueda
    return data.filter(item => {
      // La función some() verifica si al menos una propiedad del objeto contiene el término de búsqueda
      return properties.some(prop => {
        // Si la propiedad existe y no es undefined o null, convierte su valor en string, lo pasa a minúsculas y verifica si incluye el término de búsqueda
        if (item[prop]) {
          return item[prop].toString().toLowerCase().includes(searchTermLower);
        }
        // Si la propiedad no existe o es undefined/null, devuelve false
        return false;
      });
    });
  }

  //Despliega un dialogo para mostrar la información de la categoria seleccionada 
  async infoItem(item:any) {
    //Método para mandar la información del item seleccionado al componente
    const modal = await this.modalCtrl.create({
      component: DetailCardComponent,
      componentProps: { infoItem: item,category:this.selectedCategory },
    });
    modal.present();
  }
  
}
