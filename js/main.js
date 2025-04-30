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
