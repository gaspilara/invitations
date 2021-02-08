import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/event.service';
import { Event } from '../../models/event';

@Component({
  selector: 'invitation-preview',
  templateUrl: './invitation-preview.component.html',
  styleUrls: ['./invitation-preview.component.scss']
})
export class InvitationPreview implements OnInit {
  
  newEvent: Event;

  constructor(private eventService: EventService) {
    this.newEvent = this.eventService.getEvent();
  }

  ngOnInit() { }

}
