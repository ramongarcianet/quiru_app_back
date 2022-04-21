import { limpiarCaries, DienteCaries } from "./OdontoJS"
import { listaDiccionario, listaPieza, guardar } from "./odonto.js"

var isSpeech = false;

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
        'agregar': agregarLista
    }
    annyang.addCallback('result', function (frase) {
        if (isSpeech) {
            //--Buscar palabra mas correcta del dictadado
            const comandoTemp = buscarPalabraCorrecta(frase);
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
                    if (comandoCompleto[0] === 'borrar') {
                        if (comandoCompleto[1] != undefined) {
                            eliminarDiente(comandoCompleto[1])
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
function agregarLista(param) {
    if (isSpeech || param === 'manual') {
        guardar()
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

function eliminarDiente(pieza) {
    if (isSpeech){
        let a=1;
    }
}
function buscarPalabraCorrecta(arrayFrase) {
    let listDiccionario = listaDiccionario.value;
    let listPieza = listaPieza.value;
    let firstWord = '';
    let secondWord = '';
    let uniqueWord = '';
    let palabraTemp = '';
    let codigoTemp = '';
    let piezaEncontrada = '';

    for (const item of listDiccionario) {
        if ((item.codigo.indexOf("/") > 0) || (item.codigo === 'pieza') || (item.codigo === 'borrar')) {
            if (item.codigo === 'pieza' || item.codigo === 'borrar') {
                //firt word
                for (let j = 0; j < arrayFrase.length; j++) {
                    palabraTemp = arrayFrase[j].trimLeft().replace(/\s/g, '/').split('/');
                    if (item.codigo === palabraTemp[0]) {
                        firstWord = item.codigo;
                        break;
                    }
                }
                //second word
                for (let j = 0; j < arrayFrase.length; j++) {
                    palabraTemp = arrayFrase[j].trimLeft().replace(/\s/g, '/').split('/');
                    piezaEncontrada = listPieza.filter((pieza) => pieza.codigo == palabraTemp[1]);
                    if (piezaEncontrada.length > 0) {
                        secondWord = piezaEncontrada[0].codigo;
                        break;
                    }
                }

            } else {
                codigoTemp = item.codigo.split('/');
                //firt word
                for (let j = 0; j < arrayFrase.length; j++) {
                    palabraTemp = arrayFrase[j].trimLeft().replace(/\s/g, '/').split('/');
                    if (codigoTemp[0] === palabraTemp[0]) {
                        firstWord = codigoTemp[0];
                        break;
                    }
                }
                //second word
                for (let j = 0; j < arrayFrase.length; j++) {
                    palabraTemp = arrayFrase[j].trimLeft().replace(/\s/g, '/').split('/');
                    if (codigoTemp[1] === palabraTemp[1]) {
                        secondWord = codigoTemp[1];
                        break;
                    }
                }
            }

        } else {
            //unique word
            for (let j = 0; j < arrayFrase.length; j++) {
                palabraTemp = arrayFrase[j].trimLeft().replace(/\s/g, '/').split('/');
                if (item.codigo === palabraTemp[0]) {
                    uniqueWord = item.codigo;
                    break;
                }
            }
        }
        if ((firstWord != '' && secondWord != '') || uniqueWord != '') {
            break;
        }
    }
    if (uniqueWord != '')
        return uniqueWord
    else
        if (firstWord != '' && secondWord != '') {
            return firstWord + '/' + secondWord;
        } else {
            return ''
        }
}
export {
    diagnostico,
    tratamiento,
    procesar,
    cerrar,
    limpiar,
    agregarLista,
    eliminarDiente
}