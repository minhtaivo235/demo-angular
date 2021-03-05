import { PROFILE } from './../../constant';
import { LocalStorageService } from 'ngx-webstorage';
import { ConfirmDeleteModalComponent } from './../../layouts/modal/confirm-delete-modal/confirm-delete-modal.component';
import { Component, Input, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
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
  isAsc = false;

  constructor(private categoryService: CategoryService, private modalService: NgbModal, private storage: LocalStorageService) { }

  ngOnInit(): void {
    this.categoryService.getListCategory().subscribe(data => {
      this.categories = [...data];            
    })
                
  }

  openPopupDelete(id) {
    const modalRef = this.modalService.open(ConfirmDeleteModalComponent, { centered: true });
    modalRef.componentInstance.title = 'category';
    modalRef.result.then(result => {
      if(result) {
        this.delete(id);
      }
      
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
        data.name = result;        
        this.categoryService.updateCategory(id, data).subscribe(data => {
          this.categories.forEach((element, index) => {
            if(element.id == id) {
              this.categories[index] = data;
            }       
          }); 
        })
      },(reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    } else { // will create
      this.category = { id: 0, name: '' };
      modalRef.componentInstance.category = this.category;
      modalRef.result.then((result) => {                
        if(result != '') {
          data.name = result;                            
          this.categoryService.createCategory(data).subscribe(data => {
            console.log(data);
            this.categories.push(data)
          })          
        }
      },(reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  delete(id) {
    this.categoryService.deleteCategory(id).subscribe(data => {
      console.log(data.message);
      
      this.categories.forEach((element, index) => {
        if(element.id == id) {
          this.categories.splice(index, 1);
        }       
      });   
    }, error => {
      console.log(error);
    });    
  }

  sort() {
    this.isAsc = !this.isAsc;
    if(this.isAsc) {
      this.categories.sort(function(a, b) {
        var nameA = a.name.toUpperCase(); 
        var nameB = b.name.toUpperCase(); 
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }             
        return 0;
      });
    } else {
      this.categories.sort(function(a, b) {
        var nameA = a.name.toUpperCase();
        var nameB = b.name.toUpperCase(); 
        if (nameA > nameB) {
          return -1;
        }
        if (nameA < nameB) {
          return 1;
        }              
        return 0;
      });
    }
    
  }



}
