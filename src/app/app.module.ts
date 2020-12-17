import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

// COMPONENTS
import { AppComponent } from './app.component';
import { CreateEventInitComponent } from './components/create-event-init/create-event-init.component';
import { FormEventDataComponent } from './components/form-event-data-component/form-event-data.component';
import { FormGuestListComponent } from './components/form-guest-list/form-guest-list.component';
import { FormsModule } from '@angular/forms';
import { InvitationPreview } from './components/invitation-preview/invitation-preview.component';

//SERVICES
import { GuestService } from './services/guest.service';
import { EventService } from './services/event.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    AppComponent,
    CreateEventInitComponent,
    FormEventDataComponent,
    FormGuestListComponent,
    InvitationPreview,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAm4Ba2R74qduInxBDtatr0GGQldjUS3YU',
      libraries: ['places']
    }),
  ],
  providers: [
    GuestService,
    EventService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
