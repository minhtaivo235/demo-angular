import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../service/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
import { AuthService } from 'src/app/auth/auth.service';
import { ROLE_ADMIN} from '../../constant';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  loginForm = new FormGroup({
    userName: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  closeResult = '';
  statusForm = false;
  statusUser = false;

  constructor(private modalService: NgbModal, private userService: UserService, 
    private router: Router, private storage:LocalStorageService, private auth: AuthService, private session: SessionStorageService) { }

  onSubmit() {
    const user = {
      userName: this.loginForm.value.userName,
      password: this.loginForm.value.password
    }
    if(this.loginForm.status === 'INVALID') {
      this.statusForm = true;
      return false;
    }
    this.statusForm = false;
    
    this.userService.login(user).subscribe(data => {
      if(data) {
        this.checkAndNavWithRole(data.role);                               
        console.log('login succes');
        this.modalService.dismissAll();
      } else {
        this.statusUser = true;
      }
    })    
  }
  checkAndNavWithRole(role) {
      if(role == ROLE_ADMIN) {
        this.storage.store('role', role);        
        this.session.store('role', role);        
        this.router.navigate(['admin','category']); 
      } else {
        this.router.navigate(['/']);
      }      
  }
  onchange(){
    this.statusForm = false;
    this.statusUser = false;
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', centered: true}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
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

  ngOnInit(): void {
  }

}
