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

  // Testimonial Section Slider
  var testimonialSlider = new Swiper(".testimonialSlider", {
    slidesPerView: 1,
    slidesPerGroupSkip: 1,
    spaceBetween: 24,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    observer: true,
    observeParents: true,
    loop: true,
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

// dropdown menu
function initializeDropdown(dropdownToggleSelector, dropdownMenuSelector) {
  const dropdownToggles = document.querySelectorAll(dropdownToggleSelector);

  function toggleDropdownMenu(dropdownMenu) {
    dropdownMenu.classList.toggle("active");
  }

  function closeAllDropdownMenus() {
    document.querySelectorAll(dropdownMenuSelector).forEach((menu) => {
      menu.classList.remove("active");
    });
  }

  dropdownToggles.forEach((toggle) => {
    const menuId = toggle.getAttribute("data-menu-id");
    const dropdownMenu = document.getElementById(menuId);

    if (!dropdownMenu) {
      console.warn(`Dropdown menu with ID "${menuId}" not found.`);
      return; // Skip if menu is not found
    }

    toggle.addEventListener("click", (event) => {
      event.stopPropagation();
      if (dropdownMenu.classList.contains("active")) {
        dropdownMenu.classList.remove("active");
      } else {
        closeAllDropdownMenus();
        toggleDropdownMenu(dropdownMenu);
      }
    });

    const dropdownMenuItems = dropdownMenu.querySelectorAll(
      ".dropdown-menu-item"
    );
    dropdownMenuItems.forEach((item) => {
      item.addEventListener("click", () => {
        dropdownMenu.classList.remove("active");
      });
    });

    const dropdownSelectableItems = dropdownMenu.querySelectorAll(
      ".dropdown-menu-item.selectable"
    );
    dropdownSelectableItems.forEach((item) => {
      item.addEventListener("click", () => {
        toggle.textContent = item.textContent.trim();
        dropdownMenu.classList.remove("active");
      });
    });

    dropdownMenu.addEventListener("click", (event) => {
      event.stopPropagation();
    });
  });

  document.addEventListener("click", closeAllDropdownMenus);
}

initializeDropdown(".dropdown-toggle", ".dropdown-menu");

// Tab  Button Active Remove
const tabs = document.querySelectorAll(".tab-btn");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((btn) => btn.classList.remove("active"));
    tab.classList.add("active");
  });
});

// Blog post filter option
const filterButtons = document.querySelectorAll(".tab-btn");
const cards = document.querySelectorAll(".single__blog");

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) =>
      b.classList.remove("active", "bg-black", "text-white")
    );
    btn.classList.add("active", "bg-black", "text-white");

    const filter = btn.getAttribute("data-filter");

    cards.forEach((card) => {
      if (filter === "all") {
        card.classList.remove("hidden");
      } else {
        card.classList.toggle("hidden", !card.classList.contains(filter));
      }
    });
  });
});

// Function to open modal
function openModal() {
  document.getElementById("meetingModal").classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  document.getElementById("meetingModal").classList.add("hidden");
  document.body.style.overflow = "auto";
}

// Add click event listener to all elements with openSingupModal class
document.addEventListener("DOMContentLoaded", function () {
  const modalTriggers = document.querySelectorAll(".openSingupModal");
  modalTriggers.forEach(function (trigger) {
    trigger.addEventListener("click", function (e) {
      e.preventDefault();
      openModal();
    });
  });
});

document.getElementById("closeModal").addEventListener("click", closeModal);

// Close modal when clicking outside the modal
document.getElementById("meetingModal").addEventListener("click", function (e) {
  if (e.target === this) {
    closeModal();
  }
});

// Close modal with Escape key
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeModal();
  }
});


// copy function
document.querySelectorAll(".copy-code-btn").forEach((button) => {
   button.addEventListener("click", () => {
      const codeBlock = button
         .closest(".code-block-container")
         .querySelector(".code-block");
      if (!codeBlock) return;

      const text = codeBlock.innerText.trim();
      navigator.clipboard.writeText(text).then(() => {
         const span = button.querySelector("span");
         const originalText = span.textContent;
         span.textContent = "Copied";
         setTimeout(() => {
            span.textContent = originalText;
         }, 2000);
      });
   });
});


// blog navigation 
function initializeAllBlogNavs(containerSelector) {
   const containers = document.querySelectorAll(containerSelector);

   containers.forEach((container) => {
      const items = container.querySelectorAll(".blog-nav__item");

      items.forEach((item, index) => {
         const link = item.querySelector(".blog-nav__link");
         if (!link) return;

         link.addEventListener("click", function (e) {
            e.preventDefault(); 

            items.forEach((i) => i.classList.remove("active", "above-active"));

            for (let i = 0; i < index; i++) {
               items[i].classList.add("above-active");
            }

            // Set "active" on the clicked item
            items[index].classList.add("active");
         });
      });
   });
}

// Initialize all blog-nav sections on the page
initializeAllBlogNavs(".blog-nav");




