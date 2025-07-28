 function createFloatingCode() {
    const snippets = [
       'function()', 
       'const x = 42;',
       'if (true) {',
       'return value;',
       'class MyClass',
       'import React', 
       'console.log()',
       'async await',
       'npm install',
       'git commit',
       'let result =',
       'for (let i = 0;',
       'try { ... } catch',
       'export default',
       'this.setState',
       'addEventListener',
       'querySelector', 
       'setTimeout()',
       'JSON.parse()',
       'Math.random()',
       'numpy',
       'pandas',
       'matplotlib',
       'sklearn',
       'turtle',
       'os',
       'sys',
       'scipy',
       'pytorch',
       'python',
       'HTML',
       'CSS',
       'Javascript',
       'C','C++','C#',
       'sqlite'
    ];
    
    
    setInterval(() => {
       const codeElement = document.createElement('div');
       const duration = Math.random() * 10 + 15;
       codeElement.className = 'floating-code';
       codeElement.textContent = snippets[Math.floor(Math.random() * snippets.length)];
       codeElement.style.top = Math.random() * 100 + '%';
       codeElement.style.animationDuration = duration + 's';
       codeElement.style.fontSize = (Math.random() * 6 + 10 + Math.random()*3) + 'px';
       document.querySelector('.background').appendChild(codeElement);
       setTimeout(() => codeElement.remove(), duration * 1000);
    }, 1800);
 }
 
 function createParticles() {
    setInterval(() => {
       const particle = document.createElement('div');
       const duration = Math.random() * 3 + 2;
       particle.className = 'particle';
       particle.style.left = Math.random() * 100 + 'vw';
       particle.style.top = Math.random() * 100 + 'vh';
       particle.style.setProperty('--dx', (Math.random() - 0.5) * 200 + 'px');
       particle.style.setProperty('--dy', (Math.random() - 0.5) * 200 + 'px');
       particle.style.animationDuration = duration + 's';
       const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57','#ff0000'];
       const color = colors[Math.floor(Math.random() * colors.length)];
       particle.style.background = color;
       particle.style.boxShadow = `0 0 6px ${color}`;
       document.querySelector('.background').appendChild(particle);
       setTimeout(() => particle.remove(), duration * 1000);
    }, 100);
 }
 
 function createGeometricShapes() {
    for (let i = 0; i < 10; i++) {
       const shape = document.createElement('div');
       shape.className = 'geometric-shape';
       shape.style.left = Math.random() * 100 + '%';
       shape.style.top = Math.random() * 100 + '%';
       shape.style.width = (Math.random() * 50 + 20) + 'px';
       shape.style.height = (Math.random() * 50 + 20) + 'px';
       shape.style.animationDuration = (Math.random() * 4 + 3) + 's';
       shape.style.animationDelay = Math.random() * 2 + 's';
       if (Math.random() > 0.5) shape.style.borderRadius = '50%';
       document.querySelector('.background').appendChild(shape);
    }
 }
 
 function createCircuitLines() {
    for (let i = 0; i < 15; i++) {
       const line = document.createElement('div');
       line.className = 'circuit-line';
       line.style.left = Math.random() * 100 + '%';
       line.style.top = Math.random() * 100 + '%';
       line.style.width = (Math.random() * 200 + 100) + 'px';
       line.style.animationDuration = (Math.random() * 2 + 2) + 's';
       line.style.animationDelay = Math.random() * 3 + 's';
       line.style.transform = 'rotate(' + (Math.random() * 360) + 'deg)';
       document.querySelector('.background').appendChild(line);
    }
 }
 
 document.addEventListener('mousemove', (e) => {
    if (Math.random() > 0.7) {
       const particle = document.createElement('div');
       particle.className = 'particle';
       particle.style.left = e.clientX + 'px';
       particle.style.top = e.clientY + 'px';
       particle.style.setProperty('--dx', (Math.random() - 0.5) * 100 + 'px');
       particle.style.setProperty('--dy', (Math.random() - 0.5) * 100 + 'px');
       particle.style.animationDuration = '2s';
       particle.style.background = '#ffffff';
       particle.style.boxShadow = '0 0 10px #ffffff';
       document.querySelector('.background').appendChild(particle);
       setTimeout(() => particle.remove(), 2000);
    }
 });
 
 function init() {
    createFloatingCode();
    createParticles();
    createGeometricShapes();
    createCircuitLines();
 }
 
 window.addEventListener('load', init);