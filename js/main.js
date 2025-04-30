const swiper = new Swiper('.swiper', {
    // Optional parameters
    direction: 'horizontal',
    loop: false, // <--- Важно!
    slidesPerView: 'auto',
    spaceBetween: 30,
    freeMode: true,
    navigation: {
        nextEl: '.swiper-button-next',
    },

});
  
  
