<script setup>
import {
  convertFormattedDateToTimeStamp,
  convertTimeStampToFormattedDate,
} from "../lib/unix-timestamp-converter.js";
import {getTheMomentDateFormattedByUrl, showMuchDaysHoursMinutesSeconds} from "@lib/count-down-to-moment.js";
import {fixZero} from "@lib/fix-zero.js";
import {oneSecond, oneMinute, oneHour, oneDay} from "@lib/seconds-in.js";
import {FormattedDateWrapper} from "@lib/FormattedDateWrapper.js";
const nowTs = parseInt((new Date()).getTime()/1000);

let ts = parseInt(nowTs + 1*oneDay + 2*oneHour + 3*oneMinute + 4*oneSecond);
let tz = '+00:00';

const dateByUrl = getTheMomentDateFormattedByUrl();
if(dateByUrl) {
  ts = convertFormattedDateToTimeStamp(dateByUrl);
  const dw = new FormattedDateWrapper(dateByUrl);
  tz = dw.getFormattedTimeZoneOffset();
}
const date = convertTimeStampToFormattedDate(ts, tz);

const leftSec = ts-nowTs;
const leftData = showMuchDaysHoursMinutesSeconds(leftSec);
const leftDays = ''+leftData.days;
const leftHours = fixZero(leftData.hours);
const leftMinutes = fixZero(leftData.minutes);
const leftSeconds = fixZero(leftData.seconds);
</script>

<template>
  <input :value="date">
  <table>
    <tr>
      <td>Днів</td>
      <td>{{leftDays}}</td>
    </tr>
    <tr>
      <td>Годин</td>
      <td>{{leftHours}}</td>
    </tr>
    <tr>
      <td>Хвилин</td>
      <td>{{leftMinutes}}</td>
    </tr>
    <tr>
      <td>Секунд</td>
      <td>{{leftSeconds}}</td>
    </tr>
  </table>
</template>

<style scoped></style>
