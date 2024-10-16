import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-character-card',
  templateUrl: './character-card.component.html',
  styleUrls: ['./character-card.component.scss'],
  standalone:true,
  imports:[CommonModule,IonicModule],
})
export class CharacterCardComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
