import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Character } from '../../interfaces/character';

@Component({
  selector: 'app-character-card',
  templateUrl: './character-card.component.html',
  styleUrls: ['./character-card.component.scss'],
  standalone:true,
  imports:[CommonModule,IonicModule],
})
export class CharacterCardComponent  implements OnInit {

  @Input() character!: Character; // Recibir el objeto Character


  constructor() { }

  ngOnInit() {}

}
