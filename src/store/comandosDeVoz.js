import {item, detenerVoz, activarVoz, listaDeHallazgos, listaDeDientes, listaDeTipos, speak, flagLimpiar} from './odontograma'

const seleccionarHallazgo = hallazgo => actualizarItem(hallazgo, false, false)

const seleccionarHallazgoPieza = (hallazgo, pieza) => actualizarItem(hallazgo, false, pieza)

const seleccionarHallazgoTipoPieza = (hallazgo, ubicacion, pieza) => actualizarItem(hallazgo, ubicacion, pieza)

const seleccionarPieza = pieza =>  actualizarItem(false, false, pieza)

const seleccionarTipos = ubicacion => actualizarItem(false, ubicacion, false)

const seleccionarHallazgoCaries = ()=> actualizarItem('caries', false, false)
const seleccionarHallazgoCariesUbicacion = ubicacion => actualizarItem('caries', ubicacion, false)
const seleccionarHallazgoCariesUbicacionPieza = (ubicacion, pieza) => actualizarItem('caries', ubicacion, pieza)

const seleccionarHallazgoRestauracion = ()=> actualizarItem('restauración', false, false)
const seleccionarHallazgoRestauracionUbicacion = (ubicacion)=> actualizarItem('restauración', ubicacion, false)
const seleccionarHallazgoRestauracionUbicacionPieza = (ubicacion, pieza)=> actualizarItem('restauración', ubicacion, pieza)

const seleccionarHallazgoFractura = ()=> actualizarItem('fractura', false, false)
const seleccionarHallazgoFracturaPieza = (pieza)=> actualizarItem('fractura', false, pieza)

const seleccionarHallazgoAusente = ()=> actualizarItem('ausente', false, false)
const seleccionarHallazgoAusentePieza = (pieza)=> actualizarItem('ausente', false, pieza)

const seleccionarHallazgoExtraccion = ()=> actualizarItem('extracción', false, false)
const seleccionarHallazgoExtraccionPieza = (pieza)=> actualizarItem('extracción', false, pieza)

const saludar = ()=>speak('Hola, soy Quiru, tu nuevo asistente de voz odontológico')
const queSabesHacer = ()=>speak('Yo me encargo del registro de tus odontogramas: diagnóstico y tratamiento. Tu encárgate de atender a tus pacientes')
const agradecer = ()=>speak('Encantada de ayudarte')
const mellamo = ()=> speak(`Yo soy Quiru, encantada de conocerte.`)


const limpiar = ()=> {
    item.value = {
        diente: '00',
        hallazgo: "",
        pieza: []
    }
    flagLimpiar.value = !flagLimpiar.value
    speak('Limpiando')
}

const opcionesDeComandosDeVoz = [
    'caries',    'extracción',    'ausente',    'fractura',    'restauración',    'vestibular', 'por',
    'distal',    'oclusal',    'mesial',    'palatino',
    'pieza',
];

const actualizarItem = (hallazgo, ubicacion, pieza) => {
    const hallazgoCorrecto = hallazgo ? listaDeHallazgos.map(({value}) => value).indexOf(hallazgo) > -1 : true
    const piezaCorrecta = ubicacion ? listaDeTipos.map(({value}) => value).indexOf(ubicacion) > -1 : true
    const ubicacionCorrecta = pieza ? listaDeDientes.find(item => item == pieza) : true
    let mensaje = ''

    if( hallazgoCorrecto && ubicacionCorrecta && piezaCorrecta ) {
         if (pieza){
            item.value.diente = pieza
            mensaje += `Pieza ${pieza}`
        }
        if (hallazgo) {
            item.value.hallazgo = hallazgo 
            mensaje += `Hallazgo ${hallazgo}`
        }
        if (ubicacion) {
            const index = item.value.pieza.indexOf(ubicacion)
            if(index == -1) {
                item.value.pieza.push(ubicacion)
                mensaje += `Por ${ubicacion}`
            } else {
                item.value.pieza.splice(index, 1)
                mensaje += `Desmarcando ${ubicacion}`
            }
        }
       
        speak(mensaje)
    }
}

const prefijosParaPieza = 'pieza'
const prefijosParaUbicacion = '(por) (parte)'
const listaDeDientes_ = [
    11, 12, 13, 14, 15, 16, 17, 18, 21, 22, 23, 24, 25, 26, 27, 28, 31, 32, 33,
    34, 35, 36, 37, 38, 41, 42, 43, 44, 45, 46, 47, 48, 51, 52, 53, 54, 55, 61,
    62, 63, 64, 65, 71, 72, 73, 74, 75, 81, 82, 83, 84, 85,
];
const listaDeFuncionesPorDiente = {}
listaDeDientes_.map( num => {
    listaDeFuncionesPorDiente[`${num}CariesUbicacion`] = (ubicacion)=> actualizarItem('caries', ubicacion, String(num))
    listaDeFuncionesPorDiente[`${num}Fractura`] = ()=> actualizarItem('fractura', false, String(num))
    listaDeFuncionesPorDiente[`${num}Extraccion`] = ()=> actualizarItem('extracción', false, String(num))
    listaDeFuncionesPorDiente[`${num}Ausente`] = ()=> actualizarItem('ausente', false, String(num))
    listaDeFuncionesPorDiente[`${num}Restauracion`] = (ubicacion)=> actualizarItem('restauración', ubicacion, String(num))
})
const listaDeComandosDeDientes = {}

listaDeDientes_?.map( num => {
    listaDeComandosDeDientes[`${num} caries ${prefijosParaUbicacion} :ubicacion`] = listaDeFuncionesPorDiente[`${num}CariesUbicacion`]
    listaDeComandosDeDientes[`${num} carie ${prefijosParaUbicacion} :ubicacion`] = listaDeFuncionesPorDiente[`${num}CariesUbicacion`]
    listaDeComandosDeDientes[`${num} factura`] = listaDeFuncionesPorDiente[`${num}Fractura`]
    listaDeComandosDeDientes[`${num} fractura`] = listaDeFuncionesPorDiente[`${num}Fractura`]
    listaDeComandosDeDientes[`${num} fracturas`] = listaDeFuncionesPorDiente[`${num}Fractura`]
    listaDeComandosDeDientes[`${num} extracción`] = listaDeFuncionesPorDiente[`${num}Extraccion`]
    listaDeComandosDeDientes[`${num} restauración ${prefijosParaUbicacion} :ubicacion`] = listaDeFuncionesPorDiente[`${num}Restauracion`]
    listaDeComandosDeDientes[`${num} ausente`] = listaDeFuncionesPorDiente[`${num}Ausente`]

})
console.log(listaDeComandosDeDientes)
export default {
    conVozApagada: {
        'Buenos días': activarVoz,
        'Buenos días *any': activarVoz,
        'hola': activarVoz,
        'hola *any': activarVoz,
    },
    conVozEncendida: {
        'gracias': detenerVoz,
        'gracias *any': detenerVoz,
        'terminar': detenerVoz,
        'terminar *any': detenerVoz,
        'fin': detenerVoz,
        'fin *any': detenerVoz,
        'adios': detenerVoz,
        'adios *any': detenerVoz,
        'limpiar': limpiar,
        'limpiar *any': limpiar,
        'siguiente': limpiar,
        'limpiar *any': limpiar,
        'otra vez': limpiar,
        'otra vez *any': limpiar,
        'pieza :item': seleccionarPieza,
        'piezas :item': seleccionarPieza,
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

        'cómo te llamas *any' : mellamo,
        'cómo te llamas' : mellamo,
        'qué sabes hacer' : queSabesHacer,
        'que sabes hacer' : queSabesHacer,
        ...listaDeComandosDeDientes


    },
    gramatica: '#JSGF V1.0; grammar colors; public <color> = ' + opcionesDeComandosDeVoz.join(' | ') + ' ;',
    saludar,
    agradecer
}