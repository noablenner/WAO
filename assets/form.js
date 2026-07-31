/* ============================================================
   WAO — gestion des formulaires
   ------------------------------------------------------------
   Le site est statique : pour recevoir les réponses, connecte
   un service de formulaire (aucun code serveur à écrire).

   Option A — Formspree (https://formspree.io) :
     1. Crée un formulaire, récupère ton URL (https://formspree.io/f/xxxx)
     2. Colle-la dans FORM_ENDPOINT ci-dessous.

   Sans endpoint, on bascule sur un e-mail pré-rempli (mailto)
   si CONTACT_EMAIL est renseigné, sinon on affiche juste la
   confirmation (les données restent visibles dans la console).
   ============================================================ */
(function () {
  "use strict";

  var FORM_ENDPOINT = "";                 // ← URL Formspree (recommandé)
  var CONTACT_EMAIL = "";                 // ← e-mail de secours (mailto)

  var form = document.querySelector("form.wao-form");
  if (!form) return;
  var success = document.querySelector(".form-success");

  function showSuccess() {
    if (success) {
      form.style.display = "none";
      success.classList.add("show");
      success.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!form.reportValidity()) return;

    var data = new FormData(form);
    var btn = form.querySelector('button[type="submit"]');
    if (btn) { btn.disabled = true; btn.textContent = "Envoi…"; }

    var done = function () { showSuccess(); };
    var fail = function () {
      if (btn) { btn.disabled = false; btn.textContent = "Réessayer"; }
      alert("Une erreur est survenue. Réessaie ou écris-nous directement.");
    };

    if (FORM_ENDPOINT) {
      fetch(FORM_ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" }
      }).then(function (r) { r.ok ? done() : fail(); }).catch(fail);
      return;
    }

    if (CONTACT_EMAIL) {
      var lines = [];
      data.forEach(function (v, k) { lines.push(k + " : " + v); });
      var subject = "Nouvelle candidature WAO — " + (data.get("objectif") || form.getAttribute("data-form") || "");
      window.location.href = "mailto:" + CONTACT_EMAIL +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(lines.join("\n"));
      done();
      return;
    }

    // Aucun backend configuré → démo
    var obj = {};
    data.forEach(function (v, k) { obj[k] = v; });
    console.log("[WAO] Formulaire (démo, non envoyé) :", obj);
    done();
  });
})();
