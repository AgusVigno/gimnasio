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
        $('.cuentaRegresiva').countdown('2020/07/20 10:00:00', function(event){
            $('#dias').html(event.strftime('%D'));
            $('#horas').html(event.strftime('%H'));
            $('#minutos').html(event.strftime('%M'));
            $('#segundos').html(event.strftime('%S'));
        });
    });
})();

$(function(){
    var barraAltura = $('.barra').innerHeight();
    var slideIndex = 0;
    
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
});