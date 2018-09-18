jQuery(document).ready(function () {
    $(window).scroll(function () {
        ($(this).scrollTop() > ($('header').height() + 200)) ? $('.back-to-top').addClass('cd-is-visible') : $('.back-to-top').removeClass('cd-is-visible cd-fade-out');
    }).trigger('scroll');
    $('.back-to-top').on('click', function (event) {
        event.preventDefault();
        $('html,body').animate({
            scrollTop: 0
        }, 700);
    });
});
