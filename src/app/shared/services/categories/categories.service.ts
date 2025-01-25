import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { collection, CollectionReference, DocumentData, Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICategoriesRequest, ICategoriesResponse } from '../../interfaces/categories/categories.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private url = environment.BACKEND_URL;
  private api = { categories: `${this.url}/categories` };


  private categoryCollection!: CollectionReference<DocumentData>;


  constructor(
    private http:HttpClient,
    private afs: Firestore,
    ) {
      this.categoryCollection = collection(this.afs, 'categories');
     }

  getAll(): Observable<ICategoriesResponse[]>{
    return this.http.get<ICategoriesResponse[]>(this.api.categories);
  }
  create(category:ICategoriesRequest):Observable<ICategoriesResponse>{
    return this.http.post<ICategoriesResponse>(this.api.categories, category);
  }
  update(category:ICategoriesRequest, id:number):Observable<ICategoriesResponse>{
    return this.http.patch<ICategoriesResponse>(`${this.api.categories}/${id}`, category);
  }
  delete(id: number): Observable<void>{
    return this.http.delete<void>(`${this.api.categories}/${id}`);
  }
}
