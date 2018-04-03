const tarifaMicro = 680;
const tarifaMetro = 780;
let saldoFinalMicro = 0;
let saldoFinalMetro = 0;
let  saldoReal = 0;
let codigoBip = 0; 
let tarifa_final_micro = 0; 
let tarifa_final_metro = 0; 
let Hora = 0;


$(document).ready(() => {
  /*$('#codigo').on('keypress', function(event){
  codigoBip = $('#codigo').val();
    if(event.which === 13){
    api(codigoBip)
    }
 });*/

$('#micro').click(function(){
  codigoBip = $('#codigo').val();
  api(codigoBip)
   });

$("#portafolio").click(function(){
  document.location.replace("https://gabycasti.github.io/portafolio/");
})


 

})


function api(codigoBip){
$.ajax({
        url: 'http://bip-servicio.herokuapp.com/api/v1/solicitudes.json',
        type: 'GET',
        datatype: 'json',
        data:{
          'bip': codigoBip
        }
      })
      .done(function(response){
        console.log(response);
        showInfo(response);
        actualizaReloj();
        $("#mostrar_saldo").removeClass('card-body');
        $("#mostrar_fecha").removeClass('card-body');
        $("#mostrar_saldo_micro").removeClass('card-body');
        $("#mostrar_saldo_metro").removeClass('card-body');
        $("#mostrar_saldo_microp").removeClass('card-body');
         $("#mostrar_saldo_metrop").removeClass('card-body');
        info();
      })
      .fail(function(error){
        console.log('error');
      })

}
//Función calcular saldo
function showInfo(info) {
     // Le saco el signo peso
  const fecha_actual = info.fechaSaldo;
  const saldoPeso = info.saldoTarjeta.split('$')[1];
  // Le saca el punto al 3000
  const saldoPunto = saldoPeso.split('.');
  saldoReal = parseInt(saldoPunto.join(''));
  $('#saldo').val(`${saldoReal}`);
  $('#fecha').val(`${fecha_actual}`);
 
}



//Función calcular hora

//Script del Reloj 
function actualizaReloj() {
// Capturamos la Hora, los minutos y los segundos 
const marcacion = new Date()
 $('#hora').html(`<h2>${Hora}</h2>`);
/* Capturamos la Hora */
Hora = marcacion.getHours()

tarifa_final_micro = tarifaMicro 
tarifa_final_metro = tarifaMetro 

if ((Hora >= 6 && Hora <= 9)|| (Hora >= 18 && Hora <= 21)) {
  tarifa_final_micro = tarifaMicro + 40;
  tarifa_final_metro = tarifaMetro + 100;
};

saldoFinalMicro= saldoReal - tarifa_final_micro;
saldoFinalMetro = saldoReal - tarifa_final_metro;

};


function info(){


    // limpiamos con empty que elimina cualquier cadena de texto en saldo
    $('#saldo_micro').empty();
    $('#saldo_micro').val(`${saldoFinalMicro}`);

    $('#saldo_metro').empty();
    $('#saldo_metro').val(`${saldoFinalMetro}`);

    // limpiamos con empty que elimina cualquier cadena de texto en saldo
    $('#saldo_final_micro').empty();
    $('#saldo_final_micro').val(`${tarifa_final_micro}`);

    $('#saldo_final_metro').empty();
    $('#saldo_final_metro').val(`${tarifa_final_metro}`);

};