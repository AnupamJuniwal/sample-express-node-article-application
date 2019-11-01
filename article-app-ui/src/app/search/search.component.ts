import { Component, OnInit } from '@angular/core';
import {delay} from '../misc.service';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  async onSearchChange(source: any){
    const oldValue = source.value;
    await delay(500);
    if ( source.value === oldValue){
      this.search(source.value);
    }
  }

  search(searchItem: string){
    const tags = searchItem.split(/(\s)/g).filter( tag => tag.trim().length > 0);
    if(tags.length > 0 ){
      console.log(tags);
    }
  }

  listAll(){
    console.log("Will list all articles");
  }
}
