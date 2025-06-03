const STORAGE_KEY = 'feedback-form-state';
const form = document.querySelector('.feedback-form');

let formData = {
  email: '',
  message: '',
};

const textarea = document.querySelector('textarea');

populateFormFromStorage();

form.addEventListener('input', handleInput);
form.addEventListener('submit', handleSubmit);


function handleInput(event) {
  const { name, value } = event.target;
  formData[name] = value.trim();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}
  

function handleSubmit(event) {
  event.preventDefault();
  const { email, message } = formData;
  if (!email || !message) {
    alert('Fill please all fields');
    return;
  }
    console.log(formData);
    
  form.reset();
  localStorage.removeItem(STORAGE_KEY);
  formData = { email: '', message: '' };
}

function populateFormFromStorage() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return;

  try {
    const parsed = JSON.parse(saved);
    formData = {
      email: parsed.email || '',
      message: parsed.message || '',
    };

    form.elements.email.value = formData.email;
    form.elements.message.value = formData.message;
  } catch (error) {
    console.error('Error parsing saved data', error);
  }
}