document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger-menu');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        // Toggle the 'active' class on the nav links list
        navLinks.classList.toggle('active');

        // Optional: Animate the hamburger icon itself
        hamburger.classList.toggle('toggle');

        // Animate the hamburger icon to an "X"
        const bars = hamburger.querySelectorAll('span:not(.sr-only)');
        if (bars.length === 3) {
            bars[0].classList.toggle('bar1');
            bars[1].classList.toggle('bar2');
            bars[2].classList.toggle('bar3');
        }
    });

    // Hero Slider for index.html
    const heroSlider = document.querySelector('.hero-slider');
    if (heroSlider) {
        const slides = heroSlider.querySelectorAll('.hero-slide');
        let currentSlide = 0;

        if (slides.length > 1) {
            setInterval(() => {
                slides[currentSlide].classList.remove('active');
                currentSlide = (currentSlide + 1) % slides.length;
                slides[currentSlide].classList.add('active');
            }, 5000); // Change slide every 5 seconds
        }
    }

    // Functionality for the Contact Us form to send data via WhatsApp
    const sendMessageBtn = document.getElementById('sendMessageBtn');
    if (sendMessageBtn) {
        sendMessageBtn.addEventListener('click', () => {
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            // Basic validation: ensure required fields are not empty
            if (!name || !email || !message) {
                alert('Please fill in your Name, Email, and Message before sending.');
                return; // Stop execution if validation fails
            }

            // Construct the WhatsApp message
            let whatsappMessage = `Hello, I'd like to get in touch regarding WEMISI .\n\n`;
            whatsappMessage += `Name: ${name}\n`;
            whatsappMessage += `Email: ${email}\n`;
            if (subject) { // Only add subject if it's provided
                whatsappMessage += `Subject: ${subject}\n`;
            }
            whatsappMessage += `Message: ${message}\n\n`;
            whatsappMessage += `(Sent from the Contact Us form on your website)`;

            // URL-encode the message and construct the WhatsApp URL
            const encodedMessage = encodeURIComponent(whatsappMessage);
            const phoneNumber = '254721202052'; // The WhatsApp number
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

            // Open WhatsApp in a new tab
            window.open(whatsappUrl, '_blank');
        });
    }
});