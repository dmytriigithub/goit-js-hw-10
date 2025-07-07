// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

document.querySelector('.back-link').style.display = 'block';

const form = document.querySelector('.form');

const options = { delay: null, shouldResolve: null };

form.addEventListener('submit', handleSubmit);

const makePromise = ({ delay, shouldResolve }) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (shouldResolve) {
                resolve(delay)
            } else {
                reject(delay)
            }
        }, delay);
    });
};


function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const delay = form.elements.delay.value;
    const state = form.elements.state.value;

    options.delay = +delay;

    switch (state) {
        case "fulfilled":
            options.shouldResolve = true;
            break;

        case "rejected":
            options.shouldResolve = false;
            break;

        default:
            return;
    }

    makePromise(options)
        .then(delay => iziToast.success({
            timeout: 2000,
            messageColor: '#fff',
            iconColor: '#fff',
            icon: 'fa-regular fa-circle-check',
            position: 'topRight',
            color: '#59a10d',
            message: `Fulfilled promise in ${delay}ms`,
        }))
        .catch(delay => iziToast.error({
            timeout: 2000,
            messageColor: '#fff',
            iconColor: '#fff',
            icon: 'fa-regular fa-circle-xmark',
            position: 'topRight',
            color: '#ef4040',
            message: `Rejected promise in ${delay}ms`,
        }));

    form.reset();
}