import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, } from '@angular/http';
import 'rxjs/add/operator/map';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
const appURL ="http://apichallenge.canpango.com";
@Injectable()
export class BeerServiceService {
searchData=[];

  emitChangeSource = new Subject<any>();
  sourceBears$ = this.emitChangeSource.asObservable()
  constructor(private http: Http,) { }

getBearCategories(){
  
return this.http.get(appURL+"/categories").map((result: Response) => {
var response=result.json();
return response;
}).catch((err) => {
  return Observable.throw(err);
})}

getBearByCategory(){
  console.log('ffff')
  const url=appURL+"/beers/";
  return this.http.get(url).map((res:Response)=>{
    var response=res.json();
    return response;
  }).subscribe((res) => {
    this.builtResponse(res);
  },err=>{
    this.emitChangeSource.error(err); 
  })
}

searchItems(serchString){

 const url=appURL+"/beers/search/";
 return this.http.get( url, { params: {q: serchString}}).map((res)=>{
  return res.json();
 }).subscribe(res=>{
  this.builtResponse(res)
},err=>{
  this.emitChangeSource.error(err); 
})
}

addItems(data){
  const url=appURL+"/beers/";
  return this.http.post(url,data).map((res:Response)=>{
    return res.json();
  })
}

CreateCategory(data){
  const url=appURL+"/categories/";
  return this.http.post(url,data).map((res:Response)=>{
    return res.json();
  })
}
buildResponse(response,url){

response.forEach(element => {
  if(element.category==url){
    this.searchData.push(element);
  }
  
});
return this.searchData;
}


builtResponse(res){
  console.log('res')
  this.emitChangeSource.next(res);
  return res;
}

}
