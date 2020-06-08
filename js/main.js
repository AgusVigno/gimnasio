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

        // Animaciones Numeros
        $('.resumenInfo li:nth-child(1) p').animateNumber({ number: 4 }, 1200);
        $('.resumenInfo li:nth-child(2) p').animateNumber({ number: 13 }, 1200);
        $('.resumenInfo li:nth-child(3) p').animateNumber({ number: 4 }, 1500);
        $('.resumenInfo li:nth-child(4) p').animateNumber({ number: 9 }, 1500);

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
    //Menu Flotante en la parte superior

    var alturaVentana = $(window).height();
    var algutaBarra = $('.barra').innerHeight();

    $(window).scroll(function(){
        var scroll = $(window).scrollTop();

        if(scroll > alturaVentana){
            $('.barra').addClass('fixed');
        }else{
            $('.barra').removeClass('fixed');
        }
    });
});

