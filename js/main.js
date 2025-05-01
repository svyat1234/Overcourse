// swiper

const impressionsSwiper = new Swiper('.impressions__swiper', {
    // Optional parameters
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

const selectionSwiper = new Swiper('.selection__swiper', {
    // Optional parameters
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


// functions

function accordion() {
    document.addEventListener('DOMContentLoaded', () => {
        const cards = document.querySelectorAll('.question__card');
    
        cards.forEach(card => {
            const cardContent = card.querySelector('.question__card-content');
            
            card.addEventListener('click', () => {
                const isActive = card.classList.contains('question__card--active');
                
                // Close all other cards
                cards.forEach(otherCard => {
                    if (otherCard !== card) {
                        otherCard.classList.remove('question__card--active');
                    }
                });
    
                // Toggle current card
                if (!isActive) {
                    // Calculate current content height before adding active class
                    const fullHeight = cardContent.scrollHeight;
                    cardContent.style.setProperty('--content-height', fullHeight + 'px');
                    card.classList.add('question__card--active');
                } else {
                    card.classList.remove('question__card--active');
                }
            });
        });
    }); 
}

accordion();