import { HttpClient, HttpParams } from '@angular/common/http';
import { identifierName } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subcategory } from '../Models/subcategory';
import { Category } from '../Models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]> {
    let url = "http://localhost:8080/api/getCategories";
    return this.http.get<Category[]>(url);
  }
  getSubcategories(): Observable<Subcategory[]> {
    let url = "http://localhost:8080/api/getSubcategories";
    return this.http.get<Subcategory[]>(url);
  }
  addCategory(name:string): Observable<Object>{
    let url = "http://localhost:8080/api/addCategory?name="+name;
    return this.http.post(url,null,{responseType: 'text'});
  }
  deleteCategory(id:number): Observable<any>{
    let url ="http://localhost:8080/api/deleteCategory/" + id;
    return this.http.delete(url);
  }
  addSubcategory(name:string,id:number): Observable<any>{
    let url ="http://localhost:8080/api/addSubcategory/" + id + "?name=" + name;
    return this.http.post(url,null,{responseType: 'text'});
  }
  deleteSubcategory(id:number): Observable<any>{
    let url ="http://localhost:8080/api/deleteSubcategory/" + id;
    return this.http.delete(url);
  }
  editCategory(name : string, id:number){
    let url ="http://localhost:8080/api/editCategoryName/" + id + "?name=" + name;
    return this.http.put(url,null,{responseType: 'text'});
  }
  editSubcategory(name : string, id:number){
    let url ="http://localhost:8080/api/editSubcategoryName/" + id + "?name=" + name;
    return this.http.put(url,null,{responseType: 'text'});
  }
  getUrl(id: number): Observable<String>{
    let url = "http://localhost:8080/api/getUrlBySubcategory/"+id;
    return this.http.get(url, {responseType:'text'});
  }

}
