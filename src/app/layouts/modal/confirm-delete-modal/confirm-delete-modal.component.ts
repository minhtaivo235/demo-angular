import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-confirm-delete-modal',
  templateUrl: './confirm-delete-modal.component.html',
  styleUrls: ['./confirm-delete-modal.component.css']
})
export class ConfirmDeleteModalComponent implements OnInit {
  @Input() public title;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  passBackData(value){
    this.activeModal.close(value);
  }

}
