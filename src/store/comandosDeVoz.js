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
        if (pieza){
            item.value.diente = pieza
            mensaje += `Pieza ${pieza}`
        }
        speak(mensaje)
    }
}

const prefijosParaPieza = '(empieza) (empiezo) (en) (de) (pieza) (10-15) (diente)'
const prefijosParaUbicacion = '(por) (parte)'

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
    },
    gramatica: '#JSGF V1.0; grammar colors; public <color> = ' + opcionesDeComandosDeVoz.join(' | ') + ' ;'
}