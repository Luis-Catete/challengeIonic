import { Component, OnInit } from '@angular/core';
import { RickymortyService } from 'src/app/core/services/rickymorty.service';
import { LoadingController, AlertController } from '@ionic/angular';
import * as moment from 'moment';
import { Episode } from 'src/app/core/interfaces/episode';

@Component({
  selector: 'app-rick-and-morty',
  templateUrl: './rick-and-morty.component.html',
  styleUrls: ['./rick-and-morty.component.scss'],
})
export class RickAndMortyComponent implements OnInit {
  categories: string[] = ['Personajes', 'Episodios', 'Locaciones'];
  selectedCategory = 'Locaciones';
  characters: any[] = [];
  episodes: any[] = [];
  locations: any[] = [];
  error: string = '';
  selectedDate: string = '';
  searchQuery: string = '';

  constructor(
    private rickyMortyEndPoint: RickymortyService,
    private loadingController: LoadingController,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.getData();
  }

  // Método para recibir los filtros del componente hijo (app-filter)
  onFilterSelected(filters: any) {
    this.selectedCategory = filters.category;
    this.selectedDate = filters.date;
    this.searchQuery = filters.searchQuery;
    this.getData();
  }

  async getData() {
    // Se Restablecen los resultados
    this.characters = [];
    this.episodes = [];
    this.locations = [];

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
        this.rickyMortyEndPoint.getCharacters().subscribe({
          next: response => {
            let filteredCharacters = response.results;

            // Aplicar filtro de búsqueda si hay una palabra clave ingresada
          if (this.searchQuery) {
            filteredCharacters = this.applySearchFilter(filteredCharacters, ['name', 'status']);
          }

            this.characters = response.results;
            loading.dismiss(); // Ocultar el diálogo de carga
          },
          error: async () => {
            this.error = 'Error al cargar personajes';
            await loading.dismiss(); // Asegurarse de ocultar el diálogo
            this.showErrorAlert('Error al cargar personajes'); // Mostrar alerta de error
          },
          complete: () => {
            console.log('Petición de personajes completada');
          }
        });
        break;

      case 'Episodios':
        this.rickyMortyEndPoint.getEpisodes().subscribe({
          next: response => {
            let filteredEpisodes = response.results;

          // Aplicar el filtro de fecha para mostrar los episodios por fecha de emisión si estan disponibles
          if (this.selectedDate) {
            const selectedDateMoment = moment(this.selectedDate);

            filteredEpisodes = filteredEpisodes.filter((episode: Episode) => {
              const episodeAirDate = moment(episode.air_date, 'MMMM D, YYYY');
              return episodeAirDate.isSame(selectedDateMoment, 'day'); //se 
            });

          }

          // Aplicar filtro de búsqueda si hay una palabra clave ingresada
          if (this.searchQuery) {
            filteredEpisodes = this.applySearchFilter(filteredEpisodes, ['name', 'episode']);
          }

            this.episodes = filteredEpisodes;
            loading.dismiss();
          },
          error: async () => {
            this.error = 'Error al cargar episodios';
            await loading.dismiss();
            this.showErrorAlert('Error al cargar episodios');
          },
          complete: () => {
            console.log('Petición de episodios completada');
          }
        });
        break;

      case 'Locaciones':
        this.rickyMortyEndPoint.getLocations().subscribe({
          next: response => {

            let filteredLocations = response.results;

          // Aplicar filtro de búsqueda si hay una palabra clave ingresada
          if (this.searchQuery) {
            filteredLocations = this.applySearchFilter(filteredLocations, ['name', 'type']);
          }
            this.locations = filteredLocations;
            loading.dismiss();
          },
          error: async () => {
            this.error = 'Error al cargar locaciones';
            await loading.dismiss();
            this.showErrorAlert('Error al cargar locaciones');
          },
          complete: () => {
            console.log('Petición de locaciones completada');
          }
        });
        break;

      default:
        loading.dismiss(); // Ocultar el diálogo si no hay categoría seleccionada
        break;
    }
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

  // Aplicar los filtros (búsqueda y fecha)
  applyFilters(data: any[]) {
    return data.filter(item => {
      // Filtrar por búsqueda (searchQuery)
      const matchesSearch = !this.searchQuery || 
        item.name.toLowerCase().includes(this.searchQuery.toLowerCase());

      // Filtrar por fecha (para episodios o locaciones si tienen fecha)
      const matchesDate = !this.selectedDate || 
        (item.air_date && item.air_date.includes(this.selectedDate));

      return matchesSearch && matchesDate;
    });
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
  
}
