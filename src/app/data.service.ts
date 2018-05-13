import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private http: HttpClient,
  ) { }
  baseURL = window.location.host;

  getMovies(page: number) {
    return this.http.get(this.baseURL + '/API/CONTENTLISTINGPAGE-PAGE' + page + '.json');
  }

  getSearchedMovie(text: string) {
    return this.http.get(this.baseURL + '/search/' + text);
  }
}
