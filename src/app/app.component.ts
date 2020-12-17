import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'invitations';
  showCreateEvent: boolean = false;
  showFormEventData: boolean = false;
  showFormGuestsList: boolean = false;
  showInvitationPreview: boolean = false;

  constructor() { }

  ngOnInit() {
    this.setInitialState();
    this.showCreateEvent = true;
  }
  
  private setInitialState() {
    this.showCreateEvent = false;
    this.showFormEventData = false;
    this.showFormGuestsList = false;
    this.showInvitationPreview = false;
  }

  showCreateEventInit() {
    this.setInitialState();
    this.showFormEventData = true;
  }

  showFormListInConfig() {
    this.setInitialState();
    this.showFormGuestsList = true;
  }
  
  showInvitation() {
    this.setInitialState();
    this.showInvitationPreview = true;
  }

}
