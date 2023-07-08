import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { JwtSecurityService } from '../jwt-security.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit{

  product: Product = new Product();  

  constructor(private service: JwtSecurityService, private router: Router) { }

  ngOnInit(): void {
    this.getAccessToken();
  }

  public getAccessToken(){
    let resp=this.service.generateToken();
    resp.subscribe(data=>{
      this.service.setToken(data)
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
  onCreate(){

    console.log(this.product);
    this.service.createProduct(this.product).subscribe(
      data=> {
        console.log(data);
        this.router.navigate(['/products'])
      },
      error => console.log(error)
    );
  }

}
