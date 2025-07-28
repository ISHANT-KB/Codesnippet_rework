    // Enhanced copy functionality
    function copyCode(button) {
       const codeBlock = button.closest('.code-wrapper').querySelector('code');
       const textToCopy = codeBlock.textContent;
       
       navigator.clipboard.writeText(textToCopy).then(() => {
          // Update button appearance
          const originalContent = button.innerHTML;
          button.innerHTML = '<span>✅</span><span class="copy-text">Copied!</span>';
          button.classList.add('copied');
          
          // Create floating notification
          createNotification('Code copied to clipboard!', 'success');
          
          // Reset button after 2 seconds
          setTimeout(() => {
             button.innerHTML = originalContent;
             button.classList.remove('copied');
          }, 2000);
       }).catch(err => {
          console.error('Failed to copy: ', err);
          createNotification('Failed to copy code', 'error');
       });
    }
    
    // Create floating notification
    function createNotification(message, type) {
       const notification = document.createElement('div');
       notification.textContent = message;
       notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: ${type === 'success' ? 'linear-gradient(135deg, #10b981, #059669)' : 'linear-gradient(135deg, #ff6b6b, #ee5a52)'};
                color: white;
                padding: 1rem 1.5rem;
                border-radius: 12px;
                font-weight: 600;
                box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
                z-index: 1000;
                transform: translateX(100%);
                transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                backdrop-filter: blur(10px);
            `;
       
       document.body.appendChild(notification);
       
       // Animate in
       setTimeout(() => {
          notification.style.transform = 'translateX(0)';
       }, 100);
       
       // Animate out and remove
       setTimeout(() => {
          notification.style.transform = 'translateX(100%)';
          setTimeout(() => {
             document.body.removeChild(notification);
          }, 300);
       }, 3000);
    }
    
    // Initialize Prism highlighting
    document.addEventListener('DOMContentLoaded', function() {
       if (window.Prism) {
          Prism.highlightAll();
       }
    });
    
   //  Add subtle parallax effect to background
    document.addEventListener('mousemove', function(e) {
       const mouseX = e.clientX / window.innerWidth;
       const mouseY = e.clientY / window.innerHeight;
       
       document.body.style.backgroundPosition =
          `${50 + mouseX * 5}% ${50 + mouseY * 5}%`;
    });