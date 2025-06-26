// Holographic Profile Card functionality
document.addEventListener('DOMContentLoaded', function() {
    let cardVisible = false;
    const holoCard = document.getElementById('holo-card');
    const visitorCounter = document.getElementById('visitor-counter');
    
    // Double-click visitor counter to show holographic card
    if (visitorCounter && holoCard) {
        visitorCounter.addEventListener('dblclick', function() {
            if (!cardVisible) {
                holoCard.style.display = 'block';
                holoCard.style.animation = 'holoAppear 0.8s ease-out';
                cardVisible = true;
            }
        });
        
        // Click card to close
        holoCard.addEventListener('click', function() {
            this.style.animation = 'holoDisappear 0.5s ease-in';
            setTimeout(() => {
                this.style.display = 'none';
                cardVisible = false;
            }, 500);
        });
    }
    
    // Add holographic animations
    const holoStyle = document.createElement('style');
    holoStyle.textContent = `
        @keyframes holoFloat {
            0%, 100% { transform: translate(-50%, -50%) rotateY(0deg) translateZ(0px); }
            25% { transform: translate(-50%, -50%) rotateY(5deg) translateZ(10px); }
            50% { transform: translate(-50%, -50%) rotateY(0deg) translateZ(20px); }
            75% { transform: translate(-50%, -50%) rotateY(-5deg) translateZ(10px); }
        }
        
        @keyframes holoScan {
            0% { transform: translateX(-100%) skewX(-15deg); }
            100% { transform: translateX(400%) skewX(-15deg); }
        }
        
        @keyframes holoAppear {
            0% { 
                opacity: 0;
                transform: translate(-50%, -50%) scale(0.5) rotateY(90deg);
            }
            100% { 
                opacity: 1;
                transform: translate(-50%, -50%) scale(1) rotateY(0deg);
            }
        }
        
        @keyframes holoDisappear {
            0% { 
                opacity: 1;
                transform: translate(-50%, -50%) scale(1) rotateY(0deg);
            }
            100% { 
                opacity: 0;
                transform: translate(-50%, -50%) scale(0.5) rotateY(-90deg);
            }
        }
    `;
    document.head.appendChild(holoStyle);
});