document.addEventListener("DOMContentLoaded", function () {
  const languageSwitcher = document.querySelector(".language-switcher");
  const languageCurrent = document.querySelector(".language-current");
  const languageList = document.querySelector(".language-list");

  languageSwitcher.addEventListener("click", function (e) {
    e.stopPropagation();
    languageList.style.display = languageList.style.display === "block" ? "none" : "block";
  });

  document.addEventListener("click", function (e) {
    if (!e.target.closest(".language-switcher")) {
      document.querySelectorAll(".language-list").forEach(list => list.style.display = "none");
    }
  });

  const languageLinks = document.querySelectorAll(".language-list a");
  languageLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const lang = this.getAttribute("data-lang");
      languageCurrent.textContent = this.textContent;
      languageList.style.display = "none";

      document.querySelectorAll(".lang-ru").forEach(el => el.style.display = lang === 'ru' ? '' : 'none');
      document.querySelectorAll(".lang-he").forEach(el => el.style.display = lang === 'he' ? '' : 'none');

      document.documentElement.lang = lang;
      document.querySelectorAll('[class*="lang-"]').forEach(el => {
        if (el.classList.contains('lang-he')) {
          el.style.direction = lang === 'he' ? 'rtl' : 'ltr';
        } else {
          el.style.direction = 'ltr';
        }
      });
    });
  });

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerHeight = document.querySelector(".header").offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight;
        window.scrollTo({ top: targetPosition, behavior: "smooth" });
      }
    });
  });

  const scrollTopBtn = document.querySelector(".scroll-top");
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  const reviewImages = document.querySelectorAll(".review__image");
  const modalOverlay = document.querySelector(".modal-overlay");
  const modalImage = document.querySelector(".modal-image");
  const closeModal = document.querySelector(".close-modal");
  const prevBtn = document.querySelector(".modal-prev");
  const nextBtn = document.querySelector(".modal-next");

  let currentImageIndex = 0;
  const imagesArray = Array.from(reviewImages).map((img) => img.src);

  reviewImages.forEach((img, index) => {
    img.addEventListener("click", function () {
      currentImageIndex = index;
      updateModalImage();
      modalOverlay.style.display = "flex";
      document.body.style.overflow = "hidden";
    });
  });

  closeModal.addEventListener("click", closeModalWindow);
  modalOverlay.addEventListener("click", function (e) {
    if (e.target === modalOverlay) {
      closeModalWindow();
    }
  });

  prevBtn.addEventListener("click", showPrevImage);
  nextBtn.addEventListener("click", showNextImage);

  document.addEventListener("keydown", function (e) {
    if (modalOverlay.style.display === "flex") {
      if (e.key === "Escape") {
        closeModalWindow();
      } else if (e.key === "ArrowLeft") {
        showPrevImage();
      } else if (e.key === "ArrowRight") {
        showNextImage();
      }
    }
  });

  function updateModalImage() {
    modalImage.src = imagesArray[currentImageIndex];
    prevBtn.style.display = currentImageIndex === 0 ? "none" : "flex";
    nextBtn.style.display = currentImageIndex === imagesArray.length - 1 ? "none" : "flex";
  }

  function showPrevImage() {
    if (currentImageIndex > 0) {
      currentImageIndex--;
      updateModalImage();
    }
  }

  function showNextImage() {
    if (currentImageIndex < imagesArray.length - 1) {
      currentImageIndex++;
      updateModalImage();
    }
  }

  function closeModalWindow() {
    modalOverlay.style.display = "none";
    document.body.style.overflow = "auto";
  }
});