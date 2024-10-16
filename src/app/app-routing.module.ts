import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const routes: Routes = [
  { path: '',loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),  ...canActivate(() => redirectUnauthorizedTo(['/auth/register']))},
  { path: 'auth',loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)}
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
