import { Component, ElementRef, EventEmitter, NgZone, OnInit, Output, ViewChild } from '@angular/core';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { EventService } from 'src/app/services/event.service';
import { convertStringToDate, minDate, parseDateToNGBDate, parseToday, validateDate } from '../../utilities/ng-bootstrap-util';

@Component({
  selector: 'form-event-data',
  templateUrl: './form-event-data.component.html',
  styleUrls: ['./form-event-data.component.scss']
})
export class FormEventDataComponent implements OnInit {

  @Output() hideButton: EventEmitter<boolean> = new EventEmitter();

  name: string;
  duration: number;
  thematic: string;
  eventDate: any;
  minDate: any;
  today: any;
  isFechaValid: boolean = true;

  latitude: any;
  longitude: any;
  zoom: any;
  address: any;
  private geoCoder: any;

  @ViewChild('search')
  public searchElementRef: ElementRef;

  constructor(private eventService: EventService, private mapsAPILoader: MapsAPILoader, private ngZone: NgZone) { }

  ngOnInit(): void { 
    this.setInitialState();
    this.setCurrentLocation();
  }

  private setInitialState() {
    this.today = parseToday();
    this.minDate = minDate();
  }

  createEvent() {
    this.eventService.setEvent(this.name, this.duration, this.thematic, this.eventDate, this.address);
    this.showFormListInConfig();
  }

  showFormListInConfig() {
    this.hideButton.emit(true);
  }
  
  onFechaChange(date: any) {
    if(typeof(date) === "string") {
      this.eventDate = validateDate(convertStringToDate(date), this.today, null);
      this.isFechaValid = this.eventDate !== null
      this.eventDate = parseDateToNGBDate(this.eventDate);
    } else {
      this.isFechaValid = true;
    }
  }

  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 8;
        this.getAddress(this.latitude, this.longitude);
      });
    }
  }

  markerDragEnd($event: MouseEvent) {
    console.log($event);
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
    this.getAddress(this.latitude, this.longitude);
  }

  getAddress(latitude: any, longitude: any) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results: any, status: any) => {
      console.log(results);
      console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.address = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    });
  }

}
