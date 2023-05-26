let search = document.querySelector('.search-box');

document.querySelector('#search-icon').onclick = () => {
    search.classList.toggle('active');
    menu.classList.remove('active');
}

let menu = document.querySelector('.navbar');

document.querySelector('#menu-icon').onclick = () => {
    menu.classList.toggle('active');
    search.classList.remove('active');
}

window.onscroll = () => {
    menu.classList.remove('active');
    search.classList.remove('active');
}


let header = document.querySelector('header');

window.addEventListener('scroll' , () => {
    header.classList.toggle('shadow', window.scrollY > 0);
});


const form = document.getElementById('contact-form');
    const successMessage = document.getElementById('success-message');

    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const nameInput = document.getElementById('name');
      const subjectInput = document.getElementById('subject');
      const emailInput = document.getElementById('email');
      const messageInput = document.getElementById('message');

      let isValid = true;

      if (nameInput.value.trim().length < 2) {
        alert('Please enter your name.');
        nameInput.focus();
        isValid = false;
      }

      if (subjectInput.value.trim().length < 15) {
        alert('Please enter a subject with at least 15 characters.');
        subjectInput.focus();
        isValid = false;
      }

      if (!isValidEmail(emailInput.value)) {
        alert('Please enter a valid email address.');
        emailInput.focus();
        isValid = false;
      }

      if (messageInput.value.trim().length < 10) {
        alert('Please enter an address with at least 10 characters.');
        messageInput.focus();
        isValid = false;
      }

      if (isValid) {
        successMessage.style.display = 'block';
        form.reset();
      }
    });

    function isValidEmail(email) {
      
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }