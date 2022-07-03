import {item,verOdontograma, detenerVoz, activarVoz, listaDeHallazgos, listaDeDientes, listaDeTipos, speak, flagLimpiar} from './odontograma'
import router from '../config/router'
import {item as itemodontograma} from './formodontograma';
import escenarios from '../config/Escenarios.json';
const seleccionarHallazgo = hallazgo => actualizarItem(hallazgo, false, false)

const seleccionarHallazgoPieza = (hallazgo, pieza) => actualizarItem(hallazgo, false, pieza)

const seleccionarHallazgoTipoPieza = (hallazgo, ubicacion, pieza) => actualizarItem(hallazgo, ubicacion, pieza)

const seleccionarPieza = pieza =>  actualizarItem(false, false, pieza)

const seleccionarTipos = ubicacion => actualizarItem(false, ubicacion, false)


const seleccionarPiezaHallazgo = (diente, hallazgo) => actualizarItem(hallazgo, false, diente)
const seleccionarPiezaHallazgoUbicacion = (diente, hallazgo, ubicacion) => actualizarItem(hallazgo, ubicacion, diente)

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
const cambiarVista = ()=> verOdontograma.value = !verOdontograma.value

const seleccionMultiple = (num1, num2, hallazgo, ubicacion) => {
    const num1_ = num1 < 10 ? num1*10 : num1
    const num2_ = num2 < 10 ? num2*10 : num2
    const condicion = num1_ > num2_ ? num1_ : num2_
    const inicio = num1_ > num2_ ? num2_ : num1_
    for( let i = inicio; i <= condicion; i++){
        actualizarItem(hallazgo, ubicacion, i, false)
    }
    speak( `${hallazgo} de ${num1} al ${num2}`)
}
export const limpiar = ()=> {
    item.value =  {
        diente: '00',
        hallazgos: [ ]
    }
    flagLimpiar.value = !flagLimpiar.value
    speak('Limpiando')
}

const opcionesDeComandosDeVoz = [
    'caries',    'extracción',    'ausente',    'fractura',    'restauración', 'lingual', 'incisal',  'vestibular', 'por',
    'distal',    'oclusal',    'mesial',    'palatino',
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
export const actualizarItem = (hallazgo, ubicacion, pieza, hablar=true) => {
    const listaDeUbicacion = ubicacion ? ubicacion.split(' ').filter(item=>listaDeTipos.map(({value}) => value).indexOf(item) >-1 ) : []
    const hallazgoCorrecto = hallazgo ? listaDeHallazgos.map(({value}) => value).indexOf(hallazgo) > -1 : true
    const piezaCorrecta = ubicacion ? listaDeUbicacion.length>0  : true
    const ubicacionCorrecta = pieza ? listaDeDientes_.find(item => item == pieza) : true
    let mensaje = ''
    let _posicion ="";

    if( !hallazgoCorrecto || !ubicacionCorrecta || !piezaCorrecta ) return

    if (pieza){
        let pieza_ = pieza < 10 ? pieza*10 : pieza
        if( item.value.diente != pieza_) item.value.hallazgos = []
        item.value.diente = pieza_
        mensaje += `Pieza ${pieza}`
    }
    const ubicacionnes =escenarios.Esenarios.filter((elem)=> elem.pieza==item.value.diente)[0];
    if (hallazgo && listaDeUbicacion.length == 0) {
        const registroSiglas = listaDeHallazgos.filter((elem)=> elem.value==hallazgo);
        const sigla = registroSiglas[0]?.sigla;
        if( ubicacionnes !=undefined ) {
            _posicion=(ubicacionnes.arriva.trim()==ubicacion)? 'arriva':_posicion;
            _posicion=(ubicacionnes.centro.trim()==ubicacion)? 'centro':_posicion;
            _posicion=(ubicacionnes.abajo.trim()==ubicacion)? 'abajo':_posicion;
            _posicion=(ubicacionnes.izquierda.trim()==ubicacion)? 'izquierda':_posicion;
            _posicion=(ubicacionnes.derecha.trim()==ubicacion)? 'derecha':_posicion;
        }
    
        item.value.hallazgos.push( {hallazgo,sigla:sigla,posicion: _posicion} )
        mensaje += `Hallazgo ${hallazgo}`
    } else if( hallazgo && listaDeUbicacion.length > 0 ){
        const registroSiglas = listaDeHallazgos.filter((elem)=> elem.value==hallazgo);
        const sigla = registroSiglas[0]?.sigla;

        let mensajeUbicacion = ''
        listaDeUbicacion.forEach(ubicacion => {
            if( ubicacionnes !=undefined ) {
                _posicion=(ubicacionnes.arriva.trim()==ubicacion)? 'arriva':_posicion;
                _posicion=(ubicacionnes.centro.trim()==ubicacion)? 'centro':_posicion;
                _posicion=(ubicacionnes.abajo.trim()==ubicacion)? 'abajo':_posicion;
                _posicion=(ubicacionnes.izquierda.trim()==ubicacion)? 'izquierda':_posicion;
                _posicion=(ubicacionnes.derecha.trim()==ubicacion)? 'derecha':_posicion;
            }
        
            item.value.hallazgos.push( {hallazgo, ubicacion,sigla:sigla,posicion: _posicion} )
            mensajeUbicacion+= ubicacion
        } )

        mensaje += `Hallazgo ${hallazgo} por ${mensajeUbicacion}`
    }
    if(item.value.diente && hallazgo){
        if (!existeDienteVoz(item.value.diente,hallazgo,ubicacion)){
            agregar()
        }
    }
    return hablar && speak(mensaje)


}
function existeDienteVoz(diente,hallazgo,ubicacion){
    let result = false;
    let lista = itemodontograma.value.hallazgos;
    for (let item of lista ){
        if (hallazgo == 'caries' || hallazgo == 'restauración'){
            if(item.diente==diente && item.hallazgo==hallazgo && item.ubicacion==ubicacion ){
                result = true;
                break;
            }
        } else {
            if (hallazgo == 'hipoplasia' || hallazgo == 'hipomineralizacion'||
                hallazgo == 'opacidad' || hallazgo == 'decoloración' || hallazgo == 'fluorosis')
            {
                if(item.diente==diente ){
                    let listaSigla = listaDeHallazgos.filter((elem)=>elem.value==item.hallazgo)
                    if(listaSigla.length>0){
                        if(listaSigla[0].sigla==''){
                            if(item.diente==diente && item.hallazgo==hallazgo){
                                result = true;
                                break;
                            }
                        } else {
                            result = true;
                            break;
                        }
                    }
                }
            } else {
                if(item.diente==diente && item.hallazgo==hallazgo){
                    result = true;
                    break;
                }
            }
        }
    }
    return result;
}
export const agregar  = () => {
    if(item.value.hallazgos?.length == 0) return speak( 'No he registrado un hallazgo')
    item.value.hallazgos?.map( ({hallazgo, ubicacion,sigla,posicion}) => ({diente: item.value.diente, ubicacion: ubicacion || "", hallazgo,sigla,posicion})).forEach( item => {
        const index = itemodontograma.value.hallazgos?.findIndex( i => i.hallazgo == item.hallazgo && i.diente == item.diente && i.ubicacion == item.ubicacion)
        if ( index == -1 || index == undefined){
            itemodontograma.value.hallazgos?itemodontograma.value.hallazgos.push(item):itemodontograma.value.hallazgos=[item];
        }
    })
};


export function limpiarPieza(pieza) {
    itemodontograma.value.hallazgos = itemodontograma.value.hallazgos.filter( ({diente}) => diente!=pieza)
    item.value.diente = pieza
    speak( `Limpiando pieza ${pieza}`)
}

const prefijosParaPieza = '(pieza)'
const prefijosParaUbicacion = '(por) (parte)'

const listaDeFuncionesPorDiente = {}
listaDeDientes_.map( num => {
    listaDeFuncionesPorDiente[`${num}CariesUbicacion`] = (ubicacion)=> actualizarItem('caries', ubicacion, String(num))
    listaDeFuncionesPorDiente[`${num}Fractura`] = ()=> actualizarItem('fractura', false, String(num))
    listaDeFuncionesPorDiente[`${num}Extraccion`] = ()=> actualizarItem('extracción', false, String(num))
    listaDeFuncionesPorDiente[`${num}Ausente`] = ()=> actualizarItem('ausente', false, String(num))
    listaDeFuncionesPorDiente[`${num}Restauracion`] = (ubicacion)=> actualizarItem('restauración', ubicacion, String(num))
    listaDeFuncionesPorDiente[`${num}num2Hallazgo`] = (num2, hallazgo)=> seleccionMultiple (num, num2, hallazgo, false)
    listaDeFuncionesPorDiente[`${num}num2HallazgoUbicacion`] = (num2, hallazgo, ubicacion)=> seleccionMultiple (num, num2, hallazgo, ubicacion)
})
const listaDeComandosDeDientes = {}

listaDeDientes_?.map( num => {
    listaDeComandosDeDientes[`${num} carie ${prefijosParaUbicacion} *ubicacion`] = listaDeFuncionesPorDiente[`${num}CariesUbicacion`]
    listaDeComandosDeDientes[`${num} caries ${prefijosParaUbicacion} *ubicacion`] = listaDeFuncionesPorDiente[`${num}CariesUbicacion`]
    listaDeComandosDeDientes[`${num} restauración ${prefijosParaUbicacion} *ubicacion`] = listaDeFuncionesPorDiente[`${num}Restauracion`]
    listaDeComandosDeDientes[`${num} factura`] = listaDeFuncionesPorDiente[`${num}Fractura`]
    listaDeComandosDeDientes[`${num} fractura`] = listaDeFuncionesPorDiente[`${num}Fractura`]
    listaDeComandosDeDientes[`${num} fracturas`] = listaDeFuncionesPorDiente[`${num}Fractura`]
    listaDeComandosDeDientes[`${num} extracción`] = listaDeFuncionesPorDiente[`${num}Extraccion`]
    listaDeComandosDeDientes[`${num} ausente`] = listaDeFuncionesPorDiente[`${num}Ausente`]
    listaDeComandosDeDientes[`${num} (a) (la) (ala) (al) :num2 :hallazgo`]= listaDeFuncionesPorDiente[`${num}num2Hallazgo`]
    listaDeComandosDeDientes[`${num} (a) (la) (al) :num2 :hallazgo *ubicacion`]= listaDeFuncionesPorDiente[`${num}num2HallazgoUbicacion`]
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
        'limpiar' :limpiar,
        'gracias *any': detenerVoz,
        'terminar': detenerVoz,
        'terminar *any': detenerVoz,
        'fin': detenerVoz,
        'fin *any': detenerVoz,
        'adios': detenerVoz,
        'adios *any': detenerVoz,
        'borrar (pieza) (diente) :pieza': limpiarPieza,
        'eliminar (pieza) (diente) :pieza': limpiarPieza,
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

        'cómo te llamas *any' : mellamo,
        'cómo te llamas' : mellamo,
        'qué sabes hacer' : queSabesHacer,
        'que sabes hacer' : queSabesHacer,
        'ver odontograma': cambiarVista,
        'regresar': cambiarVista,
        'cambiar': cambiarVista,
        ...listaDeComandosDeDientes,
        'de (la) :num1 (a) (la) (ala) (al) :num2 :hallazgo' : seleccionMultiple,
        'de (la) :num1 (a) (la) (ala) :num2 :hallazgo': seleccionMultiple,
        'del :num1 (a) (la) (ala) (al) :num2 :hallazgo': seleccionMultiple,
        'de (la) :num1 (a la) (al) :num2 :hallazgo *ubicacion' : seleccionMultiple,
        'de (la) :num1 (a) (la) (ala) (al) :num2 :hallazgo *ubicacion': seleccionMultiple,
        'del :num1 (a) (la) (ala) (al) :num2 :hallazgo *ubicacion': seleccionMultiple,
    },
    gramatica: '#JSGF V1.0; grammar colors; public <color> = ' + opcionesDeComandosDeVoz.join(' | ') + ' ;',
    saludar,
    agradecer
}