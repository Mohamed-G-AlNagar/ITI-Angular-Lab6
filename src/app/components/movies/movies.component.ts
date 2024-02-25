import { Component } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { IMovies } from '../../models/imovies';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.scss',
})
export class MoviesComponent {
  allMovies: IMovies[] = [];
  constructor(private moviesSer: MoviesService) {}
  ngOnInit(): void {
    this.moviesSer.getAllMovies().subscribe({
      next: (data) => {
        this.allMovies = data.results;
        console.log(data);
      },
    });
  }
}
