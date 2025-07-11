// Описаний в документації
import flatpickr from "flatpickr";
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";
import "izitoast/dist/css/iziToast.min.css";

import error from '../img/icons/error.svg';

document.querySelector('.back-link').style.display = 'block';

const input = document.querySelector('#datetime-picker');
const button = document.querySelector('button[data-start]');
const daysValue = document.querySelector('span[data-days]');
const hoursValue = document.querySelector('span[data-hours]');
const minutesValue = document.querySelector('span[data-minutes]');
const secondsValue = document.querySelector('span[data-seconds]');



button.addEventListener('click', handelClick);

let userSelectedDate;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {

        if (Date.now() > selectedDates[0].getTime()) {
            button.disabled = true;
            iziToast.warning({
                timeout: 2000,
                messageColor: '#fff',
                iconColor: '#fff',
                iconUrl: error,
                position: 'topRight',
                color: '#ef4040',
                message: 'Please choose a date in the future',
            });
            return;
        }

        userSelectedDate = selectedDates[0].getTime();
        button.disabled = false;
    },
};


flatpickr("input#datetime-picker", options);

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

function addLeadingZero(number) {
    if (number > 9) {
        return number;
    }

    return number.toString().padStart(2, '0');
}

function handelClick(event) {

    event.target.disabled = true;
    input.disabled = true;

    const intervalId = setInterval(() => {
        const { days, hours, minutes, seconds } = convertMs(userSelectedDate - Date.now());

        daysValue.textContent = addLeadingZero(days);
        hoursValue.textContent = addLeadingZero(hours);
        minutesValue.textContent = addLeadingZero(minutes);
        secondsValue.textContent = addLeadingZero(seconds);

        if (!(days + hours + minutes + seconds)) {
            clearInterval(intervalId);
            input.disabled = false;
            console.log(`Interval with id ${intervalId} has stopped!`);
            return;
        }
    }, 1000);


}

