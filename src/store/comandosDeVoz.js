import { item, verOdontograma, detenerVoz, activarVoz, speak, flagLimpiar } from './odontograma'
import { listaDeTipos, listaDeHallazgos } from '../config/Parametros';
import { item as itemodontograma, actualizarDetalle, existeDiente } from './formodontograma';
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
    if (ubicacion) {
        ubicacion = formatUbicacion(ubicacion)
    }
    const listaDeUbicacion = ubicacion ? ubicacion.split(' ').filter(item => listaDeTipos.map(({ value }) => value).indexOf(item) > -1) : []
    const hallazgoCorrecto = hallazgo ? listaDeHallazgos.map(({ value }) => value).indexOf(hallazgo) > -1 : true
    const piezaCorrecta = ubicacion ? listaDeUbicacion.length > 0 : true
    const ubicacionCorrecta = pieza ? listaDeDientes_.find(item => item == pieza) : true
    const existeSellante = escenarios.EsenariosSellantes.filter((elem) => elem.pieza == pieza)[0];
    let mensaje = ''
    let _posicion = "";
    let sigla = "";

    if (!hallazgoCorrecto || !ubicacionCorrecta || !piezaCorrecta) return

    if (pieza) {
        let pieza_ = pieza < 10 ? pieza * 10 : pieza
        if (item.value.diente != pieza_) item.value.hallazgos = []
        item.value.diente = pieza_
        mensaje += `Pieza ${pieza}`
    }
    const ubicacionnes = escenarios.Esenarios.filter((elem) => elem.pieza == item.value.diente)[0];
    if (hallazgo && listaDeUbicacion.length == 0) {
        const registroSiglas = listaDeHallazgos.filter((elem) => elem.value == hallazgo);
        sigla = registroSiglas[0]?.sigla;
        if (hallazgo != 'caries' && hallazgo != 'restauración' && hallazgo != 'manchablanca' && hallazgo != 'lesionesmalte' && hallazgo != 'lesiondentina' && hallazgo != 'lesionpulpa' ) {
            item.value.hallazgos.push({
                hallazgo,
                sigla: sigla,
                posicion: '',
                fechaHallazgo:new Date(),
            })
            mensaje += `Hallazgo ${hallazgo}`
        }
    } else if (hallazgo && listaDeUbicacion.length > 0) {
        const registroSiglas = listaDeHallazgos.filter((elem) => elem.value == hallazgo);
        sigla = registroSiglas[0]?.sigla;

        let mensajeUbicacion = ''
        listaDeUbicacion.forEach(ubicacion => {
            if (ubicacionnes != undefined) {
                _posicion = (ubicacionnes.arriba.trim() == ubicacion) ? 'arriba' : _posicion;
                _posicion = (ubicacionnes.centro.trim() == ubicacion) ? 'centro' : _posicion;
                _posicion = (ubicacionnes.abajo.trim() == ubicacion) ? 'abajo' : _posicion;
                _posicion = (ubicacionnes.izquierda.trim() == ubicacion) ? 'izquierda' : _posicion;
                _posicion = (ubicacionnes.derecha.trim() == ubicacion) ? 'derecha' : _posicion;
            }
            if (ubicacionnes.arriba.trim() == ubicacion || ubicacionnes.centro.trim() == ubicacion ||
                ubicacionnes.abajo.trim() == ubicacion || ubicacionnes.izquierda.trim() == ubicacion || ubicacionnes.derecha.trim() == ubicacion) {
                ubicacion = (hallazgo == 'caries' || hallazgo == 'manchablanca' || hallazgo == 'lesionesmalte' || hallazgo == 'lesiondentina' || hallazgo == 'lesionpulpa') ? ubicacion : (hallazgo == 'restauración') ? ubicacion : '';
                item.value.hallazgos.push({
                    hallazgo,
                    ubicacion,
                    sigla: sigla,
                    posicion: (hallazgo == 'caries' || hallazgo == 'manchablanca' || hallazgo == 'lesionesmalte' || hallazgo == 'lesiondentina' || hallazgo == 'lesionpulpa') ? _posicion : (hallazgo == 'restauración') ? _posicion : '',
                    fechaHallazgo:new Date(),
                })
                mensajeUbicacion += ubicacion
            }
        })

        mensaje += `Hallazgo ${hallazgo} por ${mensajeUbicacion}`
    }
    if (existeSellante != undefined){
        if (item.value.diente && item.value.diente != '' && hallazgo) {
            if ((listaDeUbicacion.length > 0) && (ubicacionnes.arriba == listaDeUbicacion[0] ||
                ubicacionnes.centro == listaDeUbicacion[0] || ubicacionnes.abajo == listaDeUbicacion[0] ||
                ubicacionnes.izquierda == listaDeUbicacion[0] || ubicacionnes.derecha == listaDeUbicacion[0])) {
                let fila = { hallazgo: hallazgo, ubicacion: ubicacion, sigla: sigla }
                if (!existeDiente(item.value.diente, fila)) {
                    agregar()
                }
            } else {
                if (listaDeUbicacion.length == 0) {
                    let fila = { hallazgo: hallazgo, ubicacion: ubicacion, sigla: sigla }
                    if (!existeDiente(item.value.diente, fila)) {
                        agregar()
                    }
                } else {
                    speak('La ubicación ' + ubicacion + ' no corresponde a la pieza ' + item.value.diente)
                }
            }
        }
    } else {
        if (hallazgo != 'sellanteazul' && hallazgo != 'sellanterojo') {
            if (item.value.diente && item.value.diente != '' && hallazgo) {
                if ((listaDeUbicacion.length > 0) && (ubicacionnes.arriba == listaDeUbicacion[0] ||
                    ubicacionnes.centro == listaDeUbicacion[0] || ubicacionnes.abajo == listaDeUbicacion[0] ||
                    ubicacionnes.izquierda == listaDeUbicacion[0] || ubicacionnes.derecha == listaDeUbicacion[0])) {
                    let fila = { hallazgo: hallazgo, ubicacion: ubicacion, sigla: sigla }
                    if (!existeDiente(item.value.diente, fila)) {
                        agregar()
                    }
                } else {
                    if (listaDeUbicacion.length == 0) {
                        let fila = { hallazgo: hallazgo, ubicacion: ubicacion, sigla: sigla }
                        if (!existeDiente(item.value.diente, fila)) {
                            agregar()
                        }
                    } else {
                        speak('La ubicación ' + ubicacion + ' no corresponde a la pieza ' + item.value.diente)
                    }
                }
            }
        } else {
            speak('Hallazgo ' + hallazgo + ' no corresponde a la pieza ' + item.value.diente)
        }
    }
    return hablar && speak(mensaje)


}
export const agregar = () => {
    if (item.value.hallazgos?.length == 0) return speak('No he registrado un hallazgo')
    item.value.hallazgos?.map(({ hallazgo, ubicacion, sigla, posicion,fechaHallazgo }) => ({ diente: item.value.diente, ubicacion: ubicacion || "", hallazgo, sigla, posicion,fechaHallazgo })).forEach(item => {
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
    const filaTemp = (filaEliminar.toLowerCase() =='uno')? 1 : filaEliminar
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
listaDeDientes_.map(num => {
    listaDeFuncionesPorDiente[`${num}CariesUbicacion`] = (ubicacion) => actualizarItem('caries', ubicacion, String(num))
    listaDeFuncionesPorDiente[`${num}ManchaBlancaUbicacion`] = (ubicacion) => actualizarItem('manchablanca', ubicacion, String(num))
    listaDeFuncionesPorDiente[`${num}CariesEsmalteUbicacion`] = (ubicacion) => actualizarItem('lesionesmalte', ubicacion, String(num))
    listaDeFuncionesPorDiente[`${num}CariesDentinaUbicacion`] = (ubicacion) => actualizarItem('lesiondentina', ubicacion, String(num))
    listaDeFuncionesPorDiente[`${num}CariesPulpaUbicacion`] = (ubicacion) => actualizarItem('lesionpulpa', ubicacion, String(num))
    listaDeFuncionesPorDiente[`${num}Fractura`] = () => actualizarItem('fractura', false, String(num))
    listaDeFuncionesPorDiente[`${num}Extraccion`] = () => actualizarItem('extracción', false, String(num))
    listaDeFuncionesPorDiente[`${num}Ausente`] = () => actualizarItem('ausente', false, String(num))
    listaDeFuncionesPorDiente[`${num}Restauracion`] = (ubicacion) => actualizarItem('restauración', ubicacion, String(num))

    listaDeFuncionesPorDiente[`${num}Hipoplasia`] = () => actualizarItem('hipoplasia', false, String(num))
    listaDeFuncionesPorDiente[`${num}Hipomineralizacion`] = () => actualizarItem('hipomineralizacion', false, String(num))
    listaDeFuncionesPorDiente[`${num}Opacidad`] = () => actualizarItem('opacidad', false, String(num))
    listaDeFuncionesPorDiente[`${num}Decoloracion`] = () => actualizarItem('decoloración', false, String(num))
    listaDeFuncionesPorDiente[`${num}Fluorosis`] = () => actualizarItem('fluorosis', false, String(num))
    listaDeFuncionesPorDiente[`${num}SellanteBueno`] = () => actualizarItem('sellanteazul', false, String(num))
    listaDeFuncionesPorDiente[`${num}SellanteMalo`] = () => actualizarItem('sellanterojo', false, String(num))

    listaDeFuncionesPorDiente[`${num}num2Hallazgo`] = (num2, hallazgo) => seleccionMultiple(num, num2, hallazgo, false)
    listaDeFuncionesPorDiente[`${num}num2HallazgoUbicacion`] = (num2, hallazgo, ubicacion) => seleccionMultiple(num, num2, hallazgo, ubicacion)
})
const listaDeComandosDeDientes = {}

listaDeDientes_?.map(num => {
    listaDeComandosDeDientes[`${num} carie ${prefijosParaUbicacion} *ubicacion`] = listaDeFuncionesPorDiente[`${num}CariesUbicacion`]
    listaDeComandosDeDientes[`${num} caries ${prefijosParaUbicacion} *ubicacion`] = listaDeFuncionesPorDiente[`${num}CariesUbicacion`]
    listaDeComandosDeDientes[`${num} mancha blanca ${prefijosParaUbicacion} *ubicacion`] = listaDeFuncionesPorDiente[`${num}ManchaBlancaUbicacion`]
    listaDeComandosDeDientes[`${num} lesión esmalte ${prefijosParaUbicacion} *ubicacion`] = listaDeFuncionesPorDiente[`${num}CariesEsmalteUbicacion`]
    listaDeComandosDeDientes[`${num} lesión dentina ${prefijosParaUbicacion} *ubicacion`] = listaDeFuncionesPorDiente[`${num}CariesDentinaUbicacion`]
    listaDeComandosDeDientes[`${num} lesión pulpa ${prefijosParaUbicacion} *ubicacion`] = listaDeFuncionesPorDiente[`${num}CariesPulpaUbicacion`]
    listaDeComandosDeDientes[`${num} restauración ${prefijosParaUbicacion} *ubicacion`] = listaDeFuncionesPorDiente[`${num}Restauracion`]
    listaDeComandosDeDientes[`${num} factura`] = listaDeFuncionesPorDiente[`${num}Fractura`]
    listaDeComandosDeDientes[`${num} fractura`] = listaDeFuncionesPorDiente[`${num}Fractura`]
    listaDeComandosDeDientes[`${num} fracturas`] = listaDeFuncionesPorDiente[`${num}Fractura`]
    listaDeComandosDeDientes[`${num} extracción`] = listaDeFuncionesPorDiente[`${num}Extraccion`]
    listaDeComandosDeDientes[`${num} ausente`] = listaDeFuncionesPorDiente[`${num}Ausente`]

    listaDeComandosDeDientes[`${num} hipoplasia`] = listaDeFuncionesPorDiente[`${num}Hipoplasia`]
    listaDeComandosDeDientes[`${num} hipomineralizacion`] = listaDeFuncionesPorDiente[`${num}Hipomineralizacion`]
    listaDeComandosDeDientes[`${num} opacidad`] = listaDeFuncionesPorDiente[`${num}Opacidad`]
    listaDeComandosDeDientes[`${num} decoloración`] = listaDeFuncionesPorDiente[`${num}Decoloracion`]
    listaDeComandosDeDientes[`${num} fluorosis`] = listaDeFuncionesPorDiente[`${num}Fluorosis`]
    listaDeComandosDeDientes[`${num} sellante en buen estado`] = listaDeFuncionesPorDiente[`${num}SellanteBueno`]
    listaDeComandosDeDientes[`${num} sellante en mal estado`] = listaDeFuncionesPorDiente[`${num}SellanteMalo`]

    listaDeComandosDeDientes[`${num} (a) (la) (ala) (al) :num2 :hallazgo`] = listaDeFuncionesPorDiente[`${num}num2Hallazgo`]
    listaDeComandosDeDientes[`${num} (a) (la) (al) :num2 :hallazgo *ubicacion`] = listaDeFuncionesPorDiente[`${num}num2HallazgoUbicacion`]
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