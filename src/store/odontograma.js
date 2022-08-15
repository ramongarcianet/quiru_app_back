import { computed, ref } from 'vue';
import { limpiarCaries, clearcanvas } from "./Canvas"
import { convertToText } from "./numeroLetras.js"
import router from '../config/router'
import comandosDeVoz from './comandosDeVoz';
import { item as itemodontograma } from './formodontograma';
import '../assets/annyang.min'
const { push } = router;
const isSpeech = ref(false);
let flagAnnyang;
export const resizeWindow = ref(1366)
export const verOdontograma = ref(true)
export let flagLimpiar = ref(false)
export const textoEscuchado = ref()
export const paginaOdontograma = ref(false);
export const listaDeDientes = [
    [[[{ diente: '18', clase: "raiz-3 " }, { diente: "17", clase: "raiz-3" }, { diente: "16", clase: "raiz-3" }, { diente: "15", clase: "raiz-1" }, { diente: "14", clase: "raiz-2" }, { diente: "13", clase: "raiz-1 toCenter" }, { diente: "12", clase: "raiz-1 toCenter" }, { diente: "11", clase: "raiz-1 toCenter" }], [{ diente: "21", clase: "raiz-1 toLeft toCenter" }, { diente: "22", clase: "raiz-1 toLeft toCenter" }, { diente: "23", clase: "raiz-1 toLeft toCenter" }, { diente: "24", clase: "raiz-2 toLeft" }, { diente: "25", clase: "raiz-1  toLeft" }, { diente: "26", clase: "raiz-3  toLeft" }, { diente: "27", clase: "raiz-3  toLeft" }, { diente: "28", clase: "raiz-3  toLeft" },]],
    [[{ diente: "55", clase: "raiz-3 " }, { diente: "54", clase: "raiz-3" }, { diente: "53", clase: "raiz-1 toCenter" }, { diente: "52", clase: "raiz-1 toCenter" }, { diente: "51", clase: "raiz-1 toCenter" }], [{ diente: "61", clase: "raiz-1 toLeft toCenter" }, { diente: "62", clase: "raiz-1 toLeft toCenter" }, { diente: "63", clase: "raiz-1 toLeft toCenter" }, { diente: "64", clase: "raiz-3 toLeft" }, { diente: "65", clase: "raiz-3 toLeft" }]]],
    [[[{ diente: "85", clase: "raiz-2 toDown" }, { diente: "84", clase: "raiz-2 toDown" }, { diente: "83", clase: "raiz-1 toDown toCenter" }, { diente: "82", clase: "raiz-1 toDown toCenter" }, { diente: "81", clase: "raiz-1 toDown toCenter" }], [{ diente: "71", clase: "raiz-1 toDown toLeft toCenter" }, { diente: "72", clase: "raiz-1 toDown toLeft toCenter" }, { diente: "73", clase: "raiz-1 toDown toLeft toCenter" }, { diente: "74", clase: "raiz-2 toDown toLeft" }, { diente: "75", clase: "raiz-2 toDown toLeft" }]],
    [[{ diente: "48", clase: "raiz-2 toDown" }, { diente: "47", clase: "raiz-2 toDown" }, { diente: "46", clase: "raiz-2 toDown" }, { diente: "45", clase: "raiz-1 toDown" }, { diente: "44", clase: "raiz-1 toDown" }, { diente: "43", clase: "raiz-1 toDown toCenter" }, { diente: "42", clase: "raiz-1 toDown toCenter" }, { diente: "41", clase: "raiz-1 toDown toCenter" }], [{ diente: "31", clase: "raiz-1 toDown toLeft toCenter" }, { diente: "32", clase: "raiz-1 toDown toLeft toCenter" }, { diente: "33", clase: "raiz-1 toDown toLeft toCenter" }, { diente: "34", clase: "raiz-1 toDown toLeft" }, { diente: "35", clase: "raiz-1 toDown toLeft" }, { diente: "36", clase: "raiz-2 toDown toLeft" }, { diente: "37", clase: "raiz-2 toDown toLeft" }, { diente: "38", clase: "raiz-2 toDown toLeft" }]]],
];

export const registro_ = computed(() =>
    listaDeDientes.map(rows =>
        rows.map(row =>
            row.map(col =>
                col.map(({ diente, clase }) => ({
                    diente,
                    clase,
                    hallazgos: (itemodontograma.value.hallazgos) ? itemodontograma.value.hallazgos.filter(i => i.diente == diente).map(({ hallazgo, ubicacion }) => ({ hallazgo, ubicacion })) : null
                }))
            )
        )
    )
)
export const Hallazgo = ref("")
export const item = ref({
    diente: '',
    hallazgos: []
})

if (annyang) {

    annyang.setLanguage("es-PE");
    annyang.addCallback('result', function (frase) {
        if (isSpeech.value)
            textoEscuchado.value = frase[0];
    })
    annyang.addCallback('soundstart', function () {
        if (isSpeech.value) {
            console.log('0');
        }
    });
    annyang.addCallback('error', function (e) {
        if (isSpeech.value){
            if (resizeWindow.value<500)
                alert('Permitir usar microfono')
        }
    });
    annyang.addCallback('errorNetwork', function () {
        if (isSpeech.value){
            console.log('2')
        }
    });
    annyang.addCallback('errorPermissionBlocked', function () {
        if (isSpeech.value){
            console.log('3')
        }
    });
    annyang.addCallback('errorPermissionDenied', function () {
        if (isSpeech.value){
            if (resizeWindow.value<500)
                alert('Reconectando al microfono')
        }
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
    if (paginaOdontograma.value) {
        annyang.removeCommands();
        annyang.addCommands(comandosDeVoz.conVozEncendida)
        isSpeech.value = true;
        comandosDeVoz.saludar()
        //console.log(annyang.getSpeechRecognizer());
    }
}
export function detenerVoz() {
    annyang.removeCommands();
    annyang.addCommands(comandosDeVoz.conVozApagada)
    isSpeech.value = false;//stop
    textoEscuchado.value = '';
    item.value = {
        diente: '',
        hallazgos: []
    }
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
        const frase = arregloDePalabras.map(item => !Number(item) ? item : convertirEnPalabra(Number(item))).join(" ")
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


export function activarMicro() {
    return activarMicro = function () {
        if (navigator.getUserMedia) {
            navigator.getUserMedia(
                { audio: true },//permitir solo audio
                function (stream) {

                },
                function (e) {

                }
            );

        } else { }
    }();

}
export {
    diagnostico,
    tratamiento,
    limpiar,
    volver,
    isSpeech
}