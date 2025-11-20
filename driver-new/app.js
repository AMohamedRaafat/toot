// Driver Page JavaScript
$(document).ready(function () {
    // Initialize AOS animations
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 100
    });

    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const backdrop = document.getElementById('mobile-menu-backdrop');
    const body = document.body;

    function openMobileMenu() {
        mobileMenu.classList.add('translate-x-0');
        mobileMenu.classList.remove('translate-x-full');
        backdrop.classList.remove('hidden');
        backdrop.classList.add('block');
        body.style.overflow = 'hidden';
    }

    function closeMobileMenu() {
        mobileMenu.classList.add('translate-x-full');
        mobileMenu.classList.remove('translate-x-0');
        backdrop.classList.add('hidden');
        backdrop.classList.remove('block');
        body.style.overflow = '';
    }

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', openMobileMenu);
    }

    if (backdrop) {
        backdrop.addEventListener('click', closeMobileMenu);
    }

    // Close mobile menu when clicking on links
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // Close mobile menu with ESC key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            closeMobileMenu();
        }
    });

    // Owl Carousel for testimonials
    $('.owl-carousel').owlCarousel({
        loop: true,
        margin: 24,
        nav: false,
        dots: false,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        responsive: {
            0: {
                items: 1
            },
            640: {
                items: 2
            },
            1024: {
                items: 3
            },
            1280: {
                items: 3.5
            }
        }
    });

    // FAQ Accordion functionality
    $('.faq-item').click(function () {
        const $this = $(this);
        const $content = $this.find('.faq-content');
        const $icon = $this.find('.faq-icon');

        // Close all other FAQ items
        $('.faq-item').not($this).removeClass('active').find('.faq-content').slideUp(300);
        $('.faq-item').not($this).find('.faq-icon').removeClass('fa-minus').addClass('fa-plus');

        // Toggle current item
        if ($this.hasClass('active')) {
            $this.removeClass('active');
            $content.slideUp(300);
            $icon.removeClass('fa-minus').addClass('fa-plus');
        } else {
            $this.addClass('active');
            $content.slideDown(300);
            $icon.removeClass('fa-plus').addClass('fa-minus');
        }
    });

    // Smooth scrolling for anchor links
    $('a[href^="#"]').click(function (e) {
        e.preventDefault();
        const target = $(this.getAttribute('href'));
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top - 80
            }, 800);
        }
    });

    // Add scroll reveal animation for elements without AOS
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements with data-reveal attribute
    document.querySelectorAll('[data-reveal]').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});