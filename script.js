/* =========================================================
   PORTFOLIO SCRIPT
   Digunakan bersama index.html dan halaman detail project.
========================================================= */

/* =========================================================
   1. DARK / LIGHT MODE
========================================================= */
(() => {
  const root = document.documentElement;

  const themeButtons = [
    document.getElementById("theme-toggle"),
    document.getElementById("theme-toggle-mobile"),
  ].filter(Boolean);

  const themeIcons = [
    document.getElementById("theme-icon"),
    document.getElementById("theme-icon-mobile"),
  ].filter(Boolean);

  const systemPrefersDark = window.matchMedia(
    "(prefers-color-scheme: dark)",
  ).matches;

  // Prioritas: tema yang pernah dipilih > tema sistem.
  const initialTheme =
    localStorage.getItem("theme") || (systemPrefersDark ? "dark" : "light");

  function applyTheme(theme, savePreference = false) {
    const isDark = theme === "dark";

    root.classList.toggle("dark", isDark);

    if (savePreference) {
      localStorage.setItem("theme", theme);
    }

    themeIcons.forEach((icon) => {
      icon.classList.toggle("fa-sun", isDark);
      icon.classList.toggle("fa-moon", !isDark);
    });
  }

  // Terapkan tema saat halaman dibuka.
  applyTheme(initialTheme);

  // Event tombol Dark / Light Mode.
  themeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const nextTheme = root.classList.contains("dark") ? "light" : "dark";

      applyTheme(nextTheme, true);
    });
  });
})();

/* =========================================================
   2. MOBILE NAVIGATION
========================================================= */
(() => {
  const menuButton = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");

  // Jalankan hanya jika elemen tersedia.
  if (!menuButton || !mobileMenu) return;

  // Buka / tutup menu mobile.
  menuButton.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });

  // Tutup menu setelah link diklik.
  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
    });
  });
})();

/* =========================================================
   3. TYPING ANIMATION
========================================================= */
(() => {
  const typingText = document.getElementById("typing-text");

  // Hanya berjalan di halaman yang memiliki typing animation.
  if (!typingText) return;

  const roles = ["Frontend Developer", "Software Developer"];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeEffect() {
    const currentRole = roles[roleIndex];

    // Menambah atau menghapus karakter.
    charIndex += isDeleting ? -1 : 1;

    typingText.textContent = currentRole.substring(0, charIndex);

    let speed = isDeleting ? 50 : 100;

    // Ketika teks selesai diketik.
    if (!isDeleting && charIndex === currentRole.length) {
      isDeleting = true;
      speed = 1500;
    }

    // Ketika teks selesai dihapus.
    else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      speed = 300;
    }

    window.setTimeout(typeEffect, speed);
  }

  // Jalankan animasi.
  typeEffect();
})();

/* =========================================================
   4. SCROLL PROGRESS & NAVBAR
========================================================= */
(() => {
  const progressBar = document.getElementById("progressBar");
  const navbar = document.getElementById("navbar");

  // Jika elemen tidak tersedia, hentikan bagian ini.
  if (!progressBar && !navbar) return;

  function handleScroll() {
    // Scroll Progress Bar.
    if (progressBar) {
      const scrollTop = document.documentElement.scrollTop;

      const scrollHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

      progressBar.style.width = `${progress}%`;
    }

    // Navbar Shadow.
    if (navbar) {
      navbar.classList.toggle("shadow-md", window.scrollY > 50);
    }
  }

  window.addEventListener("scroll", handleScroll);

  // Jalankan pertama kali.
  handleScroll();
})();

/* =========================================================
   5. REVEAL ON SCROLL
========================================================= */
(() => {
  const revealElements = document.querySelectorAll(".reveal");

  if (!revealElements.length) return;

  // Fallback jika IntersectionObserver tidak tersedia.
  if (!("IntersectionObserver" in window)) {
    revealElements.forEach((element) => {
      element.classList.add("active");
    });

    return;
  }

  const observer = new IntersectionObserver(
    (entries, observerInstance) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("active");

        observerInstance.unobserve(entry.target);
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    },
  );

  // Amati semua elemen reveal.
  revealElements.forEach((element) => {
    observer.observe(element);
  });
})();

/* =========================================================
   6. PROJECT FILTERING
========================================================= */
(() => {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectItems = document.querySelectorAll(".project-card");

  // Filter hanya berjalan jika elemen tersedia.
  if (!filterButtons.length || !projectItems.length) return;

  const activeClasses = [
    "bg-gray-900",
    "text-white",
    "dark:bg-white",
    "dark:text-black",
    "shadow-md",
    "dark:shadow-[0_0_15px_rgba(255,255,255,0.3)]",
  ];

  const inactiveClasses = ["glass-card", "text-gray-700", "dark:text-gray-300"];

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Reset semua tombol filter.
      filterButtons.forEach((item) => {
        item.classList.remove(...activeClasses);

        item.classList.add(...inactiveClasses);
      });

      // Aktifkan tombol yang dipilih.
      button.classList.remove(...inactiveClasses);

      button.classList.add(...activeClasses);

      // Ambil kategori filter.
      const filterValue = button.getAttribute("data-filter");

      // Filter project.
      projectItems.forEach((item) => {
        const matches =
          filterValue === "all" ||
          item.getAttribute("data-category") === filterValue;

        if (matches) {
          item.style.display = "block";

          window.setTimeout(() => {
            item.style.opacity = "1";
            item.style.transform = "scale(1)";
          }, 50);
        } else {
          item.style.opacity = "0";
          item.style.transform = "scale(0.9)";

          window.setTimeout(() => {
            item.style.display = "none";
          }, 300);
        }
      });
    });
  });
})();

/* =========================================================
   7. CONTACT FORM
========================================================= */
(() => {
  const contactForm = document.getElementById("contact-form");
  const formMessage = document.getElementById("form-message");

  // Hanya berjalan jika form tersedia.
  if (!contactForm || !formMessage) return;

  // Ganti dengan endpoint Formspree milikmu.
  const formEndpoint = "YOUR_ENDPOINT_HERE";

  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const submitButton = contactForm.querySelector('button[type="submit"]');

    if (!submitButton) return;

    const originalText = submitButton.textContent;

    // Loading state.
    submitButton.textContent = "Sending...";
    submitButton.style.opacity = "0.7";
    submitButton.disabled = true;

    const successClasses = [
      "bg-green-500/10",
      "text-green-600",
      "dark:text-green-400",
      "border-green-500/50",
    ];

    const errorClasses = [
      "bg-red-500/10",
      "text-red-600",
      "dark:text-red-400",
      "border-red-500/50",
    ];

    try {
      // Periksa endpoint.
      if (!formEndpoint || formEndpoint === "YOUR_ENDPOINT_HERE") {
        throw new Error("Form endpoint belum dikonfigurasi.");
      }

      // Kirim data form.
      const response = await fetch(formEndpoint, {
        method: "POST",
        body: new FormData(contactForm),
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Problem submitting form");
      }

      // Tampilkan pesan sukses.
      formMessage.classList.remove("hidden", ...errorClasses);

      formMessage.classList.add(...successClasses);

      formMessage.textContent = "Thank you! Message sent successfully.";

      contactForm.reset();
    } catch (error) {
      console.error("Contact form error:", error);

      // Tampilkan pesan error.
      formMessage.classList.remove("hidden", ...successClasses);

      formMessage.classList.add(...errorClasses);

      formMessage.textContent = "Oops! Something went wrong.";
    } finally {
      // Kembalikan tombol ke kondisi awal.
      submitButton.textContent = originalText;
      submitButton.style.opacity = "1";
      submitButton.disabled = false;

      // Sembunyikan pesan setelah 5 detik.
      window.setTimeout(() => {
        formMessage.classList.add("hidden");
      }, 5000);
    }
  });
})();

/* =========================================================
   8. ANIMATED FAVICON
========================================================= */
(() => {
  const favicon = document.getElementById("favicon");

  // Hanya berjalan jika favicon tersedia.
  if (!favicon) return;

  const nameToSpell = "FAKHRIDHO";
  let currentFrame = 0;

  function animateFavicon() {
    // Buat canvas.
    const canvas = document.createElement("canvas");

    canvas.width = 32;
    canvas.height = 32;

    const context = canvas.getContext("2d");

    if (!context) return;

    // Background circle.
    context.fillStyle = "#3B82F6";

    context.beginPath();

    context.arc(16, 16, 16, 0, 2 * Math.PI);

    context.fill();

    // Draw letter.
    context.fillStyle = "#FFFFFF";
    context.font = "bold 20px sans-serif";
    context.textAlign = "center";
    context.textBaseline = "middle";

    context.fillText(nameToSpell[currentFrame], 16, 17);

    // Update favicon.
    favicon.href = canvas.toDataURL("image/png");

    // Pindah ke huruf berikutnya.
    currentFrame = (currentFrame + 1) % nameToSpell.length;

    // Ulangi setiap 600ms.
    window.setTimeout(animateFavicon, 600);
  }

  // Mulai animasi.
  animateFavicon();
})();

/* =========================================================
   9. PROJECT COVER FLOW CAROUSEL
========================================================= */
(() => {
  // Periksa GSAP sebelum digunakan.
  if (typeof gsap === "undefined") {
    return;
  }

  const projectCards = gsap.utils.toArray(".project-card");

  const nextButton = document.querySelector(".next");
  const prevButton = document.querySelector(".prev");

  const projectSection = document.getElementById("projects");

  // Carousel hanya berjalan jika elemen tersedia.
  if (!projectCards.length || !nextButton || !prevButton || !projectSection) {
    return;
  }

  // Register ScrollTrigger jika tersedia.
  if (typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
  }

  const totalProjects = projectCards.length;

  let currentProject = 0;
  let isAnimating = false;

  // Mengatur posisi carousel.
  function updateCarousel() {
    projectCards.forEach((card, index) => {
      // Posisi relatif terhadap project aktif.
      let position = index - currentProject;

      // Circular / infinite carousel.
      if (position > totalProjects / 2) {
        position -= totalProjects;
      }

      if (position < -totalProjects / 2) {
        position += totalProjects;
      }

      const isCenter = position === 0;

      // Posisi horizontal.
      const xPosition = position * 330;

      // Ukuran card.
      const scale = isCenter ? 1 : 0.72;

      // Transparansi.
      const opacity = isCenter ? 1 : 0.45;

      // Rotasi card.
      const rotationY = position * -25;

      // Animasi GSAP.
      gsap.to(card, {
        x: xPosition,
        scale: scale,
        opacity: opacity,
        rotationY: rotationY,

        zIndex: isCenter ? 10 : 5,

        duration: 0.8,
        ease: "power3.inOut",

        onComplete: () => {
          isAnimating = false;
        },
      });
    });
  }

  // Project berikutnya.
  function nextProject() {
    if (isAnimating) return;

    isAnimating = true;

    currentProject = (currentProject + 1) % totalProjects;

    updateCarousel();
  }

  // Project sebelumnya.
  function previousProject() {
    if (isAnimating) return;

    isAnimating = true;

    currentProject = (currentProject - 1 + totalProjects) % totalProjects;

    updateCarousel();
  }

  // Event tombol.
  nextButton.addEventListener("click", nextProject);
  prevButton.addEventListener("click", previousProject);

  // Posisi awal card.
  gsap.set(projectCards, {
    position: "absolute",
    top: "50%",
    left: "50%",
    xPercent: -50,
    yPercent: -50,
    transformPerspective: 1000,
    transformOrigin: "center center",
  });

  // Inisialisasi carousel.
  updateCarousel();

  // ScrollTrigger.
  if (typeof ScrollTrigger !== "undefined") {
    ScrollTrigger.create({
      trigger: projectSection,
      start: "top 80%",
      onEnter: updateCarousel,
    });
  }
})();

const contactForm = document.getElementById("contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const formData = new FormData(contactForm);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        alert("Message sent successfully!");
        contactForm.reset();
      } else {
        alert("Failed to send message. Please try again.");
      }
    } catch (error) {
      alert("Something went wrong. Please try again.");
    }
  });
}
