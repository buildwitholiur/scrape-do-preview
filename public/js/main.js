document.addEventListener("DOMContentLoaded", function () {
  // Submenu toggle
  const toggles = document.querySelectorAll(".submenu-toggle");

  toggles.forEach((toggle) => {
    const parent = toggle.closest(".nav-item");
    const submenu = parent.querySelector(".submenu");
    const arrow = parent.querySelector(".arrow-icon");

    toggle.addEventListener("click", function (e) {
      e.stopPropagation();

      // Close all other submenus
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

  // Close all on outside click
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

      // Click handler
      button.addEventListener("click", () => {
        const isOpen = button.classList.contains("accordion__button--active");

        // Close all accordion items
        buttons.forEach((btn) => {
          btn.classList.remove("accordion__button--active");
          btn.nextElementSibling.style.maxHeight = null;
        });

        // Re-open current if it wasn't open before
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
});
