import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor( private http: HttpClient ) { }

  loadFunct(body): Observable<any> {
    return this.http.post(`http://localhost:3000/home`,body)
  }

  getFunct(): Observable<any> {
    return this.http.get(`http://localhost:3000/get-table`)
  }

  saveFunct(body): Observable<any> {
    return this.http.post(`http://localhost:3000/input-item`,body)
  }

  updateFunct(): Observable<any> {
    return this.http.get(`http://localhost:3000/update-status`)
  }

  updateAColumn(body): Observable<any> {
    return this.http.post(`http://localhost:3000/update-column`,body)
  }

}
