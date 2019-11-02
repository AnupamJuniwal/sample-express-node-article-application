import { Component, OnInit } from '@angular/core';
import { COMMA, ENTER, SPACE } from '@angular/cdk/keycodes';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { MatChipInputEvent } from '@angular/material/chips';
import { ErrorStateMatcher } from '@angular/material';
import { ArticleService } from '../article.service';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';

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

  loading = false;


  constructor(private httpArticleService: ArticleService,
    private _bottomSheet: MatBottomSheet) { }

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

    // Add tag
    if ((value || '').trim()) {
      value = value.trim().toLowerCase();
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

  post() {
    const dataToBeSent = {
      title: this.formCtrl.value['title'],
      publisher: this.formCtrl.value['publisher'],
      content: this.formatContent(this.formCtrl.value['content']),
      tags: this.tags
    }

    this.httpArticleService.postNewArticle(dataToBeSent).subscribe(result => {
      let resp = {};
      if (!result['success']) {
        resp['title'] = "Error Occured!";
        resp['body'] = result['error'];
        resp['type'] = 'error'
      } else {
        resp['title'] = "Success!";
        resp['body'] = "Here's the ID of this article: ".concat(result['data']._id);
        resp['type'] = 'info'
      }
      this._bottomSheet.open(BottomSheetResponse).instance.setResponse(resp);
      this.loading = false;
    });
  }
}



@Component({
  template: `
  <div *ngIf="responseObject">
    <mat-nav-list >
      <div mat-list-item class="{{responseObject.type}}">
        <span mat-line class="title">{{responseObject.title}}</span>
        <span mat-line class="body">{{responseObject.body}}</span>
      </div>
      <button mat-raised-button (click)="close($event)">Close</button>
  </mat-nav-list>
</div>`,
styleUrls: ['./add-article.component.css']
})
export class BottomSheetResponse {
  responseObject: any;
  constructor(private _bottomSheetRef: MatBottomSheetRef<BottomSheetResponse>) { }

  close(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }
  public setResponse(data) {
    console.log("data set!")
    this.responseObject = data;
  }
}