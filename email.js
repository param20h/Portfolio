// EmailJS Configuration
(function() {
    emailjs.init('N9Y9c1frAzwZmLKVI');
})();

// Contact Form with EmailJS
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = this.querySelector('input[name="name"]').value.trim();
        const email = this.querySelector('input[name="email"]').value.trim();
        const message = this.querySelector('textarea[name="message"]').value.trim();
        
        if (!name || !email || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        // Simple email validation
        if (!email.includes('@') || !email.includes('.')) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        sendEmail(name, email, message, this);
    });
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