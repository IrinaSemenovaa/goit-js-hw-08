const throttle = require('lodash.throttle');

const formEl = document.querySelector('.feedback-form');
const LOCALSTORAGE_KEY = 'selectedFilters';

initForm();

formEl.addEventListener('submit', onFormSubmit);
formEl.addEventListener('input', throttle(onFormInput, 500));

function onFormSubmit(e) {
  e.preventDefault();
  const formData = new FormData(formEl);
  formData.forEach((value, message) => console.log(value, message));
  e.currentTarget.reset();
  localStorage.removeItem(LOCALSTORAGE_KEY);
}

function onFormInput(e) {
  let savedValue = localStorage.getItem(LOCALSTORAGE_KEY);
  savedValue = savedValue ? JSON.parse(savedValue) : {};
  savedValue[e.target.message] = e.target.value;
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(savedValue));
}

function initForm() {
  let savedValue = localStorage.getItem(LOCALSTORAGE_KEY);
  if (savedValue) {
    savedValue = JSON.parse(savedValue);
    Object.entries(savedValue).forEach(([message, value]) => {
      formEl.elements[message].value = value;
    });
  }
}
