import { limpiarCaries,DienteCaries } from "./OdontoJS"

var fila = "";
var nro = 0;
var isSpeech = false;

function GetDemoDto() {

    $.ajax({
        type: "POST",
        url: "/Odontograma/GetDemoDto",
        contentType: "application/json; charset=utf-8",
        //data: JSON.stringify(oOrgano),
        success: function (d) {
            console.log(d)
        },
        error: function (d) {

        }
    });
}
function grabarOdontograma() {
    var employee = {}
    employee.Name = 'Juan'
    employee.Designation = 'Gerente'
    employee.Location = 'Milano'

    $.ajax({
        type: "POST",
        url: "/Odontograma/grabar",
        data: employee,
        success: function (response) {
            alert("Hello: " + response.name + ".\nCurrent Date and Time: " + response.fecha);
        },
        failure: function (response) {
            alert(response.responseText);
        },
        error: function (response) {
            alert(response.responseText);
        }
    });

}
//--ini speech recognition
if (annyang) {
    annyang.setLanguage("es-PE");
    var commands = {
        'hola': activarVoz,
        'oye kiru': activarVoz,
        'detener': detenerVoz,
        'diagnóstico': diagnostico,
        'tratamiento': tratamiento,
        'salir': cerrar,
        'grabar': grabar,
        'aceptar': aceptar
    }
    annyang.addCallback('result', function (frase) {
        if (isSpeech) {
            //--Buscar palabra mas correcta del dictadado
            const indiceCorrecto= buscarIndiceCorrecto(frase);
            const comandoTemp = frase[indiceCorrecto].trimLeft();
            let comando = comandoTemp;
            if (comando != 'detener') {
                if (comando != 'diagnóstico' && comando != 'tratamiento' && comando != 'salir') {
                    comando = comandoTemp.replace(/\s/g, '/');
                    const comandoCompleto = comando.split('/')
                    if (comandoCompleto[0] === 'hallazgo') {
                        limpiarCaries()
                        let comboHallazgo = document.getElementById('comboHallazgo');
                        comboHallazgo.value = comandoCompleto[1];
                    }
                    if (comandoCompleto[0] === 'pieza') {
                        limpiarCaries();
                        let comboPieza = document.getElementById('comboPieza');
                        comboPieza.value = comandoCompleto[1];
                    }
                    if (comandoCompleto[0] === 'caries') {
                        pintarDiente(comandoCompleto[1])
                    }
                    if (comandoCompleto[0] === 'limpiar') {
                        limpiarCaries();
                    }
                    if (comandoCompleto[0] === 'eliminar') {
                        if (comandoCompleto[2] != undefined) {
                            eliminarVoz(comandoCompleto[2])
                        }
                    }
                }

            }
        }
    });
    annyang.addCommands(commands);
    annyang.start();
}
//--fin speech recognition
function activarVoz() {
    isSpeech = true;//start
    btnActivar.style = "visibility: hidden;";
    btnEscuchando.style = "visibility:visible;";
}

function detenerVoz() {
    isSpeech = false;//stop
    btnActivar.style = "visibility: visible;";
    btnEscuchando.style = "visibility:hidden;";
}

function diagnostico(param) {
    if (param === 'manual') {
        headerVoz.style = "visibility: hidden;";
        divNuevo.style = "visibility: visible;";
        tipoReg.value = "0";
        var _tituloTratamiento = document.getElementById('tituloTratamiento');
        _tituloTratamiento.innerText = 'Registro de Diagnóstico';
        comboHallazgo.value = 'caries';
        limpiarCaries();
    } else
        if (isSpeech) {
            headerVoz.style = "visibility: hidden;";
            divNuevo.style = "visibility: visible;";
            tipoReg.value = "0";
            var _tituloTratamiento = document.getElementById('tituloTratamiento');
            _tituloTratamiento.innerText = 'Registro de Diagnóstico';
            comboHallazgo.value = 'caries';
            limpiarCaries();
        }
}

function tratamiento(param) {
    if (param === 'manual') {
        headerVoz.style = "visibility: hidden;";
        divNuevo.style = "visibility: visible;";
        tipoReg.value = "1";
        var _tituloTratamiento = document.getElementById('tituloTratamiento');
        _tituloTratamiento.innerText = 'Registro de Tratamiento';
        comboHallazgo.value = 'caries';
        limpiarCaries();
    } else
        if (isSpeech) {
            headerVoz.style = "visibility: hidden;";
            divNuevo.style = "visibility: visible;";
            tipoReg.value = "1";
            var _tituloTratamiento = document.getElementById('tituloTratamiento');
            _tituloTratamiento.innerText = 'Registro de Tratamiento';
            comboHallazgo.value = 'caries';
            limpiarCaries();
        }

}
function cerrar() {

    headerVoz.style = "visibility: visible;";
    divNuevo.style = "visibility: hidden;";
}
function limpiar() {
    if (isSpeech) {
        document.getElementById("inputDescription").value = '';
        document.getElementById("inputObservacion").value = '';
    }
}
function grabar(param) {
    grabarOdontograma();
    if (isSpeech || param === 'manual') {
        var tablaDetalle = document.getElementById('tablaDetalle');
        comboHallazgo = document.getElementById('comboHallazgo');
        var hallazgo = comboHallazgo.options[comboHallazgo.selectedIndex];
        comboPieza = document.getElementById('comboPieza');
        var pieza = comboPieza.options[comboPieza.selectedIndex];

        //hallazgo.value;  //hallazgo.text;
        //--buscar el diente k no exista en la tabla
        if (!buscarTabla(hallazgo.text, pieza.text)) {
            nro = nro + 1;
            fila += "<tr class='fila'><td>" + nro + "</td><td><img src='/images/tooth-solid.svg' style ='width:40%'/> </td><td>" + hallazgo.text + "</td><td>" + pieza.text + "</td> <td><button type='button' class='btn' onclick='eliminarManual(this)'><img src='/images/trash-can-solid.svg' style='width:40%' /></button> </td> </tr> ";
            tablaDetalle.innerHTML = fila;

        } else {
            $('#modalOdongramaDuplicado').modal('show');
        }
        //$('#listaDientesAgregar').append("<div class='JuicioTop' id='Diente18'>content</div>");
    }
}
function aceptar() {
    if (isSpeech) {
        // $('#modalOdongramaDuplicado').modal('hide');
    }
}

function procesar() {
    if (isSpeech) {
        btnActivar.style = "visibility: visible;";
        btnEscuchando.style = "visibility:hidden;";
        isSpeech = false; //stop
    } else {
        btnActivar.style = "visibility: hidden;";
        btnEscuchando.style = "visibility:visible;";
        isSpeech = true; //start
    }
}
function pintarDiente(posicion) {
    if (posicion === 'vestibular')
        DienteCaries('btntopcar');
    if (posicion === 'distal')
        DienteCaries('btnleftCar');
    if (posicion === 'oclusal')
        DienteCaries('btncenterCar');
    if (posicion === 'mesial')
        DienteCaries('btnrigthCar');
    if (posicion === 'palatino')
        DienteCaries('btnbotCar');

}
function buscarTabla(hallazgo, pieza) {
    var rows = document.getElementsByClassName("fila");
    var resultado = false;
    for (var i = 0; i < rows.length; i++) {
        var columna = rows[i].getElementsByTagName("td");
        var hallazgoTabla = columna[2].innerHTML.toLowerCase();
        var piezaTabla = columna[3].innerHTML.toLowerCase();
        if (hallazgoTabla == hallazgo.toLowerCase() && piezaTabla == pieza.toLowerCase()) {
            resultado = true;
            break;
        }
    }
    return resultado;

}

function terminar() {
    document.getElementById("btnDiagnostico").focus();
}
function eliminarManual(element) {
    document.getElementById("tablaDetalle").deleteRow(element.parentNode.parentNode.rowIndex - 1);
    var tablaDetalle = document.getElementById('tablaDetalle');

    var rows = document.getElementsByClassName("fila");
    fila = "";
    nro = 0
    for (var i = 0; i < rows.length; i++) {
        nro++;
        var columna = rows[i].getElementsByTagName("td");
        var hallazgoTabla = columna[2].innerHTML;
        var piezaTabla = columna[3].innerHTML;
        fila += "<tr class='fila'><td>" + nro + "</td><td><img src='/images/tooth-solid.svg' style ='width:40%'/> </td><td>" + hallazgoTabla + "</td><td>" + piezaTabla + "</td> <td><button type='button' class='btn' onclick='eliminarManual(this)'><img src='/images/trash-can-solid.svg' style='width:40%' /></button> </td> </tr> ";

    }
    tablaDetalle.innerHTML = fila;

}
function eliminarVoz(index) {
    document.getElementById("tablaDetalle").deleteRow(index - 1);
    var tablaDetalle = document.getElementById('tablaDetalle');

    var rows = document.getElementsByClassName("fila");
    fila = "";
    nro = 0
    for (var i = 0; i < rows.length; i++) {
        nro++;
        var columna = rows[i].getElementsByTagName("td");
        var hallazgoTabla = columna[2].innerHTML;
        var piezaTabla = columna[3].innerHTML;
        fila += "<tr class='fila'><td>" + nro + "</td><td><img src='/images/tooth-solid.svg' style ='width:40%'/> </td><td>" + hallazgoTabla + "</td><td>" + piezaTabla + "</td> <td><button type='button' class='btn' onclick='eliminarManual(this)'><img src='/images/trash-can-solid.svg' style='width:40%' /></button> </td> </tr> ";

    }
    tablaDetalle.innerHTML = fila;

}
function buscarIndiceCorrecto(arrayFrase) {
    let arrayClaves = ['detener','diagnóstico','tratamiento','salir','hallazgo','pieza','caries','limpiar','eliminar']
    let indiceCorrecto=-1;
    let palabraTemp= '';
    for (let i = 0; i< arrayClaves.length;i++ ){
        for (let j= 0; j< arrayFrase.length;j++) {
            palabraTemp = arrayFrase[j].trimLeft().replace(/\s/g, '/').split('/');
            if (arrayClaves[i] === palabraTemp[0]){
                indiceCorrecto = j;
                break;
            }
        }
        if (indiceCorrecto>-1){
            break;
        }
    }
    return indiceCorrecto;
}
export {
    diagnostico,
    tratamiento,
    procesar,
    cerrar,
    limpiar,
    grabar
}