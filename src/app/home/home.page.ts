import { CalDetailsPage } from './../cal-details/cal-details.page';
import { Component } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { Calendar } from '@ionic-native/calendar/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  calendars = [];
  constructor(
    public navCtrl: NavController,
    private router: Router,
    private calendar: Calendar,
    private plt: Platform
  ) {
    this.plt.ready().then(() => {
      this.calendar.listCalendars().then(data => {
        this.calendars = data;
      });
    });
  }

  addEvent(cal) {
    const date = new Date();
    const options = {
      calendarId: cal.id,
      calendarName: cal.name,
      url: 'https://ionicacademy.com',
      firstReminderMinutes: 15
    };

    this.calendar
      .createEventInteractivelyWithOptions(
        'My new Event',
        'Münster',
        'Special Notes',
        date,
        date,
        options
      )
      .then(
        res => { },
        err => {
          console.log('err: ', err);
        }
      );
  }

  openCal(cal) {
    /*
        this.router.navigate(['CalDetailsPage', {
          name: cal.name
        }]);
    */

    this.calendar.openCalendar(new Date()).then(
      (msg) => { console.log(msg); },
      (err) => { console.log(err); }
    );

  }

  newCalendar (cal) {
    const createCalOptions = this.calendar.getCreateCalendarOptions();
    createCalOptions.calendarName = 'Your24/7Doc';
    this.calendar.createCalendar(createCalOptions.calendarName).then(() => {

    const date = new Date();
    const options = {
      calendarId: cal.id,
      calendarName: createCalOptions.calendarName,
      url: 'https://Your24-7Doc.com',
      firstReminderMinutes: 5,
    };
      this.calendar
      .createEventInteractivelyWithOptions(
        'My new Event',
        'Münster',
        'Special Notes',
        date,
        date,
        options
      )
      .then(
        res => { },
        err => {
          console.log('err: ', err);
        }
      );
    }).catch((error) =>
    console.log(error));
  }
}
