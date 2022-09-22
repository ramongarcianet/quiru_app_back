import { item, verOdontograma, detenerVoz, activarVoz, speak, flagLimpiar } from './odontograma'
import { listaDeTipos, listaDeHallazgos } from '../config/Parametros';
import { item as itemodontograma, actualizarDetalle, existeDiente, agregarLista } from './formodontograma';
import escenarios from '../config/Escenarios.json';
const seleccionarHallazgo = hallazgo => actualizarItem(hallazgo, false, false)

const seleccionarHallazgoPieza = (hallazgo, pieza) => actualizarItem(hallazgo, false, pieza)

const seleccionarHallazgoTipoPieza = (hallazgo, ubicacion, pieza) => actualizarItem(hallazgo, ubicacion, pieza)

const seleccionarPieza = pieza => actualizarItem(false, false, pieza)

const seleccionarTipos = ubicacion => actualizarItem(false, ubicacion, false)


const seleccionarPiezaHallazgo = (diente, hallazgo) => actualizarItem(hallazgo, false, diente)
const seleccionarPiezaHallazgoUbicacion = (diente, hallazgo, ubicacion) => actualizarItem(hallazgo, ubicacion, diente)

const seleccionarHallazgoCaries = () => actualizarItem('caries', false, false)
const seleccionarHallazgoCariesUbicacion = ubicacion => actualizarItem('caries', ubicacion, false)
const seleccionarHallazgoCariesUbicacionPieza = (ubicacion, pieza) => actualizarItem('caries', ubicacion, pieza)

const seleccionarHallazgoRestauracion = () => actualizarItem('restauración', false, false)
const seleccionarHallazgoRestauracionUbicacion = (ubicacion) => actualizarItem('restauración', ubicacion, false)
const seleccionarHallazgoRestauracionUbicacionPieza = (ubicacion, pieza) => actualizarItem('restauración', ubicacion, pieza)

const seleccionarHallazgoFractura = () => actualizarItem('fractura', false, false)
const seleccionarHallazgoFracturaPieza = (pieza) => actualizarItem('fractura', false, pieza)

const seleccionarHallazgoAusente = () => actualizarItem('ausente', false, false)
const seleccionarHallazgoAusentePieza = (pieza) => actualizarItem('ausente', false, pieza)

const seleccionarHallazgoExtraccion = () => actualizarItem('extracción', false, false)
const seleccionarHallazgoExtraccionPieza = (pieza) => actualizarItem('extracción', false, pieza)

const saludar = () => speak('Hola, soy Quiru, tu nuevo asistente de voz odontológico')
const queSabesHacer = () => speak('Yo me encargo del registro de tus odontogramas: diagnóstico y tratamiento. Tu encárgate de atender a tus pacientes')
const agradecer = () => speak('Encantada de ayudarte')
const mellamo = () => speak(`Yo soy Quiru, encantada de conocerte.`)
const cambiarVista = () => verOdontograma.value = !verOdontograma.value

const seleccionMultiple = (num1, num2, hallazgo, ubicacion) => {
    const num1_ = num1 < 10 ? num1 * 10 : num1
    const num2_ = num2 < 10 ? num2 * 10 : num2
    const condicion = num1_ > num2_ ? num1_ : num2_
    const inicio = num1_ > num2_ ? num2_ : num1_
    for (let i = inicio; i <= condicion; i++) {
        actualizarItem(hallazgo, ubicacion, i, false)
    }
    speak(`${hallazgo} de ${num1} al ${num2}`)
}
export const limpiar = () => {
    item.value = {
        diente: '',
        hallazgos: []
    }
    flagLimpiar.value = !flagLimpiar.value
    speak('Limpiando')
}
export const limpiarSinVoz = () => {
    item.value = {
        diente: '',
        hallazgos: []
    }
}
const opcionesDeComandosDeVoz = [
    'caries', 'extracción', 'ausente', 'fractura', 'restauración', 'lingual', 'incisal', 'vestibular', 'por',
    'distal', 'oclusal', 'mesial', 'palatino',
    'pieza',
];
const listaDeDientes_ = [
    1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 3.1, 3.2, 3.3,
    3.4, 3.5, 3.6, 3.7, 3.8, 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8, 5.1, 5.2, 5.3, 5.4, 5.5, 6.1,
    6.2, 6.3, 6.4, 6.5, 7.1, 7.2, 7.3, 7.4, 7.5, 8.1, 8.2, 8.3, 8.4, 8.5,
    11, 12, 13, 14, 15, 16, 17, 18, 21, 22, 23, 24, 25, 26, 27, 28, 31, 32, 33,
    34, 35, 36, 37, 38, 41, 42, 43, 44, 45, 46, 47, 48, 51, 52, 53, 54, 55, 61,
    62, 63, 64, 65, 71, 72, 73, 74, 75, 81, 82, 83, 84, 85,
];
function formatUbicacion(ubicacion) {
    let respuesta = '';
    const ubicacionTemp = ubicacion ? ubicacion.split(' ') : [];
    if (ubicacionTemp.length == 3) {
        if ((ubicacionTemp[1] == 'sin' && ubicacionTemp[2] == 'sal') || (ubicacionTemp[1] == 'en' && ubicacionTemp[2] == 'sisal')) {
            respuesta = 'incisal'
        }
    }
    if (ubicacionTemp.length == 2) {
        if ((ubicacionTemp[0] == 'sin' && ubicacionTemp[1] == 'sal') || (ubicacionTemp[0] == 'en' && ubicacionTemp[1] == 'sisal')) {
            respuesta = 'incisal'
        } else {
            switch (ubicacionTemp[1]) {
                case 'vestibular': { respuesta = 'vestibular'; break }
                case 'distal': { respuesta = 'distal'; break }
                case 'oclusal': { respuesta = 'oclusal'; break }
                case 'mesial': { respuesta = 'mesial'; break }
                case 'palatino': { respuesta = 'palatino'; break }
                case 'incisal': { respuesta = 'incisal'; break }
                case 'lingual': { respuesta = 'lingual'; break }

                case 'cristal': { respuesta = 'distal'; break }
                case 'Messi': { respuesta = 'mesial'; break }
                case 'inicial': { respuesta = 'incisal'; break }
            }
        }
    }
    if (ubicacionTemp.length == 1) {
        switch (ubicacionTemp[0]) {
            case 'vestibular': { respuesta = 'vestibular'; break }
            case 'distal': { respuesta = 'distal'; break }
            case 'oclusal': { respuesta = 'oclusal'; break }
            case 'mesial': { respuesta = 'mesial'; break }
            case 'palatino': { respuesta = 'palatino'; break }
            case 'incisal': { respuesta = 'incisal'; break }
            case 'lingual': { respuesta = 'lingual'; break }

            case 'cristal': { respuesta = 'distal'; break }
            case 'Messi': { respuesta = 'mesial'; break }
            case 'inicial': { respuesta = 'incisal'; break }
            case 'sisal': { respuesta = 'incisal'; break }
        }
    }
    return respuesta;

}
export const actualizarItem = (hallazgo, ubicacion, pieza, hablar = true) => {
    let mensaje = ''
    const hallazgoCorrecto = hallazgo ? listaDeHallazgos.map(({ value }) => value).indexOf(hallazgo) > -1 : true
    const piezaCorrecta = ubicacion ? listaDeUbicacion.length > 0 : true
    const ubicacionCorrecta = pieza ? listaDeDientes_.find(item => item == pieza) : true
    if (!hallazgoCorrecto || !ubicacionCorrecta || !piezaCorrecta) return
    let pieza_ = pieza < 10 ? pieza * 10 : pieza
    if (ubicacion) {
        ubicacion = formatUbicacion(ubicacion)
    }
    if (pieza) {

        if (item.value.diente != pieza_) {
            item.value.hallazgos = []
            item.value.diente = pieza_
        }
        mensaje += `Pieza ${pieza}`
    }
    const hzgoMatriz = listaDeHallazgos.filter((elem) => elem.value == hallazgo);
    if (hzgoMatriz.length > 0) {
        if (hzgoMatriz[0]?.esDirecto == "SI") {
            item.value.hallazgos.push({ diente: pieza_, hallazgo: hallazgo, ubicacion: "", sigla: hzgoMatriz[0]?.sigla, posicion: "", fechaHallazgo: new Date(), })
        }
        agregarLista(itemodontograma.value.id, item.value)
    }
    return hablar && speak(mensaje)
}
export const agregar = () => {
    if (item.value.hallazgos?.length == 0) return speak('No he registrado un hallazgo')
    item.value.hallazgos?.map(({ hallazgo, ubicacion, sigla, posicion, fechaHallazgo }) => ({ diente: item.value.diente, ubicacion: ubicacion || "", hallazgo, sigla, posicion, fechaHallazgo })).forEach(item => {
        const index = itemodontograma.value?.hallazgos?.findIndex(i => i.hallazgo == item.hallazgo && i.diente == item.diente && i.ubicacion == item.ubicacion)
        if (index == -1 || index == undefined) {
            itemodontograma.value?.hallazgos ? itemodontograma.value.hallazgos.push(item) : itemodontograma.value.hallazgos = [item];
        }
    })
    actualizarDetalle(itemodontograma.value.id, itemodontograma.value.hallazgos)
};


export function limpiarPieza(pieza) {
    itemodontograma.value.hallazgos = itemodontograma.value?.hallazgos.filter(({ diente }) => diente != pieza)
    item.value.diente = pieza
    actualizarDetalle(itemodontograma.value.id, itemodontograma.value.hallazgos)
    speak(`Limpiando pieza ${pieza}`)
}
export function eliminarFila(filaEliminar) {
    const filaTemp = (filaEliminar.toLowerCase() == 'uno') ? 1 : filaEliminar
    if (!isNaN(filaTemp)) {
        itemodontograma.value.hallazgos = itemodontograma.value?.hallazgos.filter(({ fila }) => fila != filaTemp)
        actualizarDetalle(itemodontograma.value.id, itemodontograma.value.hallazgos)
        speak(`Limpiando fila ${filaTemp}`)
    }
}

const prefijosParaPieza = '(pieza)'
const prefijosParaUbicacion = '(por) (parte)'
const prefijosMultiples = '(a) (la) (ala) (al)'

const listaDeFuncionesPorDiente = {}

const listaDeComandosDeDientes = {}

listaDeDientes_?.map(num => {

    listaDeComandosDeDientes[`${num} carie ${prefijosParaUbicacion} *ubicacion`] = (ubicacion) => actualizarItem('caries', ubicacion, String(num))
    listaDeComandosDeDientes[`${num} caries ${prefijosParaUbicacion} *ubicacion`] = (ubicacion) => actualizarItem('caries', ubicacion, String(num))
    listaDeComandosDeDientes[`${num} mancha blanca ${prefijosParaUbicacion} *ubicacion`] = (ubicacion) => actualizarItem('manchablanca', ubicacion, String(num))
    listaDeComandosDeDientes[`${num} lesión esmalte ${prefijosParaUbicacion} *ubicacion`] = (ubicacion) => actualizarItem('lesionesmalte', ubicacion, String(num))
    listaDeComandosDeDientes[`${num} lesión dentina ${prefijosParaUbicacion} *ubicacion`] = (ubicacion) => actualizarItem('lesiondentina', ubicacion, String(num))
    listaDeComandosDeDientes[`${num} lesión pulpa ${prefijosParaUbicacion} *ubicacion`] = (ubicacion) => actualizarItem('lesionpulpa', ubicacion, String(num))
    listaDeComandosDeDientes[`${num} restauración ${prefijosParaUbicacion} *ubicacion`] = (ubicacion) => actualizarItem('restauración', ubicacion, String(num))
    listaDeComandosDeDientes[`${num} factura`] = () => actualizarItem('fractura', false, String(num))
    listaDeComandosDeDientes[`${num} fractura`] = () => actualizarItem('fractura', false, String(num))
    listaDeComandosDeDientes[`${num} fracturas`] = () => actualizarItem('fractura', false, String(num))
    listaDeComandosDeDientes[`${num} extracción`] = () => actualizarItem('extracción', false, String(num))
    listaDeComandosDeDientes[`${num} ausente`] = () => actualizarItem('ausente', false, String(num))

    listaDeComandosDeDientes[`${num} opacidad`] = () => actualizarItem('opacidad', false, String(num))
    listaDeComandosDeDientes[`${num} decoloración`] = listaDeFuncionesPorDiente[`${num}Decoloracion`] = () => actualizarItem('decoloración', false, String(num))
    listaDeComandosDeDientes[`${num} fluorosis`] = listaDeFuncionesPorDiente[`${num}Fluorosis`] = () => actualizarItem('fluorosis', false, String(num))
    listaDeComandosDeDientes[`${num} sellante en buen estado`] = () => actualizarItem('sellanteazul', false, String(num))
    listaDeComandosDeDientes[`${num} sellante en mal estado`] = () => actualizarItem('sellanterojo', false, String(num))
    /*
        listaDeComandosDeDientes[`${num} (a) (la) (ala) (al) :num2 :hallazgo`] = listaDeFuncionesPorDiente[`${num}num2Hallazgo`] = (num2, hallazgo) => seleccionMultiple(num, num2, hallazgo, false)
       listaDeComandosDeDientes[`${num} (a) (la) (al) :num2 :hallazgo *ubicacion`] = listaDeFuncionesPorDiente[`${num}num2HallazgoUbicacion`] = (num2, hallazgo, ubicacion) => seleccionMultiple(num, num2, hallazgo, ubicacion)
    */

    listaDeComandosDeDientes[`${num} Extruida`] = () => actualizarItem('extruida', false, String(num))
    listaDeComandosDeDientes[`${num} Instruida`] = () => actualizarItem('intruida', false, String(num))

    listaDeComandosDeDientes[`${num} metálica en buen estado`] = () => actualizarItem('Corona_metalica_good', false, String(num))
    listaDeComandosDeDientes[`${num} metalica en buen estado`] = () => actualizarItem('Corona_metalica_good', false, String(num))
    listaDeComandosDeDientes[`${num} fenestrada en buen estado`] = () => actualizarItem('Corona_fenestrada_good', false, String(num))
    listaDeComandosDeDientes[`${num} Cerámica en buen estado`] = () => actualizarItem('Corona_ceramica_good', false, String(num))
    listaDeComandosDeDientes[`${num} vener en buen estado`] = () => actualizarItem('Corona_veneer_good', false, String(num))
    listaDeComandosDeDientes[`${num} libre en buen estado`] = () => actualizarItem('Corona_libre_good', false, String(num))
    listaDeComandosDeDientes[`${num} metálica en mal estado`] = () => actualizarItem('Corona_metalica_bad', false, String(num))
    listaDeComandosDeDientes[`${num} fenestrada en mal estado`] = () => actualizarItem('Corona_fenestrada_bad', false, String(num))
    listaDeComandosDeDientes[`${num} Cerámica en mal estado`] = () => actualizarItem('Corona_ceramica_bad', false, String(num))
    listaDeComandosDeDientes[`${num} vener en mal estado`] = () => actualizarItem('Corona_veneer_bad', false, String(num))
    listaDeComandosDeDientes[`${num} libre en mal estado`] = () => actualizarItem('Corona_libre_bad', false, String(num))

})

export default {
    conVozApagada: {
        'Buenos días': activarVoz,
        'Buenos días *any': activarVoz,
        'hola': activarVoz,
        'hola *any': activarVoz,
        'ahora': activarVoz,
        'ahora *any': activarVoz,
    },
    conVozEncendida: {
        'gracias': detenerVoz,
        'limpiar': limpiar,
        'gracias *any': detenerVoz,
        'terminar': detenerVoz,
        'terminar *any': detenerVoz,
        'fin': detenerVoz,
        'fin *any': detenerVoz,
        'adios': detenerVoz,
        'adios *any': detenerVoz,
        'borrar (fila) :fila': eliminarFila,
        'eliminar (fila) :fila': eliminarFila,
        'limpiar (pieza) (diente) :pieza': limpiarPieza,
        'pieza :item': seleccionarPieza,
        'piezas :item': seleccionarPieza,
        'pieza :num (hallazgo) :hallazgo': seleccionarPiezaHallazgo,
        'pieza :num (hallazgo) :hallazgo (por) (en) *ubicacion': seleccionarPiezaHallazgoUbicacion,
        'en (pieza) :item': seleccionarPieza,
        'por :item': seleccionarTipos,
        'parte :item': seleccionarTipos,
        'hallazgo :item': seleccionarHallazgo,
        [`hallazgo :hallazgo ${prefijosParaPieza} :pieza`]: seleccionarHallazgoPieza,
        [`hallazgo :hallazgo ${prefijosParaUbicacion} :tipo ${prefijosParaPieza} :pieza`]: seleccionarHallazgoTipoPieza,
        'caries': seleccionarHallazgoCaries,
        'carie': seleccionarHallazgoCaries,
        [`caries ${prefijosParaUbicacion} :ubicacion`]: seleccionarHallazgoCariesUbicacion,
        [`carie ${prefijosParaUbicacion} :ubicacion`]: seleccionarHallazgoCariesUbicacion,
        [`caries ${prefijosParaUbicacion} :ubicacion ${prefijosParaPieza} :pieza`]: seleccionarHallazgoCariesUbicacionPieza,
        [`carie ${prefijosParaUbicacion} :ubicacion ${prefijosParaPieza} :pieza`]: seleccionarHallazgoCariesUbicacionPieza,

        'restauración': seleccionarHallazgoRestauracion,
        [`restauración ${prefijosParaUbicacion} :ubicacion`]: seleccionarHallazgoRestauracionUbicacion,
        [`restauración ${prefijosParaUbicacion} :ubicacion ${prefijosParaPieza} :pieza`]: seleccionarHallazgoRestauracionUbicacionPieza,

        'extracción': seleccionarHallazgoExtraccion,
        'ausente': seleccionarHallazgoAusente,
        [`extracción ${prefijosParaPieza} :pieza`]: seleccionarHallazgoExtraccionPieza,
        [`ausente ${prefijosParaPieza} :pieza`]: seleccionarHallazgoAusentePieza,
        'fractura': seleccionarHallazgoFractura,
        'factura': seleccionarHallazgoFractura,

        [`fractura ${prefijosParaPieza} :pieza`]: seleccionarHallazgoFracturaPieza,
        [`factura ${prefijosParaPieza} :pieza`]: seleccionarHallazgoFracturaPieza,

        'cómo te llamas *any': mellamo,
        'cómo te llamas': mellamo,
        'qué sabes hacer': queSabesHacer,
        'que sabes hacer': queSabesHacer,
        'ver odontograma': cambiarVista,
        'regresar': cambiarVista,
        'cambiar': cambiarVista,
        ...listaDeComandosDeDientes,
        //[`de (la) :num1 ${prefijosMultiples} :num2 :hallazgo`] : seleccionMultiple,
        'de (la) :num1 (a) (la) (ala) (al) :num2 :hallazgo': seleccionMultiple,
        'de (la) :num1 (a) (la) (ala) :num2 :hallazgo': seleccionMultiple,
        'del :num1 (a) (la) (ala) (al) :num2 :hallazgo': seleccionMultiple,
        'de (la) :num1 (a la) (al) :num2 :hallazgo *ubicacion': seleccionMultiple,
        'de (la) :num1 (a) (la) (ala) (al) :num2 :hallazgo *ubicacion': seleccionMultiple,
        'del :num1 (a) (la) (ala) (al) :num2 :hallazgo *ubicacion': seleccionMultiple,
    },
    gramatica: '#JSGF V1.0; grammar colors; public <color> = ' + opcionesDeComandosDeVoz.join(' | ') + ' ;',
    saludar,
    agradecer
}