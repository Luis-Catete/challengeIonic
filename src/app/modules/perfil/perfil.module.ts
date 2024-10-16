import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfilRoutingModule } from './perfil-routing.module';
import { IonicModule } from '@ionic/angular';
import { UserComponent } from './user/user.component';


@NgModule({
  declarations: [UserComponent],
  imports: [
    CommonModule,
    PerfilRoutingModule,
    IonicModule
  ]
})
export class PerfilModule { }
