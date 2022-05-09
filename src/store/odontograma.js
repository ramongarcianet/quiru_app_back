import { ref } from 'vue';
import { limpiarCaries, DienteCaries, DienteAusente, DienteFracturado, clearcanvas, VerFormato as verOdontograma} from "./OdontoJS"
import { registro, listaDiccionario, listaPieza, listaHallazgo, listaCaries, guardar, eliminar } from "./odonto.js"
import router from '../config/router'
import comandosDeVoz from './comandosDeVoz';
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

if (annyang) {
 
    annyang.setLanguage("es-PE");
    
    annyang.addCallback('result', function (frase) {
       
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
    flagAnnyang = annyang.start({ autoRestart: true, continuous: false })
    annyang.getSpeechRecognizer().grammars.addFromString(comandosDeVoz.gramatica, 1);
    annyang.addCommands(comandosDeVoz.conVozApagada)
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

export function activarVoz() {
    annyang.removeCommands();
    annyang.addCommands(comandosDeVoz.conVozEncendida)
    isSpeech.value = true;
    speak('Hola')
}
export function detenerVoz() {
    annyang.removeCommands();
    annyang.addCommands(comandosDeVoz.conVozApagada)
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

export function speak(pHablar) {
    //detenerInicializarVoz()
   // setTimeout(() => escucharInicializarVoz(), 2000);
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
    limpiar,
    agregarLista,
    eliminarDiente,
    volver,
    isSpeech
}