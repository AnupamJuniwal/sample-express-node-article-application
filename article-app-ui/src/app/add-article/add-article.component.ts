import { Component, OnInit } from '@angular/core';
import { COMMA, ENTER, SPACE } from '@angular/cdk/keycodes';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { MatChipInputEvent } from '@angular/material/chips';
import { ErrorStateMatcher } from '@angular/material';
import { ArticleService } from '../article.service';
@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.css']
})
export class AddArticleComponent implements OnInit {
  tags = [];
  content: string;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA, SPACE];
  formCtrl: FormGroup;
  errorMatcher = new ErrorStateMatcher();

  constructor(private httpArticleService: ArticleService) { }

  ngOnInit() {
    this.formCtrl = new FormGroup({
      'title': new FormControl(new String(), [
        Validators.required,
        Validators.minLength(3)
      ]),
      'publisher': new FormControl(new String(), [
        Validators.required,
        Validators.minLength(3)
      ]),
      'content': new FormControl(new String(), [
        Validators.required,
        Validators.minLength(10)
      ])
    })
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    let value = event.value;

    // Reset the input value
    if (input) {
      input.value = '';
    }

    // Add our fruit
    if ((value || '').trim()) {
      value = value.trim();
      if (!this.tags.includes(value))
        this.tags.push(value);
    }

  }

  remove(tags: string): void {
    const index = this.tags.indexOf(tags);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  post() {
    const dataToBeSent = {
      title: this.formCtrl.value['content'],
      publisher: this.formCtrl.value['publisher'],
      content: this.formatContent(this.formCtrl.value['content']),
      tags: this.tags
    }
    console.log(dataToBeSent);
    
    this.httpArticleService.postNewArticle(dataToBeSent).subscribe( result => console.log(result));
  }

  formatContent(content: string) {
    return "<p>".concat(content.replace(/\n/g, "</p><p>")).concat("</p>");
  }

  getFirstError(field: string) {
    let msg = "";
    switch ((Object.keys(this.formCtrl.controls[field].errors)[0] || "").toString()) {
      case 'minlength':
        msg = "Atleast ".concat(this.formCtrl.controls[field].errors['minlength'].requiredLength).concat(" characters are needed");
        break;
      case 'required':
        msg = "This field is Required!";
        break;
      default:
        msg = "";
    }
    return msg;
  }
}
