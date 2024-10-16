import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

/*const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadChildren: () => import('../tab1/tab1.module').then(m => m.Tab1PageModule)
      },
      {
        path: 'tab2',
        loadChildren: () => import('../tab2/tab2.module').then(m => m.Tab2PageModule)
      },
      {
        path: 'tab3',
        loadChildren: () => import('../tab3/tab3.module').then(m => m.Tab3PageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full'
  }
];*/

const routes: Routes = [
  { path: '', component: TabsPage, children: [
      { path: 'inicio', loadChildren: () => import('../modules/home/home.module').then((m) => m.HomeModule) },
      { path: 'cartoons', loadChildren: () => import('../modules/cartoons/cartoons.module').then((m) => m.CartoonsModule) },
      //{ path: 'recompensas', loadChildren: () => import('../modules/recompensas/recompensas.module').then((m) => m.RecompensasModule) },
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
