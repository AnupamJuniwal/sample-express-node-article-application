import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { AddArticleComponent } from './add-article/add-article.component';
import { HomeComponent } from './home/home.component';
import { OpenArticleComponent } from './open-article/open-article.component';
import {RouterModule, Routes} from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    AddArticleComponent,
    HomeComponent,
    OpenArticleComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([
      {
        path: '/home',
        component: HomeComponent
      },
      {
        path: '/search',
        component: SearchComponent
      },
      {
        path: '/view:articleId',
        component: OpenArticleComponent
      },
      {
        path: '/add',
        component: AddArticleComponent
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
