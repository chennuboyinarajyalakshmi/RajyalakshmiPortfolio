// Theme Toggle Functionality
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
body.setAttribute('data-theme', currentTheme);

// Update theme toggle icon
function updateThemeIcon() {
    const icon = themeToggle.querySelector('i');
    if (body.getAttribute('data-theme') === 'dark') {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
}

// Initialize theme icon
updateThemeIcon();

themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon();
});

// Mobile Navigation
const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Active Navigation Link
function setActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', setActiveNavLink);

// Scroll Animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all sections for animation
document.querySelectorAll('section').forEach(section => {
    section.classList.add('fade-in');
    observer.observe(section);
});

// Observe skill cards and project cards for staggered animation
document.querySelectorAll('.skill-card, .project-card, .cert-card').forEach((card, index) => {
    card.classList.add('fade-in');
    card.style.animationDelay = `${index * 0.1}s`;
    observer.observe(card);
});

// Resume Download Functionality with Google Drive Integration
const downloadResumeBtn = document.getElementById('downloadResumeBtn');

// Add click tracking for resume downloads
downloadResumeBtn.addEventListener('click', () => {
    // Show success message
    showMessage('Resume download started! Check your downloads folder.', 'success');
    
    // Track download attempt
    const downloadData = {
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent
    };
    
    // Save download tracking to localStorage
    const downloads = JSON.parse(localStorage.getItem('resumeDownloads') || '[]');
    downloads.push(downloadData);
    localStorage.setItem('resumeDownloads', JSON.stringify(downloads));
    
    console.log('Resume download initiated');
});

// Project Demo Functionality
const projectModal = document.getElementById('projectModal');
const projectTitle = document.getElementById('projectTitle');
const demoUrlInput = document.getElementById('demoUrl');
const openDemoBtn = document.getElementById('openDemo');
const cancelDemoBtn = document.getElementById('cancelDemo');

let currentProject = '';

// Project demo URLs (you can update these with your actual project URLs)
const projectDemoUrls = {
    'product-store': 'https://your-product-store-demo.com',
    'restaurant-website': 'https://your-restaurant-website-demo.com',
    'portfolio-website': 'https://your-portfolio-website-demo.com'
};

// Live demo button click
document.querySelectorAll('.live-demo-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        currentProject = e.target.getAttribute('data-project') || e.target.closest('.live-demo-btn').getAttribute('data-project');
        const projectName = currentProject.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
        
        projectTitle.textContent = `${projectName} - Live Demo`;
        
        // Check if demo URL is saved
        const savedUrl = localStorage.getItem(`demo-${currentProject}`);
        if (savedUrl) {
            // Open saved demo URL
            window.open(savedUrl, '_blank');
            showMessage('Demo opened in new tab!', 'success');
        } else {
            // Show modal to enter demo URL
            demoUrlInput.value = projectDemoUrls[currentProject] || '';
            projectModal.style.display = 'block';
        }
    });
});

// Open demo
openDemoBtn.addEventListener('click', () => {
    const demoUrl = demoUrlInput.value.trim();
    if (demoUrl) {
        // Validate URL
        try {
            new URL(demoUrl);
            // Save demo URL
            localStorage.setItem(`demo-${currentProject}`, demoUrl);
            // Open demo
            window.open(demoUrl, '_blank');
            projectModal.style.display = 'none';
            showMessage('Demo opened successfully!', 'success');
        } catch (error) {
            showMessage('Please enter a valid URL.', 'error');
        }
    } else {
        showMessage('Please enter a demo URL.', 'error');
    }
});

// Cancel demo
cancelDemoBtn.addEventListener('click', () => {
    projectModal.style.display = 'none';
    demoUrlInput.value = '';
});

// Contact Form Handling with Email Integration
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Simple validation
    if (!name || !email || !subject || !message) {
        showMessage('Please fill in all fields', 'error');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showMessage('Please enter a valid email address', 'error');
        return;
    }
    
    // Create mailto link with form data
    const mailtoLink = `mailto:chennuboinarajyalakshmi9@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
    
    // Simulate form submission
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitButton.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Open email client
        window.location.href = mailtoLink;
        
        showMessage('Email client opened! Please send the email to complete your message.', 'success');
        contactForm.reset();
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
        
        // Store contact attempt
        const contactData = {
            name,
            email,
            subject,
            message,
            timestamp: new Date().toISOString()
        };
        
        // Save to localStorage for reference
        const contacts = JSON.parse(localStorage.getItem('contactMessages') || '[]');
        contacts.push(contactData);
        localStorage.setItem('contactMessages', JSON.stringify(contacts));
        
    }, 2000);
});

// Modal close functionality
document.querySelectorAll('.close').forEach(closeBtn => {
    closeBtn.addEventListener('click', (e) => {
        const modal = e.target.closest('.modal');
        modal.style.display = 'none';
        if (modal.id === 'projectModal') {
            demoUrlInput.value = '';
        }
    });
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.style.display = 'none';
        if (e.target.id === 'projectModal') {
            demoUrlInput.value = '';
        }
    }
});

// Show message function
function showMessage(text, type) {
    // Remove existing messages
    const existingMessages = document.querySelectorAll('.message');
    existingMessages.forEach(msg => msg.remove());
    
    const message = document.createElement('div');
    message.className = `message ${type}`;
    message.textContent = text;
    
    // Insert message at the top of the current modal or page
    const activeModal = document.querySelector('.modal[style*="block"]');
    if (activeModal) {
        const modalContent = activeModal.querySelector('.modal-content');
        modalContent.insertBefore(message, modalContent.firstChild);
    } else {
        document.body.insertBefore(message, document.body.firstChild);
        message.style.position = 'fixed';
        message.style.top = '80px';
        message.style.left = '50%';
        message.style.transform = 'translateX(-50%)';
        message.style.zIndex = '9999';
        message.style.maxWidth = '400px';
    }
    
    // Auto remove message after 5 seconds
    setTimeout(() => {
        message.remove();
    }, 5000);
}

// Typing Effect for Hero Title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    const nameElement = document.querySelector('.name');
    const originalText = nameElement.textContent;
    typeWriter(nameElement, originalText, 80);
});

// Particles Animation
function createParticles() {
    const particleContainer = document.querySelector('.hero-bg');
    
    setInterval(() => {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
        
        particleContainer.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            particle.remove();
        }, 5000);
    }, 2000);
}

// Initialize particles
createParticles();

// Skill Card Hover Effects
document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.05)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Project Card Hover Effects
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        const image = this.querySelector('.project-image img');
        image.style.transform = 'scale(1.1)';
    });
    
    card.addEventListener('mouseleave', function() {
        const image = this.querySelector('.project-image img');
        image.style.transform = 'scale(1)';
    });
});

// Navbar Background on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        if (document.body.getAttribute('data-theme') === 'dark') {
            navbar.style.backgroundColor = 'rgba(15, 23, 42, 0.98)';
        }
    } else {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        if (document.body.getAttribute('data-theme') === 'dark') {
            navbar.style.backgroundColor = 'rgba(15, 23, 42, 0.95)';
        }
    }
});

// Auto Theme Detection
function detectPreferredTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        return savedTheme;
    }
    
    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
    }
    
    return 'light';
}

// Apply auto-detected theme on load
document.addEventListener('DOMContentLoaded', () => {
    const preferredTheme = detectPreferredTheme();
    body.setAttribute('data-theme', preferredTheme);
    updateThemeIcon();
});

// Listen for system theme changes
if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            const newTheme = e.matches ? 'dark' : 'light';
            body.setAttribute('data-theme', newTheme);
            updateThemeIcon();
        }
    });
}

// Preloader (optional)
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Error Handling for Images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        this.style.display = 'none';
    });
});

// Progressive Enhancement
if ('IntersectionObserver' in window) {
    // Use Intersection Observer for better performance
    console.log('Intersection Observer supported');
} else {
    // Fallback for older browsers
    document.querySelectorAll('.fade-in').forEach(element => {
        element.classList.add('visible');
    });
}

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    // Close modals with Escape key
    if (e.key === 'Escape') {
        const activeModal = document.querySelector('.modal[style*="block"]');
        if (activeModal) {
            activeModal.style.display = 'none';
            if (activeModal.id === 'projectModal') {
                demoUrlInput.value = '';
            }
        }
    }
});

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio website loaded successfully!');
    setActiveNavLink();
});