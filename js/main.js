/**
 * FitLife Coach - Main JavaScript File 2025
 * Handles animations, interactions, and responsive behavior
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false,
        disable: 'mobile'
    });

    // Initialize Swiper for testimonials
    const testimonialSwiper = new Swiper('.testimonialSwiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
                spaceBetween: 30,
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 30,
            },
        }
    });

    // Navbar color change on scroll
    const mainNav = document.getElementById('mainNav');

    function navbarScroll() {
        if (window.scrollY > 50) {
            mainNav.classList.add('navbar-scrolled');
        } else {
            mainNav.classList.remove('navbar-scrolled');
        }
    }

    // Initial check in case page is refreshed while scrolled down
    navbarScroll();

    // Add scroll event listener
    window.addEventListener('scroll', navbarScroll);

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#') return;

            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const navHeight = mainNav.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;

                window.scrollTo({
                    top: targetPosition - navHeight,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Dynamic text animation for hero section
    const dynamicTextAnimation = () => {
        const dynamicTexts = document.querySelectorAll('.dynamic-text');
        if (!dynamicTexts.length) return;

        let currentIndex = 0;

        setInterval(() => {
            // Hide current text
            dynamicTexts[currentIndex].style.opacity = '0';

            // Update index
            currentIndex = (currentIndex + 1) % dynamicTexts.length;

            // Show next text after a short delay
            setTimeout(() => {
                // Hide all texts
                dynamicTexts.forEach(text => {
                    text.style.display = 'none';
                    text.style.opacity = '0';
                });

                // Show current text
                dynamicTexts[currentIndex].style.display = 'block';

                // Trigger fade in animation
                setTimeout(() => {
                    dynamicTexts[currentIndex].style.opacity = '1';
                }, 50);
            }, 500);
        }, 3000);
    };

    dynamicTextAnimation();

    // Back to top button functionality
    const backToTopButton = document.querySelector('.back-to-top');

    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('active');
            } else {
                backToTopButton.classList.remove('active');
            }
        });

        backToTopButton.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Mobile menu toggle behavior
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');

    if (navbarToggler && navbarCollapse) {
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            const isNavbarToggler = navbarToggler.contains(e.target);
            const isNavbarCollapse = navbarCollapse.contains(e.target);

            if (!isNavbarToggler && !isNavbarCollapse && navbarCollapse.classList.contains('show')) {
                navbarToggler.click();
            }
        });

        // Close mobile menu when clicking on a nav link
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (navbarCollapse.classList.contains('show')) {
                    navbarToggler.click();
                }
            });
        });
    }

    // Service card hover effect for touch devices
    const serviceCards = document.querySelectorAll('.service-card, .service-card-3d');

    if ('ontouchstart' in window || navigator.maxTouchPoints) {
        serviceCards.forEach(card => {
            card.addEventListener('click', function() {
                const cardInner = this.querySelector('.service-card-inner');

                if (cardInner) {
                    // Toggle the flip
                    if (cardInner.style.transform === 'rotateY(180deg)') {
                        cardInner.style.transform = 'rotateY(0deg)';
                    } else {
                        cardInner.style.transform = 'rotateY(180deg)';
                    }
                }
            });
        });
    }

    // Animated counter for stats
    const animateCounter = (element, target) => {
        let current = 0;
        const increment = target / 100;
        const duration = 2000; // 2 seconds
        const interval = duration / 100;

        const timer = setInterval(() => {
            current += increment;

            if (current >= target) {
                element.textContent = target.toLocaleString();
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current).toLocaleString();
            }
        }, interval);
    };

    // Intersection Observer for stats animation
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = entry.target.querySelectorAll('.stat-number, .achievement-number, .counter');

                statNumbers.forEach(stat => {
                    const target = parseInt(stat.textContent.replace(/,/g, ''), 10);
                    stat.textContent = '0';
                    animateCounter(stat, target);
                });

                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.about-stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    // Also observe achievement cards for counter animation
    const achievementSection = document.querySelector('.achievements-section');
    if (achievementSection) {
        statsObserver.observe(achievementSection);
    }

    // Observe testimonial stats section for counter animation
    const testimonialStatsSection = document.querySelector('.testimonial-stats');
    if (testimonialStatsSection) {
        statsObserver.observe(testimonialStatsSection);
    }

    // Parallax effect for hero image on mouse move
    const heroSection = document.querySelector('.hero-section');

    if (heroSection && window.innerWidth > 992) {
        heroSection.addEventListener('mousemove', (e) => {
            const heroImage = document.querySelector('.hero-image');
            if (!heroImage) return;

            const x = (window.innerWidth - e.pageX * 2) / 100;
            const y = (window.innerHeight - e.pageY * 2) / 100;

            heroImage.style.transform = `translateX(${x}px) translateY(${y}px)`;
        });
    }

    // Animated hover effect for social media links in footer
    const socialLinks = document.querySelectorAll('.social-link');

    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) rotate(10deg)';
        });

        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotate(0)';
        });
    });

    // Preloader
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        // Hide preloader when page is loaded
        window.addEventListener('load', () => {
            preloader.classList.add('preloader-hidden');

            setTimeout(() => {
                preloader.style.display = 'none';
            }, 1000);
        });

        // Also hide preloader if it's still visible after 3 seconds (fallback)
        setTimeout(() => {
            if (preloader && !preloader.classList.contains('preloader-hidden')) {
                preloader.classList.add('preloader-hidden');
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 1000);
            }
        }, 3000);
    }

    // Add active class to current nav item based on URL
    const currentLocation = window.location.pathname;
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');

        if (currentLocation.includes(linkPath) && linkPath !== 'index.html') {
            link.classList.add('active');
        } else if (currentLocation.endsWith('/') && linkPath === 'index.html') {
            link.classList.add('active');
        }
    });

    // Reveal animations for sections
    const revealSection = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-revealed');
                observer.unobserve(entry.target);
            }
        });
    };

    const sectionObserver = new IntersectionObserver(revealSection, {
        root: null,
        threshold: 0.15
    });

    document.querySelectorAll('section').forEach(section => {
        section.classList.add('section-hidden');
        sectionObserver.observe(section);
    });

    // Testimonial filtering
    const filterButtons = document.querySelectorAll('.btn-filter');
    const reviewItems = document.querySelectorAll('.review-item');

    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));

                // Add active class to clicked button
                this.classList.add('active');

                // Get filter value
                const filterValue = this.getAttribute('data-filter');

                // Filter items
                reviewItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

    // Load more reviews button
    const loadMoreBtn = document.getElementById('loadMoreReviews');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            // This would typically load more reviews from the server
            // For demo purposes, we'll just show a message
            this.innerHTML = 'No More Reviews';
            this.disabled = true;
            setTimeout(() => {
                this.innerHTML = 'Load More Reviews';
                this.disabled = false;
            }, 2000);
        });
    }

    // Rating selection in review form
    const ratingStars = document.querySelectorAll('.rating-select i');
    const ratingInput = document.getElementById('reviewRating');

    if (ratingStars.length > 0) {
        ratingStars.forEach(star => {
            star.addEventListener('click', function() {
                const rating = this.getAttribute('data-rating');
                ratingInput.value = rating;

                // Update star display
                ratingStars.forEach(s => {
                    const sRating = s.getAttribute('data-rating');
                    if (sRating <= rating) {
                        s.classList.remove('far');
                        s.classList.add('fas');
                        s.classList.add('active');
                    } else {
                        s.classList.remove('fas');
                        s.classList.add('far');
                        s.classList.remove('active');
                    }
                });
            });

            // Hover effect
            star.addEventListener('mouseenter', function() {
                const rating = this.getAttribute('data-rating');

                ratingStars.forEach(s => {
                    const sRating = s.getAttribute('data-rating');
                    if (sRating <= rating) {
                        s.classList.remove('far');
                        s.classList.add('fas');
                    }
                });
            });

            star.addEventListener('mouseleave', function() {
                const currentRating = ratingInput.value;

                ratingStars.forEach(s => {
                    const sRating = s.getAttribute('data-rating');
                    if (sRating <= currentRating) {
                        s.classList.remove('far');
                        s.classList.add('fas');
                    } else {
                        s.classList.remove('fas');
                        s.classList.add('far');
                    }
                });
            });
        });
    }

    // Handle review form submission
    const reviewForm = document.getElementById('reviewForm');
    if (reviewForm) {
        reviewForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // This would typically submit the form to the server
            // For demo purposes, we'll just show a success message
            const modal = bootstrap.Modal.getInstance(document.getElementById('reviewModal'));
            modal.hide();

            // Show success message (in a real implementation)
            alert('Thank you for your review! It will be published after moderation.');

            // Reset form
            this.reset();
            ratingStars.forEach(s => {
                s.classList.remove('fas', 'active');
                s.classList.add('far');
            });
            ratingInput.value = '0';
        });
    }

    // Pricing toggle functionality
    const pricingToggle = document.getElementById('pricingToggle');
    const monthlyPrices = document.querySelectorAll('.monthly-price');
    const annualPrices = document.querySelectorAll('.annual-price');
    const monthlyText = document.querySelector('.pricing-toggle-text:first-child');
    const annualText = document.querySelector('.pricing-toggle-text:last-of-type');

    if (pricingToggle) {
        pricingToggle.addEventListener('change', function() {
            if (this.checked) {
                // Show annual prices
                monthlyPrices.forEach(price => {
                    price.style.display = 'none';
                });
                annualPrices.forEach(price => {
                    price.style.display = 'inline-block';
                });

                // Update toggle text styles
                monthlyText.classList.remove('active');
                annualText.classList.add('active');
            } else {
                // Show monthly prices
                monthlyPrices.forEach(price => {
                    price.style.display = 'inline-block';
                });
                annualPrices.forEach(price => {
                    price.style.display = 'none';
                });

                // Update toggle text styles
                monthlyText.classList.add('active');
                annualText.classList.remove('active');
            }
        });

        // Set initial state
        monthlyText.classList.add('active');
        monthlyPrices.forEach(price => {
            price.style.display = 'inline-block';
        });
        annualPrices.forEach(price => {
            price.style.display = 'none';
        });
    }

    // Add animation delay to pricing cards for staggered effect
    const pricingCards = document.querySelectorAll('.pricing-card');
    pricingCards.forEach((card, index) => {
        if (!card.classList.contains('featured')) {
            card.style.animationDelay = `${index * 0.2}s`;
        }
    });

    // Booking page functionality
    // Service selection
    const serviceButtons = document.querySelectorAll('.service-select-btn');
    let selectedService = '';

    if (serviceButtons.length > 0) {
        serviceButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove selected class from all buttons
                serviceButtons.forEach(btn => {
                    btn.classList.remove('selected');
                    btn.textContent = 'Select';
                });

                // Add selected class to clicked button
                this.classList.add('selected');
                this.textContent = 'Selected';

                // Store selected service
                selectedService = this.getAttribute('data-service');

                // Scroll to calendar section
                document.getElementById('calendarSection').scrollIntoView({
                    behavior: 'smooth'
                });

                // Show calendar with animation
                setTimeout(() => {
                    const calendarContainer = document.querySelector('.calendar-container');
                    if (calendarContainer) {
                        calendarContainer.classList.add('visible');
                    }
                }, 500);
            });
        });
    }

    // Calendar date selection
    const calendarDays = document.querySelectorAll('.calendar-days > div');
    let selectedDate = '';

    if (calendarDays.length > 0) {
        calendarDays.forEach(day => {
            if (!day.classList.contains('prev-month') && !day.classList.contains('next-month')) {
                day.addEventListener('click', function() {
                    // Remove selected class from all days
                    calendarDays.forEach(d => d.classList.remove('selected'));

                    // Add selected class to clicked day
                    this.classList.add('selected');

                    // Store selected date
                    selectedDate = `June ${this.textContent}, 2025`;

                    // Update time slots heading
                    const timeSlotsHeading = document.querySelector('.time-slots h5');
                    if (timeSlotsHeading) {
                        timeSlotsHeading.textContent = `Available Times for June ${this.textContent}, 2025`;
                    }
                });
            }
        });
    }

    // Time slot selection
    const timeSlots = document.querySelectorAll('.time-slot');
    let selectedTime = '';

    if (timeSlots.length > 0) {
        timeSlots.forEach(slot => {
            slot.addEventListener('click', function() {
                // Remove selected class from all time slots
                timeSlots.forEach(s => s.classList.remove('selected'));

                // Add selected class to clicked time slot
                this.classList.add('selected');

                // Store selected time
                selectedTime = this.textContent;
            });
        });
    }

    // Book session button
    const bookSessionBtn = document.getElementById('bookSessionBtn');

    if (bookSessionBtn) {
        bookSessionBtn.addEventListener('click', function() {
            // In a real implementation, we would validate that a service, date, and time are selected
            // For demo purposes, we'll just show the success modal

            // Update booking details in the modal
            document.getElementById('bookingService').textContent = getServiceName(selectedService);
            document.getElementById('bookingDate').textContent = selectedDate || 'June 15, 2025';
            document.getElementById('bookingTime').textContent = selectedTime || '10:00 AM';

            // Show the success modal
            const successModal = new bootstrap.Modal(document.getElementById('bookingSuccessModal'));
            successModal.show();
        });
    }

    // Helper function to get service name from service code
    function getServiceName(serviceCode) {
        switch(serviceCode) {
            case 'consultation':
                return 'Initial Consultation';
            case 'training':
                return 'Personal Training';
            case 'nutrition':
                return 'Nutrition Coaching';
            default:
                return 'Personal Training';
        }
    }

    // Intersection Observer for calendar section
    const calendarObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    const calendarContainer = entry.target.querySelector('.calendar-container');
                    if (calendarContainer) {
                        calendarContainer.classList.add('visible');
                    }
                }, 300);
                calendarObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    const calendarSection = document.querySelector('.calendar-section');
    if (calendarSection) {
        calendarObserver.observe(calendarSection);
    }

    // Contact Form Animation
    const contactFormObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    const formContainer = entry.target.querySelector('.contact-form-container');
                    if (formContainer) {
                        formContainer.classList.add('visible');
                    }
                }, 300);
                contactFormObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    const contactSection = document.querySelector('.contact-section');
    if (contactSection) {
        contactFormObserver.observe(contactSection);
    }

    // Form input animation
    const formInputs = document.querySelectorAll('.form-control');
    if (formInputs.length > 0) {
        formInputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('input-focused');
            });

            input.addEventListener('blur', function() {
                this.parentElement.classList.remove('input-focused');
            });
        });
    }
});