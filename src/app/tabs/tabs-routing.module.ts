import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  { path: '', component: TabsPage, children: [
      { path: 'inicio', loadChildren: () => import('../modules/home/home.module').then((m) => m.HomeModule) },
      { path: 'cartoons', loadChildren: () => import('../modules/cartoons/cartoons.module').then((m) => m.CartoonsModule) },
      { path: 'perfil', loadChildren: () => import('../modules/perfil/perfil.module').then((m) => m.PerfilModule) },
      //{ path: 'perfil', loadChildren: () => import('../modules/perfil/perfil.module').then((m) => m.PerfilModule) },
      //{ path: 'patrocinadores', loadChildren: () => import('../modules/patrocinadores/patrocinadores.module').then((m) => m.PatrocinadoresModule) },
      { path: '', redirectTo: 'inicio', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
