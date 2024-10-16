import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartoonsRoutingModule } from './cartoons-routing.module';
import { RickAndMortyComponent } from './rick-and-morty/rick-and-morty.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CharacterCardComponent } from 'src/app/core/components/character-card/character-card.component';
import { RickymortyService } from 'src/app/core/services/rickymorty.service';
import { HttpClientModule } from '@angular/common/http';
import { FilterComponent } from 'src/app/core/components/filter/filter.component';

@NgModule({
  declarations: [
    RickAndMortyComponent
  ],
  imports: [
    CommonModule,
    CartoonsRoutingModule,
    IonicModule,
    FormsModule,
    CharacterCardComponent,
    HttpClientModule,
    FilterComponent
  ],
  providers:[RickymortyService]
})
export class CartoonsModule { }
