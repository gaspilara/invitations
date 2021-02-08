import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

// COMPONENTS
import { AppComponent } from './app.component';
import { CreateEventInitComponent } from './components/create-event-init/create-event-init.component';
import { FormEventDataComponent } from './components/form-event-data-component/form-event-data.component';
import { FormGuestListComponent } from './components/form-guest-list/form-guest-list.component';
import { InvitationPreview } from './components/invitation-preview/invitation-preview.component';

// UTILITIES / SERVICES
import { GuestService } from './services/guest.service';
import { EventService } from './services/event.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AgmCoreModule } from '@agm/core';

// IMPORTS
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { CatsComponent } from './components/cats/cats.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateEventInitComponent,
    FormEventDataComponent,
    FormGuestListComponent,
    InvitationPreview,
    CatsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    AgmCoreModule.forRoot({ // para el map location
      apiKey: 'AIzaSyAm4Ba2R74qduInxBDtatr0GGQldjUS3YU',
      libraries: ['places']
    }),
    AngularFireModule.initializeApp(environment.firebase),
  ],
  providers: [
    GuestService,
    EventService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
