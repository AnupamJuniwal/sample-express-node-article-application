import { Component, OnInit } from '@angular/core';
import { delay } from '../misc.service';
import { ArticleService } from '../article.service';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  dataSet = [];
  err: string;
  loading = false;
  constructor(private httpArticleService: ArticleService) { }

  ngOnInit() {
  }

  async onSearchChange(source: any) {
    const oldValue = source.value;
    await delay(500);
    if (source.value === oldValue) {
      this.search(source.value);
    }
  }

  search(searchItem: string) {
    const tags = searchItem.toLowerCase().split(/(\s)/g).filter(tag => tag.trim().length > 0);
    
    if (tags.length > 0) {
      this.err = null;
      this.loading = true;
      this.httpArticleService.find(tags).subscribe(result => {
        if (result['success'] && result['data'] && result['data'].length > 0) {
          this.dataSet = result['data'];
        } else {
          this.dataSet = null;
          this.err = "No data to Display"
        }
        this.loading = false;
      })
    } else {
      this.dataSet = null;
      this.err = "Please Enter some valid tags!"
      this.loading = false;
    }
  }

  listAll() {
    this.err = null;
    this.loading = true;
    this.httpArticleService.getAll().subscribe(result => {
      if (result['success'] && result['data'] && result['data'].length > 0) {
        this.dataSet = result['data'];
        this.loading = false;
      } else {
        this.dataSet = null;
        this.err = "No data to Display"
      }
    })
  }
}
