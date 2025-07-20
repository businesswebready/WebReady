document.addEventListener('DOMContentLoaded', function() {
  // Mobile Menu Toggle
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  menuToggle.addEventListener('click', function() {
    navLinks.classList.toggle('active');
    const isExpanded = this.getAttribute('aria-expanded') === 'true';
    this.setAttribute('aria-expanded', !isExpanded);
  });
  
  // Close mobile menu when clicking a nav link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
  
  // Sticky Navigation on Scroll
  const navbar = document.querySelector('.navbar');
  const logo = document.querySelector('.logo img');
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const navbarHeight = navbar.offsetHeight;
        const targetPosition = targetElement.offsetTop - navbarHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Form submission with Formspree integration
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      console.log("Form submission started"); // Debug line
      
      const formData = new FormData(contactForm);
      console.log("Form data:", Object.fromEntries(formData)); // Debug line
      
      const submitButton = contactForm.querySelector('button[type="submit"]');
      
      // Change button state during submission
      submitButton.textContent = 'Sending...';
      submitButton.disabled = true;
      
      try {
        const response = await fetch(contactForm.action, {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        });
        
        console.log("Response status:", response.status); // Debug line
        const responseData = await response.json();
        console.log("Full response:", responseData); // Debug line
        
        if (response.ok) {
          console.log("Form submitted successfully");
          submitButton.textContent = 'Message Sent!';
          submitButton.style.backgroundColor = '#10b981';
          
          // Reset form after 2 seconds
          setTimeout(() => {
            contactForm.reset();
            submitButton.textContent = 'Send Message';
            submitButton.style.backgroundColor = '';
            submitButton.disabled = false;
          }, 2000);
        } else {
          console.error("Form submission failed");
          submitButton.textContent = 'Error - Try Again';
          submitButton.style.backgroundColor = '#ef4444';
          setTimeout(() => {
            submitButton.textContent = 'Send Message';
            submitButton.style.backgroundColor = '';
            submitButton.disabled = false;
          }, 2000);
        }
      } catch (error) {
        console.error("Error:", error);
        submitButton.textContent = 'Error - Try Again';
        submitButton.style.backgroundColor = '#ef4444';
        setTimeout(() => {
          submitButton.textContent = 'Send Message';
          submitButton.style.backgroundColor = '';
          submitButton.disabled = false;
        }, 2000);
      }
    });
  }
  
  // Testimonial slider (simple version)
  const testimonials = [
    {
      text: '"WebReady delivered my website faster than expected, and it\'s helped me get my website fast!"',
      author: "- Aayush Sharma, Video Editor"
    },
    {
      text: '"Big thanks to Kanha Sharma for creating my Kam The Designer website in just 3 days! Super quick and clean work — truly impressed."',
      author: "- Kamleshwar Sharma, Graphics Designer"
    }
  ];
  
  const testimonialSlider = document.querySelector('.testimonial-slider');
  if (testimonialSlider) {
    let currentTestimonial = 0;
    
    function showTestimonial(index) {
      const testimonial = testimonials[index];
      testimonialSlider.innerHTML = `
        <div class="testimonial">
          <p class="testimonial-text">${testimonial.text}</p>
          <p class="testimonial-author">${testimonial.author}</p>
        </div>
      `;
    }
    
    // Show first testimonial
    showTestimonial(currentTestimonial);
    
    // Rotate testimonials every 5 seconds
    setInterval(() => {
      currentTestimonial = (currentTestimonial + 1) % testimonials.length;
      showTestimonial(currentTestimonial);
    }, 5000);
  }
  
  // Animation on scroll
  const animateOnScroll = function() {
    const elements = document.querySelectorAll('.skill-card, .service-card, .portfolio-item');
    
    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.2;
      
      if (elementPosition < screenPosition) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }
    });
  };
  
  // Set initial state for animated elements
  document.querySelectorAll('.skill-card, .service-card, .portfolio-item').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });
  
  window.addEventListener('scroll', animateOnScroll);
  animateOnScroll(); // Run once on page load
});