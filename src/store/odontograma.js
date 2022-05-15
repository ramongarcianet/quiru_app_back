import { computed, ref } from 'vue';
import { limpiarCaries, DienteCaries, DienteAusente, DienteFracturado, clearcanvas} from "./OdontoJS"
import { listaDiccionario, listaPieza, listaHallazgo, listaCaries, guardar, eliminar } from "./odonto.js"
import {convertToText} from "./numeroLetras.js"
import router from '../config/router'
import comandosDeVoz from './comandosDeVoz';
import '../assets/annyang.min'
const { push } = router;
const isSpeech = ref(false);
let recetaTemp = '';
let especificacionesTemp = '';
let observacionesTemp = '';
let flagAnnyang;

export const verOdontograma = ref(true)
export let flagLimpiar = ref(false)
export const textoEscuchado = ref()

export const registro = ref([])

export const listaDeDientes = [
    [[[{diente: '18', clase:"raiz-3 "}, {diente:"17", clase:"raiz-3"}, {diente:"16", clase:"raiz-3"}, {diente:"15", clase:"raiz-1"}, {diente:"14", clase:"raiz-2"}, {diente:"13", clase:"raiz-1"}, {diente:"12", clase:"raiz-1"}, {diente:"11", clase:"raiz-1"}], [ {diente:"21", clase:"raiz-1"}, {diente:"22", clase:"raiz-1"}, {diente:"23", clase:"raiz-1"}, {diente:"24", clase:"raiz-2"}, {diente:"25", clase:"raiz-1 "}, {diente:"26", clase:"raiz-3 "}, {diente:"27", clase:"raiz-3 "}, {diente:"28", clase:"raiz-3 "},]],
    [[{diente:"55", clase:"raiz-3 "}, {diente:"54", clase:"raiz-3"}, {diente:"53", clase:"raiz-1"}, {diente:"52", clase:"raiz-1"}, {diente:"51", clase:"raiz-1"}], [{diente:"61", clase:"raiz-1"}, {diente:"62", clase:"raiz-1"}, {diente:"63", clase:"raiz-1"}, {diente:"64", clase:"raiz-3"}, {diente:"65", clase:"raiz-3"}]]],
    [[[{diente:"85", clase:"raiz-2 toDown"}, {diente:"84", clase:"raiz-2 toDown"}, {diente:"83", clase:"raiz-1 toDown"}, {diente:"82", clase:"raiz-1 toDown"}, {diente:"81", clase:"raiz-1 toDown"}], [{diente:"71", clase:"raiz-1 toDown"}, {diente:"72", clase:"raiz-1 toDown"}, {diente:"73", clase:"raiz-1 toDown"}, {diente:"74", clase:"raiz-2 toDown"}, {diente:"75", clase:"raiz-2 toDown"}]],
    [[{diente:"48", clase:"raiz-2 toDown"}, {diente:"47", clase:"raiz-2 toDown"}, {diente:"46", clase:"raiz-2 toDown" }, {diente:"45", clase:"raiz-1 toDown"}, {diente:"44", clase:"raiz-1 toDown"}, {diente:"43", clase:"raiz-1 toDown" }, {diente:"42", clase:"raiz-1 toDown" },{diente:"41", clase:"raiz-1 toDown"}], [{diente:"31", clase:"raiz-1 toDown"}, {diente:"32", clase:"raiz-1 toDown"}, {diente:"33", clase:"raiz-1 toDown"}, {diente:"34", clase:"raiz-1 toDown"}, {diente:"35", clase:"raiz-1 toDown"}, {diente:"36", clase:"raiz-2 toDown"}, {diente:"37", clase:"raiz-2 toDown"}, {diente:"38", clase:"raiz-2 toDown"}]]],
];

export const registro_ = computed(()=> 
    listaDeDientes.map( rows => 
        rows.map(row=> 
            row.map( col => 
                col.map( ({diente, clase}) =>  ({
                    diente,
                    clase,
                    hallazgos: registro.value.filter(i => i.diente == diente).map(({hallazgo, ubicacion}) => ({hallazgo, ubicacion}))
                }) )
            )   
        )
    )
)

export const item = ref({
    diente: '00',
    hallazgos: []
})


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
        textoEscuchado.value = frase
    })
    /*annyang.addCallback('result', function (frase) {

        const comandoTemp = buscarPalabraCorrecta(frase);
        let comando = comandoTemp;
        if (isSpeech.value) {
            textoEscuchado.value = frase;
            if (comando != '') {
                comando = comandoTemp.replace(/\s/g, '/');
                const comandoCompleto = comando.split('/')

               
                if (comandoCompleto[0] === 'receta') {
                    receta();
                }
                if (comandoCompleto[0] === 'especificaciones') {
                    especificaciones();
                }
                if (comandoCompleto[0] === 'observaciones') {
                    observaciones();
                }
                if (comandoCompleto[0] === 'terminar') {
                    terminar();
                }
            } else {
                //speak(frase[0] + ' ' + 'No existe en el diccionario')
            }
        }

        //}
    });*/

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
    flagAnnyang = annyang.start()
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
    comandosDeVoz.saludar()
}
export function detenerVoz() {
    annyang.removeCommands();
    annyang.addCommands(comandosDeVoz.conVozApagada)
    isSpeech.value = false;//stop
    comandosDeVoz.agradecer()
}

let synth = window.speechSynthesis;

let voices = synth.getVoices();
const convertirEnPalabra = num => convertToText(num.toString())

export function speak(pHablar) {

    if (synth.speaking) {
        console.error('speechSynthesis.speaking');
        return;
    }
    if (pHablar !== '') {
        const arregloDePalabras = pHablar.split(" ")
        const frase = arregloDePalabras.map( item => !Number(item) ? item : convertirEnPalabra(Number(item)) ).join(" ")
        const tiempoEnPausa = frase.length / 2 * 150
        detenerInicializarVoz()
        setTimeout(() => escucharInicializarVoz(), tiempoEnPausa);
        let utterThis = new SpeechSynthesisUtterance(pHablar);
        utterThis.voice = voices[8];
        utterThis.pitch = '1';
        utterThis.rate = '1';
        synth.speak(utterThis);

    }
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


export function agregarLista(param) {
    /* const idOdontograma = router.currentRoute.value.params.idOdontograma;
     const existeDiente = registro.value.find(item => item.diente === item.value.pieza)
     if (!existeDiente) {
         guardar(idOdontograma, item.value);
         limpiar();
     }*/
 }
function volver() {
    push({ name: 'odontograma' })
}

function buscarPalabraCorrecta(arrayFrase) {
    let listDiccionario = listaDiccionario.value;
    let listPieza = null;
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

export {
    diagnostico,
    tratamiento,
    limpiar,
    volver,
    isSpeech
}