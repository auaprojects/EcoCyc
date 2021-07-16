import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from '../shared/storage.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Request } from './request';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  private apiURL = environment.urlRequest;

  constructor(
    private storageService: StorageService,
    private http: HttpClient,
  ) { }

  newRequest(request: Request): Observable<Request> {
    return this.http.put(`${this.apiURL}new-request`, request).pipe(map((res: any) => {
      if (res) {
        return res;
      }
    }));
  }

  requests(): Observable<Request[]> {
    return this.http.get(`${this.apiURL}requests`).pipe(map((res: any) => {
      if (res) {
        return res.requests;
      }
    }));
  }

  getRequestById(idRequest: string): Observable<Request> {
    return this.http.post(`${this.apiURL}request-by-id`, {id: idRequest}).pipe(map((res: any) => {
      if (res) {
        return res.requests[0];
      }
    }));
  }
}
