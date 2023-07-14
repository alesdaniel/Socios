window.onload= inicio; //Se aplica a la ventana

var inputDNI=document.getElementById("dniPago");
var inputNombre=document.getElementById("nombrePago");
var inputApellido=document.getElementById("apellidoPago");
var inputCategoria=document.getElementById("categoriaPago");
var inputBuscaSocio=document.getElementById("socioBuscado");
var inputMonto=document.getElementById("montoPago");

//Variables
var btnPagar=document.getElementById("btnPagar");
var btnBuscar=document.getElementById("btnBuscar");

var piePagos=document.getElementById("piePagos");
var itemPago=document.getElementById("itemPago"); 

var pago = {};  //Objeto
var pagos = []; //Array

var socio = {};  //Objeto
var socios = []; //Array
var cont = 0;
index = -1;

function inicio() {
    //** Solo para reiniciar local storage */ 
    //localStorage.setItem("pagosLS",JSON.stringify(pagos));
    //** */

    pagos = JSON.parse(localStorage.getItem("pagosLS"));
    if (pagos.length == 0) { //Evita que socios quede en null cuando no hay nada grabado en local storage
        pagos = [];        
    }

    socios = JSON.parse(localStorage.getItem("sociosLS"));
    if (socios.length == 0) { //Evita que socios quede en null cuando no hay nada grabado en local storage
        socios = [];        
    }    
    
    btnBuscar.addEventListener("click",buscar);
    btnPagar.addEventListener("click",pagar);
    cargaPagos();
}

function buscar() {    
    
    var socioBuscado = socios.find((socio) =>{
        if(socio.apellido === inputBuscaSocio.value)
          return 1;
      })
      console.log(socioBuscado);  
      if (socioBuscado != undefined) { //si es null es que no encontro nada
        index = socios.findIndex((socio)=>{
          return socio.apellido === inputBuscaSocio.value;
        });
        inputDNI.value=socioBuscado.dni;
        inputNombre.value=socioBuscado.nombre;
        inputApellido.value=socioBuscado.apellido;
        inputCategoria.value=socioBuscado.categoria;
        piePagos.innerHTML  ='';
        //cargaPagos        
      } else {
        piePagos.innerHTML  =`<p style="color: red">Socio no encontrado -> ${inputBuscaSocio.value}</p>`;
      }
}


//Graba Pago
function pagar() {
  pago = {};

  inputDNI=document.getElementById("dniPago");
  inputMonto=document.getElementById("montoPago");

  inputNombre=document.getElementById("nombrePago");
  inputApellido=document.getElementById("apellidoPago");

  pago.dni = inputDNI.value;
  pago.monto = inputMonto.value;  

  pagos.push(pago);
  localStorage.setItem("pagosLS",JSON.stringify(pagos));
  cont++; 
  itemPago.innerHTML+=`<th scope="col">${cont}</th>
                      <th scope="col">${inputDNI.value}</th>
                      <th scope="col">${inputNombre.value +' '+inputApellido.value}</th>
                      <th scope="col">$ ${inputMonto.value}</th>`;
 
  inputDNI.value='';
  inputMonto.value='';
  inputNombre.value='';
  inputApellido.value='';
  inputBuscaSocio.value='';
}

function cargaPagos(){ 
  cont = 0;  
  var idx = 0;

  pagos.forEach(pagoRegistrado => {
    //Carga los pagos registrados en tabla 
    // *No controla pagos duplicados ni montos de cuotas
    var clienteBuscado=socios.find((socio)=>{        
      if(socio.dni === pagoRegistrado.dni) {
          return 1; //Error en resulado false re ver
      }
    });

    idx = socios.findIndex(function(socio) {
      return socio.dni === pagoRegistrado.dni;
    });
    cont++; 
    
    itemPago.innerHTML+=`<th scope="col">${cont}</th>
    <th scope="col">${pagoRegistrado.dni}</th>
    <th scope="col">${socios[idx].nombre +' '+socios[idx].apellido}</th>
    <th scope="col">$ ${pagoRegistrado.monto}</th>`;
  }); 
}