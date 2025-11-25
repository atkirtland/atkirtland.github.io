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

  // Dark mode toggle functionality
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = themeToggle.querySelector('.theme-icon');
  
  // Check for saved theme preference or default to dark mode
  const currentTheme = localStorage.getItem('theme') || 'dark';
  if (currentTheme === 'light') {
    document.body.classList.remove('dark-mode');
    themeIcon.textContent = '☀️';
  } else {
    document.body.classList.add('dark-mode');
    themeIcon.textContent = '🌙';
  }
  
  themeToggle.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    
    // Update icon and save preference
    if (document.body.classList.contains('dark-mode')) {
      themeIcon.textContent = '🌙';
      localStorage.setItem('theme', 'dark');
    } else {
      themeIcon.textContent = '☀️';
      localStorage.setItem('theme', 'light');
    }
  });

  // Translation toggle functionality
  const translationToggle = document.getElementById('translationToggle');
  const translationIcon = translationToggle.querySelector('.translation-icon');
  
  // Get all elements with translation data
  const translatableElements = document.querySelectorAll('[data-en][data-zh]');
  
  // Check for saved language preference or default to English
  let currentLang = localStorage.getItem('language') || 'en';
  
  // Function to update language
  function updateLanguage(lang) {
    translatableElements.forEach(element => {
      const content = element.getAttribute('data-' + lang);
      // Check if element contains HTML or just text
      if (content.includes('<')) {
        element.innerHTML = content;
      } else {
        element.textContent = content;
      }
    });
    
    translationIcon.textContent = lang === 'en' ? '中' : 'EN';
  }
  
  // Initialize content on page load
  updateLanguage(currentLang);
  
  translationToggle.addEventListener('click', function() {
    // Toggle language
    currentLang = currentLang === 'en' ? 'zh' : 'en';
    updateLanguage(currentLang);
    localStorage.setItem('language', currentLang);
  });

  // Function to switch to a tab
  function switchToTab(targetTab) {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    const blogNestedTabs = document.getElementById('blog-nested-tabs');
    
    // Remove active class from all buttons and contents
    tabButtons.forEach(btn => btn.classList.remove('active'));
    tabContents.forEach(content => content.classList.remove('active'));
    
    // Add active class to the target button and content
    const targetButton = document.querySelector(`[data-tab="${targetTab}"]`);
    if (targetButton) targetButton.classList.add('active');
    
    const contentDiv = document.getElementById(targetTab + '-content');
    if (contentDiv) contentDiv.classList.add('active');
    
    // Show/hide nested tabs for blog
    if (targetTab === 'blog') {
      blogNestedTabs.classList.add('active');
      // Auto-collapse profile section when blog is selected
      if (section && !section.classList.contains('collapsed')) {
        section.classList.add('collapsed');
        toggle.classList.add('collapsed');
      }
      // Load default blog content if not loaded
      const defaultBlogContent = document.getElementById('blog-date-content');
      if (defaultBlogContent && !defaultBlogContent.dataset.loaded) {
        loadContent('blog-date', defaultBlogContent);
      }
    } else {
      blogNestedTabs.classList.remove('active');
      
      // Lazy load projects content if it's the projects tab
      if (targetTab === 'projects' && contentDiv && !contentDiv.dataset.loaded) {
        loadContent('projects', contentDiv);
      }
    }
  }
  
  // Tab switching functionality
  const tabButtons = document.querySelectorAll('.tab-button');
  
  tabButtons.forEach(button => {
    button.addEventListener('click', function() {
      const targetTab = this.getAttribute('data-tab');
      switchToTab(targetTab);
      // Update URL hash
      window.location.hash = targetTab;
    });
  });

  // Cache for loaded content
  const contentCache = {};
  
  // Function to load content
  function loadContent(targetTab, contentDiv, showLoading = true) {
    if (contentDiv.dataset.loaded) return;
    
    if (showLoading) {
      contentDiv.innerHTML = '<p>Loading...</p>';
    }
    
    const urlMap = {
      'papers': '/papers-view.html',
      'projects': '/projects-view.html',
      'blog-date': '/blog/date-view.html',
      'blog-category': '/blog/category-view.html',
      'blog-tags': '/blog/tags-view.html',
      'blog-microblog': '/blog/microblog-view.html'
    };
    
    const url = urlMap[targetTab];
    if (url) {
      if (contentCache[url]) {
        contentDiv.innerHTML = contentCache[url];
        contentDiv.dataset.loaded = 'true';
      } else {
        fetch(url)
          .then(response => response.text())
          .then(html => {
            contentCache[url] = html;
            contentDiv.innerHTML = html;
            contentDiv.dataset.loaded = 'true';
          })
          .catch(error => {
            console.error('Error loading content:', error);
            contentDiv.innerHTML = '<p>Error loading content. Please try again.</p>';
          });
      }
    }
  }
  
  // Nested tab switching functionality with lazy loading
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
      const contentDiv = document.getElementById(targetNestedTab + '-content');
      contentDiv.classList.add('active');
      
      // Lazy load content
      loadContent(targetNestedTab, contentDiv);
      
      // Update URL hash
      window.location.hash = targetNestedTab;
    });
  });
  
  // Auto-load papers on page load
  const papersContent = document.getElementById('papers-content');
  if (papersContent) {
    loadContent('papers', papersContent, false);
  }
  
  // Handle URL hash navigation
  function handleHashChange() {
    const hash = window.location.hash.substring(1); // Remove the '#'
    
    // Check if it's a main tab
    if (hash && ['papers', 'projects', 'blog'].includes(hash)) {
      switchToTab(hash);
    }
    // Check if it's a blog nested tab
    else if (hash && ['blog-date', 'blog-category', 'blog-tags', 'blog-microblog'].includes(hash)) {
      // First switch to blog tab
      switchToTab('blog');
      
      // Then switch to the specific nested tab
      setTimeout(() => {
        const nestedTabButtons = document.querySelectorAll('.nested-tab-button');
        const nestedTabContents = document.querySelectorAll('.nested-tab-content');
        
        // Remove active from all
        nestedTabButtons.forEach(btn => btn.classList.remove('active'));
        nestedTabContents.forEach(content => content.classList.remove('active'));
        
        // Activate the target
        const targetButton = document.querySelector(`[data-nested-tab="${hash}"]`);
        if (targetButton) {
          targetButton.classList.add('active');
          const contentDiv = document.getElementById(hash + '-content');
          if (contentDiv) {
            contentDiv.classList.add('active');
            loadContent(hash, contentDiv);
          }
        }
      }, 50);
    }
  }
  
  // Check hash on page load
  if (window.location.hash) {
    handleHashChange();
  }
  
  // Listen for hash changes
  window.addEventListener('hashchange', handleHashChange);
});

