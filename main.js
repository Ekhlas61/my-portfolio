// Mouse trail effect
document.addEventListener('mousemove', function(e) {
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    trail.style.left = e.pageX - 10 + 'px';
    trail.style.top = e.pageY - 10 + 'px';
    document.body.appendChild(trail);
    
    setTimeout(() => {
        trail.remove();
    }, 1000);
});

// Glow effect for skills
document.querySelectorAll('.skills-category').forEach(category => {
    category.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / this.clientWidth) * 100;
        const y = ((e.clientY - rect.top) / this.clientHeight) * 100;
        this.style.setProperty('--x', `${x}%`);
        this.style.setProperty('--y', `${y}%`);
    });
});

// Animate skill bars on scroll
const animateSkillBars = () => {
    const skillItems = document.querySelectorAll('.skill-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillLevel = entry.target.getAttribute('data-level');
                const progressBar = entry.target.querySelector('.skill-progress');
                progressBar.style.width = `${skillLevel}%`;
            }
        });
    }, { threshold: 0.5 });

    skillItems.forEach(item => observer.observe(item));
};

// Animate text on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(element => observer.observe(element));
};

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
    animateSkillBars();
    animateOnScroll();
});
