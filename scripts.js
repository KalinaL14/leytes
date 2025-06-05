document.addEventListener('DOMContentLoaded', function() {
    // Language switcher functionality
    const languageSwitcher = document.querySelector('.language-switcher');
    const languageCurrent = document.querySelector('.language-current');
    const languageList = document.querySelector('.language-list');
    
    languageSwitcher.addEventListener('click', function(e) {
        e.stopPropagation();
        languageList.style.display = languageList.style.display === 'block' ? 'none' : 'block';
    });
    
    document.addEventListener('click', function() {
        languageList.style.display = 'none';
    });
    
    // Switch language
    const languageLinks = document.querySelectorAll('.language-list a');
    languageLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const lang = this.getAttribute('data-lang');
            languageCurrent.textContent = this.textContent;
            languageList.style.display = 'none';
            
            // Here you would implement actual language switching
            console.log('Switching to language:', lang);
        });
    });
    
    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Scroll to top button
    const scrollTopBtn = document.querySelector('.scroll-top');
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const reviewImages = document.querySelectorAll('.review__image');
    const modalOverlay = document.querySelector('.modal-overlay');
    const modalImage = document.querySelector('.modal-image');
    const closeModal = document.querySelector('.close-modal');
    const prevBtn = document.querySelector('.modal-prev');
    const nextBtn = document.querySelector('.modal-next');
    
    let currentImageIndex = 0;
    const imagesArray = Array.from(reviewImages).map(img => img.src);
    
    // Открытие модального окна
    reviewImages.forEach((img, index) => {
        img.addEventListener('click', function() {
            currentImageIndex = index;
            updateModalImage();
            modalOverlay.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Закрытие модального окна
    closeModal.addEventListener('click', closeModalWindow);
    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) {
            closeModalWindow();
        }
    });
    
    // Навигация стрелками
    prevBtn.addEventListener('click', showPrevImage);
    nextBtn.addEventListener('click', showNextImage);
    
    // Навигация клавиатурой
    document.addEventListener('keydown', function(e) {
        if (modalOverlay.style.display === 'flex') {
            if (e.key === 'Escape') {
                closeModalWindow();
            } else if (e.key === 'ArrowLeft') {
                showPrevImage();
            } else if (e.key === 'ArrowRight') {
                showNextImage();
            }
        }
    });
    
    function updateModalImage() {
        modalImage.src = imagesArray[currentImageIndex];
        // Показываем/скрываем стрелки в зависимости от позиции
        prevBtn.style.display = currentImageIndex === 0 ? 'none' : 'flex';
        nextBtn.style.display = currentImageIndex === imagesArray.length - 1 ? 'none' : 'flex';
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
        modalOverlay.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});