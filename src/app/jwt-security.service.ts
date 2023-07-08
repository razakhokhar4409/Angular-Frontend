import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Product } from './product';
@Injectable({
  providedIn: 'root'
})
export class JwtSecurityService {

  private token: string | null = null;
  private autheticated : boolean = false;

  request:any={
    "userName":"raza",
    "password":"1234"
  };

  constructor(private httpClient: HttpClient) { }

  setToken(token: string): void {
    this.token = token;
  }

  getToken(): string | null {
    return this.token;
  }

  setAuthenticated(autheticated : boolean){
    this.autheticated = autheticated;
  }

  isAuthenticated(): boolean{
    return this.autheticated
  }
  

  public generateToken() : Observable<string> {
    return this.httpClient.post<string>("http://localhost:8080/api/v1/authenticate", this.request, {  responseType: 'text' as 'json' });
  }


  public getProducts()  : Observable<Product[]>{
    let tokenStr = 'Bearer ' + this.token;
    const headers = new HttpHeaders().set('Authorization', tokenStr);
    return this.httpClient.get<Product[]>("http://localhost:8080/api/v1/products", {headers});
  }

  createProduct(product: Product): Observable<Product>{
    let tokenStr = 'Bearer ' + this.token;
    const headers = new HttpHeaders().set('Authorization', tokenStr);
    return this.httpClient.post<Product>("http://localhost:8080/api/v1/create-product",product, {headers});
  }

}


