import { computed, ref } from 'vue';
import { limpiarCaries, DienteCaries, DienteAusente, DienteFracturado, clearcanvas} from "./OdontoJS"
import { listaDiccionario, listaPieza, listaHallazgo, listaCaries, guardar, eliminar } from "./odonto.js"
import {convertToText} from "./numeroLetras.js"
import router from '../config/router'
import comandosDeVoz from './comandosDeVoz';
import {item as itemodontograma} from './formodontograma';
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


export const listaDeDientes = [
    [[[{diente: '18', clase:"raiz-3 "}, {diente:"17", clase:"raiz-3"}, {diente:"16", clase:"raiz-3"}, {diente:"15", clase:"raiz-1"}, {diente:"14", clase:"raiz-2"}, {diente:"13", clase:"raiz-1 toCenter"}, {diente:"12", clase:"raiz-1 toCenter"}, {diente:"11", clase:"raiz-1 toCenter"}], [ {diente:"21", clase:"raiz-1 toLeft toCenter"}, {diente:"22", clase:"raiz-1 toLeft toCenter"}, {diente:"23", clase:"raiz-1 toLeft toCenter"}, {diente:"24", clase:"raiz-2 toLeft"}, {diente:"25", clase:"raiz-1  toLeft"}, {diente:"26", clase:"raiz-3  toLeft"}, {diente:"27", clase:"raiz-3  toLeft"}, {diente:"28", clase:"raiz-3  toLeft"},]],
    [[{diente:"55", clase:"raiz-3 "}, {diente:"54", clase:"raiz-3"}, {diente:"53", clase:"raiz-1 toCenter"}, {diente:"52", clase:"raiz-1 toCenter"}, {diente:"51", clase:"raiz-1 toCenter"}], [{diente:"61", clase:"raiz-1 toLeft toCenter"}, {diente:"62", clase:"raiz-1 toLeft toCenter"}, {diente:"63", clase:"raiz-1 toLeft toCenter"}, {diente:"64", clase:"raiz-3 toLeft"}, {diente:"65", clase:"raiz-3 toLeft"}]]],
    [[[{diente:"85", clase:"raiz-2 toDown"}, {diente:"84", clase:"raiz-2 toDown"}, {diente:"83", clase:"raiz-1 toDown toCenter"}, {diente:"82", clase:"raiz-1 toDown toCenter"}, {diente:"81", clase:"raiz-1 toDown toCenter"}], [{diente:"71", clase:"raiz-1 toDown toLeft toCenter"}, {diente:"72", clase:"raiz-1 toDown toLeft toCenter"}, {diente:"73", clase:"raiz-1 toDown toLeft toCenter"}, {diente:"74", clase:"raiz-2 toDown toLeft"}, {diente:"75", clase:"raiz-2 toDown toLeft"}]],
    [[{diente:"48", clase:"raiz-2 toDown"}, {diente:"47", clase:"raiz-2 toDown"}, {diente:"46", clase:"raiz-2 toDown" }, {diente:"45", clase:"raiz-1 toDown"}, {diente:"44", clase:"raiz-1 toDown"}, {diente:"43", clase:"raiz-1 toDown toCenter" }, {diente:"42", clase:"raiz-1 toDown toCenter" },{diente:"41", clase:"raiz-1 toDown toCenter"}], [{diente:"31", clase:"raiz-1 toDown toLeft toCenter"}, {diente:"32", clase:"raiz-1 toDown toLeft toCenter"}, {diente:"33", clase:"raiz-1 toDown toLeft toCenter"}, {diente:"34", clase:"raiz-1 toDown toLeft"}, {diente:"35", clase:"raiz-1 toDown toLeft"}, {diente:"36", clase:"raiz-2 toDown toLeft"}, {diente:"37", clase:"raiz-2 toDown toLeft"}, {diente:"38", clase:"raiz-2 toDown toLeft"}]]],
];

export const registro_ = computed(()=>
    listaDeDientes.map( rows =>
        rows.map(row=>
            row.map( col =>
                col.map( ({diente, clase}) =>  ({
                    diente,
                    clase,
                    hallazgos: (itemodontograma.value.hallazgos)?itemodontograma.value.hallazgos.filter(i => i.diente == diente).map(({hallazgo, ubicacion}) => ({hallazgo, ubicacion})):null
                }) )
            )
        )
    )
)
export const Hallazgo =ref("")
export const item = ref({
    diente: '00',
    hallazgos: []
})

export const listaDeDientesCombo = [
    { value: "18", text: "1.8" },
    { value: "17", text: "1.7" },
    { value: "16", text: "1.6" },
    { value: "15", text: "1.5" },
    { value: "14", text: "1.4" },
    { value: "13", text: "1.3" },
    { value: "12", text: "1.2" },
    { value: "11", text: "1.1" },
    { value: "21", text: "2.1" },
    { value: "22", text: "2.2" },
    { value: "23", text: "2.3" },
    { value: "24", text: "2.4" },
    { value: "25", text: "2.5" },
    { value: "26", text: "2.6" },
    { value: "27", text: "2.7" },
    { value: "28", text: "2.8" },
    { value: "55", text: "5.5" },
    { value: "54", text: "5.4" },
    { value: "53", text: "5.3" },
    { value: "52", text: "5.2" },
    { value: "51", text: "5.1" },
    { value: "65", text: "6.5" },
    { value: "64", text: "6.4" },
    { value: "63", text: "6.3" },
    { value: "62", text: "6.2" },
    { value: "61", text: "6.1" },
    { value: "85", text: "8.5" },
    { value: "84", text: "8.4" },
    { value: "83", text: "8.3" },
    { value: "82", text: "8.2" },
    { value: "81", text: "8.1" },
    { value: "75", text: "7.5" },
    { value: "74", text: "7.4" },
    { value: "73", text: "7.3" },
    { value: "72", text: "7.2" },
    { value: "71", text: "7.1" },
    { value: "48", text: "4.8" },
    { value: "47", text: "4.7" },
    { value: "46", text: "4.6" },
    { value: "45", text: "4.5" },
    { value: "44", text: "4.4" },
    { value: "43", text: "4.3" },
    { value: "42", text: "4.2" },
    { value: "41", text: "4.1" },
    { value: "38", text: "3.8" },
    { value: "37", text: "3.7" },
    { value: "36", text: "3.6" },
    { value: "35", text: "3.5" },
    { value: "34", text: "3.4" },
    { value: "33", text: "3.3" },
    { value: "32", text: "3.2" },
    { value: "31", text: "3.1" },
];

export const listaDeHallazgos = [
    { value: "caries", text: "Caries",sigla:"" },
    { value: "extracción", text: "Extracción",sigla:"" },
    { value: "ausente", text: "Ausente",sigla:"" },
    { value: "fractura", text: "Fractura",sigla:"" },
    { value: "restauración", text: "Restauración",sigla:"E" },
    { value: "hipoplasia", text: "Hipoplasia",sigla:"HP" },
    { value: "hipomineralizacion", text: "Hipo Mineralización",sigla:"HM" },
    { value: "opacidad", text: "Opacidad del Esmalte",sigla:"O" },
    { value: "decoloración", text: "Decoloración del Esmalte",sigla:"D" },
    { value: "fluorosis", text: "Fluorosis",sigla:"F" },
];
export const listaDeTipos = [
    { value: "vestibular", text: "Vestibular" },
    { value: "distal", text: "Distal" },
    { value: "oclusal", text: "Oclusal" },
    { value: "mesial", text: "Mesial" },
    { value: "palatino", text: "Palatino" },
    { value: "incisal", text: "Incisal" },
    { value: "lingual", text: "Lingual" },
];

if (annyang) {

    annyang.setLanguage("es-PE");
    annyang.addCallback('result', function (frase) {
        if(isSpeech.value)
            textoEscuchado.value = frase[0];
    })
    annyang.addCallback('soundstart', function () {
        if (isSpeech.value)
        {}
    });
    annyang.addCallback('error', function (e) {

    });
    annyang.addCallback('errorNetwork', function () {

    });
    annyang.addCallback('errorPermissionBlocked', function () {

    });
    annyang.addCallback('errorPermissionDenied', function () {

    });


    flagAnnyang = annyang.start()

    annyang.getSpeechRecognizer()?.grammars?.addFromString(comandosDeVoz?.gramatica, 1);
    annyang.addCommands(comandosDeVoz.conVozApagada)
} else {

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
    textoEscuchado.value = '';
    comandosDeVoz.agradecer()
}

let synth = window.speechSynthesis;

let voices = synth.getVoices();
const convertirEnPalabra = num => convertToText(num.toString())

export function speak(pHablar) {

    if (synth.speaking) {
        //console.error('speechSynthesis.speaking');
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
export function activarMicro (){
    return activarMicro = function()
    {
      if (navigator.getUserMedia){
          navigator.getUserMedia(
            {audio:true},//permitir solo audio
            function(stream) {

            },
            function(e) {

            }
          );

      } else {  }
    }();

}
export {
    diagnostico,
    tratamiento,
    limpiar,
    volver,
    isSpeech
}