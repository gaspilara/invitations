import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'create-event-init',
  templateUrl: './create-event-init.component.html',
  styleUrls: ['./create-event-init.component.scss']
})
export class CreateEventInitComponent implements OnInit {

  @Output() hideButton: EventEmitter<boolean> = new EventEmitter();

  constructor() { 
    
  }

  ngOnInit(): void {
    
  }

  showFormEventCreator() {
    this.hideButton.emit(true);
  }

}
