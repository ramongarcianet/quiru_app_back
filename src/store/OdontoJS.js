import {obtenerTodos} from '../store/odonto'
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
    else if (event.target.value=="caries"){
        var tipoReg= document.getElementById("tipoReg")
        tipoReg.value="0"
    }
    else if (event.target.value=="restauración"){
        var tipoReg= document.getElementById("tipoReg")
        tipoReg.value="1"
    }
    return false;
}
export function clearcanvas(id) {
    var canvas = document.getElementById(id);
    var contexto = canvas.getContext("2d");
	contexto.clearRect(0, 0, canvas.width, canvas.height);

    document.getElementById("comboHallazgo").value=""
    //document.getElementById("comboHallazgoTipo").value=""
    document.getElementById("comboPieza").value="00"
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
    var _className="button-diente";
    if (tipoReg.value == "1") {
        _className="button-blue";
    }
    else{
        _className="button-red";
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
    }
    if (value == "btnbotCar") {
        piezabotCar.value="1";
    }
    _control.className = _className;
    return false;
}
export function limpiarCaries() {
    var stle="width: 100%; height:60px;";
    document.getElementById("btntopcar").style =stle + "border-radius: 90% 90% 0% 0%;";
    document.getElementById("btnleftCar").style=stle;
    document.getElementById("btncenterCar").style=stle;
    document.getElementById("btnrigthCar").style=stle;
    document.getElementById("btnbotCar").style=stle + " border-radius: 0% 0% 90% 90%;";
    piezaleftCar.value="0";
    piezacenterCar.value="0";
    piezarigthCar.value="0";
    piezatopcar.value="0";
    piezabotCar.value="0";
    return false;
}

export function VerFormato(registro) {
     var canvas = document.getElementById('myCanvas');
     var context = canvas.getContext('2d');
     context.font = '8pt Calibri';
     context.textAlign = 'center';
     context.fillStyle = 'blue';
     var medida = 23;
     var separacion_x = 15;
     var iniciar_x = 0;
     var inicio_y=0;
     var x=0;
     iniciar_x=0;
     var arr = ['18', '17','16','15','14','13','12','11','21','22','23','24','25','26','27','28'];
     arr.forEach(function(entry) {
        iniciar_x=iniciar_x+28;
        inicio_y=75;
        context.fillText(entry, iniciar_x + 10, 45);
        dibuja_contorno(context, iniciar_x, inicio_y, medida, entry,registro);
        marcar_ControlTop(context, iniciar_x-12,inicio_y-75,medida);
        if(entry=="18" ||entry=="17" || entry=="16" || entry=="28" ||entry=="27" || entry=="26"){
            marcar_cabecera(context, iniciar_x, medida,inicio_y,"black","top_tri");
        }
        else if(entry=="13" ||entry=="12" || entry=="11" || entry=="21" ||entry=="22" || entry=="23"){
            marcar_cabecera(context, iniciar_x, medida,inicio_y,"black","top");
        }
        else if(entry=="15" || entry=="25"){
            marcar_cabecera(context, iniciar_x, medida,inicio_y,"black","top_one");
        }
        else if(entry=="14" || entry=="24"){
            marcar_cabecera(context, iniciar_x, medida,inicio_y,"black","top_duo");
        }
        context.fillStyle = 'blue';
      }, this);
      iniciar_x=0;
      arr = ['1', '1','1','55','54','53','52','51','61','62','63','64','65','1','1','1'];
      arr.forEach(function(entry) {
         iniciar_x=iniciar_x+28;
         if(entry !="1")   {
            inicio_y=180;
            context.fillText(entry, iniciar_x + 10, 150);
            dibuja_contorno(context, iniciar_x, inicio_y, medida, entry,registro);
            if(entry=="55" ||entry=="54" || entry=="28" ||entry=="64" || entry=="65"){
                marcar_cabecera(context, iniciar_x, medida,inicio_y,"black","top_tri");
            }
            else{

                marcar_cabecera(context, iniciar_x, medida,inicio_y,"black","top");
            }
            marcar_ControlTop(context, iniciar_x-12,inicio_y-75,medida);
            context.fillStyle = 'blue';
         }
       }, this);
       iniciar_x=0;
      arr = ['1', '1','1','85','84','83','82','81','71','72','73','74','75','1','1','1'];
      arr.forEach(function(entry) {
         iniciar_x=iniciar_x+28;
         if(entry !="1")   {
            inicio_y=213;
            context.fillText(entry, iniciar_x + 10, 270);
            dibuja_contorno(context, iniciar_x, inicio_y, medida, entry,registro);

            if(entry=="85" ||entry=="84" ||entry=="74" || entry=="75"){
                marcar_cabecera(context, iniciar_x, medida,inicio_y+ 47,"black","bot_duo");
            }
            else{

                marcar_cabecera(context, iniciar_x, medida,inicio_y + 47,"black","bot");
            }
            marcar_ControlBot(context, iniciar_x-12,inicio_y+50,medida);
            context.fillStyle = 'blue';
         }
       }, this);
       iniciar_x=0;
       arr = ['48', '47','46','45','44','43','42','41','31','32','33','34','35','36','37','38'];
       arr.forEach(function(entry) {
          iniciar_x=iniciar_x+28;
          if(entry !="1")   {
            inicio_y=315;
            context.fillText(entry, iniciar_x + 10, 372);
            dibuja_contorno(context, iniciar_x, inicio_y, medida, entry,registro);
            if(entry=="48" ||entry=="47" ||entry=="46" || entry=="36" || entry=="37" || entry=="38"){
                marcar_cabecera(context, iniciar_x, medida,inicio_y+ 47,"black","bot_duo");
            }
            else if(entry=="41" ||entry=="42" ||entry=="43" || entry=="31" || entry=="32" || entry=="33"){

                marcar_cabecera(context, iniciar_x, medida,inicio_y + 47,"black","bot");
            }
            else if(entry=="44" ||entry=="45" || entry=="34" || entry=="35"){

                marcar_cabecera(context, iniciar_x, medida,inicio_y + 47,"black","bot_one");
            }
            marcar_ControlBot(context, iniciar_x-12,inicio_y+50,medida);
            context.fillStyle = 'blue';
          }
        }, this);
}
function dibuja_contorno(context, inicio_x, inicio_y, med, pieza, registro){
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
    registro.forEach(element => {
        if(element.diente==pieza){
            if (element.hallazgo=="extraccion"){
                marcar_linea(ctx, inicio_x, med,inicio_y,"red","");
            }
            else if (element.hallazgo=="ausente"){
                marcar_linea(ctx, inicio_x, med,inicio_y,"blue","");
            }
            else if (element.hallazgo=="fractura"){
                marcar_linea(ctx, inicio_x, med,inicio_y,"red","fractura");
            }
            else if (element.hallazgo=="caries"){
                var piezas = element.pieza;
                var datos = piezas.split(",");
                var seccion=0;
                datos.forEach(item => {
                    if (item=="Vestibular"){
                        seccion=1;
                    }
                    if (item=="Distal"){
                        seccion=4;
                    }
                    if (item=="Oclusal"){
                        seccion=5;
                    }
                    if (item=="Mesial"){
                        seccion=2;
                    }
                    if (item=="Palatino"){
                        seccion=3;
                    }
                    dibuja_seccion(ctx, pieza, seccion, "red",med,inicio_x,inicio_y)
                });

            }
            else if (element.hallazgo=="restauración"){
                var piezas = element.pieza;
                var datos = piezas.split(",");
                var seccion=0;
                datos.forEach(item => {
                    if (item=="Vestibular"){
                        seccion=1;
                    }
                    if (item=="Distal"){
                        seccion=4;
                    }
                    if (item=="Oclusal"){
                        seccion=5;
                    }
                    if (item=="Mesial"){
                        seccion=2;
                    }
                    if (item=="Palatino"){
                        seccion=3;
                    }
                    dibuja_seccion(ctx, pieza, seccion, "blue",med,inicio_x,inicio_y)
                });
            }
        }
    });
    context.fillStyle = 'blue';
}
function marcar_cabecera(contexto, inicio_x,medida,inicio_y,color, tipo){
    var ctx = contexto;
    var med = medida;
    ctx.beginPath();
    //ctx.lineWidth = 3;
    ctx.strokeStyle = color;
    if(tipo=="bot")
    {
        ctx.moveTo(inicio_x,inicio_y-25);
        ctx.lineTo(inicio_x+10,inicio_y);
        ctx.moveTo(inicio_x+23,inicio_y-25);
        ctx.lineTo(inicio_x+10,inicio_y);
    }
    else  if(tipo=="top")
    {
        ctx.moveTo(inicio_x+10,inicio_y-25);
        ctx.lineTo(inicio_x+23,inicio_y);
        ctx.moveTo(inicio_x+10,inicio_y-25);
        ctx.lineTo(inicio_x,inicio_y);
    }
    else  if(tipo=="top_one")
    {
        ctx.moveTo(inicio_x+10,inicio_y-25);
        ctx.lineTo(inicio_x+17,inicio_y);
        ctx.moveTo(inicio_x+10,inicio_y-25);
        ctx.lineTo(inicio_x+5,inicio_y);
    }
    else  if(tipo=="top_duo")
    {
        ctx.moveTo(inicio_x+15,inicio_y-25);
        ctx.lineTo(inicio_x+22,inicio_y);
        ctx.moveTo(inicio_x+15,inicio_y-25);
        ctx.lineTo(inicio_x+12,inicio_y);
        ctx.moveTo(inicio_x+5,inicio_y-25);
        ctx.lineTo(inicio_x+12,inicio_y);
        ctx.moveTo(inicio_x+5,inicio_y-25);
        ctx.lineTo(inicio_x,inicio_y);


    }
    else  if(tipo=="top_tri")
    {
        ctx.moveTo(inicio_x+5,inicio_y-25);
        ctx.lineTo(inicio_x+10,inicio_y);
        ctx.moveTo(inicio_x+5,inicio_y-25);
        ctx.lineTo(inicio_x,inicio_y);

        ctx.moveTo(inicio_x+20,inicio_y-25);
        ctx.lineTo(inicio_x+23,inicio_y);
        ctx.moveTo(inicio_x+20,inicio_y-25);
        ctx.lineTo(inicio_x+10,inicio_y);

        ctx.moveTo(inicio_x+10,inicio_y-25);
        ctx.lineTo(inicio_x+15,inicio_y-10);
        ctx.moveTo(inicio_x+10,inicio_y-25);
        ctx.lineTo(inicio_x +7,inicio_y-10);
    }
    else  if(tipo=="bot_duo")
    {
        ctx.moveTo(inicio_x,inicio_y-25);
        ctx.lineTo(inicio_x+5,inicio_y);
        ctx.moveTo(inicio_x+12,inicio_y-25);
        ctx.lineTo(inicio_x+15,inicio_y);

        ctx.moveTo(inicio_x+12,inicio_y-25);
        ctx.lineTo(inicio_x+5,inicio_y);
        ctx.moveTo(inicio_x+23,inicio_y-25);
        ctx.lineTo(inicio_x+15,inicio_y);
    }
    else if(tipo=="bot_one")
    {
        ctx.moveTo(inicio_x+5,inicio_y-25);
        ctx.lineTo(inicio_x+10,inicio_y);
        ctx.moveTo(inicio_x+17,inicio_y-25);
        ctx.lineTo(inicio_x+10,inicio_y);
    }
    ctx.stroke();
    ctx.lineWidth = 1;
}
function marcar_ControlTop(ctx, inicio_x,inicio_y,med){
    var cua = med/2;
    var ter = cua*3;
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.moveTo(cua+inicio_x,cua+inicio_y);
    ctx.lineTo(ter+inicio_x,cua+inicio_y);
    ctx.lineTo(ter+inicio_x,ter+inicio_y);
    ctx.lineTo(cua+inicio_x,ter+inicio_y);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = 'black';
    ctx.stroke();
}
 function marcar_linea(contexto, inicio_x,medida,inicio_y,color, tipo){
    var ctx = contexto;
    var med = medida;
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.strokeStyle = color;
    ctx.moveTo(inicio_x,inicio_y);
    ctx.lineTo(inicio_x+23,inicio_y+23);
    if(tipo !="fractura"){
        ctx.moveTo(inicio_x+23,inicio_y);
        ctx.lineTo(inicio_x,inicio_y+23);
    }
    ctx.stroke();
    ctx.lineWidth = 1;
}
function dibuja_seccion(contexto, num_diente, seccion, color_pas,medida,inicio_x,inicio_y){
    var ctx = contexto;
    var med = medida;
    var cua = med/4;
    var ter = cua*3;
    var color_line = color_pas;
    if (seccion==1){
        if(ctx){
            ctx.fillStyle = color_line;
            ctx.beginPath();
            ctx.moveTo(inicio_x,inicio_y);
            ctx.lineTo(med+inicio_x,inicio_y);
            ctx.lineTo(ter+inicio_x,cua+inicio_y);
            ctx.lineTo(cua+inicio_x,cua+inicio_y);
            ctx.closePath();
            ctx.fill();
            ctx.strokeStyle = 'black';
            ctx.stroke();
        }
    }
    /* 2da zona */
    if (seccion==2){
        if(ctx){
            ctx.fillStyle = color_line;
            ctx.beginPath();
            ctx.moveTo(ter+inicio_x,cua+inicio_y);
            ctx.lineTo(med+inicio_x,inicio_y);
            ctx.lineTo(med+inicio_x,med+inicio_y);
            ctx.lineTo(ter+inicio_x,ter+inicio_y);
            ctx.closePath();
            ctx.fill();
            ctx.strokeStyle = 'black';
            ctx.stroke();
        }
    }
    /* 3ra zona */
    if (seccion==3){
        if(ctx){
            ctx.fillStyle = color_line;
            ctx.beginPath();
            ctx.moveTo(cua+inicio_x,ter+inicio_y);
            ctx.lineTo(ter+inicio_x,ter+inicio_y);
            ctx.lineTo(med+inicio_x,med+inicio_y);
            ctx.lineTo(inicio_x,med+inicio_y);
            ctx.closePath();
            ctx.fill();
            ctx.strokeStyle = 'black';
            ctx.stroke();
        }
    }
    /* 4ta zona */
    if (seccion==4){
        if(ctx){
            ctx.fillStyle = color_line;
            ctx.beginPath();
            ctx.moveTo(inicio_x,inicio_y);
            ctx.lineTo(cua+inicio_x,cua+inicio_y);
            ctx.lineTo(cua+inicio_x,ter+inicio_y);
            ctx.lineTo(inicio_x,med+inicio_y);
            ctx.closePath();
            ctx.fill();
            ctx.strokeStyle = 'black';
            ctx.stroke();
        }
    }
    /* 5ta zona(medio) */
    if (seccion==5){
        if(ctx){
            ctx.fillStyle = color_line;
            ctx.beginPath();
            ctx.moveTo(cua+inicio_x,cua+inicio_y);
            ctx.lineTo(ter+inicio_x,cua+inicio_y);
            ctx.lineTo(ter+inicio_x,ter+inicio_y);
            ctx.lineTo(cua+inicio_x,ter+inicio_y);
            ctx.closePath();
            ctx.fill();
            ctx.strokeStyle = 'black';
            ctx.stroke();
        }
    }
}
function marcar_ControlBot(ctx, inicio_x,inicio_y,med){
    var cua = med/2;
    var ter = cua*3;
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.moveTo(cua+inicio_x,cua+inicio_y);
    ctx.lineTo(ter+inicio_x,cua+inicio_y);
    ctx.lineTo(ter+inicio_x,ter+inicio_y);
    ctx.lineTo(cua+inicio_x,ter+inicio_y);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = 'black';
    ctx.stroke();
}
function dibuja_contornoDemo(context, inicio_x, inicio_y, med, pieza, registro,HallazgoTipo){
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
    if (registro=="extraccion"){
        marcar_lineaLanding(ctx, inicio_x, med,inicio_y,"red","");
    }
    else if (registro=="ausente"){
        marcar_lineaLanding(ctx, inicio_x, med,inicio_y,"blue","");
    }
    else if (registro=="fractura"){
        marcar_lineaLanding(ctx, inicio_x, med,inicio_y,"red","fractura");
    }
    else if (registro=="caries"){
        var item = HallazgoTipo;
        var seccion=0;
        if (item=="vestibular"){
            seccion=1;
        }
        if (item=="distal"){
            seccion=4;
        }
        if (item=="oclusal"){
            seccion=5;
        }
        if (item=="mesial"){
            seccion=2;
        }
        if (item=="palatino"){
            seccion=3;
        }
        dibuja_seccion(ctx, pieza, seccion, "red",med,inicio_x,inicio_y)
    }
    else if (registro=="restauración"){
        var item = HallazgoTipo;
        var seccion=0;
        if (item=="vestibular"){
            seccion=1;
        }
        if (item=="distal"){
            seccion=4;
        }
        if (item=="oclusal"){
            seccion=5;
        }
        if (item=="mesial"){
            seccion=2;
        }
        if (item=="palatino"){
            seccion=3;
        }
        dibuja_seccion(ctx, pieza, seccion, "blue",med,inicio_x,inicio_y)
    }
    context.fillStyle = 'blue';
}
function marcar_lineaLanding(contexto, inicio_x,medida,inicio_y,color, tipo){
    var ctx = contexto;
    var med = medida;
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.strokeStyle = color;
    ctx.moveTo(inicio_x,inicio_y);
    ctx.lineTo(inicio_x+150,inicio_y+150);
    if(tipo !="fractura"){
        ctx.moveTo(inicio_x+150,inicio_y);
        ctx.lineTo(inicio_x,inicio_y+150);
    }
    ctx.stroke();
    ctx.lineWidth = 1;
}

export function VerTipoCaries(event){
    if (event.target.value=="caries" || event.target.value=="restauración"){
        cTipCaries.style = "";
    }
    else{
        cTipCaries.style = "visibility: hidden;";
    }
    VerDemo(comboPieza.value);
}
export function VerDataTipoCaries(){
    VerDemo(comboPieza.value);
}