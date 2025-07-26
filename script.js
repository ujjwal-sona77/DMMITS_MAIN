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

initNavbar();

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


gsap.to(".page2_1st", {
    scrollTrigger: {
        trigger: ".page2",
        start: "top 75%",
        end: "bottom 10%",
        scrub: 1,
        markers: true,
    },
    opacity: 1,
    duration: 1,
})
