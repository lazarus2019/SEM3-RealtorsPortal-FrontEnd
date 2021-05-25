import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Role } from '../shared/role.model';


@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient) { }

  private baseUrl = 'http://localhost:5000/api/role';
  
  getAllRole(): Observable<Role[]> {
    return this.http.get<Role[]>(this.baseUrl);
  }
}
