import { Injectable } from '@angular/core';
import { PET_STATUS, Pet } from '../../pets-list/pets.typings';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PetstoreService {
  constructor(private http: HttpClient) {}

  getPets(status: PET_STATUS = 'available'): Observable<Pet[]> {
    return this.http
      .get<Pet[]>(
        `https://petstore3.swagger.io/api/v3/pet/findByStatus?status=${status}`
      )
      .pipe(
        // TODO handle errors in catchError
        map(pets => {
          return pets.map(
            ({ name, status, photoUrls }) =>
              <Pet>{
                name,
                status,
                photoUrls
              }
          );
        })
      );
  }

  addPet(data: Pet): Observable<Pet> {
    // TODO handle errors in catchError
    return this.http.post<Pet>(
      'https://petstore3.swagger.io/api/v3/pet',
      JSON.stringify(data),
      {
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }
    );
  }
}
