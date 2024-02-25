import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  api_key = '037f872ea1c47d9d478cde261bcb9c2e';
  constructor(private http: HttpClient) {}

  getAllMovies(): Observable<any> {
    return this.http.get<any>(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${this.api_key}`
    );
  }
}
