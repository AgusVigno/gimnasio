(function(){
    'use strict';

    document.addEventListener('DOMContentLoaded', function(){
        //Si pagina actual == home carga el MAPA
        if(document.getElementById('mapa')){
            var map = L.map('mapa').setView([-34.919851, -57.95404], 16);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            L.marker([-34.919851, -57.95404]).addTo(map)
                .bindPopup('GymLaPlata')
                .openPopup();
        }

        // Cuenta Regresiva
        $('.contador').countdown('2020/07/30 10:00:00', function(event){
            $('#dias').html(event.strftime('%D'));
            $('#horas').html(event.strftime('%H'));
            $('#minutos').html(event.strftime('%M'));
            $('#segundos').html(event.strftime('%S'));
        });
    });

    //seccion instalaciones carousel hover
    var bindToClass      = 'caroussel',
        containerWidth   = 0,
        scrollWidth      = 0,
        posFromLeft      = 0,    // Stripe position from the left of the screen
        stripePos        = 0,    // When relative mouse position inside the thumbs stripe
        animated         = null,
        $indicator, $carousel, el, $el, ratio, scrollPos, nextMore, prevMore, pos, padding;

    // calculate the thumbs container width
    function calc(e){
        $el = $(this).find(' > .wrap');
        el  = $el[0];
        $carousel = $el.parent();
        $indicator = $el.prev('.indicator');

        nextMore = prevMore  = false; // reset

        containerWidth       = el.clientWidth;
        scrollWidth          = el.scrollWidth; // the "<ul>"" width
        padding              = 0.2 * containerWidth; // padding in percentage of the area which the mouse movement affects
        posFromLeft          = $el.offset().left;
        stripePos            = e.pageX - padding - posFromLeft;
        pos                  = stripePos / (containerWidth - padding*2);
        scrollPos            = (scrollWidth - containerWidth ) * pos;
        
        if( scrollPos < 0 )
          scrollPos = 0;
        if( scrollPos > (scrollWidth - containerWidth) )
          scrollPos = scrollWidth - containerWidth;
      
        $el.animate({scrollLeft:scrollPos}, 200, 'swing');
        
        if( $indicator.length )
            $indicator.css({
                width: (containerWidth / scrollWidth) * 100 + '%',
                left: (scrollPos / scrollWidth ) * 100 + '%'
            });

        clearTimeout(animated);
        animated = setTimeout(function(){
            animated = null;
        }, 200);

        return this;
    }

    // move the stripe left or right according to mouse position
    function move(e){
        // don't move anything until inital movement on 'mouseenter' has finished
        if( animated ) return;

        ratio     = scrollWidth / containerWidth;
        stripePos = e.pageX - padding - posFromLeft; // the mouse X position, "normalized" to the carousel position

        if( stripePos < 0)
            stripePos = 0;

        pos = stripePos / (containerWidth - padding*2); // calculated position between 0 to 1
        // calculate the percentage of the mouse position within the carousel
        scrollPos = (scrollWidth - containerWidth ) * pos;   

        el.scrollLeft = scrollPos;
        if( $indicator[0] && scrollPos < (scrollWidth - containerWidth) )
          $indicator[0].style.left = (scrollPos / scrollWidth ) * 100 + '%';

        // check if element has reached an edge
        prevMore = el.scrollLeft > 0;
        nextMore = el.scrollLeft < (scrollWidth - containerWidth);

        $carousel.toggleClass('left', prevMore);
        $carousel.toggleClass('right', nextMore);
    }

    $.fn.carousel = function(options){
        $(document)
            .on('mouseenter.caroussel', '.' + bindToClass, calc)
            .on('mousemove.caroussel', '.' + bindToClass, move);
    };

    // automatic binding to all elements which have the class that is assigned to "bindToClass"
    $.fn.carousel();   

})();

$(function(){
    var barraAltura = $('.barra').innerHeight();
    var slideIndex = 0;
    var slidesCargados = 0;

    //si estoy en la pagina de inicio
    if(document.getElementById('slider1')){
        //loader hasta que carguen imagenes del slider
        $('#slider1').imagesLoaded( { background: true }, function() {
            slidesCargados++;
            if(slidesCargados === 4){
                ocultarLoader();
            }
        });
        $('#slider2').imagesLoaded( { background: true }, function() {
            slidesCargados++;
            if(slidesCargados === 4){
                ocultarLoader();
            }
        });
        $('#slider3').imagesLoaded( { background: true }, function() {
            slidesCargados++;
            if(slidesCargados === 4){
                ocultarLoader();
            }
        });
        $('#slider4').imagesLoaded( { background: true }, function() {
            slidesCargados++;
            if(slidesCargados === 4){
                ocultarLoader();
            }
        });

        function ocultarLoader(){
            document.querySelector('.loading').classList.remove('show');
            setTimeout(function () {
                document.querySelector('.loading').remove();
            }, 1000);
        }

        //slider en el home
        showSlides();

        function showSlides() {
            var i;
            var slides = document.getElementsByClassName("mySlides");
            for (i = 0; i < slides.length; i++) {
                slides[i].style.display = "none";
            }
            slideIndex++;
            if(slideIndex > slides.length) {
                slideIndex = 1
            }
            slides[slideIndex-1].style.display = "block";
            setTimeout(showSlides,3000);
        }
        //fin del loader en el inicio, con la carga del slider completo

        var parallax = (function() {
            var d = document.getElementsByClassName('resumen')[0],
                c = "ontouchstart" in window || navigator.msMaxTouchPoints;
            if (c) {
                d.className += " touch";
                return {
                    touch: true
                }
            } else {
                d.className += " no-touch";
                return {
                    touch: false
                }
            }
        })();
    }
    //fin carga de componentes en pagina de inicio

    $(window).scroll(function(){
        var scroll = $(window).scrollTop();
        
        //menu flotante en la parte superior
        if(scroll > barraAltura){
            $('.barra').addClass('fixed');
        }else{
            $('.barra').removeClass('fixed');
        }

    });

    //menu responsive
    $('.menuMovil').on('click', function(){
        $('.navegacionPrincipal').slideToggle();
    });

    //animacion de numeros en resumen
    $('#resumenClick').on('click', function(){
        $('.resumenInfo').css({'display': 'flex'});
        $('.resumenInfo li:nth-child(1) p').animateNumber({ number: 7 }, 1200);
        $('.resumenInfo li:nth-child(2) p').animateNumber({ number: 19 }, 1200);
        $('.resumenInfo li:nth-child(3) p').animateNumber({ number: 5 }, 1500);
        $('.resumenInfo li:nth-child(4) p').animateNumber({ number: 23 }, 1500); 
        $('#resumenClick').css({display:'none'});
        $('.resumenBoton').remove();
    });
});

//Icono que dirige hacia arriba del homepage
$(document).ready(function(){

    $('.footer__ir-arriba').click(function(){
        $('body, html').animate({
            scrollTop:'0px'
        },1000);
    });

    $(window).scroll(function(){
        if ($(this).scrollTop() > 0) {
            $('a.whatsapp__flotante').slideDown(300);
            $('.footer__ir-arriba').slideDown(300);
        } else {
            $('a.whatsapp__flotante').slideUp(300);                
            $('.footer__ir-arriba').slideUp(300);                
        }
    });
});
