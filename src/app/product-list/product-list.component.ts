import { Component, OnInit } from '@angular/core';
import { JwtSecurityService } from '../jwt-security.service';
import { Product } from '../product';
import { HttpErrorResponse } from '@angular/common/http';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit{

  products:Product[];

  constructor(private service:JwtSecurityService, private router: Router) { }

  ngOnInit() {
    this.getAccessToken();
  }

  public getAccessToken(){
    let resp=this.service.generateToken();
    resp.subscribe(data=>{
      this.service.setToken(data)
      this.showProducts()
      },
      (error) => {
        if (error instanceof HttpErrorResponse) {
          console.log('Error status:', error.status);
          console.log('Error message:', error.message);
          if(error.status == 403){
            this.router.navigate(['exception']);          
          }
        } else {
          console.log('Request error:', error);
        }
      })
  }

  public showProducts(){
    let resp=this.service.getProducts();
    resp.subscribe(data=>this.products=data, 
      error => console.log(error));
  }

}
