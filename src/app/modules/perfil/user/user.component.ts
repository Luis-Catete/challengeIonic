import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent  implements OnInit {

  constructor(
    private authService:AuthService,
    private router: Router,
    private alertController: AlertController 
  ) { }

  ngOnInit() {}

  async logout() {
    const alert = await this.alertController.create({
      header: 'Confirmar cierre de sesión',
      message: '¿Estás seguro de que deseas cerrar sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cierre de sesión cancelado');
          }
        },
        {
          text: 'Cerrar sesión',
          handler: () => {
            this.authService.logout()
              .then(response => {
                console.log(response);
                this.router.navigate(['/auth/login']);
              })
              .catch(error => console.log(error));
          }
        }
      ]
    });

    await alert.present();
  }

}
