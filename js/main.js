document.addEventListener('DOMContentLoaded', () => {
    // Swiper impressions
    const impressionsSwiper = new Swiper('.impressions__swiper', {
        // Опциональные параметры
        direction: 'horizontal',
        loop: true,
        slidesPerView: 'auto',
        centeredSlides: true,
        spaceBetween: 30,
        initialSlide: 3,
        watchSlidesProgress: true,
        navigation: {
            nextEl: '.impressions .swiper-button-next',
        },
    });

    // Swiper selection
    const selectionSwiper = new Swiper('.selection__swiper', {
        // Опциональные параметры
        direction: 'horizontal',
        loop: true,
        slidesPerView: 4,
        spaceBetween: 30,
        watchSlidesProgress: true,
        navigation: {
            nextEl: '.selection .swiper-button-next',
            prevEl: '.selection .swiper-button-prev',
        },
    });

    // Accordion function
    function accordion() {
        const cards = document.querySelectorAll('.question__card');

        cards.forEach(card => {
            const cardContent = card.querySelector('.question__card-content');
            const cardText = card.querySelector('.question__card-text');

            card.addEventListener('click', () => {
                const isActive = card.classList.contains('question__card--active');

                // Закрыть все другие карточки
                cards.forEach(otherCard => {
                    if (otherCard !== card) {
                        otherCard.classList.remove('question__card--active');
                        const otherContent = otherCard.querySelector('.question__card-content');
                        otherContent.style.height = '50px';
                    }
                });

                // Переключить текущую карточку
                if (!isActive) {
                    // Сначала делаем текст видимым для измерения
                    cardText.style.opacity = '1';
                    cardText.style.visibility = 'hidden';
                    
                    // Получаем реальную высоту текста
                    const textHeight = cardText.offsetHeight;
                    
                    // Возвращаем стили
                    cardText.style.opacity = '';
                    cardText.style.visibility = '';
                    
                    // Устанавливаем высоту только если текст действительно больше 50px
                    const totalHeight = textHeight > 50 ? textHeight : 50;
                    cardContent.style.height = totalHeight + 'px';
                    card.classList.add('question__card--active');
                } else {
                    cardContent.style.height = '50px';
                    card.classList.remove('question__card--active');
                }
            });
        });
    }

    // Header

    function headerAnimation() {
        const header = document.querySelector('.header');
        const logo = header.querySelector('.logo');
        const SCROLL_THRESHOLD = 600;
        let headerLight = header.classList.contains('header--light');

        function updateHeader() {
            const scrollTop = window.scrollY;

            if (scrollTop > SCROLL_THRESHOLD) {
                header.classList.remove('header--hidden');
                header.classList.add('header--active');
                if (headerLight) {
                    header.classList.remove('header--light');
                    logo.src = './img/logo.svg';
                }
            } else {
                if (header.classList.contains('header--active')) {
                    header.classList.add('header--hidden');
                    setTimeout(() => {
                        header.classList.remove('header--active');
                        header.classList.remove('header--hidden');
                        if (headerLight) {
                            header.classList.add('header--light');
                            logo.src = './img/logo-light.svg';
                        }
                    }, 300);
                }
            }
        }

        window.addEventListener('scroll', updateHeader);
        updateHeader();
    }

    headerAnimation();
    accordion();
});
