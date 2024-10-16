import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RickAndMortyComponent } from './rick-and-morty/rick-and-morty.component';

const routes: Routes = [
  { path: '', component: RickAndMortyComponent},
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartoonsRoutingModule { }
