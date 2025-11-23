document.addEventListener('DOMContentLoaded', function() {
  // Profile toggle functionality
  const toggle = document.getElementById('profileToggle');
  const section = document.getElementById('profileSection');
  
  if (toggle && section) {
    toggle.addEventListener('click', function() {
      section.classList.toggle('collapsed');
      toggle.classList.toggle('collapsed');
    });
  }

  // Tab switching functionality
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabContents = document.querySelectorAll('.tab-content');
  
  tabButtons.forEach(button => {
    button.addEventListener('click', function() {
      const targetTab = this.getAttribute('data-tab');
      
      // Remove active class from all buttons and contents
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));
      
      // Add active class to clicked button and corresponding content
      this.classList.add('active');
      document.getElementById(targetTab + '-content').classList.add('active');
    });
  });
});

