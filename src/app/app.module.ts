import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { PresetListComponent } from './preset-list/preset-list.component';
import { PresetService } from './preset.service';
import { HttpClientModule } from '@angular/common/http';
import { GroupingComponent } from './grouping/grouping.component';
import { GroupService } from './grouping/group.service';
import { FavoritesComponent } from './favorites/favorites.component';
import { FavoritesService } from './favorites/favorites.service';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  effect: 'coverflow',
  loop: true,
  centeredSlides: true,
  slidesPerView: 3,
  initialSlide: 3,
  preventClicks: false,
  preventClicksPropagation: false
};


@NgModule({
  declarations: [
    AppComponent,
    PresetListComponent,
    GroupingComponent,
    FavoritesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    SwiperModule
  ],
  providers: [PresetService, GroupService, FavoritesService, {
    provide: SWIPER_CONFIG,
    useValue: DEFAULT_SWIPER_CONFIG
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
