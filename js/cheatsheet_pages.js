 function copyCode(button) {
    const codeBlock = button.nextElementSibling.querySelector('code');
    const text = codeBlock.textContent;
    
    navigator.clipboard.writeText(text).then(function() {
       button.textContent = 'Copied!';
       button.classList.add('copied');
       setTimeout(function() {
          button.textContent = 'Copy Code';
          button.classList.remove('copied');
       }, 2000);
    }).catch(function(err) {
       console.error('Could not copy text: ', err);
       button.textContent = 'Copy Failed';
       setTimeout(function() {
          button.textContent = 'Copy Code';
       }, 2000);
    });
 }
 
 document.addEventListener('DOMContentLoaded', function() {
    if (typeof Prism !== 'undefined') {
       Prism.highlightAll();
    }
 });