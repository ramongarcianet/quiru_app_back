import { ref } from 'vue';
import { limpiarCaries, DienteCaries,DienteAusente,DienteFracturado,clearcanvas } from "./OdontoJS"
import { registro, listaDiccionario, listaPieza,listaHallazgo,listaCaries,guardar, eliminar } from "./odonto.js"

var isSpeech = false;

//--ini speech recognition
if (annyang) {
    annyang.setLanguage("es-PE");
    var commands = {
        'hola': activarVoz,
        'detener': detenerVoz,
        'diagnóstico': diagnostico,
        'tratamiento': tratamiento,
        'salir': cerrar,
        'agregar': agregarLista,
    }
    annyang.addCallback('result', function (frase) {
        if (isSpeech) {
            //--Buscar palabra mas correcta del dictadado
            const comandoTemp = buscarPalabraCorrecta(frase);
            let comando = comandoTemp;
            if (comando != 'detener') {
                if (comando != 'hola' && comando != 'diagnóstico' && comando != 'tratamiento' && comando != 'salir' && comando != 'agregar') {
                    comando = comandoTemp.replace(/\s/g, '/');
                    const comandoCompleto = comando.split('/')
                    if (comandoCompleto[0] === 'hallazgo') {
                        limpiarCaries()
                        let comboHallazgo = document.getElementById('comboHallazgo');
                        if (comandoCompleto[1] ==='extraccion') {
                            DienteAusente("cvhallazgo", "red");
                            comboHallazgo.value = comandoCompleto[1];
                        } else  if (comandoCompleto[1] ==='ausente') {
                            DienteAusente("cvhallazgo", "blue");
                            comboHallazgo.value = comandoCompleto[1];
                        } else if (comandoCompleto[1] ==='fractura') {
                            clearcanvas("cvhallazgo")
                            DienteFracturado("cvhallazgo", "red");
                            comboHallazgo.value = comandoCompleto[1];
                        } else {
                            clearcanvas("cvhallazgo")
                            comboHallazgo.value = comandoCompleto[1];
                        }
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
                        limpiar();
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
    if (isSpeech || (param === 'manual')) {
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
    if (isSpeech || (param === 'manual')) {
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
        let comboHallazgo = document.getElementById('comboHallazgo');
        comboHallazgo.value = 'caries';
        let comboPieza = document.getElementById('comboPieza');
        comboPieza.value = '1.1';
        limpiarCaries();
        clearcanvas("cvhallazgo");
    }
}
function agregarLista(param) {
    if (isSpeech || param === 'manual') {
        guardar();
        limpiar();
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
   const idDiente= registro.value.find( item  => item.diente===pieza)?.id;
   eliminar(idDiente)
}
function buscarPalabraCorrecta(arrayFrase) {
    let listDiccionario = listaDiccionario.value;
    let listPieza = listaPieza.value;
    let listHallazgo = listaHallazgo.value;
    let listCaries = listaCaries.value;
    let firstWord = '';
    let secondWord = '';
    let uniqueWord = '';
    let palabraTemp = '';
    let palabraEncontrada = '';

    for (const item of listDiccionario) {
        if ((item.codigo === 'hallazgo') || (item.codigo === 'pieza') || (item.codigo === 'borrar') || (item.codigo === 'caries')) {
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
                    palabraEncontrada = listPieza.filter((pieza) => pieza.codigo == palabraTemp[1]);
                    if (palabraEncontrada.length > 0) {
                        secondWord = palabraEncontrada[0].codigo;
                        break;
                    }
                }

            } else if (item.codigo === 'caries') {
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
                    palabraEncontrada = listCaries.filter((carie) => carie.codigo == palabraTemp[1]);
                    if (palabraEncontrada.length > 0) {
                        secondWord = palabraEncontrada[0].codigo;
                        break;
                    }
                }

            } else {//hallazgo
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
                    palabraEncontrada = listHallazgo.filter((hallazgo) => hallazgo.codigo == palabraTemp[1]);
                    if (palabraEncontrada.length > 0) {
                        secondWord = palabraEncontrada[0].codigo;
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