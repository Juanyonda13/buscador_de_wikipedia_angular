import { Component, OnInit,EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, map, tap } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  inputSearch=new FormControl('');
  @Output() submitted= new EventEmitter<string | any>()
  constructor() { 
  }

  ngOnInit(): void {
    this.onChanges()
  }
  onChanges():void{
    this.inputSearch.valueChanges.pipe(
      map((search:string|any)=>search.trim()),
      debounceTime(350),
      distinctUntilChanged(),
      filter((search:string|any)=>search !==''),
      tap((search:string|any)=> this.submitted.emit(search))
    )
    .subscribe()
  }

}


