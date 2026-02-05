// Initialize EmailJS
(function() {
    emailjs.init("wSfAqwINJLp4NoXmP"); // Replace with your EmailJS public key
})();

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get the surprise button and message elements
    const surpriseBtn = document.getElementById('surprise-btn');
    const surpriseMessage = document.getElementById('surprise-message');
    
    // Add click event listener to the surprise button
    surpriseBtn.addEventListener('click', function() {
        // Remove the hidden class to show the message
        surpriseMessage.classList.remove('hidden');
        
        // Add the show class to trigger the animation
        setTimeout(() => {
            surpriseMessage.classList.add('show');
        }, 10);
        
        // Change button text after click
        surpriseBtn.textContent = 'Surprise revealed! 🎉';
        
        // Disable the button after showing the surprise
        surpriseBtn.disabled = true;
        surpriseBtn.style.opacity = '0.7';
        surpriseBtn.style.cursor = 'not-allowed';
    });
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed header
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add scroll effect to header
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.style.background = '#ffffff';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = '#ffffff';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });
    
    // Add hover effect to project cards
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add typing effect to hero title (optional enhancement)
    const heroTitle = document.querySelector('#hero h2');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        heroTitle.textContent = '';
        let charIndex = 0;
        
        function typeWriter() {
            if (charIndex < originalText.length) {
                heroTitle.textContent += originalText.charAt(charIndex);
                charIndex++;
                setTimeout(typeWriter, 100);
            }
        }
        
        // Start typing effect after a short delay
        setTimeout(typeWriter, 500);
    }
    
    // Contact form functionality
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('from_name');
            const email = formData.get('from_email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Basic validation
            if (!name || !email || !subject || !message) {
                showFormMessage('Please fill in all fields.', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showFormMessage('Please enter a valid email address.', 'error');
                return;
            }
            
            // Send email using EmailJS
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Prepare email parameters
            const templateParams = {
                from_name: name,
                from_email: email,
                subject: subject,
                message: message,
                email: 'gshrilatha10@gmail.com' // Your email - matches {{email}} in template
            };
            
            // Send the email
            emailjs.send('service_lywrkkj', 'template_yudrvlh', templateParams)
                .then(function(response) {
                    showFormMessage('Thank you for your message! I\'ll get back to you soon.', 'success');
                    contactForm.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    console.log('SUCCESS!', response.status, response.text);
                }, function(error) {
                    showFormMessage('Sorry, there was an error sending your message. Please try again.', 'error');
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    console.log('FAILED...', error);
                });
        });
    }
    
    function showFormMessage(message, type) {
        formMessage.textContent = message;
        formMessage.className = `form-message ${type} show`;
        
        // Hide message after 5 seconds
        setTimeout(() => {
            formMessage.classList.remove('show');
        }, 5000);
    }
    
    // Add input focus effects
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
        
        // Add character counter for textarea
        if (input.tagName === 'TEXTAREA') {
            const maxLength = 500;
            const counter = document.createElement('div');
            counter.className = 'char-counter';
            counter.style.cssText = 'font-size: 0.8rem; color: #71717a; text-align: right; margin-top: 0.25rem;';
            input.parentElement.appendChild(counter);
            
            function updateCounter() {
                const remaining = maxLength - input.value.length;
                counter.textContent = `${input.value.length}/${maxLength} characters`;
                
                if (remaining < 50) {
                    counter.style.color = '#ef4444';
                } else {
                    counter.style.color = '#71717a';
                }
            }
            
            input.addEventListener('input', updateCounter);
            updateCounter();
            
            input.setAttribute('maxlength', maxLength);
        }
    });
});
