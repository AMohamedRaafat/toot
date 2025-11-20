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

  // Header scroll effect
  let lastScroll = 0;
  $(window).on('scroll', function () {
    const currentScroll = $(this).scrollTop();
    const $header = $('header');
    if (currentScroll > 100) {
      $header.addClass('shadow-md');
    } else {
      $header.removeClass('shadow-md');
    }
    lastScroll = currentScroll;
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

  console.log('🚗 TooT Driver app initialized successfully!');

  // Initialize Owl Carousel for reviews - FIXED VERSION
  $(document).ready(function () {
    console.log("🔄 Initializing Owl Carousel...");

    // Destroy existing carousel if any
    if ($('.reviews-carousel').hasClass('owl-loaded')) {
      $('.reviews-carousel').owlCarousel('destroy');
      console.log("🗑️ Destroyed existing carousel");
    }

    // Initialize fresh carousel with FIXED settings
    $('.reviews-carousel').owlCarousel({
      loop: true,
      margin: 0,
      nav: false,
      dots: false,
      rtl: true,
      items: 3, // Default to 3 items
      responsive: {
        0: { items: 1, center: true, },
        640: { items: 2, center: true, },
        1025: { items: 3, center: true, }
      },
      center: false,
      autoplay: true,
      autoplayTimeout: 4000,
      autoplayHoverPause: true,
      smartSpeed: 800,
      mouseDrag: true,
      touchDrag: true,
      pullDrag: true,
      freeDrag: true,
      slideBy: 1,
      rewind: true,
      rewindSpeed: 800,
      onInitialized: function () {
        console.log("✅ Owl Carousel initialized successfully!");

        // Force proper row layout after initialization
        setTimeout(function () {
          // Force the stage to be a flex container
          $('.reviews-carousel .owl-stage').css({
            'display': 'flex !important',
            'flex-direction': 'row !important',
            'flex-wrap': 'nowrap !important',
            'width': '100% !important'
          });

          // Force each item to be flex items in a row
          $('.reviews-carousel .owl-item').css({
            'display': 'flex !important',
            'flex': '0 0 auto !important',
            'flex-direction': 'column !important',
            'opacity': '1',
            'visibility': 'visible',
            'width': 'auto !important'
          });

          // Force items to display inline
          $('.reviews-carousel .item').css({
            'display': 'block !important',
            'width': '100% !important'
          });

          console.log("🔧 Forced row layout applied!");
        }, 100);


        // Force correct number of items based on screen size
        const screenWidth = $(window).width();
        if (screenWidth > 1024) {
          this.options.items = 3;
        } else if (screenWidth > 640) {
          this.options.items = 2;
        } else {
          this.options.items = 1;
        }

        // Refresh to apply changes
        this.refresh();
      },
    });

    // Handle window resize to ensure proper responsive behavior
    $(window).on('resize', function () {
      if ($('.reviews-carousel').hasClass('owl-loaded')) {
        $('.reviews-carousel').owlCarousel('refresh');
      }
    });
  });
});