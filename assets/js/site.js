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
  const blogNestedTabs = document.getElementById('blog-nested-tabs');
  
  tabButtons.forEach(button => {
    button.addEventListener('click', function() {
      const targetTab = this.getAttribute('data-tab');
      
      // Remove active class from all buttons and contents
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));
      
      // Add active class to clicked button and corresponding content
      this.classList.add('active');
      document.getElementById(targetTab + '-content').classList.add('active');
      
      // Show/hide nested tabs for blog
      if (targetTab === 'blog') {
        blogNestedTabs.classList.add('active');
        // Auto-collapse profile section when blog is selected
        if (section && !section.classList.contains('collapsed')) {
          section.classList.add('collapsed');
          toggle.classList.add('collapsed');
        }
      } else {
        blogNestedTabs.classList.remove('active');
      }
    });
  });

  // Nested tab switching functionality
  const nestedTabButtons = document.querySelectorAll('.nested-tab-button');
  const nestedTabContents = document.querySelectorAll('.nested-tab-content');
  
  nestedTabButtons.forEach(button => {
    button.addEventListener('click', function() {
      const targetNestedTab = this.getAttribute('data-nested-tab');
      
      // Remove active class from all nested buttons and contents
      nestedTabButtons.forEach(btn => btn.classList.remove('active'));
      nestedTabContents.forEach(content => content.classList.remove('active'));
      
      // Add active class to clicked button and corresponding content
      this.classList.add('active');
      document.getElementById(targetNestedTab + '-content').classList.add('active');
    });
  });
});

