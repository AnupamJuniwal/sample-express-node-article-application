import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  options = { headers: this.headers };
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get("/articles/", this.options);
  }

  getByID(id: string) {
    return this.http.get("/articles/get/".concat(id), this.options);
  }


  find(tags = []) {
    return this.http.post("/articles/search", { tags: tags }, this.options);
  }

  postNewArticle(data) {
    return this.http.post("/articles/add", data, this.options);
  }

  vote(id, like) {
    const vote = (like || '').toString();
    return this.http.get("/articles/vote/".concat(id).concat('/').concat(vote ? vote : false), this.options);
  }
}
