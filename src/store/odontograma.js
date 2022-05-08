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
    { value: "extracción", text: "Extracción" },
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
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

if (annyang) {
 
    
    annyang.setLanguage("es-PE");
    
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
        
        if (isSpeech.value) {
            textoEscuchado.value = frase;
            if (comando != '') {
                comando = comandoTemp.replace(/\s/g, '/');
                const comandoCompleto = comando.split('/')
                
                if (comandoCompleto[0] === 'agregar') {
                    agregarLista('voz');
                }
                if (comandoCompleto[0] === 'formato') {
                    verOdontograma();
                }
                if (comandoCompleto[0] === 'volver') {
                    volver();
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
        //if (isSpeech.value)
        console.log('sound detected');
    });
    annyang.addCallback('error', function (e) {
        //console.log('There was an error!');
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
    const seleccionarHallazgo = val => {
        if (listaDeHallazgos.map(({value}) => value).indexOf(val) > -1) {
            item.value.hallazgo = val
            speak(`Hallazgo ${val}`)
        }
    }
    const seleccionarHallazgoPieza = (hallazgo, pieza) => {
        if (listaDeHallazgos.map(({value}) => value).indexOf(hallazgo) > -1 && listaDeDientes.find(item => item == pieza)) {
            item.value.hallazgo = hallazgo
            item.value.diente = pieza
            speak(`Hallazgo ${hallazgo} Pieza ${pieza}`)
        }
    }

    const seleccionarHallazgoTipoPieza = (hallazgo, tipo, pieza) => {
        if (listaDeHallazgos.map(({value}) => value).indexOf(hallazgo) > -1 && listaDeDientes.find(item => item == pieza) && listaDeTipos.map(({value}) => value).indexOf(tipo) > -1) {
            item.value.hallazgo = hallazgo
            item.value.pieza.push(tipo)
            item.value.diente = pieza
            console.log(item.value)
            speak(`Hallazgo ${hallazgo}, parte ${tipo} y Pieza ${pieza}`)
        }
    }
    const seleccionarPieza = val => {
        if (listaDeDientes.find(item => item == val) ) {
            item.value.diente = val
            speak(`Pieza ${val}`)
        }
    }

    const seleccionarTipos = val => {
        if (listaDeTipos.map(({value}) => value).indexOf(val) > -1) {
            const index = item.value.pieza.indexOf(val)
            if(index == -1) {
                item.value.pieza.push(val)
                speak(`Agregando ${val}`)
            } else {
                item.value.pieza.splice(index, 1)
                speak(`Quitando ${val}`)
            }
        }
    }
    const mellamo = ()=> {
        speak(`Yo soy Quiru, encantada de conocerte.`)
    }
    
  
    const limpiar = ()=> {
        item.value = {
            diente: '00',
            hallazgo: "",
            pieza: []
        }
        flagLimpiar.value = !flagLimpiar.value
        speak('Limpiando')
    }
    const commands = {
        'Buenos días': activarVoz,
        'Buenos días *any': activarVoz,
        'hola': activarVoz,
        'hola *any': activarVoz,
        'limpiar': limpiar,
        'limpiar *any': limpiar,
        'otra vez': limpiar,
        'otra vez *any': limpiar,
        'pieza :item': seleccionarPieza,
        'piezas :item': seleccionarPieza,
        'caries :item': seleccionarTipos,
        'carie :item': seleccionarTipos,
        'calle :item': seleccionarTipos,
        'parte :item': seleccionarTipos,
        'gracias': detenerVoz,
        'gracias *any': detenerVoz,
        'terminar': detenerVoz,
        'terminar *any': detenerVoz,
        'fin': detenerVoz,
        'fin *any': detenerVoz,
        'adios': detenerVoz,
        'adios *any': detenerVoz,
        'hallazgo :item': seleccionarHallazgo,
        'hallazgo :hallazgo (pieza) :pieza': seleccionarHallazgoPieza,
        'hallazgo :hallazgo (carie) (parte) :tipo (pieza) :pieza': seleccionarHallazgoTipoPieza,
        'cómo te llamas *any' : mellamo,
        'cómo te llamas' : mellamo,
    }
    
    
    annyang.addCommands(commands);
    flagAnnyang = annyang.start({ autoRestart: true, continuous: false })
    const colors = [
        'caries',    'extracción',    'ausente',    'fractura',    'restauración',    'vestibular', 
        'distal',    'oclusal',    'mesial',    'palatino',
        'pieza',
    ];
        const grammar = '#JSGF V1.0; grammar colors; public <color> = ' + colors.join(' | ') + ' ;'
    const test = annyang.getSpeechRecognizer()
    test.grammars.addFromString(grammar, 1);
    annyang.abort()

} else {
    console.log("Speech Recognition is not supported");
}
//--fin speech recognition
export function escucharInicializarVoz() {
    annyang.resume();
}
export function detenerInicializarVoz() {
    annyang.abort();
}
function activarVoz() {
    isSpeech.value = true;//start
    speak('Hola')
}
function detenerVoz() {
    isSpeech.value = false;//stop
    speak('Con gusto')
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


let synth = window.speechSynthesis;

let voices = synth.getVoices();

function speak(pHablar) {
    detenerInicializarVoz()
    setTimeout(() => escucharInicializarVoz(), 2000);
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