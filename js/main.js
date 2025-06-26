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
        const range = document.querySelector('.profit__range');
        const textWrap = document.querySelector('.profit__range-text-wrap');
        const icon = document.querySelector('.profit__range-icon');
        const line = document.querySelector('.profit__range-line');
        
        const updatePosition = () => {
            const value = parseFloat(range.value);
            const min = parseFloat(range.min);
            const max = parseFloat(range.max);
            const thumbWidth = 20;

            const percent = (value - min) / (max - min);
            const thumbOffset = (0.5 - percent) * thumbWidth;
            
            textWrap.style.left = `calc(${percent * 100}% + ${thumbOffset}px)`;
            icon.style.left = `calc(${percent * 100}% + ${thumbOffset}px)`;
            line.style.width = `${percent * 100}%`;

            if (value < 33) {
                icon.classList.remove('profit__range-icon--middle')
                icon.classList.remove('profit__range-icon--senior')
                icon.classList.add('profit__range-icon--junior')
                
            } else if (value > 33 && value < 66) {
                icon.classList.remove('profit__range-icon--junior')
                icon.classList.remove('profit__range-icon--senior')
                icon.classList.add('profit__range-icon--middle')
            } else if (value > 66) {
                icon.classList.remove('profit__range-icon--junior')
                icon.classList.remove('profit__range-icon--middle')
                icon.classList.add('profit__range-icon--senior')
            }

        }

        range.addEventListener('input', updatePosition);
        updatePosition();
    }

    function revewsCounterInteractive() {
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

        reviewsArrOfObjs.forEach((obj, i) => {
            console.log(obj.stars);
            reviewCount[reviewsArrOfObjs.length - obj.stars].textContent = obj.reviewsCount
            reviewScale[reviewsArrOfObjs.length - obj.stars].style.width = `${(obj.reviewsCount / reviewSumQuantity) * 100}%`
        });

    }
    
    headerAnimation();
    accordion();
    rangeAnimation();
    revewsCounterInteractive();
});

