$(function () {



  // Initialize fresh carousel with working settings
  $('.reviews-carousel').owlCarousel({
    loop: true,
    margin: 20,
    nav: false,
    dots: false,
    rtl: true,
    responsive: {
      0: {
        items: 1,
        center: true,
        margin: 0,
        stagePadding: 0
      },
      640: {
        items: 2,
        center: false,
        margin: 20,
        stagePadding: 0
      },
      1024: {
        items: 3,
        center: false,
        margin: 20
      }
    },
    autoplay: true,
    autoplayTimeout: 4000,
    autoplayHoverPause: true,
    smartSpeed: 800
  });



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
        if (rect.top < window.innerHeight * 0.88) {
          $(el).removeClass('opacity-0 translate-y-6').addClass('opacity-100 translate-y-0');
          window.removeEventListener('scroll', revealOnScroll);
        }
      };
      window.addEventListener('scroll', revealOnScroll);
      revealOnScroll();
    }
  });

  // Initialize AOS (Animate On Scroll) - DELAYED to avoid carousel conflicts
  AOS.init({
    duration: 800,
    easing: 'ease-out-cubic',
    once: true,
    offset: 100,
    // Disable AOS on carousel items to prevent conflicts
    disable: '.reviews-carousel, .reviews-carousel *'
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

  const $howPlay = $('#how-play');
  const $howVideo = $('#how-video');
  const $howPlaceholder = $('#how-placeholder');
  if ($howPlay.length && $howVideo.length && $howPlaceholder.length) {
    $howPlay.on('click', function () {
      const $icon = $howPlay.find('i');
      const videoEl = $howVideo.get(0);
      if ($icon.hasClass('fa-play')) {
        $icon.removeClass('fa-play').addClass('fa-pause');
        $howPlaceholder.addClass('hidden');
        $howVideo.removeClass('hidden');
        try { videoEl.play(); } catch (e) { }
      } else {
        $icon.removeClass('fa-pause').addClass('fa-play');
        try { videoEl.pause(); } catch (e) { }
        $howVideo.addClass('hidden');
        $howPlaceholder.removeClass('hidden');
      }
    });
    $howVideo.on('ended', function () {
      $howPlay.find('i').removeClass('fa-pause').addClass('fa-play');
      $howVideo.addClass('hidden');
      $howPlaceholder.removeClass('hidden');
    });
  }

  console.log('🚗 TooT Driver app initialized successfully!');
});