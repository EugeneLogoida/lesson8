import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IProductsRequest, IProductsResponse } from '../../interfaces/products/products.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private url = environment.BACKEND_URL;
  private api = { products: `${this.url}/products` };

  constructor(private http: HttpClient) { }
  
  getAll(): Observable<IProductsResponse[]> {
    return this.http.get<IProductsResponse[]>(this.api.products);
  }

  getAllByCategory(name: string): Observable<IProductsResponse[]> {
    return this.http.get<IProductsResponse[]>(`${this.api.products}?category.path=${name}`);
  }

  getOne(id: number): Observable<IProductsResponse> {
    return this.http.get<IProductsResponse>(`${this.api.products}/${id}`);
  }

  create(product: IProductsRequest): Observable<IProductsResponse> {
    return this.http.post<IProductsResponse>(this.api.products, product);
  }

  update(product: IProductsRequest, id: number): Observable<IProductsResponse> {
    return this.http.patch<IProductsResponse>(`${this.api.products}/${id}`, product);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api.products}/${id}`);
  }

}
