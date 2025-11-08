document.addEventListener("DOMContentLoaded", () => {
  
  // --- Mobile Menu Toggle ---
  const mobileMenu = document.getElementById("mobile-menu");
  const navLinks = document.getElementById("nav-links");

  if (mobileMenu) {
    mobileMenu.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      mobileMenu.classList.toggle("open");
    });
    
    // Close mobile menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenu.classList.remove('open');
      });
    });
  }

  // --- Back to Top Button ---
  const backToTop = document.getElementById("backToTop");

  if (backToTop) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        backToTop.style.display = "block";
      } else {
        backToTop.style.display = "none";
      }
    });

    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // --- Advanced Scroll Fade-in (IntersectionObserver) ---
  const faders = document.querySelectorAll(".fade-in");
  
  const appearOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const appearOnScroll = new IntersectionObserver(function(
    entries,
    observer
  ) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        return;
      } else {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  appearOptions);

  faders.forEach(fader => {
    appearOnScroll.observe(fader);
  });

  // --- Project Filtering ---
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  if (filterButtons.length > 0 && projectCards.length > 0) {
    filterButtons.forEach(button => {
      button.addEventListener("click", () => {
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        const filter = button.dataset.filter;

        // Filter cards
        projectCards.forEach(card => {
          const tech = card.dataset.tech;
          
          if (filter === "all" || tech.includes(filter)) {
            card.style.display = "block";
          } else {
            card.style.display = "none";
          }
        });
      });
    });
  }
  
  // --- Active Nav Link on Scroll ---
  const sections = document.querySelectorAll("section[id]");
  const navAllLinks = document.querySelectorAll(".nav-links a");

  const navObserverOptions = {
    rootMargin: "-50% 0px -50% 0px", // Triggers when section is in middle of viewport
    threshold: 0
  };

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navAllLinks.forEach(link => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }, navObserverOptions);

  sections.forEach(section => {
    navObserver.observe(section);
  });

});