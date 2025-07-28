// Mobile Menu Toggle
function initMobileMenu() {
   const mobileMenuToggle = document.getElementById('mobileMenuToggle');
   const navbar = document.getElementById('navbar');
   
   mobileMenuToggle.addEventListener('click', () => {
      const isActive = navbar.classList.toggle('active');
      mobileMenuToggle.textContent = isActive ? '✕' : '☰';
   });
   
   // Close menu when clicking on any nav link
   document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
         navbar.classList.remove('active');
         mobileMenuToggle.textContent = '☰';
      });
   });
   
   // Close menu if clicking outside
   document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
         navbar.classList.remove('active');
         mobileMenuToggle.textContent = '☰';
      }
   });
}

// Highlight current page in nav based on URL
function highlightActivePage() {
   const navLinks = document.querySelectorAll('.nav-link');
   const currentPage = location.pathname.split("/").pop() || 'index.html';
   
   navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === currentPage) {
         link.classList.add('active');
      } else {
         link.classList.remove('active');
      }
   });
}

// Init all
function init() {
   initMobileMenu();
   highlightActivePage(); // Use this instead of click-based logic
}

// Start when page is ready
window.addEventListener('DOMContentLoaded', init);