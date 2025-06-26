// Liquid Morphing Background Effect
class LiquidBackground {
    constructor() {
        this.canvas = document.getElementById('liquid-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.mouseX = 0;
        this.mouseY = 0;
        this.scrollY = 0;
        this.time = 0;
        
        this.blobs = [];
        this.colors = [
            { r: 0, g: 212, b: 255, a: 0.3 },    // Cyan
            { r: 255, g: 107, b: 107, a: 0.2 },  // Red
            { r: 78, g: 205, b: 196, a: 0.25 },  // Teal
            { r: 155, g: 89, b: 182, a: 0.2 },   // Purple
            { r: 255, g: 129, b: 63, a: 0.15 }   // Orange
        ];
        
        this.init();
    }
    
    init() {
        this.resize();
        this.createBlobs();
        this.setupEventListeners();
        this.animate();
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    createBlobs() {
        const blobCount = 5;
        this.blobs = [];
        
        for (let i = 0; i < blobCount; i++) {
            this.blobs.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                radius: 100 + Math.random() * 200,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                color: this.colors[i % this.colors.length],
                phase: Math.random() * Math.PI * 2,
                morphSpeed: 0.02 + Math.random() * 0.01
            });
        }
    }
    
    setupEventListeners() {
        window.addEventListener('resize', () => this.resize());
        
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        });
        
        window.addEventListener('scroll', () => {
            this.scrollY = window.scrollY;
        });
    }
    
    updateBlobs() {
        this.blobs.forEach((blob, index) => {
            // Mouse attraction
            const mouseDistance = Math.sqrt(
                Math.pow(this.mouseX - blob.x, 2) + 
                Math.pow(this.mouseY - blob.y, 2)
            );
            
            if (mouseDistance < 300) {
                const attraction = 0.002;
                blob.vx += (this.mouseX - blob.x) * attraction;
                blob.vy += (this.mouseY - blob.y) * attraction;
            }
            
            // Scroll influence
            blob.y += this.scrollY * 0.001;
            
            // Natural movement
            blob.x += blob.vx + Math.sin(this.time * 0.01 + blob.phase) * 0.5;
            blob.y += blob.vy + Math.cos(this.time * 0.008 + blob.phase) * 0.3;
            
            // Morphing radius
            blob.radius = 100 + Math.sin(this.time * blob.morphSpeed + blob.phase) * 50;
            
            // Boundary wrapping
            if (blob.x < -blob.radius) blob.x = this.canvas.width + blob.radius;
            if (blob.x > this.canvas.width + blob.radius) blob.x = -blob.radius;
            if (blob.y < -blob.radius) blob.y = this.canvas.height + blob.radius;
            if (blob.y > this.canvas.height + blob.radius) blob.y = -blob.radius;
            
            // Velocity damping
            blob.vx *= 0.99;
            blob.vy *= 0.99;
        });
    }
    
    drawBlobs() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.blobs.forEach((blob, index) => {
            // Create gradient
            const gradient = this.ctx.createRadialGradient(
                blob.x, blob.y, 0,
                blob.x, blob.y, blob.radius
            );
            
            const color = blob.color;
            gradient.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`);
            gradient.addColorStop(0.7, `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a * 0.5})`);
            gradient.addColorStop(1, `rgba(${color.r}, ${color.g}, ${color.b}, 0)`);
            
            // Draw morphing blob
            this.ctx.save();
            this.ctx.globalCompositeOperation = 'screen';
            this.ctx.fillStyle = gradient;
            
            this.ctx.beginPath();
            
            // Create organic shape using multiple sine waves
            const points = 32;
            for (let i = 0; i <= points; i++) {
                const angle = (i / points) * Math.PI * 2;
                const radiusVariation = 1 + 
                    Math.sin(angle * 3 + this.time * 0.02 + blob.phase) * 0.2 +
                    Math.sin(angle * 5 + this.time * 0.015 + blob.phase * 2) * 0.1;
                
                const x = blob.x + Math.cos(angle) * blob.radius * radiusVariation;
                const y = blob.y + Math.sin(angle) * blob.radius * radiusVariation;
                
                if (i === 0) {
                    this.ctx.moveTo(x, y);
                } else {
                    this.ctx.lineTo(x, y);
                }
            }
            
            this.ctx.closePath();
            this.ctx.fill();
            this.ctx.restore();
        });
        
        // Add metaball effect
        this.ctx.save();
        this.ctx.globalCompositeOperation = 'multiply';
        this.ctx.filter = 'blur(20px) contrast(20)';
        this.ctx.drawImage(this.canvas, 0, 0);
        this.ctx.restore();
    }
    
    animate() {
        this.time++;
        this.updateBlobs();
        this.drawBlobs();
        requestAnimationFrame(() => this.animate());
    }
    
    // Method to change colors based on theme
    updateTheme(isDark) {
        if (isDark) {
            this.colors = [
                { r: 0, g: 212, b: 255, a: 0.15 },
                { r: 255, g: 107, b: 107, a: 0.1 },
                { r: 78, g: 205, b: 196, a: 0.12 },
                { r: 155, g: 89, b: 182, a: 0.1 },
                { r: 255, g: 129, b: 63, a: 0.08 }
            ];
        } else {
            this.colors = [
                { r: 0, g: 212, b: 255, a: 0.25 },
                { r: 255, g: 107, b: 107, a: 0.2 },
                { r: 78, g: 205, b: 196, a: 0.22 },
                { r: 155, g: 89, b: 182, a: 0.18 },
                { r: 255, g: 129, b: 63, a: 0.15 }
            ];
        }
        
        // Update blob colors
        this.blobs.forEach((blob, index) => {
            blob.color = this.colors[index % this.colors.length];
        });
    }
}

// Initialize liquid background
document.addEventListener('DOMContentLoaded', () => {
    const liquidBg = new LiquidBackground();
    
    // Connect with theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            setTimeout(() => {
                const isDark = !document.body.classList.contains('light-mode');
                liquidBg.updateTheme(isDark);
            }, 100);
        });
    }
    
    // Store reference globally for other scripts
    window.liquidBackground = liquidBg;
});