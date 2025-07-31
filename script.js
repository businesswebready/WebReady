document.addEventListener('DOMContentLoaded', function() {
  // Mobile Navigation
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  
  hamburger.addEventListener('click', function() {
    this.classList.toggle('active');
    navLinks.classList.toggle('nav-active');
    this.setAttribute('aria-expanded', this.classList.contains('active'));
  });
  
  // Close mobile menu when clicking on a link
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('nav-active');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });
  
  // Sticky header on scroll
  const header = document.querySelector('header');
  const heroSection = document.querySelector('.hero');
  const heroHeight = heroSection.offsetHeight;
  
  window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    
    // Add/remove scrolled class based on scroll position
    header.classList.toggle('scrolled', scrollPosition > 50);
    
    // Highlight active section in navigation
    document.querySelectorAll('section').forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        document.querySelectorAll('.nav-links a').forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
  
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const messageTextarea = document.getElementById('message');
  const messageCounter = document.getElementById('message-counter');

  // Character counter for message
  if (messageTextarea && messageCounter) {
    messageTextarea.addEventListener('input', function() {
      messageCounter.textContent = this.value.length;
    });
  }

  // Form validation
  if (contactForm) {
    const validateField = (field, errorId) => {
      const errorElement = document.getElementById(errorId);
      const formGroup = field.closest('.form-group');
      
      if (field.validity.valid) {
        formGroup.classList.remove('error');
        return true;
      } else {
        formGroup.classList.add('error');
        
        if (field.validity.valueMissing) {
          errorElement.textContent = 'This field is required';
        } else if (field.validity.tooShort) {
          errorElement.textContent = `Minimum length is ${field.minLength} characters`;
        } else if (field.validity.typeMismatch) {
          errorElement.textContent = 'Please enter a valid format';
        } else if (field.validity.patternMismatch) {
          if (field.id === 'email') {
            errorElement.textContent = 'Please enter a valid email';
          } else if (field.id === 'phone') {
            errorElement.textContent = 'Please enter a valid phone number';
          }
        }
        
        return false;
      }
    };

    // Validate on blur
    contactForm.querySelectorAll('input, textarea').forEach(field => {
      field.addEventListener('blur', () => {
        validateField(field, `${field.id}-error`);
      });
    });

    // Validate on submit
    contactForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      // Validate all fields
      let isValid = true;
      const fieldsToValidate = [
        { field: this.name, errorId: 'name-error' },
        { field: this.email, errorId: 'email-error' },
        { field: this.message, errorId: 'message-error' }
      ];
      
      fieldsToValidate.forEach(({ field, errorId }) => {
        if (!validateField(field, errorId)) {
          isValid = false;
        }
      });

      if (!isValid) return;

      // Set loading state
      contactForm.classList.add('loading');
      submitBtn.disabled = true;
      
      try {
        const formData = new FormData(contactForm);
        
        // Send form data
        const response = await fetch(contactForm.action, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });
        
        if (response.ok) {
          contactForm.classList.remove('loading');
          contactForm.classList.add('success');
          submitBtn.querySelector('.btn-text').textContent = 'Message Sent!';
          
          // Reset form after delay
          setTimeout(() => {
            contactForm.reset();
            contactForm.classList.remove('success');
            submitBtn.querySelector('.btn-text').textContent = 'Send Message';
            submitBtn.disabled = false;
            messageCounter.textContent = '0';
          }, 3000);
        } else {
          throw new Error('Form submission failed');
        }
      } catch (error) {
        contactForm.classList.remove('loading');
        contactForm.classList.add('error');
        submitBtn.querySelector('.btn-text').textContent = 'Error - Try Again';
        
        setTimeout(() => {
          contactForm.classList.remove('error');
          submitBtn.querySelector('.btn-text').textContent = 'Send Message';
          submitBtn.disabled = false;
        }, 3000);
      }
    });
  }
});
  
  // Lazy load images
  if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src || img.src;
          img.removeAttribute('loading');
          observer.unobserve(img);
        }
      });
    });
    
    lazyImages.forEach(img => {
      imageObserver.observe(img);
    });
  }
});