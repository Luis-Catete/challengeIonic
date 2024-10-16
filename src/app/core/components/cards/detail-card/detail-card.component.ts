import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule, ModalController, NavParams } from '@ionic/angular';
import { Character } from 'src/app/core/interfaces/character';
import { RickymortyService } from 'src/app/core/services/rickymorty.service';
import { InfoCardComponent } from '../info-card/info-card.component';
import { Episode } from 'src/app/core/interfaces/episode';

@Component({
  selector: 'app-detail-card',
  templateUrl: './detail-card.component.html',
  styleUrls: ['./detail-card.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, InfoCardComponent]
})
export class DetailCardComponent implements OnInit {

  item: any;
  category: string;

  characters: Character[] = [];
  episodes: Episode[] = [];

  constructor(
    private navParams: NavParams,
    private modalCtrl: ModalController,
    private rickymortyEndPoint: RickymortyService
  ) { 
    this.item = this.navParams.get('infoItem') || {}; // Recuperamos la información que nos mandan para mostrar
    this.category = this.navParams.get('category'); // Recuperamos la información de la categoría a la que pertenece
  }

  ngOnInit() {
    // Información de personajes o episodios que se consulta en base a la categoría
    if (this.category === "Episodios") {
      this.CharacterDetails(this.item.characters);
    } else if (this.category === "Locaciones") {
      this.CharacterDetails(this.item.residents);
    } else if(this.category === "Personajes") {
      this.EpisodesDetails(this.item.episode);
    }
  }

  CharacterDetails(characterUrls: string[]) {
    this.rickymortyEndPoint.getCharactersByUrls(characterUrls).subscribe({
      next: data => {
        this.characters = data; // Asigna los personajes obtenidos al array
      },
      error: (error) => {
        const errorMessage = error.message ? error.message : 'Error desconocido'; // Manejo de casos sin mensaje
        console.error('Error fetching character details:', errorMessage);
      },
      complete: () => {
        console.log('Fetching character details completed');
      }
    });
  }

  EpisodesDetails(episodesUrls: string[]) {
    this.rickymortyEndPoint.getEpisodesByUrls(episodesUrls).subscribe({
      next: data => {
        this.episodes = data; // Asigna los episodios obtenidos al array
      },
      error: (error) => {
        console.error('Error fetching episode details:', error); // Cambiado para reflejar que son episodios
      },
      complete: () => {
        console.log('Fetching episode details completed');
      }
    });
  }

  // Cerrar dialogo sin modificación 
  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }
}
