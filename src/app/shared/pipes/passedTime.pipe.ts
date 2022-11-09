import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'passedTime'
})
export class PassedTimePipe implements PipeTransform {
  transform(value: string) {
    const dateValue = new Date(value);
    const valueSeconds = +dateValue;
    if (isNaN(valueSeconds)) return value;

    const seconds = Math.floor((+new Date() - valueSeconds) / 1000);
    let interval = seconds / 31536000;

    // older then 1 day
    interval = seconds / 86400;
    if (interval >= 2) {
      return dateValue.toLocaleDateString();
    }
    // more than 1 day
    if (interval > 1) {
      return Math.floor(interval) + "d";
    }
    // within 1 day (show in hours)
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + "h";
    }
    // within 1 hour (show in minutes)
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + "m";
    }
    // less then 1 minute
    return 'Just now';
  }
}