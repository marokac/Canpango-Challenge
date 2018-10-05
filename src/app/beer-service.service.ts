import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, } from '@angular/http';
import 'rxjs/add/operator/map';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';

//Searvice URL
const appURL ="http://apichallenge.canpango.com";
@Injectable()
export class BeerServiceService {
  //Observable streams
  emitChangeSource = new ReplaySubject<any>(1);;
  sourceBears$ = this.emitChangeSource.asObservable()

 //Constractor
  constructor(private http: Http,) { }

//////////////////////////// Service calls///////////////////////////////////
// Get categories service call
getBearCategories(){
     
          return this.http.get(appURL+"/categories").map((result: Response) => {
                   var response=result.json();
                   return response;

                }).catch((err) => {
                  return Observable.throw(err);
                })
          }

 //Get Beers Service call         
getBearByCategory(){

            const url=appURL+"/beers/";

            return  this.http.get(url).map((res:Response)=>{

                    var response=res.json();
                    return response;

            }).subscribe((res) => {

              this.builtResponse(res,false);

            },err=>{

              this.emitChangeSource.error(err); 
            })
}

// Serach Items Service call
searchItems(serchString){

            const url=appURL+"/beers/search/";

            return this.http.get( url, { params: {q: serchString}}).map((res)=>{
                        return res.json();

            }).subscribe(res=>{

                  this.builtResponse(res,true);

            },err=>{

              this.emitChangeSource.error(err); 
            });
}

// Add Items Call
addItems(data){

            const url=appURL+"/beers/";

            return this.http.post(url,data).map((res:Response)=>{

              return res.json();

            });
}

// Create category 
CreateCategory(data){

              const url=appURL+"/categories/";

              return this.http.post(url,data).map((res:Response)=>{
                
                return res.json();
              });
}

//handle the response
builtResponse(res,isSearch){
        console.log('res')
        // forward Response to Observable stream;
        this.emitChangeSource.next({res:res,isSearch:isSearch});

        return res;
      }

}
