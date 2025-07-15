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
        slidesPerView: 1,
        spaceBetween: 30,
        watchSlidesProgress: true,
        navigation: {
            nextEl: '.selection .swiper-button-next',
            prevEl: '.selection .swiper-button-prev',
        },
        breakpoints: {
            1500: {
                slidesPerView: 4,
            },

            1200: {
                slidesPerView: 3,
            },
            768: {
                slidesPerView: 2,
            }
        }
    });

    // Swiper reviews-info
    const reviewsInfoSwiper = new Swiper('.reviews-info__swiper', {
        // Опциональные параметры
        direction: 'horizontal',
        loop: true,
        slidesPerView: 2,
        spaceBetween: 10,
        watchSlidesProgress: true,
        navigation: {
            nextEl: '.reviews-info__swiper .swiper-button-next',
            prevEl: '.reviews-info__swiper .swiper-button-prev',
        },
    });

    // Функционал для аккордеона вопросов
    function questionsAccordion() {
        const cards = document.querySelectorAll('.question__card');
        const minHeight = 150; // Минимальная высота закрытой карточки

        cards.forEach(card => {
            const textWrap = card.querySelector('.question__card-subtitle-wrap');

            // Сбросить начальное состояние
            if (card.classList.contains('question__card--active')) {
                card.style.maxHeight = card.scrollHeight + 'px';
                textWrap.style.opacity = 1;
            } else {
                card.style.maxHeight = minHeight + 'px';
                textWrap.style.opacity = 0;
            }

            card.addEventListener('click', function() {
                const isActive = card.classList.contains('question__card--active');
                // Закрыть все карточки
                cards.forEach(c => {
                    c.classList.remove('question__card--active');
                    const wrap = c.querySelector('.question__card-subtitle-wrap');
                    c.style.maxHeight = minHeight + 'px';
                    wrap.style.opacity = 0;
                });
                // Открыть текущую, если была закрыта
                if (!isActive) {
                    card.classList.add('question__card--active');
                    requestAnimationFrame(() => {
                        card.style.maxHeight = card.scrollHeight + 'px';
                    });
                    textWrap.style.opacity = 1;
                }
            });
        });

        // Обновлять maxHeight при ресайзе (адаптивность)
        window.addEventListener('resize', () => {
            document.querySelectorAll('.question__card--active').forEach(card => {
                card.style.maxHeight = card.scrollHeight + 'px';
            });
        });
    }

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

    function rangeAnimation() {
        if (document.querySelector('.profit')) {

            const range = document.querySelector('.profit__range'),
            textWrap = document.querySelector('.profit__range-text-wrap'),
            icon = document.querySelector('.profit__range-icon'),
            line = document.querySelector('.profit__range-line'),
            salary = document.querySelector('.profit__range-title')
    
            const MIN_SALARY = 20000
            const MAX_SALARY = 100000
    
            function getCorrectSalary() {
                return Math.round(MIN_SALARY + (range.value / 100) * (MAX_SALARY - MIN_SALARY));
            } 
    
            function animateSalaryDisplay(startValue, endValue, duration = 400) {
                const startTime = performance.now();
    
                function update(currentTime) {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1); // от 0 до 1
                    const currentValue = Math.round(startValue + (endValue - startValue) * progress);
                    salary.textContent = `${currentValue} Р`;
    
                    if (progress < 1) {
                        requestAnimationFrame(update);
                    }
                }
    
                requestAnimationFrame(update);
            }
    
            const updateElementsPosition = () => {
                const value = parseFloat(range.value);
                const min = parseFloat(range.min);
                const max = parseFloat(range.max);
                const thumbWidth = 20;
    
                const percent = (value - min) / (max - min);
                const thumbOffset = (0.5 - percent) * thumbWidth;
                
                textWrap.style.left = `calc(${percent * 100}% + ${thumbOffset}px)`;
                icon.style.left = `calc(${percent * 100}% + ${thumbOffset}px)`;
                line.style.width = `${percent * 100}%`;
    
            }
    
            salary.textContent = getCorrectSalary()
    
            range.addEventListener('input', () => {
                const newSalary = getCorrectSalary();
                const currentSalary = parseInt(salary.textContent.replace(/\D/g, ''), 10) || MIN_SALARY;
                animateSalaryDisplay(currentSalary, newSalary);
    
                updateElementsPosition()
    
                if (range.value <= 33) {
                    icon.classList.remove('profit__range-icon--middle')
                    icon.classList.remove('profit__range-icon--senior')
                    icon.classList.add('profit__range-icon--junior')
                    
                } else if (range.value > 33 && range.value <= 66) {
                    icon.classList.remove('profit__range-icon--junior')
                    icon.classList.remove('profit__range-icon--senior')
                    icon.classList.add('profit__range-icon--middle')
                } else if (range.value > 66) {
                    icon.classList.remove('profit__range-icon--junior')
                    icon.classList.remove('profit__range-icon--middle')
                    icon.classList.add('profit__range-icon--senior')
                }
            });
            updateElementsPosition();

        } else {
            return
        }
    }

    function revewsCounterInteractive() {
        if (document.querySelector('.reviews-info')) {

            let reviewsArrOfObjs = [
                { 
                    stars: 5, 
                    reviewsCount: 507 
                },
    
                { 
                    stars: 4, 
                    reviewsCount: 231 
                },
                { 
                    stars: 3, 
                    reviewsCount: 89 
    
                },
                { 
                    stars: 2, 
                    reviewsCount: 42
    
                },
                {
                    stars: 1, 
                    reviewsCount: 170   
                }
            ];
    
    
    
            const reviewSum = document.querySelector('.reviews-info__sum-reviews')
            const reviewScale = document.querySelectorAll('.reviews-info__scale')
            const reviewCount = document.querySelectorAll('.reviews-info__quantity-reviews')
            const middlePass = document.querySelector('.reviews-info__middle-pass')
            const middleSars = document.querySelectorAll('.reviews-info__middle-star')
    
            let reviewSumQuantity = reviewsArrOfObjs.reduce((sum, obj) => sum + obj.reviewsCount, 0)
            let middlePassValue = (reviewsArrOfObjs.reduce((sum, obj) => sum + obj.stars * obj.reviewsCount, 0) / reviewSumQuantity).toFixed(1)
            // let middlePassValueRoundedUp = 
    
            function getReviewWord(reviewSumQuantity) {
                if (reviewSumQuantity % 100 >= 11 && reviewSumQuantity % 100 <= 14) {
                    return 'отзывов';
                }
                switch (reviewSumQuantity % 10) {
                    case 1: return 'отзыв';
                    case 2:
                    case 3:
                    case 4: return 'отзыва';
                    default: return 'отзывов';
                }
            }
    
            middlePass.textContent = middlePassValue
            reviewSum.textContent = `${reviewSumQuantity} ${getReviewWord(reviewSumQuantity)}`;
    
            middleSars.forEach((star, i) => {
                if (i + 1 <= Math.round(middlePassValue)) {
                    star.classList.add('reviews-info__middle-star--active')
                }
            })
    
            reviewsArrOfObjs.forEach(obj => {
                reviewCount[reviewsArrOfObjs.length - obj.stars].textContent = obj.reviewsCount
                reviewScale[reviewsArrOfObjs.length - obj.stars].style.width = `${(obj.reviewsCount / reviewSumQuantity) * 100}%`
            });

        } else {
            return
        }
    }
    
    headerAnimation();
    questionsAccordion();
    rangeAnimation();
    revewsCounterInteractive();
});

