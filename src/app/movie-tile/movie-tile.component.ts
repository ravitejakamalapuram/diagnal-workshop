import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-movie-tile',
  templateUrl: './movie-tile.component.html',
  styleUrls: ['./movie-tile.component.css']
})
export class MovieTileComponent implements OnInit {

  @Input() movie;

  constructor() { }

  ngOnInit() {
  }

}
