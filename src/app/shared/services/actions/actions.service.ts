import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IActionsRequest, IActionsResponse } from '../../interfaces/actions/actions.interface';

@Injectable({
  providedIn: 'root'
})
export class ActionsService {

  private url = environment.BACKEND_URL;
  private api = { actions: `${this.url}/actions` };

  constructor(private http: HttpClient) { }

  getAll(): Observable<IActionsResponse[]> {
    return this.http.get<IActionsResponse[]>(this.api.actions);
  }
  getOne(id: number): Observable<IActionsResponse> {
    return this.http.get<IActionsResponse>(`${this.api.actions}/${id}`);
  }

  create(discount: IActionsRequest): Observable<IActionsResponse> {
    return this.http.post<IActionsResponse>(this.api.actions, discount);
  }
  update(discount: IActionsRequest, id: number): Observable<IActionsResponse> {
    return this.http.patch<IActionsResponse>(`${this.api.actions}/${id}`, discount);
  }
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api.actions}/${id}`);
  }


}
