import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(
    private router: Router
  ) {}

   // Función para navegar a otra pagina
   navigateTo(page: string) {
    this.router.navigate([page]);
  }
}
