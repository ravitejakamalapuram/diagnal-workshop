import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from './data.service';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  searching = false;
  title;
  moviename: string;
  end = false;
  search_results = null;
  movies = [];
  page = 0;
  modelChanged: Subject<string> = new Subject<string>();

  constructor(private getData: DataService) {
    this.modelChanged
      .debounceTime(300)
      // .distinctUntilChanged()
      .subscribe(model => {
        this.moviename = model;
        this.getSearchResults(model);

      });
  }

  movienameSearch(text: string) {
    this.modelChanged.next(text);
  }

  getSearchResults(text: string) {
    this.getData.getSearchedMovie(text).subscribe(
      (search_res: [string]) => {
        if (search_res.length > 0) {
          this.search_results = search_res;
        } else {
          this.search_results = 'no';
        }
      },
      err => {
        this.search_results = 'no';
      });
  }

  selectedMovie(movie) {
    this.moviename = movie;
  }

  ngOnInit() {
    window.addEventListener('scroll', () => {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        this.getMovies();
      }
    }, true);
    document.addEventListener('click', () => {
      this.search_results = null;
    });
    this.getMovies();
  }

  getMovies(): void {
    if (!this.end) {
      this.page = this.page + 1;
      this.getData.getMovies(this.page).subscribe(
        movieArray => {
          this.title = movieArray['page']['title'];
          movieArray['page']['content-items']['content'].map(o => {
            this.movies.push(o);
          });
        },
        err => {
          this.end = true;
        });
    }
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', () => {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        this.getMovies();
      }
    }, true);
  }
}
