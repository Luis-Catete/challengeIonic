import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-info-card',
  templateUrl: './info-card.component.html',
  styleUrls: ['./info-card.component.scss'],
  standalone:true,
  imports:[CommonModule,IonicModule]
})
export class InfoCardComponent  implements OnInit {
  @Input() item: any; // El objeto que puede ser episodio, personaje o locación
  @Input() category: string = ''; // La categoría para definir el formato de los datos

  constructor() { }

  ngOnInit() {}

}
