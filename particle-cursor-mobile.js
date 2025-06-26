// Mobile-Optimized Particle Cursor Trail Effect
class ParticleCursor {
    constructor() {
        this.particles = [];
        this.mouseX = 0;
        this.mouseY = 0;
        this.currentSection = 'home';
        this.isMobile = window.innerWidth <= 768 || 'ontouchstart' in window;
        
        // Mobile-optimized effects (much lighter)
        this.sectionEffects = {
            home: { color: '#00d4ff', size: this.isMobile ? 2 : 4, count: this.isMobile ? 1 : 8, sparkle: false },
            about: { color: '#4ecdc4', size: this.isMobile ? 2 : 3, count: this.isMobile ? 1 : 6, sparkle: false },
            skills: { color: '#ff6b6b', size: this.isMobile ? 2 : 5, count: this.isMobile ? 1 : 10, sparkle: false },
            'skill-spheres': { color: '#9b59b6', size: this.isMobile ? 2 : 6, count: this.isMobile ? 1 : 12, sparkle: false },
            'github-stats': { color: '#00d4ff', size: this.isMobile ? 2 : 4, count: this.isMobile ? 1 : 8, sparkle: false },
            projects: { color: '#feca57', size: this.isMobile ? 2 : 5, count: this.isMobile ? 1 : 9, sparkle: false },
            contact: { color: '#ff813f', size: this.isMobile ? 2 : 4, count: this.isMobile ? 1 : 7, sparkle: false }
        };
        
        this.init();
    }
    
    init() {
        // Only initialize on desktop
        if (!this.isMobile) {
            this.setupEventListeners();
            this.animate();
            this.detectSection();
        }
    }
    
    setupEventListeners() {
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
            this.createParticles();
        });
        
        document.addEventListener('scroll', () => {
            this.detectSection();
        });
    }
    
    detectSection() {
        const sections = document.querySelectorAll('section');
        const scrollPos = window.scrollY + window.innerHeight / 2;
        
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const sectionTop = rect.top + window.scrollY;
            const sectionBottom = sectionTop + rect.height;
            
            if (scrollPos >= sectionTop && scrollPos <= sectionBottom) {
                this.currentSection = section.id || 'home';
            }
        });
    }
    
    createParticles() {
        const effect = this.sectionEffects[this.currentSection] || this.sectionEffects.home;
        
        for (let i = 0; i < effect.count; i++) {
            this.particles.push({
                x: this.mouseX + (Math.random() - 0.5) * 10,
                y: this.mouseY + (Math.random() - 0.5) * 10,
                vx: (Math.random() - 0.5) * 1,
                vy: (Math.random() - 0.5) * 1,
                life: 1,
                decay: 0.03,
                size: effect.size,
                color: effect.color,
                sparkle: effect.sparkle,
                rotation: 0,
                rotationSpeed: 0
            });
        }
        
        // Limit particles for performance
        if (this.particles.length > 50) {
            this.particles = this.particles.slice(-50);
        }
    }
    
    updateParticles() {
        this.particles = this.particles.filter(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.life -= particle.decay;
            
            particle.vx *= 0.98;
            particle.vy *= 0.98;
            
            return particle.life > 0;
        });
    }
    
    drawParticles() {
        document.querySelectorAll('.cursor-particle').forEach(p => p.remove());
        
        this.particles.forEach(particle => {
            const element = document.createElement('div');
            element.className = 'cursor-particle';
            
            const opacity = particle.life;
            const size = particle.size * particle.life;
            
            element.style.cssText = `
                position: fixed;
                left: ${particle.x - size/2}px;
                top: ${particle.y - size/2}px;
                width: ${size}px;
                height: ${size}px;
                background: ${particle.color};
                border-radius: 50%;
                pointer-events: none;
                z-index: 9998;
                opacity: ${opacity};
                box-shadow: 0 0 ${size}px ${particle.color};
            `;
            
            document.body.appendChild(element);
        });
    }
    
    animate() {
        if (!this.isMobile) {
            this.updateParticles();
            this.drawParticles();
            requestAnimationFrame(() => this.animate());
        }
    }
    
    burst(x, y, color = '#00d4ff', count = 5) {
        if (this.isMobile) return; // Skip on mobile
        
        for (let i = 0; i < count; i++) {
            const angle = (Math.PI * 2 * i) / count;
            const velocity = 2;
            
            this.particles.push({
                x: x,
                y: y,
                vx: Math.cos(angle) * velocity,
                vy: Math.sin(angle) * velocity,
                life: 1,
                decay: 0.05,
                size: 3,
                color: color,
                sparkle: false,
                rotation: 0,
                rotationSpeed: 0
            });
        }
    }
}

// Initialize mobile-optimized particle cursor
document.addEventListener('DOMContentLoaded', () => {
    const particleCursor = new ParticleCursor();
    
    // Simplified effects for interactive elements (desktop only)
    if (window.innerWidth > 768 && !('ontouchstart' in window)) {
        document.querySelectorAll('button, .btn, .social-link').forEach(element => {
            element.addEventListener('mouseenter', (e) => {
                const rect = e.target.getBoundingClientRect();
                const x = rect.left + rect.width / 2;
                const y = rect.top + rect.height / 2;
                particleCursor.burst(x, y, '#00d4ff', 3);
            });
        });
    }
    
    window.particleCursor = particleCursor;
});