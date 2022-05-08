import { ref } from 'vue';
import { limpiarCaries, DienteCaries, DienteAusente, DienteFracturado, clearcanvas, VerFormato as verOdontograma} from "./OdontoJS"
import { registro, listaDiccionario, listaPieza, listaHallazgo, listaCaries, guardar, eliminar } from "./odonto.js"
import router from '../config/router'
import '../assets/annyang.min'
const { push } = router;
const isSpeech = ref(false);
let recetaTemp = '';
let especificacionesTemp = '';
let observacionesTemp = '';
let flagAnnyang;
export let flagLimpiar = ref(false)
export const textoEscuchado = ref()
export const item = ref({
    diente: '00',
    hallazgo: "",
    pieza: []
})

export const listaDeDientes = [
    11, 12, 13, 14, 15, 16, 17, 18, 21, 22, 23, 24, 25, 26, 27, 28, 31, 32, 33,
    34, 35, 36, 37, 38, 41, 42, 43, 44, 45, 46, 47, 48, 51, 52, 53, 54, 55, 61,
    62, 63, 64, 65, 71, 72, 73, 74, 75, 81, 82, 83, 84, 85,
];
export const listaDeHallazgos = [
    { value: "caries", text: "Caries" },
    { value: "extraccion", text: "Extracción" },
    { value: "ausente", text: "Ausente" },
    { value: "fractura", text: "Fractura" },
    { value: "restauración", text: "Restauración" },
];
export const listaDeTipos = [
    { value: "vestibular", text: "Vestibular" },
    { value: "distal", text: "Distal" },
    { value: "oclusal", text: "Oclusal" },
    { value: "mesial", text: "Mesial" },
    { value: "palatino", text: "Palatino" },
];
//--ini speech recognition

if (annyang) {
    annyang.setLanguage("es-PE");
    /*var commands = {
        'hola': activarVoz,
        'hola quiru': activarVoz,
        'hola quiro': activarVoz,
        'hola quiero': activarVoz,
        'hola kiru': activarVoz,
        'hola kiro': activarVoz
    }*/
    annyang.addCallback('result', function (frase) {
        //if (isSpeech.value) {
        //---insertar texto en inputs
        /* let textoDictado = frase[0];
            let existeEnDiciionario = buscarDiccionario(textoDictado);
            if (existeEnDiciionario === 0) {
                let inputReceta = document.getElementById('inputReceta');
                if (inputReceta === document.activeElement) {
                    inputReceta.value = recetaTemp + ' ' + textoDictado;
                    recetaTemp = inputReceta.value;
                }
                let inputDescription = document.getElementById('inputDescription');
                if (inputDescription === document.activeElement) {
                    inputDescription.value = especificacionesTemp + ' ' + textoDictado;
                    especificacionesTemp = inputDescription.value;
                }
                let inputObservacion = document.getElementById('inputObservacion');
                if (inputObservacion === document.activeElement) {
                    inputObservacion.value = observacionesTemp + ' ' + textoDictado;
                    observacionesTemp = inputObservacion.value;
                }
                return;
            }*/
        //--Buscar palabra mas correcta del dictado
        const comandoTemp = buscarPalabraCorrecta(frase);
        let comando = comandoTemp;
        if (comando === 'hola') {
            activarVoz();
            return;
        }
        if (isSpeech.value) {
            textoEscuchado.value = frase;
            if (comando != '') {
                comando = comandoTemp.replace(/\s/g, '/');
                const comandoCompleto = comando.split('/')
                if (comandoCompleto[0] === 'detener') {
                    detenerVoz();
                }
                if (comandoCompleto[0] === 'agregar') {
                    agregarLista('voz');
                }
                if (comandoCompleto[0] === 'formato') {
                    verOdontograma();
                }
                if (comandoCompleto[0] === 'volver') {
                    volver();
                }
                if (['hallazgo'].indexOf(comandoCompleto[0]) > -1) {
                    item.value.hallazgo = comandoCompleto[1]
                    speak(comandoCompleto[0] + comandoCompleto[1])
                }
                if (comandoCompleto[0] === 'pieza') {
                    item.value.diente = comandoCompleto[1]
                    speak(comandoCompleto[0] + comandoCompleto[1])
                }
                if (comandoCompleto[0] === 'caries') {
                    item.value.pieza.push( comandoCompleto[1] )
                    speak(comandoCompleto[0] + comandoCompleto[1])
                }
                if (comandoCompleto[0] === 'limpiar') {
                    item.value = {
                        diente: '00',
                        hallazgo: "",
                        pieza: []
                    }
                    flagLimpiar.value = !flagLimpiar.value
                    speak(comandoCompleto[0])
                }
                if (comandoCompleto[0] === 'borrar') {
                    if (comandoCompleto[1] != undefined) {
                        eliminarDiente(comandoCompleto[1])
                    }
                }
                if (comandoCompleto[0] === 'receta') {
                    receta();
                }
                if (comandoCompleto[0] === 'especificaciones') {
                    especificaciones();
                }
                if (comandoCompleto[0] === 'observaciones') {
                    observaciones();
                }
                /*if (comandoCompleto[0] === 'terminar') {
                    terminar();
                }*/
            } else {
                //speak(frase[0] + ' ' + 'No existe en el diccionario')
            }
        }

        //}
    });
    annyang.addCallback('soundstart', function () {
        setTimeout(() => detenerInicializarVoz(), 2000);
        //if (isSpeech.value)
        console.log('sound detected');
    });
    annyang.addCallback('error', function () {
        console.log('There was an error!');
    });
    annyang.addCallback('errorNetwork', function () {
        console.log('errorNetwork');
    });
    annyang.addCallback('errorPermissionBlocked', function () {
        console.log('errorPermissionBlocked');
    });
    annyang.addCallback('errorPermissionDenied', function () {
        console.log('errorPermissionDenied');
    });
    /*
    annyang.addCallback('end', function () {
        console.log('end');
    });
    annyang.addCallback('start', function () {
        console.log('start');
    });*/

    //annyang.addCommands(commands);
    if (!flagAnnyang)
        flagAnnyang = annyang.start()
} else {
    console.log("Speech Recognition is not supported");
}
//--fin speech recognition
export function escucharInicializarVoz() {
    annyang.resume();
}
export function detenerInicializarVoz() {
    annyang.pause();
}
function activarVoz() {
    isSpeech.value = true;//start
    speak('hola')
}
function detenerVoz() {
    isSpeech.value = false;//stop
    speak('detener')
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
    const idOdontograma = router.currentRoute.value.params.idOdontograma;
    const existeDiente = registro.value.find(item => item.diente === item.value.pieza)
    if (!existeDiente) {
        guardar(idOdontograma, item.value);
        limpiar();
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
function volver() {
    push({ name: 'odontograma' })
}

function buscarPalabraCorrecta(arrayFrase) {
    let listDiccionario = listaDiccionario.value;
    let listPieza = listaDeDientes;
    let listHallazgo = listaDeHallazgos;
    let listCaries = listaDeTipos;
    let firstWord = '';
    let secondWord = '';
    let uniqueWord = '';
    let palabraTemp = '';
    let palabraTemp1 = '';
    let palabraTemp2 = '';
    let palabraEncontrada = '';

    for (const item of listDiccionario) {
        firstWord = '';
        secondWord = '';
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
                        const existe = listPieza.indexOf(Number(palabraTemp2))
                        if (existe > -1) {
                            secondWord = palabraTemp2;
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
                    if (firstWord === '') {
                        palabraTemp1 = arrayFrase[j].trimLeft().replace(/\s/g, '/').split('/')[0];
                        if (item.codigo === palabraTemp1.toLowerCase()) {
                            firstWord = item.codigo;
                        }
                    }
                    //second word
                    if (secondWord === '') {
                        palabraTemp2 = arrayFrase[j].trimLeft().replace(/\s/g, '/').split('/')[1];
                        palabraEncontrada = listCaries.filter((carie) => carie.value == palabraTemp2);
                        if (palabraEncontrada.length > 0) {
                            secondWord = palabraEncontrada[0].value;
                        }
                    }
                    if (firstWord != '' && secondWord != '') {
                        break
                    }
                }

            } else {//hallazgo
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
                        palabraEncontrada = listHallazgo.filter((hallazgo) => hallazgo.value == palabraTemp2);
                        if (palabraEncontrada.length > 0) {
                            secondWord = palabraEncontrada[0].value;
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
function buscarDiccionario(buscar) {
    let listDiccionario = listaDiccionario.value;
    let buscarTemp1 = buscar.trimLeft().replace(/\s/g, '/').split('/')[0].toLowerCase();
    let buscarTemp2 = buscar.trimLeft().toLowerCase();
    if (buscarTemp1 === 'hallazgo' || buscarTemp1 === 'pieza' || buscarTemp1 === 'borrar' || buscarTemp1 === 'caries') {
        return 1;
    } else {
        let palabraEncontrada = listDiccionario.filter((diccionario) => diccionario.codigo == buscarTemp2);
        return palabraEncontrada.length;
    }
}
function demoVoz(pieza, posicion) {
    let tempCaries = '';
    if (posicion === 'vestibular')
        tempCaries = 'btntopcar'
    if (posicion === 'distal')
        tempCaries = 'btnleftCar'
    if (posicion === 'oclusal')
        tempCaries = 'btncenterCar'
    if (posicion === 'mesial')
        tempCaries = 'btnrigthCar'
    if (posicion === 'palatino')
        tempCaries = 'btnbotCar'
    VerDemoVoz(pieza, tempCaries)
}
function limpiarDemo() {
    let comboHallazgo = document.getElementById('comboHallazgo');
    comboHallazgo.value = '';
    let comboHallazgoTipo = document.getElementById('comboHallazgoTipo');
    comboHallazgoTipo.value = '';
    let comboPieza = document.getElementById('comboPieza');
    comboPieza.value = '00';
    VerDemo('00');

}
let synth = window.speechSynthesis;
let voices = synth.getVoices();

function speak(pHablar) {
    console.log(annyang.isListening());
    detenerInicializarVoz()
    setTimeout(() => escucharInicializarVoz(), 2000);
    console.log(annyang.isListening());

    if (synth.speaking) {
        console.error('speechSynthesis.speaking');
        return;
    }
    if (pHablar !== '') {
        let utterThis = new SpeechSynthesisUtterance(pHablar);
        utterThis.voice = voices[8];
        utterThis.pitch = '1';
        utterThis.rate = '1';
        synth.speak(utterThis);

    }
    //escucharInicializarVoz();
    console.log(annyang.isListening());
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