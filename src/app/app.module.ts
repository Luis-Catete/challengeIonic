import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, provideFirebaseApp(() => initializeApp({"projectId":"challengeionic-a114c","appId":"1:52785534243:web:1046f164b7461b6cdb2896","storageBucket":"challengeionic-a114c.appspot.com","apiKey":"AIzaSyCn0K35Vmi6mTFAHSGXV1u0okXvNEezUGk","authDomain":"challengeionic-a114c.firebaseapp.com","messagingSenderId":"52785534243"})), provideAuth(() => getAuth()),],
  bootstrap: [AppComponent],
})
export class AppModule {}
