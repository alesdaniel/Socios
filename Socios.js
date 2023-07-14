// 

window.onload= inicio; //Se aplica a la ventana
//variables Input
var inputDNI=document.getElementById("dniSocio");
var inputNombre=document.getElementById("nombreSocio");
var inputApellido=document.getElementById("apellidoSocio");
var inputDireccion=document.getElementById("direccionSocio");
var inputEmail=document.getElementById("emailSocio");
var inputCiudad=document.getElementById("ciudadSocio"); 
var inputProvincia=document.getElementById("provinciaSocio");
var inputCP=document.getElementById("cpSocio");
var inputCategoria=document.getElementById("categoriaSocio");
var inputBuscaSocio=document.getElementById("SocioBuscado");

var pieSocio=document.getElementById("pieSocios");

//Variable Botones
var btnGrabar=document.getElementById("btnGrabar");
var btnAnterior=document.getElementById("btnAnterior");
var btnSiguiente=document.getElementById("btnSiguiente");
var btnBorrar=document.getElementById("btnBorrar");
var btnBuscar=document.getElementById("btnBuscar");

var socio = {};  //Objeto
var socios = []; //Array

index = -1;
max=0;

function inicio() {
    //** Solo para reiniciar local storage */ 
    //localStorage.setItem("sociosLS",JSON.stringify(socios));
    //** */

    //botones siguiente anterior
    btnAnterior.disabled=false;
    btnAnterior.disabled=true;
    //Lee Socios de local storage
    socios = JSON.parse(localStorage.getItem("sociosLS"));
    if (socios.length == 0) { //Evita que socios quede en null cuando no hay nada grabado en local storage
        socios = [];
        btnAnterior.disabled=false;
    }
    max=socios.length-1; //solo para evitar que de un error java script cuando index > maximo array
    btnGrabar.addEventListener("click",guardarSocio);
    btnSiguiente.addEventListener("click",sigienteSocio);
    btnAnterior.addEventListener("click",anteriorSocio);
    btnBorrar.addEventListener("click",borrarSocio);
    btnBuscar.addEventListener("click",buscarSocio);
}


function buscarSocio() { 
  var socioBuscado = socios.find((socio) =>{
    if(socio.apellido === inputBuscaSocio.value)
      return 1;
  })
  
  if (socioBuscado != null) { //si es null es que no encontro nada
    index = socios.findIndex((socio)=>{
      return socio.apellido === inputBuscaSocio.value;
    });
    inputDNI.value=socioBuscado.dni;
    inputNombre.value=socioBuscado.nombre;
    inputApellido.value=socioBuscado.apellido;
    inputDireccion.value=socioBuscado.direccion;
    inputEmail.value=socioBuscado.email;
    inputCiudad.value=socioBuscado.ciudad;
    inputProvincia.value=socioBuscado.provincia;
    inputCP.value=socioBuscado.cp;
    inputCategoria.value=socioBuscado.categoria;
  }
}

function borrarSocio(){
  socios.splice(index,1);
  localStorage.setItem("sociosLS",JSON.stringify(socios));
  max--;
  anteriorSocio(); //Opcion Grafica
}

function sigienteSocio(){
  index++;  
  if (index > max) {
    index=max;
    btnAnterior.disabled=false;     
  } else {
    inputDNI.value=socios[index].dni;
    inputNombre.value=socios[index].nombre;
    inputApellido.value=socios[index].apellido;
    inputDireccion.value=socios[index].direccion;
    inputEmail.value=socios[index].email;
    inputCiudad.value=socios[index].ciudad;
    inputProvincia.value=socios[index].provincia;
    inputCP.value=socios[index].cp;
    inputCategoria.value=socios[index].categoria;
    btnAnterior.disabled=false;
  }
}

function anteriorSocio(){
    index--;    
    if (index < 0) {      
      //btnAnterior.disabled=true;
      index=0;
    } else {
      inputDNI.value=socios[index].dni;      
      inputNombre.value=socios[index].nombre;
      inputApellido.value=socios[index].apellido;
      inputDireccion.value=socios[index].direccion;
      inputEmail.value=socios[index].email;
      inputCiudad.value=socios[index].ciudad;
      inputProvincia.value=socios[index].provincia;
      inputCP.value=socios[index].cp;
      inputCategoria.value=socios[index].categoria;      
    }
  }
  

function guardarSocio() { 
    socio = {};    

    inputDNI=document.getElementById("dniSocio");
    inputNombre=document.getElementById("nombreSocio");
    inputApellido=document.getElementById("apellidoSocio");
    inputDireccion=document.getElementById("direccionSocio");
    inputEmail=document.getElementById("emailSocio");
    inputCiudad=document.getElementById("ciudadSocio");
    inputProvincia=document.getElementById("provinciaSocio");
    inputCP=document.getElementById("cpSocio");
    inputCategoria=document.getElementById("categoriaSocio");
    //Busca a ver si hay alguien con ese nro de documento
    var existe=socios.some((socio)=>{
      if(socio.dni===inputDNI.value){
        return 1;
      }
    });
    
    
    if(!existe)    
    {
      socio.dni=inputDNI.value;
      socio.nombre=inputNombre.value;
      socio.apellido=inputApellido.value;
      socio.direccion=inputDireccion.value;
      socio.email=inputEmail.value;
      socio.ciudad=inputCiudad.value;
      socio.provincia=inputProvincia.value;
      socio.cp=inputCP.value;
      socio.categoria=inputCategoria.value;

      console.log(socio);
      socios.push(socio);
      
      //limpia pantalla
      inputDNI.value="";
      inputNombre.value="";
      inputApellido.value="";
      inputDireccion.value="";
      inputEmail.value="";
      inputCiudad.value="";
      inputProvincia.value="";
      inputCP.value="";
      inputCategoria.value="";
      //Graba Socios en local sotage
      localStorage.setItem("sociosLS",JSON.stringify(socios));
      btnAnterior.disabled=true;
      max=socios.length-1;
      pieSocio.innerHTML='<p style="color: green">Socio Grabado correctamente</p>';
    } else{
      pieSocio.innerHTML  =`<p style="color: red">Ya existe este DNI -> ${inputDNI.value}</p>`;
    }     
}