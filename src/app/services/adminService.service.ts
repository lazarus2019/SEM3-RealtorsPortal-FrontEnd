import { Injectable } from '@angular/core';
@Injectable()
export class AdminService {
    calculateDiff(dataDate: any) {
        console.log(dataDate);

        let start = new Date().getTime();

        let end = new Date(dataDate).getTime();

        let time = start - end;

        let diffDay = Math.floor(time / 86400000); // day calculate

        let diffHour = Math.floor((time % 86400000) / 3600000); // hour calculate

        let diffMinute = Math.floor(((time % 86400000) % 3600000) / 60000); // minute calculate

        console.log('day: ', diffDay);
        console.log('hour: ', diffHour);
        console.log('minute: ', diffMinute);

        if (diffDay >= 1) {
            return diffDay
        } else if (diffHour >= 1) {
            return diffHour
        } else {
            return diffMinute
        }
    }

    hourTime(key: any) {

        let start = new Date().getTime();

        let end = new Date(key).getTime();

        let time = start - end;

        let diffDay = Math.floor(time / 86400000); // day calculate

        let diffHour = Math.floor((time % 86400000) / 3600000); // hour calculate

        let diffMinute = Math.floor(((time % 86400000) % 3600000) / 60000); // minute calculate

        console.log('day: ', diffDay);
        console.log('hour: ', diffHour);
        console.log('minute: ', diffMinute);

        if (diffDay >= 1) {
            return key = "Days ago"
        } else if (diffHour >= 1) {
            return key = "Hours ago"
        } else {
            return key = "Minutes ago"
        }
    }
}