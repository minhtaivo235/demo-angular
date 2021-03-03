import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Category } from 'src/app/model/category.model';
import { CategoryService } from '../../service/category.service';
import { CategoryModalComponent } from '../../layouts/modal/category-modal/category-modal.component';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})



export class CategoryComponent implements OnInit {
  categories: any;
  closeResult = '';
  category: Category = {
    id: 0,
    name: ''
  };

  constructor(private categoryService: CategoryService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.categoryService.getListCategory().subscribe(data => {
      this.categories = [...data];            
    })
    
    
    
  }

  openModal(id) {
    const modalRef = this.modalService.open(CategoryModalComponent, { centered: true });
    const data = { name: '' };
    if (id) { // will update
      this.category = this.categories.filter(item => {
        return (item.id === id)
      })[0];
      modalRef.componentInstance.category = this.category;      
      modalRef.result.then((result) => {
        data.name = result.name;        
        this.categoryService.updateCategory(result.id, data).subscribe(data => console.log(data))
      });
    } else { // will create
      this.category = { id: 0, name: '' };
      modalRef.componentInstance.category = this.category;
      modalRef.result.then((result) => {
        if(result.name != '') {
          data.name = result.name;        
          this.categoryService.createCategory(data).subscribe(data => {
            console.log(data);
            this.categories.push(data)
          })
          
        }
      });
    }
  }
  delete(id) {
    this.categoryService.deleteCategory(id).subscribe(data => {
      this.categories.forEach((element, index) => {
        if(element.id == id) {
          this.categories.splice(index, 1);
        }       
      });   
    });
    
  }



}
