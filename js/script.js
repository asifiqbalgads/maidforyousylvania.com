/* ==========================================================================
   Maid For You — homepage interactions
   Vanilla JS, no dependencies. Everything degrades gracefully.
   ========================================================================== */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------------------------------------------------------------
     Header: sticky shadow
  --------------------------------------------------------------------- */
  var header = document.getElementById("siteHeader");
  if (header) {
    var onScrollHeader = function () {
      header.classList.toggle("is-stuck", window.scrollY > 8);
    };
    onScrollHeader();
    window.addEventListener("scroll", onScrollHeader, { passive: true });
  }

  /* ---------------------------------------------------------------------
     Desktop "Services" dropdown
  --------------------------------------------------------------------- */
  var dropBtn = document.querySelector(".nav__toggle");
  var dropMenu = document.getElementById("servicesMenu");

  if (dropBtn && dropMenu) {
    var closeDrop = function () {
      dropBtn.setAttribute("aria-expanded", "false");
      dropMenu.hidden = true;
    };

    dropBtn.addEventListener("click", function (event) {
      event.preventDefault();
      var open = dropBtn.getAttribute("aria-expanded") === "true";
      dropBtn.setAttribute("aria-expanded", String(!open));
      dropMenu.hidden = open;
    });

    document.addEventListener("click", function (event) {
      if (!dropMenu.hidden && !dropMenu.contains(event.target) && event.target !== dropBtn && !dropBtn.contains(event.target)) {
        closeDrop();
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && !dropMenu.hidden) {
        closeDrop();
        dropBtn.focus();
      }
    });

    dropMenu.addEventListener("click", function (event) {
      if (event.target.closest("a")) closeDrop();
    });

    var mq = window.matchMedia("(min-width: 1060px)");
    mq.addEventListener("change", function (event) {
      if (!event.matches) closeDrop();
    });
  }

  /* ---------------------------------------------------------------------
     Mobile navigation
  --------------------------------------------------------------------- */
  var menuBtn = document.querySelector(".menu-btn");
  var mobileNav = document.getElementById("mobileNav");
  var lastFocused = null;

  if (menuBtn && mobileNav) {
    menuBtn.setAttribute("aria-controls", "mobileNav");

    var openNav = function () {
      lastFocused = document.activeElement;
      mobileNav.hidden = false;
      // force reflow so the transition runs
      void mobileNav.offsetWidth;
      mobileNav.classList.add("is-open");
      menuBtn.setAttribute("aria-expanded", "true");
      menuBtn.setAttribute("aria-label", "Close menu");
      document.body.classList.add("nav-open");
      var first = mobileNav.querySelector("a");
      if (first) first.focus({ preventScroll: true });
    };

    var closeNav = function (restoreFocus) {
      mobileNav.classList.remove("is-open");
      menuBtn.setAttribute("aria-expanded", "false");
      menuBtn.setAttribute("aria-label", "Open menu");
      document.body.classList.remove("nav-open");

      var finish = function () {
        if (menuBtn.getAttribute("aria-expanded") === "false") mobileNav.hidden = true;
      };
      if (reduceMotion) finish();
      else window.setTimeout(finish, 400);

      if (restoreFocus && lastFocused) lastFocused.focus({ preventScroll: true });
    };

    menuBtn.addEventListener("click", function () {
      if (menuBtn.getAttribute("aria-expanded") === "true") closeNav(true);
      else openNav();
    });

    mobileNav.addEventListener("click", function (event) {
      if (event.target.closest("a")) closeNav(false);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && menuBtn.getAttribute("aria-expanded") === "true") {
        closeNav(true);
      }
      if (event.key === "Tab" && document.body.classList.contains("nav-open")) {
        var links = mobileNav.querySelectorAll("a, button");
        if (!links.length) return;
        var first = links[0];
        var last = links[links.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth >= 1060 && document.body.classList.contains("nav-open")) closeNav(false);
    });
  }

  /* ---------------------------------------------------------------------
     Deep-clean room tabs (WAI-ARIA tabs pattern)
  --------------------------------------------------------------------- */
  var tabList = document.querySelector('[role="tablist"]');
  if (tabList) {
    var tabs = Array.prototype.slice.call(tabList.querySelectorAll('[role="tab"]'));

    var selectTab = function (tab, setFocus) {
      tabs.forEach(function (item) {
        var selected = item === tab;
        item.setAttribute("aria-selected", String(selected));
        item.tabIndex = selected ? 0 : -1;
        var panel = document.getElementById(item.getAttribute("aria-controls"));
        if (panel) panel.hidden = !selected;
      });
      if (setFocus) tab.focus();
    };

    tabs.forEach(function (tab, index) {
      tab.addEventListener("click", function () {
        selectTab(tab, false);
      });

      tab.addEventListener("keydown", function (event) {
        var next = null;
        if (event.key === "ArrowRight" || event.key === "ArrowDown") next = tabs[(index + 1) % tabs.length];
        if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = tabs[(index - 1 + tabs.length) % tabs.length];
        if (event.key === "Home") next = tabs[0];
        if (event.key === "End") next = tabs[tabs.length - 1];
        if (next) {
          event.preventDefault();
          selectTab(next, true);
        }
      });
    });
  }

  /* ---------------------------------------------------------------------
     FAQ accordion (animated height, single open at a time)
  --------------------------------------------------------------------- */
  var accordion = document.querySelector("[data-accordion]");
  if (accordion) {
    var triggers = Array.prototype.slice.call(accordion.querySelectorAll(".acc-trigger"));

    var closePanel = function (trigger) {
      var panel = document.getElementById(trigger.getAttribute("aria-controls"));
      if (!panel) return;
      trigger.setAttribute("aria-expanded", "false");
      if (reduceMotion) {
        panel.hidden = true;
        return;
      }
      panel.style.height = panel.scrollHeight + "px";
      void panel.offsetHeight;
      panel.style.height = "0px";
      window.setTimeout(function () {
        if (trigger.getAttribute("aria-expanded") === "false") {
          panel.hidden = true;
          panel.style.height = "";
        }
      }, 350);
    };

    var openPanel = function (trigger) {
      var panel = document.getElementById(trigger.getAttribute("aria-controls"));
      if (!panel) return;
      trigger.setAttribute("aria-expanded", "true");
      panel.hidden = false;
      if (reduceMotion) {
        panel.style.height = "";
        return;
      }
      panel.style.height = "0px";
      void panel.offsetHeight;
      panel.style.height = panel.scrollHeight + "px";
      window.setTimeout(function () {
        if (trigger.getAttribute("aria-expanded") === "true") panel.style.height = "auto";
      }, 350);
    };

    triggers.forEach(function (trigger) {
      trigger.addEventListener("click", function () {
        var isOpen = trigger.getAttribute("aria-expanded") === "true";
        triggers.forEach(function (other) {
          if (other !== trigger && other.getAttribute("aria-expanded") === "true") closePanel(other);
        });
        if (isOpen) closePanel(trigger);
        else openPanel(trigger);
      });
    });

    window.addEventListener("resize", function () {
      triggers.forEach(function (trigger) {
        var panel = document.getElementById(trigger.getAttribute("aria-controls"));
        if (panel && !panel.hidden && trigger.getAttribute("aria-expanded") === "true") {
          panel.style.height = "auto";
        }
      });
    });
  }

  /* ---------------------------------------------------------------------
     Reveal on scroll
  --------------------------------------------------------------------- */
  var revealEls = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
  if ("IntersectionObserver" in window && !reduceMotion) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry, i) {
          if (entry.isIntersecting) {
            var el = entry.target;
            el.style.transitionDelay = (i * 70) + "ms";
            el.classList.add("is-in");
            revealObserver.unobserve(el);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    revealEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-in"); });
  }

  /* ---------------------------------------------------------------------
     Sticky mobile CTA bar
  --------------------------------------------------------------------- */
  var bar = document.getElementById("mobileBar");
  if (bar) {
    var hero = document.querySelector(".hero");
    var toggleBar = function () {
      var threshold = hero ? hero.offsetHeight * 0.75 : 420;
      var pastFinal = false;
      var finalSection = document.querySelector(".final");
      if (finalSection) {
        var rect = finalSection.getBoundingClientRect();
        pastFinal = rect.top < window.innerHeight * 0.85;
      }
      bar.classList.toggle("is-visible", window.scrollY > threshold && !pastFinal);
    };
    toggleBar();
    window.addEventListener("scroll", toggleBar, { passive: true });
    window.addEventListener("resize", toggleBar);
  }

  /* ---------------------------------------------------------------------
     Footer year
  --------------------------------------------------------------------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ---------------------------------------------------------------------
     Smooth scrolling for in-page anchors (with sticky-header offset)
  --------------------------------------------------------------------- */
  document.addEventListener("click", function (event) {
    var link = event.target.closest('a[href^="#"]');
    if (!link) return;
    var id = link.getAttribute("href");
    if (!id || id === "#") return;
    var target = document.querySelector(id);
    if (!target) return;

    event.preventDefault();
    var headerH = header ? header.offsetHeight : 0;
    var top = target.getBoundingClientRect().top + window.pageYOffset - headerH - 8;
    window.scrollTo({ top: top, behavior: reduceMotion ? "auto" : "smooth" });

    if (history.replaceState) history.replaceState(null, "", id);

    // keep keyboard users in sync with the visual jump
    if (link.classList.contains("skip-link") || target.id === "main") {
      target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    }
  });
})();
