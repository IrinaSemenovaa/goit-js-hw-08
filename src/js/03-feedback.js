const throttle = require('lodash.throttle');

const formEl = document.querySelector('.feedback-form');
const LOCALSTORAGE_KEY = 'feedback-form-state';

initForm();

formEl.addEventListener('submit', onFormSubmit);
formEl.addEventListener('input', throttle(onFormInput, 500));

function onFormSubmit(e) {
  e.preventDefault();
  const { email, message } = e.currentTarget.elements;
  console.log({ email: email.value, message: message.value });
  localStorage.removeItem(LOCALSTORAGE_KEY);
  e.currentTarget.reset();
}

function onFormInput(e) {
  let savedValue = localStorage.getItem(LOCALSTORAGE_KEY);
  savedValue = savedValue ? JSON.parse(savedValue) : {};
  let { email, message } = formEl.elements;
  savedValue = {
    email: email.value.trim(),
    message: message.value.trim(),
  };

  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(savedValue));
}

function initForm() {
  let savedValue = localStorage.getItem(LOCALSTORAGE_KEY);
  if (savedValue) {
    savedValue = JSON.parse(savedValue);
    Object.entries(savedValue).forEach(([name, value]) => {
      formEl.elements[name].value = value;
    });
  }
}
