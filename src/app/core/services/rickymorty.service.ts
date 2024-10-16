import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RickymortyService {
  baseUrl = environment.baseUrlRyM;

  constructor(private http: HttpClient) { }

  //ruta para obtener los personajes
  getCharacters(page: number,) {
    return this.http.get<any>(`${this.baseUrl}/character`,{
      params: {
        page: page.toString(),
      }
    }).pipe(
      tap((res: any) => {
        console.log("respuesta de api create ",res);
      })
    );
  }

  // ruta para obtener personajes por URLs
  getCharactersByUrls(characterUrls: string[]) {
    const requests = characterUrls.map(url => this.http.get<any>(url));
    
    return forkJoin(requests).pipe(
      tap((res: any) => {
        console.log('Personajes obtenidos:', res);
      })
    );
  }

  //ruta para obtener los episodios
  getEpisodes(page: number,) {
    return this.http.get<any>(`${this.baseUrl}/episode`,{
      params: {
        page: page.toString(),
      }
    }).pipe(
      tap((res: any) => {
        console.log("respuesta de api create ",res);
      })
    );
  }

  // ruta para obtener episodios por URLs
  getEpisodesByUrls(episodiosUrls: string[]) {
    const requests = episodiosUrls.map(url => this.http.get<any>(url));
    
    return forkJoin(requests).pipe(
      tap((res: any) => {
        console.log('Episodios obtenidos:', res);
      })
    );
  }

  // Ruta para obtener las locaciones
getLocations(page: number) {
  return this.http.get<any>(`${this.baseUrl}/location`, {
    params: {
      page: page.toString(),
    }
  }).pipe(
    tap((res: any) => {
      console.log("respuesta de api getLocations", res);
    })
  );
}


}
