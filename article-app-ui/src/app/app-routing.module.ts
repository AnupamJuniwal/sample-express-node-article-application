import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { AddArticleComponent } from './add-article/add-article.component';
import { HomeComponent } from './home/home.component';
import { OpenArticleComponent } from './open-article/open-article.component';

const routes: Routes = [
  { path: '', redirectTo: '/(main:home)', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
    outlet: 'main'
  },
  {
    path: 'search',
    component: SearchComponent,
    outlet: 'finder'
  },
  {
    path: 'view:articleId',
    component: OpenArticleComponent,
    outlet: 'main'
  },
  {
    path: 'add',
    component: AddArticleComponent,
    outlet: 'main'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
