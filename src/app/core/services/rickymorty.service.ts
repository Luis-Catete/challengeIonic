import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RickymortyService {
  baseUrl = environment.baseUrlRyM;

  constructor(private http: HttpClient) { }

  //ruta para obtener los personajes
  getCharacters() {
    return this.http.get<any>(`${this.baseUrl}/character`,).pipe(
      tap((res: any) => {
        console.log("respuesta de api create ",res);
      })
    );
  }

  //ruta para obtener los episodios
  getEpisodes() {
    return this.http.get<any>(`${this.baseUrl}/episode`,).pipe(
      tap((res: any) => {
        console.log("respuesta de api create ",res);
      })
    );
  }

  //ruta para obtener las locaciones
  getLocations() {
    return this.http.get<any>(`${this.baseUrl}/location`,).pipe(
      tap((res: any) => {
        console.log("respuesta de api create ",res);
      })
    );
  }

}
