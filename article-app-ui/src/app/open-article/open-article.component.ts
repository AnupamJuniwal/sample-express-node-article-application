import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from '../article.service';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-open-article',
  templateUrl: './open-article.component.html',
  styleUrls: ['./open-article.component.css']
})
export class OpenArticleComponent implements OnInit {

  id: string;
  data: any;
  err: string;
  loading = true;

  constructor(private route: ActivatedRoute,
    private httpArticleService: ArticleService,
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer) {
      iconRegistry.addSvgIcon(
        'thumbs-up',
        sanitizer.bypassSecurityTrustResourceUrl('assets/feedback-symbols/svg/010-like-1.svg'));
        iconRegistry.addSvgIcon(
          'thumbs-down',
          sanitizer.bypassSecurityTrustResourceUrl('assets/feedback-symbols/svg/013-dislike.svg'));
  }
  

  ngOnInit() {
    this.loading = true;
    this.route.params.subscribe(params => {
      this.id = params.articleId;
      this.httpArticleService.getByID(this.id).subscribe(result => {
        if (result['success'] && result['data'] && typeof result['data'] === 'object') {
          this.data = result['data'];
          this.err = null;
        } else {
          this.data = null;
          this.err = "Something bad happened!"
        }
        this.loading = false;
      })
    })

  }

}


