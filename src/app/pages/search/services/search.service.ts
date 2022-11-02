import { HttpClient } from "@angular/common/http";
import { ThisReceiver } from "@angular/compiler";
import { Injectable } from "@angular/core";
import { Observable, pluck } from "rxjs";
import { environment } from "src/environments/environment";

interface wikipediaResponse{
    query:{
        search:Article[]
    }
}

export interface Article{
    ns:number;
    title:string;
    pageid:number;
    size:number;
    snippet:string;
    wordcount:string;
    timestamp:Date,
}

@Injectable({providedIn:'root'})
export class SearchService{
    constructor(private readonly http:HttpClient){}

    search(term:string):Observable<Article[]>{
        const params={
           action:'query',
           format:'json',
           list:'search',
           srsearch:term,
           utf8:'1',
           origin:'*'
        }
        // https://en.wikipedia.org/w/api.php?
        // action=query&format=json&list=search&formatversion=2&srsearch=angular
        return this.http.get<wikipediaResponse>(environment.API,{params})
        .pipe(
            pluck('query','search')
        )
    }
}