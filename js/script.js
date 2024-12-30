/*=============== SHOW HIDDEN - PASSWORD ===============*/
const togglePasswordVisibility = (passwordId, toggleId) => {
    const passwordInput = document.getElementById(passwordId);
    const toggleIcon = document.getElementById(toggleId);
  
    toggleIcon.addEventListener('click', () => {
      // Toggle between password and text input type
      if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        // Change icon
        toggleIcon.classList.add('ri-eye-line');
        toggleIcon.classList.remove('ri-eye-off-line');
      } else {
        passwordInput.type = 'password';
        // Change icon back
        toggleIcon.classList.remove('ri-eye-line');
        toggleIcon.classList.add('ri-eye-off-line');
      }
    });
  };
  
  togglePasswordVisibility('password-input', 'toggle-password');

  document.querySelector('.form-container').addEventListener('submit', (event) => {
    event.preventDefault(); 
  
    const nameInput = document.getElementById('name-input');
    const passwordInput = document.getElementById('password-input');
  
    if (nameInput.value.trim() && passwordInput.value.trim()) {
      alert('Berhasil login!');
    } else {
      alert('Harap isi semua kolom!');
    }
  });