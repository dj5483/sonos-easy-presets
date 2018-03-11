import { Component, OnInit } from '@angular/core';
import { FavoritesService } from './favorites.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  favorites: String[];

  selectedFavorite: String;

  constructor(private favoritesService: FavoritesService) { }

  ngOnInit() {
    this.getFavorites();
  }

  getFavorites(): void {
    this.favoritesService.getFavorites()
      .subscribe(favorites => this.favorites = favorites);
  }

  onSelect(favorite: string): void {
    console.log('favorite selected ' + favorite);
    this.favoritesService.invokeFavorite(favorite);
    this.selectedFavorite = favorite;
  }

}
