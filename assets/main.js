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

  /* ----- Video ----- */
  // Pour activer la vidéo : renseigne l'ID YouTube ci-dessous.
  var YOUTUBE_ID = ""; // ex : "dQw4w9WgXcQ"
  var playBtn = document.querySelector(".hero-play, .video-frame");
  if (playBtn) {
    playBtn.addEventListener("click", function () {
      if (!YOUTUBE_ID) {
        alert("La vidéo sera bientôt disponible.");
        return;
      }
      var host = document.querySelector(".hero-cine-bg") || playBtn;
      var iframe = document.createElement("iframe");
      iframe.setAttribute("src", "https://www.youtube-nocookie.com/embed/" + YOUTUBE_ID + "?autoplay=1&rel=0");
      iframe.setAttribute("allow", "autoplay; encrypted-media; fullscreen");
      iframe.setAttribute("allowfullscreen", "");
      iframe.style.cssText = "position:absolute;inset:0;width:100%;height:100%;border:0;z-index:5;";
      host.innerHTML = "";
      host.appendChild(iframe);
    });
  }

  /* ----- Année footer ----- */
  var y = document.querySelector("[data-year]");
  if (y) y.textContent = new Date().getFullYear();
})();
