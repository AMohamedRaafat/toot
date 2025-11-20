$(function () {
  // Scroll reveal animation for all data-reveal elements
  const $targets = $('[data-reveal]');
  $targets.each(function () {
    const el = this;
    $(el).addClass('opacity-0 translate-y-6');
    if ('IntersectionObserver' in window) {
      const obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            $(el).removeClass('opacity-0 translate-y-6').addClass('opacity-100 translate-y-0');
            obs.unobserve(el);
          }
        });
      }, { threshold: 0.12 });
      obs.observe(el);
    } else {
      // Fallback for older browsers
      const revealOnScroll = () => {
        const rect = el.getBoundingClientRect();
        const v = window.innerHeight || document.documentElement.clientHeight;
        if (rect.top <= v * 0.88) {
          $(el).removeClass('opacity-0 translate-y-6').addClass('opacity-100 translate-y-0');
          $(window).off('scroll', revealOnScroll);
        }
      };
      $(window).on('scroll', revealOnScroll);
      revealOnScroll();
    }
  });

  // FAQ Dynamic Column Distribution
  function distributeFAQItems() {
    const $container = $('#faq-container');
    const $items = $container.find('.faq-item');
    const totalItems = $items.length;
    const itemsPerColumn = Math.ceil(totalItems / 2);

    // Clear existing columns
    $container.find('.faq-column').remove();

    // Create two columns
    const $leftColumn = $('<div class="faq-column flex-1 space-y-4"></div>');
    const $rightColumn = $('<div class="faq-column flex-1 space-y-4"></div>');

    // Distribute items
    $items.each(function (index) {
      if (index < itemsPerColumn) {
        $leftColumn.append($(this));
      } else {
        $rightColumn.append($(this));
      }
    });

    // Add columns to container
    $container.append($leftColumn, $rightColumn);
  }

  // Initial distribution
  distributeFAQItems();

  // Initialize AOS (Animate On Scroll) - restore original functionality
  AOS.init({
    duration: 800,
    easing: 'ease-out-cubic',
    once: true,
    offset: 100
  });

  // FAQ accordion
  $('.faq-toggle').on('click', function () {
    const $toggle = $(this);
    const $content = $toggle.next('.faq-content');
    const $icon = $toggle.find('i');
    const $parentColumn = $toggle.closest('.faq-column');

    // Close only other items in the same column
    $parentColumn.find('.faq-toggle').not($toggle).removeClass('active').find('i').removeClass('fa-minus').addClass('fa-plus');
    $parentColumn.find('.faq-content').not($content).slideUp(200);

    // Toggle current item
    $toggle.toggleClass('active');

    // Dynamic icon toggle - check current state and flip it
    if ($icon.hasClass('fa-plus')) {
      $icon.removeClass('fa-plus').addClass('fa-minus');
    } else {
      $icon.removeClass('fa-minus').addClass('fa-plus');
    }
    $content.slideToggle(200);
  });

  // Smooth scroll for anchor links
  $('a[href^="#"]').on('click', function (e) {
    e.preventDefault();
    const target = this.getAttribute('href');
    if (target === '#') return;
    const $target = $(target);
    if ($target.length) {
      $('html, body').animate({ scrollTop: $target.offset().top - 80 }, 600);
    }
  });


  // Mobile Drawer Menu
  const $drawer = $('#mobile-drawer');
  const $backdrop = $('#drawer-backdrop');
  const $mobileMenuBtn = $('#mobile-menu-btn');
  const $closeDrawer = $('#close-drawer');

  // Open drawer
  $mobileMenuBtn.on('click', function () {
    $drawer.removeClass('translate-x-full').addClass('translate-x-0');
    $('body').addClass('drawer-open'); // Prevent body scroll
  });

  // Close drawer
  function closeDrawer() {
    $drawer.removeClass('translate-x-0').addClass('translate-x-full');
    $('body').removeClass('drawer-open'); // Restore body scroll
  }

  $closeDrawer.on('click', closeDrawer);
  $backdrop.on('click', closeDrawer);

  // Close drawer when clicking on drawer links
  $('#mobile-drawer a').on('click', function () {
    closeDrawer();
  });

  // Close drawer with ESC key
  $(document).on('keydown', function (e) {
    if (e.key === 'Escape' && !$drawer.hasClass('translate-x-full')) {
      closeDrawer();
    }
  });

  // Prevent drawer content click from closing
  $('#mobile-drawer > div').on('click', function (e) {
    e.stopPropagation();
  });

  // Smooth scroll for drawer links
  $('#mobile-drawer a[href^="#"]').on('click', function (e) {
    e.preventDefault();
    const target = this.getAttribute('href');
    if (target === '#') return;
    const $target = $(target);
    if ($target.length) {
      $('html, body').animate({ scrollTop: $target.offset().top - 80 }, 600);
    }
  });

  // Owl Carousel for Reviews Section
  $('.reviews-carousel').owlCarousel({
    loop: true,
    margin: 20,
    nav: false, // Hide navigation arrows
    dots: false, // Hide dots
    rtl: true, // RTL support for Arabic
    responsive: {
      0: {
        items: 1,
        center: true,
      },
      640: {
        items: 2,
        center: false,
        stagePadding: 0
      },
      1024: {
        items: 3.5,
        center: true,
      }
    },
    center: true,
    autoplay: true,
    autoplayTimeout: 4000,
    autoplayHoverPause: true,
    smartSpeed: 800
  });
});