import { LocalStorageService } from 'ngx-webstorage';
import { Product } from './../../../model/product.model';
import { CategoryService } from './../../../service/category.service';
import { FormGroup, FormControl } from '@angular/forms';
import { ProductService } from './../../../service/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  user: any;
  product: Product = {
    categoryId: 0,
    name: '',
    price: 0,
    expDate: new Date,
    createBy: ''
  };
  categories: any;
  productForm = new FormGroup({
    categoryId: new FormControl(''),
    name: new FormControl(''),
    price: new FormControl(''),
    expDate: new FormControl(''),
    createBy: new FormControl({ value: '', disabled: true })
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private categoryService: CategoryService,
    private storage:LocalStorageService) { }


  ngOnInit(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id'));    
    
    this.getAPI(id);
    
  }

  getAPI(id) {
    this.categoryService.getListCategory().subscribe(category => {
      this.categories = [...category];
    });
    if (id) {      
      this.productService.getProductById(id).subscribe(product => {
        this.product = { ...product };
        this.form['categoryId'].setValue(product.categoryId);
        this.form['name'].setValue(product.name);
        this.form['price'].setValue(product.price);
        // this.form['expDate'].setValue(this.ChangeFormateDate(product.expDate));
        this.form['expDate'].setValue(this.changeFormatDate(product.expDate));
        this.form['createBy'].setValue(product.createBy);     
      });
    } 
  }

  get form() {
    return this.productForm.controls;
  }

  onSubmit(id) {
    this.user = {...this.storage.retrieve('profile')};
    const req = {
      ...this.productForm.value,
      "createBy": this.user.userName.toUpperCase()
    }
    if (id) {
      this.productService.updateProduct(id, req).subscribe(data => console.log(data)
      )
    } else {
      this.productService.createProduct(req).subscribe(data => console.log(data)
      )
    }
    this.router.navigate(['admin','product']);
    
  }

  changeFormatDate(date) {
    const newDate = date.toString().split('T')
    return newDate[0];
  }

  // formatDate(input) {
  //   var datePart = input.match(/\d+/g),
  //     year = datePart[0].substring(2), // get only two digits
  //     month = datePart[1], day = datePart[2];

  //   return day + '/' + month + '/' + year;
  // }
  // ChangeFormateDate(oldDate) {
  //   var p = oldDate.toString().split(/\D/g)
  //   return [p[2], p[1], p[0]].join("/")
  // }
}





