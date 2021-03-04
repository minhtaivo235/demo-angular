import { Router } from '@angular/router';
import { CategoryService } from './../../service/category.service';
import { ProductService } from './../../service/product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: any;
  categories: any;
  constructor(private productService: ProductService, private categoryService: CategoryService, private router: Router) { }

  ngOnInit(): void {
    this.productService.getListCategory().subscribe(data => {
      this.products = [...data];
    })
    this.categoryService.getListCategory().subscribe(data => {
      this.categories = [...data];
    })
  }

  navProductDetail(id){
    this.router.navigate(['admin','product',id])
  }

}
