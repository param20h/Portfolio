// SPECTACULAR Portfolio JavaScript - Beyond Limits!

// Loading Screen Animation
window.addEventListener('load', () => {
    setTimeout(() => {
        const loadingScreen = document.querySelector('.loading-screen');
        loadingScreen.classList.add('hidden');
        
        // Start main animations after loading
        setTimeout(() => {
            initializeSpectacularEffects();
        }, 500);
    }, 3000);
});

// Initialize all spectacular effects
function initializeSpectacularEffects() {
    createLoadingParticles();
    createFloatingShapes();
    createButtonParticles();
    initializeProfileInteraction();
    createAdvancedParticles();
    initializeMouseTracker();
}

// Advanced Loading Particles
function createLoadingParticles() {
    const container = document.querySelector('.loading-particles');
    if (!container) return;
    
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: ${['#00d4ff', '#ff6b6b', '#4ecdc4'][Math.floor(Math.random() * 3)]};
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: loadingFloat ${Math.random() * 3 + 2}s ease-in-out infinite alternate;
            opacity: ${Math.random() * 0.8 + 0.2};
        `;
        container.appendChild(particle);
    }
}

// Floating Geometric Shapes
function createFloatingShapes() {
    const container = document.querySelector('.floating-shapes');
    const shapes = ['◆', '▲', '●', '■', '★', '♦'];
    
    for (let i = 0; i < 15; i++) {
        const shape = document.createElement('div');
        shape.textContent = shapes[Math.floor(Math.random() * shapes.length)];
        shape.style.cssText = `
            position: absolute;
            font-size: ${Math.random() * 20 + 10}px;
            color: ${['#00d4ff', '#ff6b6b', '#4ecdc4', '#45b7d1'][Math.floor(Math.random() * 4)]};
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            opacity: ${Math.random() * 0.3 + 0.1};
            animation: shapeFloat ${Math.random() * 10 + 5}s linear infinite;
            pointer-events: none;
        `;
        container.appendChild(shape);
    }
}

// Enhanced Cursor with Trail
const cursor = document.querySelector('.cursor');
const cursorTrail = [];
let mouseX = 0, mouseY = 0;

for (let i = 0; i < 10; i++) {
    const trail = document.createElement('div');
    trail.style.cssText = `
        position: fixed;
        width: ${15 - i}px;
        height: ${15 - i}px;
        background: rgba(0, 212, 255, ${0.8 - i * 0.08});
        border-radius: 50%;
        pointer-events: none;
        z-index: 9998;
        transition: all 0.1s ease;
    `;
    document.body.appendChild(trail);
    cursorTrail.push(trail);
}

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Update cursor trail
    cursorTrail.forEach((trail, index) => {
        setTimeout(() => {
            trail.style.left = mouseX + 'px';
            trail.style.top = mouseY + 'px';
            trail.style.transform = 'translate(-50%, -50%)';
        }, index * 20);
    });
});

function animateCursor() {
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
    requestAnimationFrame(animateCursor);
}
animateCursor();

// Enhanced cursor hover effects
document.querySelectorAll('a, button, .project-card, .skill-category').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.classList.add('hover');
        cursorTrail.forEach(trail => {
            trail.style.background = 'rgba(255, 107, 107, 0.6)';
        });
    });
    
    el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
        cursorTrail.forEach((trail, index) => {
            trail.style.background = `rgba(0, 212, 255, ${0.8 - index * 0.08})`;
        });
    });
});

// Spectacular Particle System
function createAdvancedParticles() {
    const particlesContainer = document.querySelector('.particles');
    const particleCount = 80;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        const size = Math.random() * 3 + 1;
        const color = ['#00d4ff', '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4'][Math.floor(Math.random() * 5)];
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            border-radius: 50%;
            pointer-events: none;
            animation: particleFloat ${Math.random() * 8 + 4}s ease-in-out infinite alternate;
            opacity: ${Math.random() * 0.8 + 0.2};
            box-shadow: 0 0 ${size * 3}px ${color};
        `;
        
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 4 + 's';
        
        particlesContainer.appendChild(particle);
    }
}

// Mouse Tracker for Interactive Effects
function initializeMouseTracker() {
    document.addEventListener('mousemove', (e) => {
        const mouseXPercent = (e.clientX / window.innerWidth) * 100;
        const mouseYPercent = (e.clientY / window.innerHeight) * 100;
        
        // Parallax effect for floating shapes
        document.querySelectorAll('.floating-shapes div').forEach((shape, index) => {
            const speed = (index + 1) * 0.02;
            const x = (mouseXPercent - 50) * speed;
            const y = (mouseYPercent - 50) * speed;
            shape.style.transform = `translate(${x}px, ${y}px)`;
        });
        
        // Interactive background gradient
        document.body.style.background = `
            radial-gradient(circle at ${mouseXPercent}% ${mouseYPercent}%, 
            rgba(0, 212, 255, 0.1) 0%, 
            rgba(255, 107, 107, 0.05) 30%, 
            rgba(78, 205, 196, 0.05) 60%, 
            transparent 100%),
            linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 25%, #16213e 50%, #0f3460 75%, #0a0a0a 100%)
        `;
    });
}

// Enhanced Profile Photo Interaction
function initializeProfileInteraction() {
    const profilePhoto = document.querySelector('.profile-photo');
    const floatingIcons = document.querySelectorAll('.floating-icon');
    
    profilePhoto.addEventListener('click', () => {
        // Explosion effect
        createExplosionEffect(profilePhoto);
        
        // Shake floating icons
        floatingIcons.forEach((icon, index) => {
            setTimeout(() => {
                icon.style.animation = 'iconExplode 0.6s ease-out';
                setTimeout(() => {
                    icon.style.animation = `iconFloat 6s ease-in-out infinite`;
                    icon.style.animationDelay = index * 1.5 + 's';
                }, 600);
            }, index * 100);
        });
        
        // Profile photo special effect
        profilePhoto.style.animation = 'profileExplode 0.8s ease-out';
        setTimeout(() => {
            profilePhoto.style.animation = 'profileAnimation 8s ease-in-out infinite, profileFloat 3s ease-in-out infinite alternate';
        }, 800);
    });
}

// Explosion Effect
function createExplosionEffect(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 20; i++) {
        const spark = document.createElement('div');
        const angle = (Math.PI * 2 * i) / 20;
        const velocity = Math.random() * 100 + 50;
        
        spark.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: ${['#00d4ff', '#ff6b6b', '#4ecdc4'][Math.floor(Math.random() * 3)]};
            border-radius: 50%;
            left: ${centerX}px;
            top: ${centerY}px;
            pointer-events: none;
            z-index: 1000;
            box-shadow: 0 0 10px currentColor;
        `;
        
        document.body.appendChild(spark);
        
        // Animate spark
        const deltaX = Math.cos(angle) * velocity;
        const deltaY = Math.sin(angle) * velocity;
        
        spark.animate([
            { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
            { transform: `translate(${deltaX - 50}%, ${deltaY - 50}%) scale(0)`, opacity: 0 }
        ], {
            duration: 1000,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        }).onfinish = () => spark.remove();
    }
}

// Button Particle Effects
function createButtonParticles() {
    document.querySelectorAll('.btn').forEach(btn => {
        const particleContainer = btn.querySelector('.btn-particles');
        
        btn.addEventListener('mouseenter', () => {
            for (let i = 0; i < 10; i++) {
                const particle = document.createElement('div');
                particle.style.cssText = `
                    position: absolute;
                    width: 2px;
                    height: 2px;
                    background:rgb(255, 255, 255);
                    border-radius: 50%;
                    left: ${Math.random() * 100}%;
                    top: ${Math.random() * 100}%;
                    animation: btnParticle 1s ease-out forwards;
                `;
                particleContainer.appendChild(particle);
                setTimeout(() => particle.remove(), 1000);
            }
        });
    });
}

// Enhanced Typing Animation
const typingText = document.querySelector('.typing-text');
const phrases = [
    'Python Developer',
    'Game Creator', 
    'AI Enthusiast',
    'Problem Solver',
    'Innovation Seeker',
    'Gym Rat'
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeWriter() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        typingText.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }
    
    // Add glitch effect occasionally
    if (Math.random() < 0.1) {
        typingText.style.textShadow = '2px 0 #ff6b6b, -2px 0 #00d4ff';
        setTimeout(() => {
            typingText.style.textShadow = '0 0 10px rgba(0, 212, 255, 0.5)';
        }, 100);
    }
    
    let typeSpeed = isDeleting ? 50 : 100;
    
    if (!isDeleting && charIndex === currentPhrase.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 500;
    }
    
    setTimeout(typeWriter, typeSpeed);
}

// Start typing animation
setTimeout(typeWriter, 2000);

// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger?.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
    
    // Animate hamburger
    const spans = hamburger.querySelectorAll('span');
    if (hamburger.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans.forEach(span => {
            span.style.transform = '';
            span.style.opacity = '';
        });
    }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth Scrolling with Easing
document.querySelectorAll('a[href^=\"#\"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const targetPosition = target.offsetTop - 80;
            const startPosition = window.pageYOffset;
            const distance = targetPosition - startPosition;
            const duration = 1000;
            let start = null;
            
            function animation(currentTime) {
                if (start === null) start = currentTime;
                const timeElapsed = currentTime - start;
                const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
                window.scrollTo(0, run);
                if (timeElapsed < duration) requestAnimationFrame(animation);
            }
            
            function easeInOutQuad(t, b, c, d) {
                t /= d / 2;
                if (t < 1) return c / 2 * t * t + b;
                t--;
                return -c / 2 * (t * (t - 2) - 1) + b;
            }
            
            requestAnimationFrame(animation);
        }
    });
});

// Enhanced Navbar on Scroll
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Hide/show navbar on scroll
    if (scrollTop > lastScrollTop && scrollTop > 200) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    lastScrollTop = scrollTop;
});

// Skill Bar Animation with Counter
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillBars = entry.target.querySelectorAll('.skill-progress');
            skillBars.forEach((bar, index) => {
                setTimeout(() => {
                    const width = bar.getAttribute('data-width');
                    bar.style.width = width + '%';
                    
                    // Animate counter
                    const counter = bar.querySelector('.skill-percentage');
                    if (counter) {
                        animateCounter(counter, 0, parseInt(width), 1500);
                    }
                }, index * 200);
            });
        }
    });
}, observerOptions);

// Counter animation function
function animateCounter(element, start, end, duration) {
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const current = Math.floor(start + (end - start) * progress);
        
        element.textContent = current + '%';
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// Initialize skill bars without percentage text
function initializeSkillBars() {
    document.querySelectorAll('.skill-progress').forEach(bar => {
        const width = bar.getAttribute('data-width');
        
        // Set CSS custom property for width
        bar.style.setProperty('--progress-width', width + '%');
        
        // Remove any existing percentage text
        const existingPercentage = bar.querySelector('.skill-percentage');
        if (existingPercentage) {
            existingPercentage.remove();
        }
        
        // Add pulse effect on high skills
        if (parseInt(width) >= 80) {
            bar.style.boxShadow = '0 0 20px rgba(0, 212, 255, 0.6)';
            bar.style.animation += ', skillPulse 2s ease-in-out infinite';
        }
    });
}

// Add skill category icon animations
function enhanceSkillIcons() {
    document.querySelectorAll('.skill-category h3 i').forEach((icon, index) => {
        icon.addEventListener('mouseenter', () => {
            icon.style.transform = 'scale(1.3) rotate(360deg)';
            icon.style.color = '#ff6b6b';
        });
        
        icon.addEventListener('mouseleave', () => {
            icon.style.transform = 'scale(1) rotate(0deg)';
            icon.style.color = '#00d4ff';
        });
        
        // Random floating animation
        setTimeout(() => {
            icon.style.animation = `iconFloat 3s ease-in-out infinite ${index * 0.5}s`;
        }, index * 200);
    });
}

// Add skill bar click effects
function addSkillBarEffects() {
    document.querySelectorAll('.skill-bar').forEach(bar => {
        bar.addEventListener('click', () => {
            // Create sparkle effect
            for (let i = 0; i < 8; i++) {
                const sparkle = document.createElement('div');
                sparkle.style.cssText = `
                    position: absolute;
                    width: 4px;
                    height: 4px;
                    background: #00d4ff;
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 1000;
                `;
                
                const rect = bar.getBoundingClientRect();
                sparkle.style.left = rect.left + Math.random() * rect.width + 'px';
                sparkle.style.top = rect.top + Math.random() * rect.height + 'px';
                
                document.body.appendChild(sparkle);
                
                sparkle.animate([
                    { transform: 'scale(0) translateY(0px)', opacity: 1 },
                    { transform: 'scale(1) translateY(-30px)', opacity: 0 }
                ], {
                    duration: 800,
                    easing: 'ease-out'
                }).onfinish = () => sparkle.remove();
            }
        });
    });
}

// Observe skills section
const skillsSection = document.querySelector('.skills');
if (skillsSection) {
    initializeSkillBars();
    skillObserver.observe(skillsSection);
}

// Project Card Hover Effects
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) rotateX(5deg)';
        card.style.boxShadow = '0 20px 40px rgba(0, 212, 255, 0.3)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) rotateX(0)';
        card.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
    });
});

// EmailJS Configuration
(function() {
    emailjs.init('N9Y9c1frAzwZmLKVI');
})();

// Contact Form with EmailJS
const contactFormEmailJS = document.getElementById('contact-form');
if (contactFormEmailJS) {
    contactFormEmailJS.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = this.querySelector('input[name="name"]').value.trim();
        const email = this.querySelector('input[name="email"]').value.trim();
        const message = this.querySelector('textarea[name="message"]').value.trim();
        
        if (!name || !email || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        sendEmail(name, email, message, this);
    });
}

function isValidEmail(email) {
    return email.includes('@') && email.includes('.') && email.length > 5;
}

function sendEmail(name, email, message, form) {
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    // Show loading state
    submitBtn.innerHTML = 'Sending...';
    submitBtn.disabled = true;
    
    // EmailJS send
    emailjs.send('service_wv98oq4', 'template_2096w1h', {
        from_name: name,
        from_email: email,
        message: message,
        to_name: 'Paramjit Singh'
    })
    .then(function(response) {
        showNotification('Message sent successfully!', 'success');
        form.reset();
    })
    .catch(function(error) {
        showNotification('Failed to send message. Please try again.', 'error');
        console.error('EmailJS error:', error);
    })
    .finally(function() {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    });
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 10px;
        color: white;
        font-weight: 600;
        z-index: 10000;
        animation: slideIn 0.3s ease;
        background: ${type === 'success' ? 'linear-gradient(45deg, #4ecdc4, #44a08d)' : 'linear-gradient(45deg, #ff6b6b, #ee5a52)'};
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeSkillBars();
    enhanceSkillIcons();
    addSkillBarEffects();
    console.log('Portfolio loaded successfully!');
});r('DOMContentLoaded', () => {
    initializeSkillBars();
    enhanceSkillIcons();
    addSkillBarEffects();
    console.log('Portfolio loaded successfully!');
});
// (Removed duplicate IntersectionObserver and skillsSection code)

// Project Card 3D Tilt Effect
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `
            translateY(-15px) 
            rotateX(${rotateX}deg) 
            rotateY(${rotateY}deg) 
            scale(1.02)
        `;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) rotateX(0) rotateY(0) scale(1)';
    });
});



// Spectacular Notification System
function showSpectacularNotification(message, type = 'info') {
    const existingNotification = document.querySelector('.spectacular-notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `spectacular-notification notification-${type}`;
    
    const colors = {
        success: 'linear-gradient(45deg, #4ecdc4, #44a08d)',
        error: 'linear-gradient(45deg, #ff6b6b, #ee5a52)',
        info: 'linear-gradient(45deg, #00d4ff, #0099cc)'
    };
    
    notification.innerHTML = `
        <div class=\"notification-content\">
            <div class=\"notification-icon\">${type === 'success' ? '✓' : type === 'error' ? '✗' : 'ℹ'}</div>
            <span class=\"notification-message\">${message}</span>
            <button class=\"notification-close\">&times;</button>
        </div>
        <div class=\"notification-progress\"></div>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 30px;
        right: 30px;
        background: ${colors[type]};
        color: white;
        padding: 1.5rem 2rem;
        border-radius: 15px;
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        z-index: 10000;
        animation: notificationSlideIn 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        max-width: 400px;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        overflow: hidden;
    `;
    
    document.body.appendChild(notification);
    
    // Progress bar animation
    const progress = notification.querySelector('.notification-progress');
    progress.style.cssText = `
        position: absolute;
        bottom: 0;
        left: 0;
        height: 3px;
        background: rgba(255, 255, 255, 0.3);
        animation: notificationProgress 5s linear;
    `;
    
    // Close functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'notificationSlideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'notificationSlideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Scroll Reveal Animation
const revealElements = document.querySelectorAll('.project-card, .skill-category, .stat, .about-text p');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1)';
            }, index * 100);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(50px) scale(0.9)';
    el.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    revealObserver.observe(el);
});

// Add CSS animations
const spectacularStyles = document.createElement('style');
spectacularStyles.textContent = `
    @keyframes loadingFloat {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-20px) rotate(180deg); }
    }
    
    @keyframes shapeFloat {
        0% { transform: translateY(100vh) rotate(0deg); }
        100% { transform: translateY(-100px) rotate(360deg); }
    }
    
    @keyframes particleFloat {
        0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.2; }
        25% { transform: translateY(-30px) translateX(10px); opacity: 1; }
        50% { transform: translateY(-10px) translateX(-10px); opacity: 0.8; }
        75% { transform: translateY(-40px) translateX(5px); opacity: 1; }
    }
    
    @keyframes iconExplode {
        0% { transform: scale(1) rotate(0deg); }
        50% { transform: scale(1.5) rotate(180deg); }
        100% { transform: scale(1) rotate(360deg); }
    }
    
    @keyframes profileExplode {
        0% { transform: scale(1) rotate(0deg); }
        25% { transform: scale(1.2) rotate(5deg); }
        50% { transform: scale(0.9) rotate(-5deg); }
        75% { transform: scale(1.1) rotate(3deg); }
        100% { transform: scale(1) rotate(0deg); }
    }
    
    @keyframes btnParticleFloat {
        0% { opacity: 1; transform: translateY(0) scale(1); }
        100% { opacity: 0; transform: translateY(-50px) scale(0); }
    }
    
    @keyframes notificationSlideIn {
        0% { transform: translateX(100%) scale(0.8); opacity: 0; }
        100% { transform: translateX(0) scale(1); opacity: 1; }
    }
    
    @keyframes notificationSlideOut {
        0% { transform: translateX(0) scale(1); opacity: 1; }
        100% { transform: translateX(100%) scale(0.8); opacity: 0; }
    }
    
    @keyframes notificationProgress {
        0% { width: 100%; }
        100% { width: 0%; }
    }
    
    .loading-dots span {
        animation: loadingDots 1.4s ease-in-out infinite both;
    }
    
    .loading-dots span:nth-child(1) { animation-delay: -0.32s; }
    .loading-dots span:nth-child(2) { animation-delay: -0.16s; }
    
    @keyframes loadingDots {
        0%, 80%, 100% { opacity: 0; }
        40% { opacity: 1; }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 1rem;
    }
    
    .notification-icon {
        font-size: 1.5rem;
        font-weight: bold;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        margin-left: auto;
    }
`;
document.head.appendChild(spectacularStyles);

// Performance optimization
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
}, 16));

// Easter egg - Konami code with spectacular effect
let konamiCode = [];
const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.code);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        // SPECTACULAR EASTER EGG!
        document.body.style.animation = 'rainbowExplosion 3s ease infinite';
        showSpectacularNotification('🎉 KONAMI CODE ACTIVATED! You found the secret!', 'success');
        
        // Create fireworks
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                createFirework();
            }, i * 500);
        }
        
        setTimeout(() => {
            document.body.style.animation = '';
        }, 10000);
    }
});

function createFirework() {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57'];
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight * 0.5;
    
    for (let i = 0; i < 30; i++) {
        const spark = document.createElement('div');
        const color = colors[Math.floor(Math.random() * colors.length)];
        const angle = (Math.PI * 2 * i) / 30;
        const velocity = Math.random() * 150 + 50;
        
        spark.style.cssText = `
            position: fixed;
            width: 6px;
            height: 6px;
            background: ${color};
            border-radius: 50%;
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
            z-index: 10000;
            box-shadow: 0 0 20px ${color};
        `;
        
        document.body.appendChild(spark);
        
        const deltaX = Math.cos(angle) * velocity;
        const deltaY = Math.sin(angle) * velocity;
        
        spark.animate([
            { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
            { transform: `translate(${deltaX}px, ${deltaY + 200}px) scale(0)`, opacity: 0 }
        ], {
            duration: 2000,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        }).onfinish = () => spark.remove();
    }
}

// Add rainbow animation
const rainbowStyle = document.createElement('style');
rainbowStyle.textContent = `
    @keyframes rainbowExplosion {
        0% { filter: hue-rotate(0deg) saturate(1) brightness(1); }
        25% { filter: hue-rotate(90deg) saturate(1.5) brightness(1.2); }
        50% { filter: hue-rotate(180deg) saturate(2) brightness(1.5); }
        75% { filter: hue-rotate(270deg) saturate(1.5) brightness(1.2); }
        100% { filter: hue-rotate(360deg) saturate(1) brightness(1); }
    }
`;
document.head.appendChild(rainbowStyle);

console.log('🚀 SPECTACULAR Portfolio loaded successfully!');
console.log('✨ Try the Konami code for an AMAZING surprise!');
console.log('🎮 Click the profile photo for explosion effects!');
console.log('🌟 This portfolio is beyond limits!');