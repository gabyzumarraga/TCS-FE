import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, tap, of } from 'rxjs';
import { user } from 'src/app/interfaces/user';
import { UserService } from 'src/app/shared/services/user.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _user!: user;

  // private baseUrl: string = 'http://54.91.126.120:8081';
  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient, private userService: UserService) { }

  get user() {
    return { ...this._user };
  }

  login(id_numero_Ultimatix: string, clave: string) {
    const url: string = `${this.baseUrl}/asociados/tcs-login`;
    const body = { id_numero_Ultimatix, clave };
    return this.http.post<user>(url, body)
      .pipe(tap(resp => this._user = { ...resp }));
  }

  logout() {
    sessionStorage.removeItem('token');
  }

  validateToken() {
    const ultimatix = sessionStorage.getItem('token') || '';
    const url: string = `${this.baseUrl}/asociados/buscar/${ultimatix}`;
    return this.http.get<user>(url)
      .pipe(
        map(resp => {
          sessionStorage.setItem('token', resp.id_numero_Ultimatix!);
          this.userService.updateUser(resp);
          return true;
        }),
        catchError(() => of(false))
      );
  }
}