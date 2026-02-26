/* ═══════════════════════════════════════════════════════
   FÉNIX FURNITURE — 2026 Collections
   Interactive Behaviours
   ═══════════════════════════════════════════════════════ */

(function () {
  "use strict";

  // ── Sticky Header ──
  const header = document.getElementById("site-header");
  const scrollThreshold = 80;

  function handleScroll() {
    header.classList.toggle("scrolled", window.scrollY > scrollThreshold);
  }
  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();

  // ── Mobile Hamburger ──
  const hamburger = document.getElementById("hamburger");
  const nav = document.getElementById("main-nav");

  hamburger.addEventListener("click", function () {
    hamburger.classList.toggle("open");
    nav.classList.toggle("open");
    document.body.style.overflow = nav.classList.contains("open")
      ? "hidden"
      : "";
  });

  // ── Dropdown Toggle (mobile) — supports multiple dropdowns ──
  var allDropdowns = document.querySelectorAll(".nav-dropdown");

  allDropdowns.forEach(function (dropdown) {
    var trigger = dropdown.querySelector(".nav-dropdown-trigger");
    if (trigger) {
      trigger.addEventListener("click", function (e) {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          e.stopPropagation();
          // Close other dropdowns when opening one
          allDropdowns.forEach(function (other) {
            if (other !== dropdown) {
              other.classList.remove("open");
            }
          });
          dropdown.classList.toggle("open");
        }
      });
    }
  });

  // Close nav on link click (mobile)
  nav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      if (link.classList.contains("nav-dropdown-trigger") && window.innerWidth <= 768) return;
      hamburger.classList.remove("open");
      nav.classList.remove("open");
      allDropdowns.forEach(function (dd) {
        dd.classList.remove("open");
      });
      document.body.style.overflow = "";
    });
  });

  // ── Smooth Anchor Scrolling ──
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      var target = document.querySelector(this.getAttribute("href"));
      if (!target) return;
      var headerH = header.offsetHeight + 20;
      var top = target.getBoundingClientRect().top + window.scrollY - headerH;
      window.scrollTo({ top: top, behavior: "smooth" });
    });
  });

  // ── Intersection Observer — Fade-in ──
  var fadeEls = document.querySelectorAll(".fade-in");
  var fadeObs = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          fadeObs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.01, rootMargin: "0px 0px -40px 0px" },
  );

  fadeEls.forEach(function (el) {
    fadeObs.observe(el);
  });

  // ── Staggered Entrance for Piece Cards ──
  var staggerEls = document.querySelectorAll(".stagger");
  var staggerObs = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          // Find index among siblings for stagger delay
          var parent = entry.target.closest(".pieces-grid");
          if (parent) {
            var siblings = Array.from(parent.querySelectorAll(".stagger"));
            var idx = siblings.indexOf(entry.target);
            entry.target.style.transitionDelay = idx * 0.07 + "s";
          }
          entry.target.classList.add("visible");
          staggerObs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px -20px 0px" },
  );

  staggerEls.forEach(function (el) {
    staggerObs.observe(el);
  });

  // ── Active Nav Highlighting ──
  var sections = document.querySelectorAll("section[id]");
  var navLinks = document.querySelectorAll("#main-nav a");

  function highlightNav() {
    var scrollPos = window.scrollY + 150;
    sections.forEach(function (section) {
      var top = section.offsetTop;
      var height = section.offsetHeight;
      var id = section.getAttribute("id");
      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(function (link) {
          link.classList.remove("active");
          if (link.getAttribute("href") === "#" + id) {
            link.classList.add("active");
          }
        });
      }
    });
  }
  window.addEventListener("scroll", highlightNav, { passive: true });

  // ── Subtle Hero Parallax ──
  var heroContent = document.querySelector(".hero-content");
  window.addEventListener(
    "scroll",
    function () {
      if (window.scrollY < window.innerHeight) {
        var offset = window.scrollY * 0.25;
        heroContent.style.transform = "translateY(" + offset + "px)";
        heroContent.style.opacity =
          1 - window.scrollY / (window.innerHeight * 0.8);
      }
    },
    { passive: true },
  );
})();
