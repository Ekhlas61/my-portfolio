// Initialize Locomotive Scroll
const scroll = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
    smooth: true,
    multiplier: 1,
    lerp: 0.05
});

// Initialize GSAP
gsap.registerPlugin(ScrollTrigger);

// Preloader
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    const progress = document.querySelector('.progress');
    const loaderText = document.querySelectorAll('.loader-text span');

    // Animate loader text
    loaderText.forEach((span, idx) => {
        span.style.setProperty('--i', idx);
    });

    // Simulate loading progress
    let width = 0;
    const interval = setInterval(() => {
        width += Math.random() * 30;
        if (width > 100) {
            width = 100;
            clearInterval(interval);
            gsap.to(preloader, {
                opacity: 0,
                duration: 1,
                onComplete: () => {
                    preloader.style.display = 'none';
                    // Start page animations
                    initPageAnimations();
                }
            });
        }
        progress.style.width = width + '%';
    }, 200);
});

// Custom cursor
const cursor = document.createElement('div');
cursor.classList.add('custom-cursor');
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

document.addEventListener('mousedown', () => cursor.classList.add('active'));
document.addEventListener('mouseup', () => cursor.classList.remove('active'));

// Scroll Progress
const scrollProgress = document.createElement('div');
scrollProgress.classList.add('scroll-progress');
document.body.appendChild(scrollProgress);

window.addEventListener('scroll', () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight - windowHeight;
    const scrolled = window.scrollY / documentHeight;
    scrollProgress.style.transform = `scaleX(${scrolled})`;
});

// Custom cursor
const cursor = document.getElementById('cursor');
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Mouse movement tracking for interactive background
document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;
    document.documentElement.style.setProperty('--mouse-x', `${x}%`);
    document.documentElement.style.setProperty('--mouse-y', `${y}%`);
});

// Make text draggable
const mainTitle = document.getElementById('mainTitle');
let isDragging = false;
let currentX;
let currentY;
let initialX;
let initialY;
let xOffset = 0;
let yOffset = 0;

mainTitle.addEventListener('mousedown', dragStart);
mainTitle.addEventListener('mousemove', drag);
mainTitle.addEventListener('mouseup', dragEnd);
mainTitle.addEventListener('mouseleave', dragEnd);

function dragStart(e) {
    initialX = e.clientX - xOffset;
    initialY = e.clientY - yOffset;
    
    if (e.target === mainTitle) {
        isDragging = true;
    }
}

function drag(e) {
    if (isDragging) {
        e.preventDefault();
        currentX = e.clientX - initialX;
        currentY = e.clientY - initialY;
        xOffset = currentX;
        yOffset = currentY;
        
        setTranslate(currentX, currentY, mainTitle);
    }
}

function dragEnd() {
    initialX = currentX;
    initialY = currentY;
    isDragging = false;
}

function setTranslate(xPos, yPos, el) {
    el.style.transform = `translate(${xPos}px, ${yPos}px)`;
}

// Make name letters interactive
document.querySelectorAll('.name-container span').forEach((letter, index) => {
    letter.style.animationDelay = `${index * 0.1}s`;
    
    letter.addEventListener('mouseover', () => {
        letter.style.transform = 'scale(1.2) rotate(10deg)';
        letter.style.color = '#00ff88';
    });
    
    letter.addEventListener('mouseout', () => {
        letter.style.transform = 'scale(1) rotate(0deg)';
        letter.style.color = '#fff';
    });
});

// Make project cards draggable
document.querySelectorAll('.draggable').forEach(element => {
    let isDragging = false;
    let currentX;
    let currentY;
    let initialX;
    let initialY;
    let xOffset = 0;
    let yOffset = 0;

    element.addEventListener('mousedown', dragStart);
    element.addEventListener('mousemove', drag);
    element.addEventListener('mouseup', dragEnd);
    element.addEventListener('mouseleave', dragEnd);

    function dragStart(e) {
        initialX = e.clientX - xOffset;
        initialY = e.clientY - yOffset;
        
        if (e.target === element) {
            isDragging = true;
        }
    }

    function drag(e) {
        if (isDragging) {
            e.preventDefault();
            currentX = e.clientX - initialX;
            currentY = e.clientY - initialY;
            xOffset = currentX;
            yOffset = currentY;
            
            setTranslate(currentX, currentY, element);
        }
    }

    function dragEnd() {
        initialX = currentX;
        initialY = currentY;
        isDragging = false;
    }

    function setTranslate(xPos, yPos, el) {
        el.style.transform = `translate(${xPos}px, ${yPos}px)`;
    }
});

// Email text effect
const emailText = document.getElementById('emailText');
emailText.addEventListener('mouseover', () => {
    emailText.style.color = '#00ff88';
});

emailText.addEventListener('mouseout', () => {
    emailText.style.color = '#fff';
});

// Project cards hover effect
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseover', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseout', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Enhanced 3D movement effect for cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = -(x - centerX) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
});

// Parallax effect for sections
const sections = document.querySelectorAll('section');
window.addEventListener('scroll', () => {
    sections.forEach(section => {
        const speed = 0.5;
        const rect = section.getBoundingClientRect();
        const scrolled = window.pageYOffset;
        
        if (rect.top <= window.innerHeight && rect.bottom >= 0) {
            const yPos = -(scrolled * speed);
            section.style.transform = `translateY(${yPos}px)`;
        }
    });
});

// Interactive profile image
const profileImage = document.querySelector('.profile-image');
if (profileImage) {
    profileImage.addEventListener('mousemove', (e) => {
        const rect = profileImage.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 5;
        const rotateY = -(x - centerX) / 5;
        
        profileImage.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.1, 1.1, 1.1)`;
    });
    
    profileImage.addEventListener('mouseleave', () => {
        profileImage.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
}

// Floating animation for tech badges
const techBadges = document.querySelectorAll('.tech-badge');
techBadges.forEach((badge, index) => {
    badge.style.animationDelay = `${index * 0.2}s`;
});

// Enhanced background parallax
document.addEventListener('mousemove', (e) => {
    const moveX = (e.clientX * -0.05) / 8;
    const moveY = (e.clientY * -0.05) / 8;
    
    document.body.style.backgroundPosition = `calc(50% + ${moveX}px) calc(50% + ${moveY}px)`;
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add animation on scroll
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.project-card, .skill-category, .education-card').forEach((element) => {
    element.classList.add('animate-on-scroll');
    observer.observe(element);
});

// Typing animation for the subtitle
const professionElement = document.querySelector('.profession');
const locationElement = document.querySelector('.location');

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

// Start typing animations with delay
setTimeout(() => {
    typeWriter(professionElement, 'Software Engineering Student');
}, 1000);

setTimeout(() => {
    typeWriter(locationElement, 'Addis Ababa, Ethiopia');
}, 3000);

// Skill hover effect
document.querySelectorAll('.skill-item').forEach(item => {
    item.addEventListener('mouseover', () => {
        item.style.transform = 'scale(1.1)';
        item.style.transition = 'transform 0.3s ease';
    });
    
    item.addEventListener('mouseout', () => {
        item.style.transform = 'scale(1)';
    });
});

// Add parallax effect to profile section
const profile = document.querySelector('.profile');
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    profile.style.transform = `translateY(${scrolled * 0.5}px)`;
});

// Theme toggle functionality
let isDark = true; // Default dark theme

function toggleTheme() {
    isDark = !isDark;
    document.body.classList.toggle('light-theme');
    
    const root = document.documentElement;
    if (isDark) {
        root.style.setProperty('--background', '#0f172a');
        root.style.setProperty('--surface', '#1e293b');
        root.style.setProperty('--text', '#e2e8f0');
        root.style.setProperty('--text-secondary', '#94a3b8');
    } else {
        root.style.setProperty('--background', '#f8fafc');
        root.style.setProperty('--surface', '#ffffff');
        root.style.setProperty('--text', '#1e293b');
        root.style.setProperty('--text-secondary', '#475569');
    }
}

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Page Animations
function initPageAnimations() {
    // Hero Section Animation
    const heroTitle = new SplitType('.hero-title', { types: 'lines' });
    gsap.from(heroTitle.lines, {
        duration: 1,
        y: 100,
        opacity: 0,
        stagger: 0.2,
        ease: 'power4.out'
    });

    // Animate sections on scroll
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        gsap.from(section, {
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                end: 'top 20%',
                scrub: 1
            },
            y: 100,
            opacity: 0
        });
    });

    // Project Cards Animation
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                end: 'top 20%',
                scrub: 1
            },
            y: 50,
            opacity: 0
        });
    });
}

// Navigation Scroll Effect
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.nav');
    if (window.scrollY > 100) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Theme Toggle
const themeToggle = document.querySelector('.theme-toggle');
themeToggle.addEventListener('click', () => {
    document.body.dataset.theme = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
    themeToggle.innerHTML = document.body.dataset.theme === 'dark' ? 
        '<i class="fas fa-sun"></i>' : 
        '<i class="fas fa-moon"></i>';
});

// Contact Form Handling
function submitForm(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Create mailto link with form data
    const mailtoLink = `mailto:ekhlasabdulmelik@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Clear form
    document.getElementById('contact-form').reset();
    
    // Show success message
    showNotification('Message sent successfully!', 'success');
    
    return false;
}

// Notification System
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
        notification.style.opacity = '1';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        notification.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Form Handling
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', submitForm);

// Intersection Observer for Sections
const sections = document.querySelectorAll('section');
const observerOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: '-50px'
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            if (entry.target.classList.contains('skills')) {
                animateSkills();
            }
        }
    });
}, observerOptions);

sections.forEach(section => {
    sectionObserver.observe(section);
});

// Animate Skills on Scroll
function animateSkills() {
    const skills = document.querySelectorAll('.skill-item');
    skills.forEach((skill, index) => {
        setTimeout(() => {
            skill.style.transform = 'translateY(0)';
            skill.style.opacity = '1';
        }, index * 100);
    });
}

// Parallax Effect for Profile Image
const profileImage = document.querySelector('.profile-image-container');
if (profileImage) {
    window.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        
        const xPos = (clientX / innerWidth - 0.5) * 20;
        const yPos = (clientY / innerHeight - 0.5) * 20;
        
        profileImage.style.transform = `translate(${xPos}px, ${yPos}px)`;
    });
}

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

// Interactive Project Cards
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const { left, top, width, height } = card.getBoundingClientRect();
        const x = (e.clientX - left) / width;
        const y = (e.clientY - top) / height;
        
        const xOffset = (x - 0.5) * 20;
        const yOffset = (y - 0.5) * 20;
        
        card.style.transform = `
            perspective(1000px)
            rotateY(${xOffset}deg)
            rotateX(${-yOffset}deg)
            translateZ(10px)
        `;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'none';
    });
});

// Typing Animation for Subtitles
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

const subtitles = document.querySelectorAll('.animated-subtitle');
subtitles.forEach(subtitle => {
    const text = subtitle.textContent;
    typeWriter(subtitle, text);
});

// Enhanced Form Interactions
const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
formInputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', () => {
        if (!input.value) {
            input.parentElement.classList.remove('focused');
        }
    });
});

// Social Icons Hover Effect
const socialIcons = document.querySelectorAll('.social-icon');
socialIcons.forEach(icon => {
    icon.addEventListener('mousemove', (e) => {
        const { left, top, width, height } = icon.getBoundingClientRect();
        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;
        
        icon.style.setProperty('--x', `${x}%`);
        icon.style.setProperty('--y', `${y}%`);
    });
});