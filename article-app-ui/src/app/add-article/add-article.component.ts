import { Component, OnInit } from '@angular/core';
import { COMMA, ENTER, SPACE } from '@angular/cdk/keycodes';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.css']
})
export class AddArticleComponent implements OnInit {
  title: string;
  publisher: string;
  content: string;
  tags = [];
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA, SPACE];

  formCtrl

  constructor() { }

  ngOnInit() {
    this.formCtrl = new FormGroup({
      'title': new FormControl(this.title, [
        Validators.required,
        Validators.minLength(3)
      ]),
      'publisher': new FormControl(this.publisher, [
        Validators.required,
        Validators.minLength(3)
      ]),
      'content': new FormControl(this.content, [
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

  post(){
    this.formatContent();
    this.formCtrl
    console.log(this.formCtrl);
  }

  formatContent(){
    this.content = "<p>".concat(this.content.replace(/\n/g, "</p><p>")).concat("</p>");
  }

}
