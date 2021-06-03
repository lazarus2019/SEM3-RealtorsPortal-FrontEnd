import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Role } from '../shared/role.model';
import { Status } from '../shared/status.model';


@Injectable({
  providedIn: 'root'
})
export class StatusService {

  constructor(private http: HttpClient) { }

  private baseUrl = 'http://localhost:5000/api/status/';
  
  getAllStatus(): Observable<Status[]> {
    return this.http.get<Status[]>(this.baseUrl + "getStatus");
  }
}
