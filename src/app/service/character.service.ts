import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Character, Race } from '../models/character.data';

@Injectable({
  providedIn: 'root',
})
export class RepoCharacterService {
  httpClient = inject(HttpClient);
  url = environment.apiUrl + '/character';

  getCharacter() {
    return this.httpClient.get<Character[]>(this.url);
  }
  createCharacter(data: FormData) {
    return this.httpClient.post<Character[]>(this.url, data);
  }
  filterCharacter(race: Race) {
    console.log(race);
    return this.httpClient.get<Character[]>(this.url + '/search/' + race);
  }
}
