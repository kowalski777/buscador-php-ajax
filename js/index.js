
$(function(){
  var Casas = {
    formulario: $('#formulario'),
    $btnTodos: $('#mostrarTodos'),
    colContenido: $('.colContenido'),

    Init: function(){
      var self = this
      self.cargarSelect()
      self.cargarTodos()
      self.formulario.submit(function(e){
        e.preventDefault()
        self.searchBienes()
      })
    },
    cargarSelect: function(){
      $('select').material_select()
    },
    searchBienes: function(e){
      var self = this
      var ciudad = $('form').find('select[id="selectCiudad"]').val()
      var tipo = $('form').find('select[id="selectTipo"]').val()
      var from = self.toNumero($('.irs-from').text())
      var to = self.toNumero($('.irs-to').text())

      var datos = {ciudad: ciudad, tipo: tipo, from: from, to: to}
      self.ajaxData(datos)
    },
    cargarTodos: function(){
      var self = this
      self.$btnTodos.on('click', (e)=>{
        var datos = {todos: ""}
        self.ajaxData(datos)
      })
    },
    ajaxData: function(datos){
      var self = this
      $.ajax({
        url: 'buscador.php',
        type: 'POST',
        data: datos
      }).done(function(data){
        var newData = JSON.parse(data)
        self.renderBienes(newData)
      })
    },
    toNumero: function(num){
      var numero = num
      var newNumero = Number(numero.replace('$', '').replace(',', '').replace(' ', ''))
      return newNumero
    },
    renderBienes: function(casas){
      var self = this
      var casa = casas
      self.colContenido.html('')

      casa.map((casa)=>{
        var bienTemplate = '<div class="itemMostrado card horizontal">'+
                                '<img src="img/home.jpg">'+
                              '<div class="card-stacked">'+
                                '<div class="card-content">'+
                                  '<div>'+
                                    '<b>Direccion: </b>:direccion:<p></p>'+
                                  '</div>'+
                                  '<div>'+
                                    '<b>Ciudad: </b>:ciudad:<p></p>'+
                                  '</div>'+
                                  '<div>'+
                                    '<b>Telefono: </b>:telefono:<p></p>'+
                                  '</div>'+
                                  '<div>'+
                                    '<b>Código postal: </b>:codigo_postal:<p></p>'+
                                  '</div>'+
                                  '<div>'+
                                    '<b>Precio: </b>:precio:<p></p>'+
                                  '</div>'+
                                  '<div>'+
                                    '<b>Tipo: </b>:tipo:<p></p>'+
                                  '</div>'+
                                '</div>'+
                                '<div class="card-action right-align">'+
                                  '<a href="#">Ver más</a>'+
                                '</div>'+
                              '</div>'+
                            '</div>';

        var newCasa = bienTemplate.replace(':direccion:', casa.Direccion)
                                  .replace(':ciudad:', casa.Ciudad)
                                  .replace(':telefono:', casa.Telefono)
                                  .replace(':codigo_postal:', casa.Codigo_Postal)
                                  .replace(':precio:', casa.Precio)
                                  .replace(':tipo:', casa.Tipo)
        self.colContenido.append(newCasa)
      })
    }
  }
  Casas.Init()
})





//  Creación de una función personalizada para jQuery que detecta cuando se detiene el scroll en la página

$.fn.scrollEnd = function (callback, timeout) {
  $(this).scroll(function () {
    var $this = $(this);
    if ($this.data('scrollTimeout')) {
      clearTimeout($this.data('scrollTimeout'));
    }
    $this.data('scrollTimeout', setTimeout(callback, timeout));
  });
};
/*
  Función que inicializa el elemento Slider
*/

function inicializarSlider() {
  $("#rangoPrecio").ionRangeSlider({
    type: "double",
    grid: false,
    min: 0,
    max: 100000,
    from: 200,
    to: 80000,
    prefix: "$"
  });
}

/*
  Función que reproduce el video de fondo al hacer scroll, y deteiene la reproducción al detener el scroll
*/
function playVideoOnScroll() {
  var ultimoScroll = 0,
    intervalRewind;
  var video = document.getElementById('vidFondo');
  $(window)
    .scroll((event) => {
      var scrollActual = $(window).scrollTop();
      if (scrollActual > ultimoScroll) {
        video.play();
      } else {
        //this.rewind(1.0, video, intervalRewind);
        video.play();
      }
      ultimoScroll = scrollActual;
    })
    .scrollEnd(() => {
      video.pause();
    }, 10)
}



inicializarSlider();
playVideoOnScroll();


/*

//selectCiudad();
//selecTipo();

$(document).ready(function(){

  $("#mostrarTodos").click(function(){

  $.ajax({
    url: "data-1.json",
    type: 'GET',
    dataType: "json",})

    .then(function(datos) {
    for (i in datos) {
    var obj = datos[i];
    $('.colContenido').append('<div class="row">\
                                      <div class="info-uno col l4 left"><img src="img/home.jpg"></div>\
                                      <div class="info-dos col l8 right">\
                                        <div class="blck-txt">\
                                          <div class="col l12"><b>Direccion:</b>   '+obj.Direccion+'</div> \
                                          <div class="col l12"><b>Ciudad:</b>   '+obj.Ciudad+'</div>\
                                          <div class="col l12"><b>Telefono:</b>   '+obj.Telefono+'</div>\
                                          <div class="col l12"><b>Codigo Postal:</b>   '+obj.Codigo_Postal+'</div>\
                                          <div class="col l12"><b>Tipo:</b>   '+obj.Tipo+'</div>\
                                          <div class="col l12"><b>Precio:</b>   '+obj.Precio+'</div>\
                                        </div>\
                                      </div>\
                                 </div>');
      }
    });
  });
});

$("#submitButton").click(function(){

  var ciudad = $("#selectCiudad").val();
  var tipo = $("#selectTipo").val();
  var precio = $("#rangoPrecio").val();
  $.post("buscador.php", { ciudad: ciudad, tipo: tipo, precio: precio })
  alert(ciudad +"  "+ tipo+"  "+precio)

    $.ajax({
    url: "data-1.json",
    type: 'GET',
    dataType: "json", })

    .then(function(dat) {
      var resp = (dat)
       for (j in dat) {
        
       if (dat.Ciudad == ciudad){
            alert(dat.Ciudad)
      }
     }
    });
  });




function selectCiudad() {
  $.ajax({
    url: "./lista.php",
    type: 'GET',
    success: function (datos) {

      datos = JSON.parse(datos)

        for (i in datos) {
        //console.log(datos[i])
        $("#selectCiudad").append(`<option value="${datos[i]}" >${datos[i]}</option>`);
        $("select").material_select();
        }
    }
  });
}

function selecTipo() {
  $.ajax({
    url: "./tipo.php",
    type: 'GET',
    success: function (datos) {

      datos = JSON.parse(datos)

      for (i in datos) {
        //console.log(datos[i])
        $("#selectTipo").append(`<option value="${datos[i]}" >${datos[i]}</option>`);
        $("select").material_select();
      }
    }
  });
}
*/