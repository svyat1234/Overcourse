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

const schoolsSwiper = new Swiper('.schools__slider', {
    slidesPerView: 'auto',
    centeredSlides: true,
    loop: true,
    speed: 1000,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    effect: 'coverflow',
    coverflowEffect: {
        rotate: 0,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: false,
    },
    breakpoints: {
        320: {
            slidesPerView: 1,
            spaceBetween: 20
        },
        768: {
            slidesPerView: 3,
            spaceBetween: 30
        }
    }
});

// Schools slider hover effect
const schoolsSlider = document.querySelector('.schools__slider');
const slides = document.querySelectorAll('.schools__slide');

if (schoolsSlider && slides.length) {
    let currentIndex = 0;
    const interval = 3000; // 3 seconds between each slide

    function activateNextSlide() {
        slides[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % slides.length;
        slides[currentIndex].classList.add('active');
    }

    // Start the sequence
    setInterval(activateNextSlide, interval);
}