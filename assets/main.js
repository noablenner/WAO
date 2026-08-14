/* ============================================================
   WAO — interactions
   ============================================================ */
(function () {
  "use strict";

  /* ----- Header shrink on scroll ----- */
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("scrolled", window.scrollY > 40);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ----- Mobile nav ----- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      nav.classList.toggle("open");
    });
    nav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { nav.classList.remove("open"); });
    });
  }

  /* ----- Reveal on scroll ----- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  /* ----- Count-up stats ----- */
  function animateCount(el) {
    var target = parseFloat(el.getAttribute("data-count"));
    var decimals = parseInt(el.getAttribute("data-decimals") || "0", 10);
    var dur = 1600;
    var start = null;
    var fmt = function (v) {
      return v.toLocaleString("fr-FR", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
      });
    };
    function step(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(target * eased);
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = fmt(target);
    }
    requestAnimationFrame(step);
  }
  var counters = document.querySelectorAll("[data-count]");
  if ("IntersectionObserver" in window && counters.length) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          animateCount(e.target);
          cio.unobserve(e.target);
        }
      });
    }, { threshold: 0.6 });
    counters.forEach(function (el) { cio.observe(el); });
  } else {
    counters.forEach(function (el) {
      el.textContent = parseFloat(el.getAttribute("data-count"))
        .toLocaleString("fr-FR", {
          minimumFractionDigits: parseInt(el.getAttribute("data-decimals") || "0", 10),
          maximumFractionDigits: parseInt(el.getAttribute("data-decimals") || "0", 10)
        });
    });
  }

  /* ----- Pop-up vidéo (YouTube) ----- */
  var modal = document.getElementById("videoModal");
  if (modal) {
    var frame = modal.querySelector(".video-modal-frame");
    var ytId = modal.getAttribute("data-youtube");

    var openVideo = function (e) {
      if (e) e.preventDefault();
      var iframe = document.createElement("iframe");
      iframe.src = "https://www.youtube-nocookie.com/embed/" + ytId +
        "?autoplay=1&rel=0&modestbranding=1&playsinline=1";
      iframe.title = "Vidéo";
      iframe.allow = "autoplay; encrypted-media; fullscreen; picture-in-picture";
      iframe.setAttribute("allowfullscreen", "");
      frame.innerHTML = "";
      frame.appendChild(iframe);
      modal.classList.add("open");
      modal.setAttribute("aria-hidden", "false");
      document.body.classList.add("no-scroll");
    };

    var closeVideo = function () {
      modal.classList.remove("open");
      modal.setAttribute("aria-hidden", "true");
      document.body.classList.remove("no-scroll");
      frame.innerHTML = ""; // stoppe la lecture
    };

    document.querySelectorAll("[data-video-open]").forEach(function (btn) {
      btn.addEventListener("click", openVideo);
    });
    modal.querySelectorAll("[data-video-close]").forEach(function (el) {
      el.addEventListener("click", closeVideo);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && modal.classList.contains("open")) closeVideo();
    });
  }

  /* ----- Année footer ----- */
  var y = document.querySelector("[data-year]");
  if (y) y.textContent = new Date().getFullYear();
})();
