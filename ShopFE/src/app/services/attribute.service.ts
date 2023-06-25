import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subcategory } from '../Models/subcategory';
import { Attribute } from '../Models/attribute';

@Injectable({
  providedIn: 'root'
})
export class AttributeService {

  constructor(public http : HttpClient) {

  }
  getAttributes() : Observable<Attribute[]> {
    return this.http.get<Attribute[]>("http://localhost:8080/api/getAttributes");
  }
  getLPrice() : Observable<Attribute[]> {
    return this.http.get<Attribute[]>("http://localhost:8080/api/getLowestPrice");
  }
  getHPrice() : Observable<Number> {
    return this.http.get<Number>("http://localhost:8080/api/getHighestPrice");
  }
  getAttributesBySub(id: number) : Observable<Attribute[]> {
    return this.http.get<Attribute[]>("http://localhost:8080/api/getAttributes/"+id);
  }

  deleteAttribute(id : number) : Observable<any>{
    let url = "http://localhost:8080/api/deleteAttribute/" + id;
    return this.http.delete(url);

  }
  deleteAttributeValue(id : number) : Observable<any>{
    let url = "http://localhost:8080/api/deleteAttributeValue/" + id;
    return this.http.delete(url);

  }
  addAttributeValue(id:number,value:string): Observable<any>{
    let url = "http://localhost:8080/api/addAttributeValue/" + id + "?value="+value;
    return this.http.post(url,null,{responseType:'text'});
  }
  addAttribute(attribute: Partial<{name: string | null, isOnPDP: boolean | null} >): Observable<any>{
    let url = "http://localhost:8080/api/addAttribute";
    return this.http.post(url,attribute,{responseType:'text'});
  }


  addSubcategory(id : number, subcategory : number) : Observable<any>{
    let url  = "http://localhost:8080/api/addSubcategoryToAttribute/" + id + "?subcategoryId=" + subcategory;
    return this.http.post(url,null,{responseType: 'text'});
  }
  addSubcategories(id : number, subcategories : number[]) : Observable<any>{
    let url  = "http://localhost:8080/api/addSubcategoryToAttributee/" + id;
    return this.http.post(url,subcategories);
  }
  deleteSubcategory(id : number, subcategory: Subcategory) : Observable<any>{
    let url = "http://localhost:8080/api/deleteSubcategoryFromAttribute/" + id;
    return this.http.put(url,subcategory);

  }
  editValue(name : string, id:number){
    let url ="http://localhost:8080/api/editValueName/" + id + "?name=" + name;
    return this.http.put(url,null,{responseType: 'text'});
  }
  editAttribute(attribute: Partial<{name: string | null, isOnPDP: boolean | null} > , id:number){
    let url ="http://localhost:8080/api/editAttributeName/" + id;
    return this.http.put(url,attribute,{responseType: 'text'});
  }
}
