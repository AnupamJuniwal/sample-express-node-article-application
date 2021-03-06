import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { AddArticleComponent, BottomSheetResponse } from './add-article/add-article.component';
import { HomeComponent } from './home/home.component';
import { OpenArticleComponent } from './open-article/open-article.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatRippleModule,
  MatChipsModule,
  MatIconModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ArticleService } from './article.service';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatListModule} from '@angular/material/list';
import {MatIconModule as MaterialIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    AddArticleComponent,
    HomeComponent,
    OpenArticleComponent,
    BottomSheetResponse,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatChipsModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatBottomSheetModule,
    MatProgressSpinnerModule,
    MatListModule,
    MaterialIconModule
  ],
  exports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatChipsModule,
    MatIconModule,
    HttpClientModule,
    MatBottomSheetModule,
    MatProgressSpinnerModule,
    MatListModule,
    MaterialIconModule
  ],
  providers: [
    ArticleService
  ],
  bootstrap: [AppComponent],
  entryComponents:[
    BottomSheetResponse
  ]
})
export class AppModule { }
