import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from '../shared/storage.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Request } from './request';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  private apiURL = environment.urlRequest;
  // eslint-disable-next-line @typescript-eslint/member-ordering
  requestSubject = new BehaviorSubject<Request>(null);

  constructor(
    private storageService: StorageService,
    private http: HttpClient,
  ) { }

  newRequest(request: Request): Observable<any> {
    return this.http.put(`${this.apiURL}new-request`, request).pipe(map((res: any) => {
      if (res) {
        return res;
      }
    }));
  }

  setSubject(request: Request) {
    this.requestSubject.next(request);
  }

  requests(): Observable<Request[]> {
    return this.http.get(`${this.apiURL}requests`).pipe(map((res: any) => {
      if (res) {
        return res.requests;
      }
    }));
  }

  updateRequest(obj: any): Observable<any> {
    return this.http.put(`${this.apiURL}update-request`, obj).pipe(map((res: any) => {
      if (res) {
        return res;
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
