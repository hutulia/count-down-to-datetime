<script setup>
import {
  convertFormattedDateToTimeStamp,
  convertTimeStampToFormattedDate,
} from "../lib/unix-timestamp-converter.js";
import {getTheMomentDateFormattedByUrl, showMuchDaysHoursMinutesSeconds} from "@lib/count-down-to-moment.js";
import {fixZero} from "@lib/fix-zero.js";
import {oneSecond, oneMinute, oneHour, oneDay} from "@lib/seconds-in.js";
import {FormattedDateWrapper} from "@lib/FormattedDateWrapper.js";
import {ref} from "vue";
const nowTs = ref(parseInt((new Date()).getTime()/1000));

let ts = parseInt(nowTs.value + 1*oneDay + 2*oneHour + 3*oneMinute + 4*oneSecond);
let tz = '+00:00';

const dateByUrl = getTheMomentDateFormattedByUrl();
if(dateByUrl) {
  ts = convertFormattedDateToTimeStamp(dateByUrl);
  const dw = new FormattedDateWrapper(dateByUrl);
  tz = dw.getFormattedTimeZoneOffset();
}
const date = ref(convertTimeStampToFormattedDate(ts, tz));
const leftTotalSec = ref(0);
const leftDays = ref('');
const leftHours = ref('');
const leftMinutes = ref('');
const leftSeconds = ref('');

let play = true;
function update(){
  nowTs.value = parseInt((new Date()).getTime()/1000);
  leftTotalSec.value = ts-nowTs.value;
  const leftData = showMuchDaysHoursMinutesSeconds(leftTotalSec.value);
  leftDays.value = ''+leftData.days;
  leftHours.value = fixZero(leftData.hours);
  leftMinutes.value = fixZero(leftData.minutes);
  leftSeconds.value = fixZero(leftData.seconds);

  if(play){
    const delay = 1000 - (new Date().getTime()) % 1000;
    setTimeout(()=>{update()},delay);
  }
}
update();
window.update = update;

</script>

<template>
  <div class="count-app">
    <div class="date">
      <input :value="date">
    </div>
    <div class="left">
      <div class="unit">
        <div class="title">Днів</div>
        <div class="digits">{{leftDays}}</div>
      </div>
      <div class="unit">
        <div class="title">Годин</div>
        <div class="digits">{{leftHours}}</div>
      </div>
      <div class="unit">
        <div class="title">Хвилин</div>
        <div class="digits">{{leftMinutes}}</div>
      </div>
      <div class="unit">
        <div class="title">Секунд</div>
        <div class="digits">{{leftSeconds}}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .count-app{
    --unit: 10mm;
  }
  .date{
    display: flex;
    /*border: 1px solid lightgrey;*/
    justify-content: center;
    width: 100%;
  }
  .date input{
    font-size: calc(0.75*var(--unit));
    padding: 0.5em 1em;
    border: 3px solid transparent;
    outline: none;
    color: #bbbbbb;
    box-sizing: border-box;
  }
  .date input:hover {
  }
  .date input:focus {
  }
  .left{
    display: flex;
    gap: 1em;
    /*border: 1px solid lightgrey;*/
    width: 100%;
    justify-content: center;
    align-items: center;
    margin-top: calc(0.75*var(--unit));
  }
  .unit{
    display: flex;
    flex-direction: column;
    gap: 0.5em;
    width: 25%;
    max-width: calc(4*var(--unit));
    text-align: center;
    /*border: 1px solid lightgrey;*/
  }
  .title{
    color: lightgrey;
  }
  .digits{
    font-size: calc(1.5*var(--unit));
  }
</style>
