// Jquery with no conflict
jQuery(document).ready(function ($) {


    //##########################################
    // Top Widget
    //##########################################

    var topContainer = $("#top-widget");
    var topTrigger = $("#top-open");

    topTrigger.click(function () {
        topContainer.animate({
            height: 'toggle'
        });

        if (topTrigger.hasClass('tab-closed')) {
            topTrigger.removeClass('tab-closed');
        } else {
            topTrigger.addClass('tab-closed');
        }

        return false;

    });

    //##########################################
    // Masonry
    //##########################################


    var $container = $('.portfolio-list');

    $container.imagesLoaded(function () {
        $container.masonry({
            itemSelector: 'figure',
            isAnimated: true
        });
    });


    //##########################################
    // Accordion box
    //##########################################

    $('.accordion-container').hide();
    $('.accordion-trigger:first').addClass('active').next().show();
    $('.accordion-trigger').click(function () {
        if ($(this).next().is(':hidden')) {
            $('.accordion-trigger').removeClass('active').next().slideUp();
            $(this).toggleClass('active').next().slideDown();
        }
        return false;
    });

    //##########################################
    // Toggle box
    //##########################################

    $('.toggle-trigger').click(function () {
        $(this).next().toggle('slow');
        $(this).toggleClass("active");
        return false;
    }).next().hide();

    //##########################################
    // Logo to popmenu
    //##########################################

    $(function () {
        $('#logo').popmenu();
    });
    
    $('#go-home-page').click(function () {
        location.href = 'index.html';
    });
    
    $('#go-home-single').click(function () {
        location.href='../../../../index.html'
    });
//close			
});



















