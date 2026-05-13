import throttle from 'lodash.throttle';

const formData = {
  email: '',
  message: '',
};

const formRef = document.querySelector('.feedback-form');

const STORAGE_KEY = 'feedback-form-state';

formRef.addEventListener('input', throttle(onFormInput, 500));
formRef.addEventListener('submit', onFormSubmit);

function loadFormData() {
  const parsedData = JSON.parse(localStorage.getItem(STORAGE_KEY));

  if (!parsedData) return;

  formRef.elements.email.value = parsedData.email || '';
  formRef.elements.message.value = parsedData.message || '';

  formData.email = parsedData.email || '';
  formData.message = parsedData.message || '';
}

loadFormData();

function onFormInput(event) {
  const { name, value } = event.target;
  formData[name] = value.trim();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function onFormSubmit(event) {
  event.preventDefault();

  if (!formData.email || !formData.message) {
    alert('Fill please all fields');
    return;
  }
  console.log(formData);

  localStorage.removeItem(STORAGE_KEY);
  formData.email = '';
  formData.message = '';
  formRef.reset();
}