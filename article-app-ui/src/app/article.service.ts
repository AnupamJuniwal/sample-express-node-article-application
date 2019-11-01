import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  options = {headers: this.headers};
  constructor(private http: HttpClient) { }

  getRoot() {
    return this.http.get("/", this.options);
  }

  postNewArticle(data){
    return this.http.post("/articles/add", data, this.options);
  }
}
