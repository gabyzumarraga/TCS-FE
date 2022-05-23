import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Profile, Skills } from '../interfaces/profile';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private baseUrl: string = environment.baseUrl;
  // private baseUrl: string = 'http://54.91.126.120:8081';

  constructor(private http: HttpClient) { }

  getProfile(ultimatix: string) {
    const url: string = `${this.baseUrl}/perfil/perfil`;
    return this.http.post<Profile>(url, { id_ultimatix: ultimatix });
  }

  getSkills() {
    const url: string = `${this.baseUrl}/perfil/habilidades`;
    return this.http.get<Skills[]>(url);
  }

  updateAboutMe(ultimatix: string, aboutMe: string) {
    const url: string = `${this.baseUrl}/perfil/sobreMi`;
    return this.http.post<Profile>(url, { id_ultimatix: ultimatix, sobreMi: aboutMe });
  }

  updateMySkills(ultimatix: string, skills: string[]) {
    const url: string = `${this.baseUrl}/perfil/habilidades`;
    return this.http.post<Profile>(url, { id_ultimatix: ultimatix, habilidades: skills })
  }

}
