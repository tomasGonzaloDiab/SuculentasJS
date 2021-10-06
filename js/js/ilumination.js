$('#dark-mode').click(function(){
    $('.fondo').css({"background-image": "url(../media/fondoMacetasDark.png)"})
    $('.menuPrincipal').css({"background-color": "#5c6727"})
    $('header').css({"background-color": "#819136"})
    $('.button3').css({"background-color": "#819136"})
    $('.button2').css({"background-color": "#090705eb", "color": "white"})
    $('.bloque_cards').css({"background-color": "#090705eb"})
    $('.subBloques__subtitulos').css({"color": "#010101"})
    $('.textos-cards').css({"color": "#819136"})
    $('.parrafos__texto').css({"color": "rgb(174 176 163)"})
    $('.parrafos__subtitulos').css({"color": "#819136"})
    $('.grilla__bloques').css({"background-color": "#090705eb"})
    $('label').css({"color": "rgb(174 176 163)"})

    
})
$('#light-mode').click(function(){
    $('.fondo').css({"background-image": "url(../media/fondoMacetas.png)"})
    $('.menuPrincipal').css({"background-color": "#c3d27c"})
    $('header').css({"background-color": "#a9ba5a"})
    $('.button3').css({"background-color": "#a9ba5a"})
    $('.button2').css({"background-color": "#f7efe5", "color": "black"})
    $('.bloque_cards').css({"background-color": "#f7efe5"})
    $('.subBloques__subtitulos').css({"color": "#414b19"})
    $('.textos-cards').css({"color": "black"})
    $('.parrafos__texto').css({"color": "black"})
    $('.parrafos__subtitulos').css({"color": "black"})
    $('.grilla__bloques').css({"background-color": "#f7efe5"})
    $('label').css({"color": "black"})
    
})
