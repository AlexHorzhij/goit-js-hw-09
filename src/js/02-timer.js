import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Report } from 'notiflix/build/notiflix-report-aio';

const refs = {
    btnStart: document.querySelector('[data-start]'),
    daysText: document.querySelector('[data-days]'),
    hoursText: document.querySelector('[data-hours]'),
    minText: document.querySelector('[data-minutes]'),
    secText: document.querySelector('[data-seconds]'),

}
refs.btnStart.addEventListener('click', onTimeChange)


let selectedTime
const timeNow = new Date() 
refs.btnStart.disabled = true

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    selectedDates[0] > timeNow ? selectedTime = selectedDates[0] : Report.failure(
        'Please choose a date in the future', "",
        'Okay')
      refs.btnStart.disabled = false

    },
};
const time = flatpickr("#datetime-picker", options);



function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    return String(value).padStart(2, "0")
}

function onTimeChange() {
   const intervalId = setInterval(() => {
        const timeNow = new Date()
        const timeDelta = convertMs(selectedTime - timeNow)
        if (selectedTime - timeNow >= 0) {
            refs.daysText.textContent = addLeadingZero(timeDelta.days)
            refs.hoursText.textContent = addLeadingZero(timeDelta.hours)
            refs.minText.textContent = addLeadingZero(timeDelta.minutes)
            refs.secText.textContent = addLeadingZero(timeDelta.seconds)
        } else {
            clearInterval(intervalId)
        }
    }, 1000)
}

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}




