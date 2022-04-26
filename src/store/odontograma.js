import { ref } from 'vue';
import { limpiarCaries, DienteCaries, DienteAusente, DienteFracturado, clearcanvas,VerFormato } from "./OdontoJS"
import { registro, listaDiccionario, listaPieza, listaHallazgo, listaCaries, guardar, eliminar } from "./odonto.js"
import router from '../config/router'
const {push} = router;
const isSpeech  = ref(false);

//--ini speech recognition
if (annyang) {
    annyang.setLanguage("es-PE");
    var commands = {
        'hola': activarVoz
    }
    annyang.addCallback('result', function (frase) {
        if (isSpeech.value) {
        //--Buscar palabra mas correcta del dictadado
        const comandoTemp = buscarPalabraCorrecta(frase);
        let comando = comandoTemp;
       /* if (comando === 'hola') {
            activarVoz();
            return;
        }*/
        //if (isSpeech.value) {
            if (comando != '') {
                comando = comandoTemp.replace(/\s/g, '/');
                const comandoCompleto = comando.split('/')
                if (comandoCompleto[0] === 'detener') {
                    detenerVoz();
                }
                if (comandoCompleto[0] === 'diagnóstico') {
                    diagnostico('voz');
                }
                if (comandoCompleto[0] === 'tratamiento') {
                    tratamiento('voz');
                }
                if (comandoCompleto[0] === 'agregar') {
                    agregarLista('voz');
                }
                if (comandoCompleto[0] === 'formato') {
                    verFormato();
                }
                if (comandoCompleto[0] === 'volver') {
                    volver();
                }
                if (comandoCompleto[0] === 'hallazgo') {
                    limpiarCaries()
                    seleccionarHallazgo(comandoCompleto[1]);
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
        //}

        }
    });
    annyang.addCommands(commands);
    annyang.start();
}
//--fin speech recognition
function activarVoz() {
    isSpeech.value = true;//start
}
function detenerVoz() {
    isSpeech.value = false;//stop
}
function diagnostico(param) {
    if (isSpeech.value || (param === 'manual')) {
        headerVoz.style = "visibility: hidden;";
        tipoReg.value = "0";
        var _tituloTratamiento = document.getElementById('tituloTratamiento');
        _tituloTratamiento.innerText = 'Registro de Diagnóstico';
        comboHallazgo.value = 'caries';
        limpiarCaries();
    }
}

function tratamiento(param) {
    if (isSpeech.value || (param === 'manual')) {
        headerVoz.style = "visibility: hidden;";
        tipoReg.value = "1";
        var _tituloTratamiento = document.getElementById('tituloTratamiento');
        _tituloTratamiento.innerText = 'Registro de Tratamiento';
        comboHallazgo.value = 'caries';
        limpiarCaries();
    }
}

function limpiar() {
    let comboHallazgo = document.getElementById('comboHallazgo');
    comboHallazgo.value = 'caries';
    let comboPieza = document.getElementById('comboPieza');
    comboPieza.value = '11';
    limpiarCaries();
    clearcanvas("cvhallazgo");
}
function agregarLista(param) {
    let idOdontograma;
    if (param ==='voz'){
     idOdontograma = router.currentRoute.value.params.idOdontograma;
     param = idOdontograma;
    }
    let hallazgo = document.getElementById('comboHallazgo').value;
    let pieza = document.getElementById('comboPieza').value;
    const existeDiente = registro.value.find(item => item.diente === pieza &&  item.hallazgo === hallazgo)?.id
    if (existeDiente == undefined){
        guardar(param);
        limpiar();
    }
}
function verFormato(){
    VerFormato();
}
function seleccionarHallazgo(tipoHallazgo) {
    let comboHallazgo = document.getElementById('comboHallazgo');
    if (tipoHallazgo === 'extraccion') {
        DienteAusente("cvhallazgo", "red");
        comboHallazgo.value = tipoHallazgo;
    } else if (tipoHallazgo === 'ausente') {
        DienteAusente("cvhallazgo", "blue");
        comboHallazgo.value = tipoHallazgo;
    } else if (tipoHallazgo === 'fractura') {
        clearcanvas("cvhallazgo")
        DienteFracturado("cvhallazgo", "red");
        comboHallazgo.value = tipoHallazgo;
    } else {
        clearcanvas("cvhallazgo")
        comboHallazgo.value = tipoHallazgo;
    }
}
function procesar() {
    if (isSpeech.value) {
        isSpeech.value = false; //stop
    } else {
        isSpeech.value = true; //start
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
    const idDiente = registro.value.find(item => item.diente === pieza)?.id;
    eliminar(idDiente)
}
function volver(){
    push({name:'odontograma'})
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
    let palabraTemp1 = '';
    let palabraTemp2 = '';
    let palabraEncontrada = '';

    for (const item of listDiccionario) {
        if ((item.codigo === 'hallazgo') || (item.codigo === 'pieza') || (item.codigo === 'borrar') || (item.codigo === 'caries')) {
            if (item.codigo === 'pieza' || item.codigo === 'borrar') {
                for (let j = 0; j < arrayFrase.length; j++) {
                    //firt word
                    if (firstWord === '') {
                        palabraTemp1 = arrayFrase[j].trimLeft().replace(/\s/g, '/').split('/')[0];
                        if (item.codigo === palabraTemp1.toLowerCase()) {
                            firstWord = item.codigo;
                        }
                    }
                    //second word
                    if (secondWord === '') {
                        palabraTemp2 = arrayFrase[j].trimLeft().replace(/\s/g, '/').split('/')[1];
                        palabraEncontrada = listPieza.filter((pieza) => pieza.codigo == palabraTemp2);
                        if (palabraEncontrada.length > 0) {
                            secondWord = palabraEncontrada[0].codigo;
                        }
                    }
                    if (firstWord != '' && secondWord != '') {
                        break
                    }
                }

            } else if (item.codigo === 'caries') {
                //firt word
                for (let j = 0; j < arrayFrase.length; j++) {
                    //firt word
                    if (firstWord === ''){
                        palabraTemp1 = arrayFrase[j].trimLeft().replace(/\s/g, '/').split('/')[0];
                        if (item.codigo === palabraTemp1.toLowerCase()) {
                            firstWord = item.codigo;
                        }
                    }
                    //second word
                    if (secondWord === ''){
                        palabraTemp2 = arrayFrase[j].trimLeft().replace(/\s/g, '/').split('/')[1];
                        palabraEncontrada = listCaries.filter((carie) => carie.codigo == palabraTemp2);
                        if (palabraEncontrada.length > 0) {
                            secondWord = palabraEncontrada[0].codigo;
                        }
                    }
                    if (firstWord != '' && secondWord != '') {
                        break
                    }
                }

            } else {//hallazgo
                for (let j = 0; j < arrayFrase.length; j++) {
                    //firt word
                    if (firstWord === ''){
                        palabraTemp1 = arrayFrase[j].trimLeft().replace(/\s/g, '/').split('/')[0];
                        if (item.codigo === palabraTemp1.toLowerCase()) {
                            firstWord = item.codigo;
                        }
                    }
                    //second word
                    if (secondWord === '') {
                        palabraTemp2 = arrayFrase[j].trimLeft().replace(/\s/g, '/').split('/')[1];
                        palabraEncontrada = listHallazgo.filter((hallazgo) => hallazgo.codigo == palabraTemp2);
                        if (palabraEncontrada.length > 0) {
                            secondWord = palabraEncontrada[0].codigo;
                        }
                    }
                    if (firstWord != '' && secondWord != '') {
                        break
                    }
                }
            }

        } else {
            //unique word
            for (let j = 0; j < arrayFrase.length; j++) {
                palabraTemp = arrayFrase[j].trimLeft().replace(/\s/g, '/').split('/')[0];
                if (item.codigo === palabraTemp.toLowerCase()) {
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
    limpiar,
    agregarLista,
    eliminarDiente,
    volver,
    isSpeech
}