
export function ChangeHallazgo(event) {
    clearcanvas("cvhallazgo")
    if (event.target.value=="extraccion"){
        DienteAusente("cvhallazgo", "red");
    }
    else if (event.target.value=="ausente"){
        DienteAusente("cvhallazgo", "blue");
    }
    else if (event.target.value=="fractura"){
        DienteFracturado("cvhallazgo", "red");
    }
    return false;
}
export function clearcanvas(id) {
    var canvas = document.getElementById(id);
    var contexto = canvas.getContext("2d");
	contexto.clearRect(0, 0, canvas.width, canvas.height);
}
export function DienteAusente(id, color) {
    var canvas = document.getElementById(id);
    if (canvas && canvas.getContext) {
    var ctx = canvas.getContext("2d");
        if (ctx) {
            ctx.lineWidth = 5;
            ctx.strokeStyle = color;
            ctx.beginPath();
            ctx.moveTo(20, 150);
            ctx.lineTo(130, 20);
            ctx.moveTo(40, 20);
            ctx.lineTo(140, 150);
            ctx.stroke();
        }
    }
            return false;
    }

export function DienteFracturado(id, color) {
        var canvas = document.getElementById(id);
        if (canvas && canvas.getContext) {
        var ctx = canvas.getContext("2d");
            if (ctx) {
                ctx.lineWidth = 5;
                ctx.strokeStyle = color;
                ctx.beginPath();
                ctx.moveTo(40, 20);
                ctx.lineTo(140, 150);
                ctx.stroke();
            }
        }
                return false;
}

export function DienteCaries(value) {
    var _control = document.getElementById(value);
    var tipoReg= document.getElementById("tipoReg");
    var stle="width: 100%; height:60px;";
    var clor="";
    if (tipoReg.value == "1") {
        clor="background-color: blue;";
    }
    else{
        clor="background-color: red;";
    }
    if (value == "btnleftCar") {
        piezaleftCar.value="1";
    }
    if (value == "btncenterCar") {
        piezacenterCar.value="1";
    }
    if (value == "btnrigthCar") {
        piezarigthCar.value="1";
    }
    if (value == "btntopcar") {
        piezatopcar.value="1";
        stle=stle + "border-radius: 90% 90% 0% 0%;";
    }
    if (value == "btnbotCar") {
        piezabotCar.value="1";
        stle=stle +"border-radius: 0% 0% 90% 90%;";
    }
    _control.style = stle +clor;  
    return false;
}

export function limpiarCaries() {
    var stle="width: 100%; height:60px;";
    document.getElementById("btntopcar").style =stle + "border-radius: 90% 90% 0% 0%;";
    document.getElementById("btnleftCar").style=stle;
    document.getElementById("btncenterCar").style=stle;
    document.getElementById("btnrigthCar").style=stle;
    document.getElementById("btnbotCar").style=stle + " border-radius: 0% 0% 90% 90%;";
    return false;
}

export function VerFormato() {
     var canvas = document.getElementById('myCanvas');
     var context = canvas.getContext('2d');
     context.font = '8pt Calibri';
     context.textAlign = 'center';
     context.fillStyle = 'blue';
     var medida = 23;
     var separacion_x = 15;
     var iniciar_x = 0;

     var x=0;
     iniciar_x=0;
     var arr = ['18', '17','16','15','14','13','12','11','21','22','23','24','25','26','27','28'];
     arr.forEach(function(entry) {
        iniciar_x=iniciar_x+28;    
        dibuja_contorno(context, iniciar_x, 20, medida, separacion_x, 10);
        context.fillText(entry, iniciar_x + 13, 15);
      }, this);
      iniciar_x=0;
      arr = ['1', '1','1','55','54','53','52','51','61','62','63','64','65','1','1','1'];
      arr.forEach(function(entry) {
         iniciar_x=iniciar_x+28; 
         if(entry !="1")   {
         dibuja_contorno(context, iniciar_x, 60, medida, separacion_x, 10);
         context.fillText(entry, iniciar_x + 13, 56);
         }
       }, this);
       iniciar_x=0;
      arr = ['1', '1','1','85','84','83','82','81','71','72','73','74','75','1','1','1'];
      arr.forEach(function(entry) {
         iniciar_x=iniciar_x+28; 
         if(entry !="1")   {
         dibuja_contorno(context, iniciar_x, 100, medida, separacion_x, 10);
         context.fillText(entry, iniciar_x + 13, 135);
         }
       }, this);
       iniciar_x=0;
       arr = ['48', '47','46','45','44','43','42','41','31','32','33','34','35','36','37','38'];
       arr.forEach(function(entry) {
          iniciar_x=iniciar_x+28; 
          if(entry !="1")   {
          dibuja_contorno(context, iniciar_x, 140, medida, separacion_x, 10);
          context.fillText(entry, iniciar_x + 13, 185);
          }
        }, this);
}

function dibuja_contorno(context, inicio_x, inicio_y, med, separacion_x, separacion_y){
    var ctx = context;
    // Definiendo puntos de dibujo
    var cua = med/4;
    var ter = cua*3;
    var color_line = 'black';
    /* 1ra zona */
    if(ctx){
        ctx.strokeStyle = color_line;
        ctx.beginPath();
        ctx.moveTo(inicio_x,inicio_y);
        ctx.lineTo(med+inicio_x,inicio_y);
        ctx.lineTo(ter+inicio_x,cua+inicio_y);
        ctx.lineTo(cua+inicio_x,cua+inicio_y);
        ctx.closePath();
        ctx.stroke();
    }
    /* 2da zona */
    if(ctx){
        ctx.strokeStyle = color_line;
        ctx.beginPath();
        ctx.moveTo(ter+inicio_x,cua+inicio_y);
        ctx.lineTo(med+inicio_x,inicio_y);
        ctx.lineTo(med+inicio_x,med+inicio_y);
        ctx.lineTo(ter+inicio_x,ter+inicio_y);
        ctx.closePath();
        ctx.stroke();
    }
    /* 3ra zona */
    if(ctx){
        ctx.strokeStyle = color_line;
        ctx.beginPath();
        ctx.moveTo(cua+inicio_x,ter+inicio_y);
        ctx.lineTo(ter+inicio_x,ter+inicio_y);
        ctx.lineTo(med+inicio_x,med+inicio_y);
        ctx.lineTo(inicio_x,med+inicio_y);
        ctx.closePath();
        ctx.stroke();
    }
    /* 4ta zona */
    if(ctx){
        ctx.strokeStyle = color_line;
        ctx.beginPath();
        ctx.moveTo(inicio_x,inicio_y);
        ctx.lineTo(cua+inicio_x,cua+inicio_y);
        ctx.lineTo(cua+inicio_x,ter+inicio_y);
        ctx.lineTo(inicio_x,med+inicio_y);
        ctx.closePath();
        ctx.stroke();
    }
    marcar_extraccion(ctx, inicio_x, med,inicio_y);
    
}
 // Funcion para sombrear diente completo
 function marcar_extraccion(contexto, inicio_x,medida,inicio_y){
    var ctx = contexto;
    // Definiendo puntos de dibujo
    var med = medida;
    //alert(num_diente);
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.moveTo(inicio_x,inicio_y);
    ctx.lineTo(inicio_x+23,inicio_y+23);
    ctx.moveTo(inicio_x+23,inicio_y);
    ctx.lineTo(inicio_x,inicio_y+23);
    ctx.stroke();
    ctx.lineWidth = 1;
}
