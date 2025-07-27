document.addEventListener("DOMContentLoaded", function () {
  // Submenu toggle
  const toggles = document.querySelectorAll(".submenu-toggle");

  toggles.forEach((toggle) => {
    const parent = toggle.closest(".nav-item");
    const submenu = parent.querySelector(".submenu");
    const arrow = parent.querySelector(".arrow-icon");

    toggle.addEventListener("click", function (e) {
      e.stopPropagation();

      document.querySelectorAll(".submenu").forEach((el) => {
        if (el !== submenu) el.classList.add("hidden");
      });
      document.querySelectorAll(".arrow-icon").forEach((icon) => {
        if (icon !== arrow) icon.classList.remove("rotate-180");
      });

      submenu.classList.toggle("hidden");
      arrow.classList.toggle("rotate-180");
    });
  });

  document.addEventListener("click", function () {
    document
      .querySelectorAll(".submenu")
      .forEach((el) => el.classList.add("hidden"));
    document
      .querySelectorAll(".arrow-icon")
      .forEach((icon) => icon.classList.remove("rotate-180"));
  });

  // ACCORDIONS
  const initAccordion = (selector) => {
    const buttons = document.querySelectorAll(`${selector} .accordion__button`);

    buttons.forEach((button) => {
      const content = button.nextElementSibling;

      if (button.classList.contains("accordion__button--active")) {
        content.style.maxHeight = content.scrollHeight + "px";
      }

      button.addEventListener("click", () => {
        const isOpen = button.classList.contains("accordion__button--active");

        buttons.forEach((btn) => {
          btn.classList.remove("accordion__button--active");
          btn.nextElementSibling.style.maxHeight = null;
        });

        if (!isOpen) {
          button.classList.add("accordion__button--active");
          content.style.maxHeight = content.scrollHeight + "px";
        }
      });
    });
  };

  if (document.querySelector(".custom__accodion--faq")) {
    initAccordion(".custom__accodion--faq");
  }

  if (document.querySelector(".custom__accodion--navbar")) {
    initAccordion(".custom__accodion--navbar");
  }

  if (document.querySelector(".custom__accodion--footer")) {
    initAccordion(".custom__accodion--footer");
  }

  // Challange Section Slider
  var swiperChallange = new Swiper(".challengeSwiper", {
    slidesPerView: 3,
    slidesPerGroupSkip: 1,
    spaceBetween: 24,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      0: {
        slidesPerView: 1.1,
        spaceBetween: 8,
      },
      450: {
        slidesPerView: 1.5,
        spaceBetween: 20,
      },
      992: {
        slidesPerView: 3,
      },
    },
  });

  // Mobile Hambergur
  const hamburgerBtn = document.querySelector(".hamburger__btn");
  const hamburgerCloseBtn = document.querySelector(".hamburger__close-btn");
  const mobileMenu = document.querySelector(".mobile__menu");

  hamburgerBtn.addEventListener("click", () => {
    mobileMenu.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  });

  hamburgerCloseBtn.addEventListener("click", () => {
    mobileMenu.classList.add("hidden");
    document.body.style.overflow = "auto";
  });
});

// Marque Effect
function Marquee(selector, speed) {
  const parentSelector = document.querySelector(selector);
  const clone = parentSelector.innerHTML;
  let i = 0;
  let marqueeInterval;

  parentSelector.insertAdjacentHTML("beforeend", clone);
  parentSelector.insertAdjacentHTML("beforeend", clone);

  function startMarquee() {
    marqueeInterval = setInterval(function () {
      parentSelector.scrollLeft = i;

      if (i > parentSelector.scrollWidth / 3) {
        i = 0;
      }
      i = i + speed;
    }, 0);
  }

  function stopMarquee() {
    clearInterval(marqueeInterval);
  }

  parentSelector.addEventListener("mouseenter", stopMarquee);
  parentSelector.addEventListener("mouseleave", startMarquee);

  startMarquee();
}

window.addEventListener("load", () => Marquee(".marquee", 0.4));
