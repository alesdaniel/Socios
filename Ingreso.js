window.onload= inicio; //Se aplica a la ventana

var inputBuscaSocio=document.getElementById("socioBuscado");
var inputDNI=document.getElementById("dniIngreso");
var inputNombre=document.getElementById("nombreIngreso");
var inputApellido=document.getElementById("apellidoIngreso");
var inputCategoria=document.getElementById("categoriaIngreso");
var inputRetiraIngreso=document.getElementById("retiraSocio");

var pieIngreso=document.getElementById("pieIngreso");

var btnBuscar=document.getElementById("btnBuscar");
var btnIngreso=document.getElementById("btnGrabar");
var btnRetirar=document.getElementById("btnRetirar");

var ingreso = {};  //Objeto
var ingresantes = []; //Array

var socio = {};  //Objeto
var socios = []; //Array
var pago = {};  //Objeto
var pagos = []; //Array

var cont = 0;
index = -1;

function inicio() { 

    //** Solo para reiniciar local storage */ 
    //localStorage.setItem("ingresoLS",JSON.stringify(ingresantes));
    //** */

    ingresantes = JSON.parse(localStorage.getItem("ingresoLS"));
    if (ingresantes.length == 0) { //Evita que socios quede en null cuando no hay nada grabado en local storage
      ingresantes = [];        
    }

    //Lee pagos y socios
    pagos = JSON.parse(localStorage.getItem("pagosLS"));
    if (pagos.length == 0) { //Evita que socios quede en null cuando no hay nada grabado en local storage
        pagos = [];        
    }

    socios = JSON.parse(localStorage.getItem("sociosLS"));
    if (socios.length == 0) { //Evita que socios quede en null cuando no hay nada grabado en local storage
        socios = [];        
    }    

    btnBuscar.addEventListener("click",buscar);
    btnIngreso.addEventListener("click",ingresoSocio);
    btnRetirar.addEventListener("click",retirar);
}

function retirar(){
  var idx = -1;  

  ingresantes.forEach(ingresaron => { 
      idx++;
    if (ingresaron.dni == inputRetiraIngreso.value) {
        ingresantes.splice(idx,1);
    }
  });

  listaIngresantes();  
}


function listaIngresantes() { 
  cont = 0;  
  var idx = 0;
  itemIngreso.innerHTML='';
  ingresantes.forEach(ingresaron => {
    var clienteBuscado=ingresantes.find((socio)=>{        
      if(socio.dni === ingresaron.dni) {
          return 1; 
      }
    });

    idx = socios.findIndex(function(socio) {
      return socio.dni === ingresaron.dni;
    });
    cont++; 
    
    itemIngreso.innerHTML+=`<th scope="col">${cont}</th>
    <th scope="col">${ingresaron.dni}</th>
    <th scope="col">${socios[idx].nombre +' '+socios[idx].apellido}</th>
    <th scope="col">${socios[idx].categoria}</th>`;
  }); 


}

function ingresoSocio() {
  var idx = 0;
  ingreso = {};
  inputDNI=document.getElementById("dniIngreso");
  console.log(inputDNI.value);
  var socioPago = pagos.find((pago) =>{
      if(pago.dni === inputDNI.value)
        return 1;
    })
  //console.log(socioPago); 

  idx = pagos.findIndex((p)=> {
    return p.dni == inputDNI.value;
  });

  if (idx < 0) {
    pieIngreso.innerHTML = `<p style="color: red">El Socio DNI nro:${inputDNI.value} NO posee la cuota al dia</p>`;
  } else {
    var existe=ingresantes.some((i)=>{
      if(i.dni===inputDNI.value){
        return 1;
      }
    });
    ingreso.dni = inputDNI.value; 
    if (existe) {
      pieIngreso.innerHTML = `<p style="color: DarkOrange ">El Socio DNI nro:${inputDNI.value} Ya esta en el evento</p>`;      
    } else {
      ingresantes.push(ingreso);
      console.log(existe);      
      pieIngreso.innerHTML = `<p style="color: green">El Socio DNI nro:${inputDNI.value} Ingreso correctamente</p>`;
    }
  }
  listaIngresantes();
}

function buscar() { 
    var socioBuscado = socios.find((socio) =>{
        if(socio.apellido === inputBuscaSocio.value)
          return 1;
      })
      if (socioBuscado != undefined) { //si es null es que no encontro nada
        index = socios.findIndex((socio)=>{
          return socio.apellido === inputBuscaSocio.value;
        });
        inputDNI.value=socioBuscado.dni;
        inputNombre.value=socioBuscado.nombre;
        inputApellido.value=socioBuscado.apellido;
        inputCategoria.value=socioBuscado.categoria;
        pieIngreso.innerHTML  ='';
        //cargaPagos        
      } else {
        pieIngreso.innerHTML  =`<p style="color: red">Socio no encontrado -> ${inputBuscaSocio.value}</p>`;
        inputDNI.value="";
        inputNombre.value="";
        inputApellido.value="";
        inputCategoria.value="";
      }      
}