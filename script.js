
// Navbar Functionality
function initNavbar() {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");
  const navbar = document.querySelector(".navbar");
  const navItems = document.querySelectorAll(".nav-item");

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
    document.body.style.overflow = navMenu.classList.contains("active")
      ? "hidden"
      : "";
  });

  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
      document.body.style.overflow = "";
    });
  });

  // Navbar scroll effect
  const handleScroll = () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  };

  window.addEventListener("scroll", handleScroll);
}

// Locomotive Scroll + GSAP ScrollTrigger integration
function initSmoothScroll() {
  const scrollContainer = document.querySelector('.main');
  if (!scrollContainer) return;

  const locoScroll = new LocomotiveScroll({
    el: scrollContainer,
    smooth: true,
    lerp: 0.08,
    multiplier: 1.1,
    getDirection: true
  });

  locoScroll.on('scroll', ScrollTrigger.update);

  ScrollTrigger.scrollerProxy(scrollContainer, {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight
      };
    },
    pinType: scrollContainer.style.transform ? "transform" : "fixed"
  });

  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
  ScrollTrigger.refresh();
}

// GSAP Section Animations
function animateSections() {
  // Hero
  gsap.from(".hero-title", {
    opacity: 0,
    y: 80,
    duration: 1.2,
    ease: "power3.out",
    scrollTrigger: {
      trigger: "#section-hero",
      scroller: ".main",
      start: "top 60%"
    }
  });
  gsap.from(".hero-subtitle", {
    opacity: 0,
    y: 60,
    duration: 1,
    delay: 0.2,
    ease: "power3.out",
    scrollTrigger: {
      trigger: "#section-hero",
      scroller: ".main",
      start: "top 60%"
    }
  });

  // About
  gsap.utils.toArray('.about-section .glassy-card').forEach((el, i) => {
    gsap.from(el, {
      opacity: 0,
      y: 80,
      duration: 1,
      delay: i * 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        scroller: ".main",
        start: "top 80%"
      }
    });
  });

  // Features
  gsap.utils.toArray('.features-section .feature-card').forEach((el, i) => {
    gsap.from(el, {
      opacity: 0,
      y: 80,
      duration: 1,
      delay: i * 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        scroller: ".main",
        start: "top 85%"
      }
    });
  });

  // Use Cases
  gsap.utils.toArray('.usecases-section .usecase-card').forEach((el, i) => {
    gsap.from(el, {
      opacity: 0,
      y: 80,
      duration: 1,
      delay: i * 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        scroller: ".main",
        start: "top 85%"
      }
    });
  });

  // Testimonials
  gsap.utils.toArray('.testimonials-section .testimonial-card').forEach((el, i) => {
    gsap.from(el, {
      opacity: 0,
      y: 80,
      duration: 1,
      delay: i * 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        scroller: ".main",
        start: "top 85%"
      }
    });
  });

  // CTA
  gsap.from('.cta-section', {
    opacity: 0,
    y: 100,
    duration: 1.2,
    ease: "power3.out",
    scrollTrigger: {
      trigger: '.cta-section',
      scroller: ".main",
      start: "top 90%"
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initSmoothScroll();
  animateSections();
});

function canvas() {
  const frames = {
    currentIndex: 0,
    maxIndex: 300,
  };

  var imagesLoaded = 0;
  const images = [];

  const canvas = document.querySelector("canvas");
  const context = canvas.getContext("2d");

  function preloadImages() {
    for (var i = 1; i <= frames.maxIndex; i++) {
      const imageURL = `./frames/male${i.toString().padStart(4, "0")}.png`;
      const img = new Image();
      img.src = imageURL;

      img.onload = () => {
        imagesLoaded++;
        if (imagesLoaded === frames.maxIndex) {
          loadImage(frames.currentIndex);
          animate();
        }
      };

      images.push(img);
    }
  }

  function loadImage(index) {
    if (index >= 0 && index < frames.maxIndex) {
      const img = images[index];
      const canvas = document.querySelector("canvas");
      const context = canvas.getContext("2d");

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const scaleX = canvas.width / img.width;
      const scaleY = canvas.height / img.height;
      const scale = Math.max(scaleX, scaleY);

      const newWidth = img.width * scale;
      const newHeight = img.height * scale;

      const offsetX = (canvas.width - newWidth) / 2;
      const offsetY = (canvas.height - newHeight) / 2;

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = "high";
      context.drawImage(img, offsetX, offsetY, newWidth, newHeight);

      frames.currentIndex = index;
    }
  }

  function animate() {
    // Fade in hero content
    gsap.to('.hero-title', {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power2.out'
    });
    
    gsap.to('.hero-subtitle', {
      opacity: 1,
      y: 0,
      duration: 1,
      delay: 0.3,
      ease: 'power2.out'
    });

    // Main scroll animation
    var tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".main",
        start: "top top",
        end: "bottom bottom",
        scrub: 2,
      },
    });

    tl.to(frames, {
      currentIndex: frames.maxIndex,
      onUpdate: () => {
        loadImage(Math.floor(frames.currentIndex));
      },
    });
  }

  preloadImages();

  window.addEventListener("resize", () => {
    loadImage(frames.currentIndex);
  });
}

canvas();

// Initialize Lenis
// Initialize Lenis
const lenis = new Lenis({
  autoRaf: true,
  duration: 2.5,
  lerp: 0.2,
  smoothWheel: true,
});

// Listen for the scroll event and log the event data

// Use requestAnimationFrame to continuously update the scroll
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);


gsap.to(".page2 .left h1", {
  opacity: 1,
  duration: 1.2,
  scrollTrigger: {
    trigger: ".left",
    start: "top 75%",
    end: "top 20%",
    scrub: 2,

  },
});
gsap.to(".page2 .left h4", {
  opacity: 1,
  duration: 1.2,
  delay: 0.5,
  scrollTrigger: {
    trigger: ".left",
    start: "top 75%",
    end: "top 20%",
    scrub: 2,
    delay: 0.3,

  },
});

gsap.to(".page2 .right h1", {
  opacity: 1,
  duration: 1.2,
  scrollTrigger: {
    trigger: ".left",
    start: "top 75%",
    end: "top 20%",
    scrub: 2,

  },
});
gsap.to(".page2 .right h4", {
  opacity: 1,
  duration: 1.2,
  delay: 0.5,
  scrollTrigger: {
    trigger: ".left",
    start: "top 75%",
    end: "top 20%",
    scrub: 2,
    delay: 0.3,

  },
});
gsap.from(".page2 .left", {
  opacity: 1,
  duration: 0.7,
  x: `-100%`,
  scrollTrigger: {
    trigger: ".left",
    start: "top 73%",
    end: "top 20%",
    scrub: 2,
    delay: 0.3,

  },
});

gsap.from(".page2 .right", {
  opacity: 1,
  duration: 0.7,
  x: `100%`,
  scrollTrigger: {
    trigger: ".right",
    start: "top 60%",
    end: "top 20%",
    scrub: 2,
  },
});
