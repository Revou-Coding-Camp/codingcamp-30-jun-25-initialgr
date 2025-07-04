document.addEventListener('DOMContentLoaded', function () {
  // Welcome Modal Elements
  const welcomeModal = document.getElementById('welcomeModal');
  const userNameInput = document.getElementById('userName');
  const submitBtn = document.getElementById('submitName');
  const userNameDisplay = document.getElementById('userNameDisplay');

  // Message Form Elements
  const form = document.getElementById('messageForm');
  const successModal = document.getElementById('successModal');
  const submittedData = document.getElementById('submittedData');
  const closeModal = document.getElementById('closeModal');
  const messageFormName = document.getElementById('name');

  // Mobile Navigation Elements
  const mobileMenuButton = document.getElementById('mobileMenuButton');
  const mobileMenu = document.getElementById('mobileMenu');
  const menuIcon = document.getElementById('menuIcon');

  // Check for existing user
  const savedName = localStorage.getItem('userName');

  if (savedName) {
    welcomeModal.style.display = 'none';
    userNameDisplay.textContent = savedName;
    if (messageFormName) messageFormName.value = savedName;
  } else {
    welcomeModal.style.display = 'flex';
  }

  // Welcome Modal Handler
  if (submitBtn) {
    submitBtn.addEventListener('click', function () {
      const name = userNameInput.value.trim();
      if (name) {
        localStorage.setItem('userName', name);
        welcomeModal.style.display = 'none';
        userNameDisplay.textContent = name;
        if (messageFormName) messageFormName.value = name;
      } else {
        alert('Please enter your name');
        userNameInput.focus();
      }
    });
  }

  // Message Form Handler
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const formData = {
        name: localStorage.getItem('userName') || document.getElementById('name').value,
        dob: document.getElementById('dob').value,
        email: document.getElementById('email').value,
        gender: document.querySelector('input[name="gender"]:checked').value,
        message: document.getElementById('message').value
      };

      if (submittedData) {
        submittedData.innerHTML = `
          <p><strong>Name:</strong> ${formData.name}</p>
          <p><strong>Date of Birth:</strong> ${formData.dob}</p>
          <p><strong>Email:</strong> ${formData.email}</p>
          <p><strong>Gender:</strong> ${formData.gender}</p>
          <p><strong>Message:</strong> ${formData.message}</p>
        `;
      }

      if (successModal) successModal.classList.remove('hidden');
    });
  }

  // Close Modal Handler
  if (closeModal) {
    closeModal.addEventListener('click', function () {
      // Close modal
      successModal.classList.add('hidden');

      form.reset();
      localStorage.removeItem('userName');
      document.documentElement.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        location.reload();
      }, 1500); // Matches typical scroll duration
    });
  }

  // Mobile Menu Handler
  if (mobileMenuButton && mobileMenu && menuIcon) {
    mobileMenuButton.addEventListener('click', function (e) {
      e.stopPropagation();
      mobileMenu.classList.toggle('hidden');
      menuIcon.classList.toggle('fa-bars');
      menuIcon.classList.toggle('fa-times');
    });

    document.addEventListener('click', function (e) {
      if (!mobileMenu.contains(e.target) && e.target !== mobileMenuButton) {
        mobileMenu.classList.add('hidden');
        menuIcon.classList.remove('fa-times');
        menuIcon.classList.add('fa-bars');
      }
    });
  }
});