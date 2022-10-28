import { item, verOdontograma, detenerVoz, activarVoz, speak, flagLimpiar } from './odontograma'
import { listaDeTipos, listaDeHallazgos, listaDeDientesCombo } from '../config/Parametros';
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
const agradecer = () => speak('')
const mellamo = () => speak(`Yo soy Quiru, encantada de conocerte.`)
const cambiarVista = () => verOdontograma.value = !verOdontograma.value


const seleccionMultiple = (num1, num2, hallazgo) => {
    const num1_ = Math.abs(num1) < 10 ? Math.abs(num1) * 10 : Math.abs(num1)
    const num2_ = Math.abs(num2) < 10 ? Math.abs(num2) * 10 : Math.abs(num2)
    const hzgoMatriz = listaDeHallazgos.filter((elem) =>
        elem.value.toLowerCase().includes(hallazgo.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")),
    );
    if (hzgoMatriz.length > 0) {
        let _hallazgo = hzgoMatriz[0]?.value;
        if (hzgoMatriz[0]?.esDirecto == "SI" && hzgoMatriz[0]?.EsMultiple == "SI" && hzgoMatriz[0]?.Replicable_Intermedio != "RE") {
            item.value.hallazgos.push({ 
                diente: num1_, 
                hallazgo: hzgoMatriz[0]?.value, 
                ubicacion: "", 
                sigla: hzgoMatriz[0]?.sigla, 
                posicion: "", 
                dienteAlterno: num2_ ,
                descripcion: hzgoMatriz[0]?.text
            })
        };
        if (hzgoMatriz[0]?.esDirecto == "SI" && hzgoMatriz[0]?.EsMultiple == "SI" && hzgoMatriz[0]?.Replicable_Intermedio == "RE") {
            let _dienteSelect1 = listaDeDientesCombo.filter((elem) => elem.value == num1_);
            let _dienteSelect2 = listaDeDientesCombo.filter((elem) => elem.value == num2_);
            if (_dienteSelect1.length > 0 && _dienteSelect2.length > 0) {
                let indice1 = (_dienteSelect1[0]?.indice > _dienteSelect2[0]?.indice) ? _dienteSelect2[0]?.indice : _dienteSelect1[0]?.indice;
                let indice2 = (_dienteSelect2[0]?.indice > _dienteSelect1[0]?.indice) ? _dienteSelect2[0]?.indice : _dienteSelect1[0]?.indice;

                let dientesReplicables = listaDeDientesCombo.filter((elem) => elem.grupo == _dienteSelect1[0]?.grupo &&
                    elem.indice >= indice1 && elem.indice <= indice2);
                dientesReplicables.forEach(element => {
                    item.value.hallazgos.push({ 
                        diente: element.value, 
                        hallazgo: hzgoMatriz[0]?.value, 
                        ubicacion: "", 
                        sigla: hzgoMatriz[0]?.sigla, 
                        posicion: "", 
                        dienteAlterno: "" ,
                        descripcion: hzgoMatriz[0]?.text
                    })
                })
            }
        }
        item.diente = num1_;
        item.value.diente = num1_;
        agregarLista(itemodontograma.value.id, item.value);
    }
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
    const ubicacionCorrecta = pieza ? listaDeDientes_.find(item => item == pieza) : true
   
    if (!hallazgoCorrecto || !ubicacionCorrecta) return
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
    const ubicacionnes = escenarios.Esenarios.filter((elem) => elem.pieza == item.value.diente)[0];
    const hzgoMatriz = listaDeHallazgos.filter((elem) => elem.value == hallazgo);
    let _posicion="";
    if (ubicacionnes != undefined) {
        _posicion = (ubicacionnes.arriba.trim() == ubicacion) ? 'arriba' : _posicion;
        _posicion = (ubicacionnes.centro.trim() == ubicacion) ? 'centro' : _posicion;
        _posicion = (ubicacionnes.abajo.trim() == ubicacion) ? 'abajo' : _posicion;
        _posicion = (ubicacionnes.izquierda.trim() == ubicacion) ? 'izquierda' : _posicion;
        _posicion = (ubicacionnes.derecha.trim() == ubicacion) ? 'derecha' : _posicion;
    }

    if (hzgoMatriz.length > 0) {
        if (hzgoMatriz[0]?.esDirecto == "SI") {
            item.value.hallazgos.push({ 
                diente: pieza_, 
                hallazgo: hzgoMatriz[0]?.value, 
                ubicacion: "", 
                sigla: hzgoMatriz[0]?.sigla, 
                posicion: "", 
                fechaHallazgo: new Date(), 
                descripcion: hzgoMatriz[0]?.text,
                dienteAlterno: "",
            })
        }
        else
        {
            item.value.hallazgos.push({ 
                diente: pieza_, 
                hallazgo: hzgoMatriz[0]?.value, 
                ubicacion: ubicacion, 
                sigla: hzgoMatriz[0]?.sigla, 
                posicion: _posicion, 
                fechaHallazgo: new Date(), 
                descripcion: hzgoMatriz[0]?.text,
                dienteAlterno: "",
            }) 
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
    
    listaDeComandosDeDientes[`${num} Corona metálica en buen estado`] = () => actualizarItem('Corona_metalica_good', false, String(num))
    listaDeComandosDeDientes[`${num} metálica en buen estado`] = () => actualizarItem('Corona_metalica_good', false, String(num))
    listaDeComandosDeDientes[`${num} metalica en buen estado`] = () => actualizarItem('Corona_metalica_good', false, String(num))

    listaDeComandosDeDientes[`${num} Corona fenestrada en buen estado`] = () => actualizarItem('Corona_fenestrada_good', false, String(num))
    listaDeComandosDeDientes[`${num} fenestrada en buen estado`] = () => actualizarItem('Corona_fenestrada_good', false, String(num))

    listaDeComandosDeDientes[`${num} Cerámica en buen estado`] = () => actualizarItem('Corona_ceramica_good', false, String(num))
    listaDeComandosDeDientes[`${num} Corona metal cerámica en buen estado`] = () => actualizarItem('Corona_ceramica_good', false, String(num))

    listaDeComandosDeDientes[`${num} vener en buen estado`] = () => actualizarItem('Corona_veneer_good', false, String(num))
    listaDeComandosDeDientes[`${num} Corona veneer en buen estado`] = () => actualizarItem('Corona_veneer_good', false, String(num))

    listaDeComandosDeDientes[`${num} Corona libre en buen estado`] = () => actualizarItem('Corona_libre_good', false, String(num))
    listaDeComandosDeDientes[`${num} libre en buen estado`] = () => actualizarItem('Corona_libre_good', false, String(num))

    listaDeComandosDeDientes[`${num} Corona metálica en mal estado`] = () => actualizarItem('Corona_metalica_bad', false, String(num))
    listaDeComandosDeDientes[`${num} metálica en mal estado`] = () => actualizarItem('Corona_metalica_bad', false, String(num))

    listaDeComandosDeDientes[`${num} Corona fenestrada en mal estado`] = () => actualizarItem('Corona_fenestrada_bad', false, String(num))
    listaDeComandosDeDientes[`${num} fenestrada en mal estado`] = () => actualizarItem('Corona_fenestrada_bad', false, String(num))

    listaDeComandosDeDientes[`${num} Corona metal cerámica en mal estado`] = () => actualizarItem('Corona_ceramica_bad', false, String(num))
    listaDeComandosDeDientes[`${num} Cerámica en mal estado`] = () => actualizarItem('Corona_ceramica_bad', false, String(num))

    listaDeComandosDeDientes[`${num} Corona veneer en mal estado`] = () => actualizarItem('Corona_veneer_bad', false, String(num))
    listaDeComandosDeDientes[`${num} vener en mal estado`] = () => actualizarItem('Corona_veneer_bad', false, String(num))

    listaDeComandosDeDientes[`${num} Corona libre en mal estado`] = () => actualizarItem('Corona_libre_bad', false, String(num))
    listaDeComandosDeDientes[`${num} libre en mal estado`] = () => actualizarItem('Corona_libre_bad', false, String(num))

    listaDeComandosDeDientes[`${num} Corona temporal`] = () => actualizarItem('Corona_temporal', false, String(num))

    listaDeComandosDeDientes[`${num} Opacidad del esmalte`] = () => actualizarItem('opacidad', false, String(num))
    listaDeComandosDeDientes[`${num} opacidad`] = () => actualizarItem('opacidad', false, String(num))

    listaDeComandosDeDientes[`${num} Decoloración del esmalte`] = () => actualizarItem('decoloración', false, String(num))
    listaDeComandosDeDientes[`${num} decoloración`] = () => actualizarItem('decoloración', false, String(num))

    listaDeComandosDeDientes[`${num} Fluorosis`] = () => actualizarItem('fluorosis', false, String(num))
    listaDeComandosDeDientes[`${num} flurosis`] = () => actualizarItem('fluorosis', false, String(num))

    listaDeComandosDeDientes[`${num} Edéntulo total`] = () => actualizarItem('edentulo', false, String(num))
    listaDeComandosDeDientes[`${num} Edentulo total`] = () => actualizarItem('edentulo', false, String(num))
    listaDeComandosDeDientes[`${num} Edentulo`] = () => actualizarItem('edentulo', false, String(num))

    listaDeComandosDeDientes[`${num} Espigo en buen estado`] = () => actualizarItem('espigo_good', false, String(num))
    listaDeComandosDeDientes[`${num} Epigo en buen estado`] = () => actualizarItem('espigo_good', false, String(num))

    listaDeComandosDeDientes[`${num} Espigo en mal estado`] = () => actualizarItem('espigo_bad', false, String(num))
    listaDeComandosDeDientes[`${num} Epigo en mal estado`] = () => actualizarItem('espigo_bad', false, String(num))

    listaDeComandosDeDientes[`${num} Fosas y fisuras profundas`] = () => actualizarItem('fosas_fisuras', false, String(num))
    listaDeComandosDeDientes[`${num} Fosas profundas`] = () => actualizarItem('fosas_fisuras', false, String(num))
    listaDeComandosDeDientes[`${num} fisuras profundas`] = () => actualizarItem('fosas_fisuras', false, String(num))

    listaDeComandosDeDientes[`${num} Fractura dental`] = () => actualizarItem('fractura', false, String(num))
    listaDeComandosDeDientes[`${num} factura`] = () => actualizarItem('fractura', false, String(num))
    listaDeComandosDeDientes[`${num} fractura`] = () => actualizarItem('fractura', false, String(num))
    listaDeComandosDeDientes[`${num} fracturas`] = () => actualizarItem('fractura', false, String(num))

    listaDeComandosDeDientes[`${num} Geminación`] = () => actualizarItem('geminacion', false, String(num))
    listaDeComandosDeDientes[`${num} Geminacion`] = () => actualizarItem('geminacion', false, String(num))
    listaDeComandosDeDientes[`${num} Germinación`] = () => actualizarItem('geminacion', false, String(num))
    listaDeComandosDeDientes[`${num} Germinacion`] = () => actualizarItem('geminacion', false, String(num))

    listaDeComandosDeDientes[`${num} Giroversión`] = () => actualizarItem('giroversion', false, String(num))
    listaDeComandosDeDientes[`${num} Giroversion`] = () => actualizarItem('giroversion', false, String(num))
    listaDeComandosDeDientes[`${num} Versión`] = () => actualizarItem('giroversion', false, String(num))

    listaDeComandosDeDientes[`${num} Impactación`] = () => actualizarItem('impactacion', false, String(num))
    listaDeComandosDeDientes[`${num} Impacto`] = () => actualizarItem('impactacion', false, String(num))

    listaDeComandosDeDientes[`${num} Implante dental en buen estado`] = () => actualizarItem('implante_good', false, String(num))
    listaDeComandosDeDientes[`${num} Implante en buen estado`] = () => actualizarItem('implante_good', false, String(num))
    listaDeComandosDeDientes[`${num} Implante dental en mal estado`] = () => actualizarItem('implante_bad', false, String(num))
    listaDeComandosDeDientes[`${num} Implante en mal estado`] = () => actualizarItem('implante_bad', false, String(num))

    listaDeComandosDeDientes[`${num} carie ${prefijosParaUbicacion} *ubicacion`] = (ubicacion) => actualizarItem('caries', ubicacion, String(num))
    listaDeComandosDeDientes[`${num} caries ${prefijosParaUbicacion} *ubicacion`] = (ubicacion) => actualizarItem('caries', ubicacion, String(num))
    listaDeComandosDeDientes[`${num} mancha blanca ${prefijosParaUbicacion} *ubicacion`] = (ubicacion) => actualizarItem('manchablanca', ubicacion, String(num))
    listaDeComandosDeDientes[`${num} lesión esmalte ${prefijosParaUbicacion} *ubicacion`] = (ubicacion) => actualizarItem('lesionesmalte', ubicacion, String(num))
    listaDeComandosDeDientes[`${num} lesión dentina ${prefijosParaUbicacion} *ubicacion`] = (ubicacion) => actualizarItem('lesiondentina', ubicacion, String(num))
    listaDeComandosDeDientes[`${num} lesión pulpa ${prefijosParaUbicacion} *ubicacion`] = (ubicacion) => actualizarItem('lesionpulpa', ubicacion, String(num))
    listaDeComandosDeDientes[`${num} restauración ${prefijosParaUbicacion} *ubicacion`] = (ubicacion) => actualizarItem('restauración', ubicacion, String(num))
    listaDeComandosDeDientes[`${num} restauración temporal ${prefijosParaUbicacion} *ubicacion`] = (ubicacion) => actualizarItem('restauracion_temporal', ubicacion, String(num))

    listaDeComandosDeDientes[`${num} Macrodoncia`] = () => actualizarItem('macrodoncia', false, String(num))
    listaDeComandosDeDientes[`${num} Microdoncia`] = () => actualizarItem('microdoncia', false, String(num))

    listaDeComandosDeDientes[`${num} Movilidad patológica 1`] = () => actualizarItem('movilidad_patologia_uno', false, String(num))
    listaDeComandosDeDientes[`${num} Movilidad patológica 2`] = () => actualizarItem('movilidad_patologia_dos', false, String(num))
    listaDeComandosDeDientes[`${num} Movilidad 1`] = () => actualizarItem('movilidad_patologia_uno', false, String(num))
    listaDeComandosDeDientes[`${num} Movilidad 2`] = () => actualizarItem('movilidad_patologia_dos', false, String(num))


    listaDeComandosDeDientes[`${num} Diente ausente no erupcionado`] = () => actualizarItem('ausente_no_erupcionado', false, String(num))
    listaDeComandosDeDientes[`${num} Ausente no erupcionado`] = () => actualizarItem('ausente_no_erupcionado', false, String(num))

    listaDeComandosDeDientes[`${num} Diente ausente por extracción`] = () => actualizarItem('ausente_extraccion', false, String(num))
    listaDeComandosDeDientes[`${num} Ausente por extracción`] = () => actualizarItem('ausente_extraccion', false, String(num))

    listaDeComandosDeDientes[`${num} Diente ausente por otras razones`] = () => actualizarItem('ausente_otras_razones', false, String(num))
    listaDeComandosDeDientes[`${num} Ausente por otras razones`] = () => actualizarItem('ausente_otras_razones', false, String(num))

    listaDeComandosDeDientes[`${num} ausente`] = () => actualizarItem('ausente', false, String(num))

    listaDeComandosDeDientes[`${num} Pieza dentaria en clavija`] = () => actualizarItem('clavija', false, String(num))
    listaDeComandosDeDientes[`${num} Dentaria en clavija`] = () => actualizarItem('clavija', false, String(num))
    listaDeComandosDeDientes[`${num} Pieza en clavija`] = () => actualizarItem('clavija', false, String(num))
    listaDeComandosDeDientes[`${num} Diente en clavija`] = () => actualizarItem('clavija', false, String(num))

    listaDeComandosDeDientes[`${num} Pieza dentaria ectópica`] = () => actualizarItem('ectopica', false, String(num))
    listaDeComandosDeDientes[`${num} Dentaria ectópica`] = () => actualizarItem('ectopica', false, String(num))
    listaDeComandosDeDientes[`${num} Pieza ectópica`] = () => actualizarItem('ectopica', false, String(num))
    listaDeComandosDeDientes[`${num} Diente ectópico`] = () => actualizarItem('ectopica', false, String(num))
    listaDeComandosDeDientes[`${num} Diente ectópica`] = () => actualizarItem('ectopica', false, String(num))

    listaDeComandosDeDientes[`${num} Pieza dentaria en erupción`] = () => actualizarItem('erupcion', false, String(num))
    listaDeComandosDeDientes[`${num} Dentaria en erupción`] = () => actualizarItem('erupcion', false, String(num))
    listaDeComandosDeDientes[`${num} Pieza en erupción`] = () => actualizarItem('erupcion', false, String(num))
    listaDeComandosDeDientes[`${num} Diente en erupción`] = () => actualizarItem('erupcion', false, String(num))

    listaDeComandosDeDientes[`${num} Pieza dentaria extruida`] = () => actualizarItem('extruida', false, String(num))
    listaDeComandosDeDientes[`${num} Extruida`] = () => actualizarItem('extruida', false, String(num))
    listaDeComandosDeDientes[`${num} Extruido`] = () => actualizarItem('extruida', false, String(num))
    listaDeComandosDeDientes[`${num} Pieza extruida`] = () => actualizarItem('extruida', false, String(num))
    listaDeComandosDeDientes[`${num} Diente extruida`] = () => actualizarItem('extruida', false, String(num))
    listaDeComandosDeDientes[`${num} Diente extruid0`] = () => actualizarItem('extruida', false, String(num))

    listaDeComandosDeDientes[`${num} Pieza dentaria intruida`] = () => actualizarItem('intruida', false, String(num))
    listaDeComandosDeDientes[`${num} Instruida`] = () => actualizarItem('intruida', false, String(num))
    listaDeComandosDeDientes[`${num} Instruido`] = () => actualizarItem('intruida', false, String(num))
    listaDeComandosDeDientes[`${num} Pieza intruida`] = () => actualizarItem('intruida', false, String(num))
    listaDeComandosDeDientes[`${num} Diente intruida`] = () => actualizarItem('intruida', false, String(num))
    listaDeComandosDeDientes[`${num} Diente intruido`] = () => actualizarItem('intruida', false, String(num))

    listaDeComandosDeDientes[`${num} Pulpotomia en buen estado`] = () => actualizarItem('pulpotomia_good', false, String(num))
    listaDeComandosDeDientes[`${num} Pulpotomia`] = () => actualizarItem('pulpotomia_good', false, String(num))

    listaDeComandosDeDientes[`${num} Pulpotomia en mal estado`] = () => actualizarItem('pulpotomia_bad', false, String(num))

    listaDeComandosDeDientes[`${num} Mesializado`] = () => actualizarItem('mesializado', false, String(num))

    listaDeComandosDeDientes[`${num} Distalizado`] = () => actualizarItem('distalizado', false, String(num))

    listaDeComandosDeDientes[`${num} Vestibularizado`] = () => actualizarItem('vestibularizado', false, String(num))

    listaDeComandosDeDientes[`${num} Palatinizado`] = () => actualizarItem('palatinizado', false, String(num))

    listaDeComandosDeDientes[`${num} Lingualizado`] = () => actualizarItem('lingualizado', false, String(num))

    listaDeComandosDeDientes[`${num} Remanente radicular en buen estado`] = () => actualizarItem('remanente_radicular_good', false, String(num))
    listaDeComandosDeDientes[`${num} Remanente radicular`] = () => actualizarItem('remanente_radicular_good', false, String(num))
    listaDeComandosDeDientes[`${num} Remanente radicular en mal estado`] = () => actualizarItem('remanente_radicular_bad', false, String(num))


    listaDeComandosDeDientes[`${num} Amalgama dental en buen estado`] = () => actualizarItem('amalgama_dental_good', false, String(num))
    listaDeComandosDeDientes[`${num} Amalgama en buen estado`] = () => actualizarItem('amalgama_dental_good', false, String(num))
    listaDeComandosDeDientes[`${num} Amalgama`] = () => actualizarItem('amalgama_dental_good', false, String(num))

    listaDeComandosDeDientes[`${num} Amalgama dental en mal estado`] = () => actualizarItem('amalgama_dental_bad', false, String(num))
    listaDeComandosDeDientes[`${num} Amalgama en mal estado`] = () => actualizarItem('amalgama_dental_bad', false, String(num))

    listaDeComandosDeDientes[`${num} Resina en buen estado`] = () => actualizarItem('resina_good', false, String(num))
    listaDeComandosDeDientes[`${num} Resina en mal estado`] = () => actualizarItem('resina_bad', false, String(num))

    listaDeComandosDeDientes[`${num} Ionómetro de vidrio en buen estado`] = () => actualizarItem('ionometro_good', false, String(num))
    listaDeComandosDeDientes[`${num} Ionómetro de vidrio`] = () => actualizarItem('ionometro_good', false, String(num))
    listaDeComandosDeDientes[`${num} Ionómetro de vidrio en mal estado`] = () => actualizarItem('ionometro_bad', false, String(num))

    listaDeComandosDeDientes[`${num} Incrustación metálica en buen estado`] = () => actualizarItem('incrustacion_metalica_good', false, String(num))
    listaDeComandosDeDientes[`${num} Incrustación metálica`] = () => actualizarItem('incrustacion_metalica_good', false, String(num))
    listaDeComandosDeDientes[`${num} Incrustación metálica en mal estado`] = () => actualizarItem('incrustacion_metalica_bad', false, String(num))

    listaDeComandosDeDientes[`${num} Incrustación estática en buen estado`] = () => actualizarItem('incrustacion_estetica_good', false, String(num))
    listaDeComandosDeDientes[`${num} Incrustación estática`] = () => actualizarItem('incrustacion_estetica_good', false, String(num))
    listaDeComandosDeDientes[`${num} Incrustación estática en mal estado`] = () => actualizarItem('incrustacion_estetica_bad', false, String(num))

    listaDeComandosDeDientes[`${num} Carilla en buen estado`] = () => actualizarItem('carilla_good', false, String(num))
    listaDeComandosDeDientes[`${num} Carilla`] = () => actualizarItem('carilla_good', false, String(num))
    listaDeComandosDeDientes[`${num} Carilla en mal estado`] = () => actualizarItem('carilla_bad', false, String(num))
    listaDeComandosDeDientes[`${num} Carillas`] = () => actualizarItem('carilla_good', false, String(num))

    listaDeComandosDeDientes[`${num} Sellante en buen estado`] = () => actualizarItem('sellante_good', false, String(num))
    listaDeComandosDeDientes[`${num} Sellante`] = () => actualizarItem('sellante_good', false, String(num))
    listaDeComandosDeDientes[`${num} Sellante en mal estado`] = () => actualizarItem('sellante_bad', false, String(num))

    listaDeComandosDeDientes[`${num} Superficie desgastada`] = () => actualizarItem('superfice_desgastada', false, String(num))

    listaDeComandosDeDientes[`${num} tratamiento de conducto en buen estado`] = () => actualizarItem('tratamiento_conducto_good', false, String(num))
    listaDeComandosDeDientes[`${num} tratamiento de conducto`] = () => actualizarItem('tratamiento_conducto_good', false, String(num))

    listaDeComandosDeDientes[`${num} Pulpectomía en buen estado`] = () => actualizarItem('pulpectomia_good', false, String(num))
    listaDeComandosDeDientes[`${num} Pulpectonía en buen estado`] = () => actualizarItem('pulpectomia_good', false, String(num))
    listaDeComandosDeDientes[`${num} Pulpectomía`] = () => actualizarItem('pulpectomia_good', false, String(num))
    listaDeComandosDeDientes[`${num} Pulpectonía`] = () => actualizarItem('pulpectomia_good', false, String(num))
    listaDeComandosDeDientes[`${num} Pulpectomía en mal estado`] = () => actualizarItem('pulpectomia_bad', false, String(num))
    listaDeComandosDeDientes[`${num} Pulpectonía en mal estado`] = () => actualizarItem('pulpectomia_bad', false, String(num))

    listaDeComandosDeDientes[`${num} tratamiento de conducto en mal estado`] = () => actualizarItem('tratamiento_conducto_bad', false, String(num))
    listaDeComandosDeDientes[`${num} tratamiento de conducto`] = () => actualizarItem('tratamiento_conducto_bad', false, String(num))

    listaDeComandosDeDientes[`${num} extracción`] = () => actualizarItem('extracción', false, String(num))

    listaDeComandosDeDientes[`${num} (a) (la) (ala) (al) :num2 :ortodóntico fijo en buen estado`] = (num2, hallazgo) => seleccionMultiple(num, num2, 'Ortodontico_Fijo_good')
    listaDeComandosDeDientes[`${num} (a) (la) (ala) (al) :num2 :ortodóntico fijo en mal estado`] = (num2, hallazgo) => seleccionMultiple(num, num2, 'Ortodontico_Fijo_bad')

    listaDeComandosDeDientes[`${num} (a) (la) (ala) (al) :num2 :ortodóntico removible en buen estado`] = (num2, hallazgo) => seleccionMultiple(num, num2, 'Ortodontico_Removible_good')
    listaDeComandosDeDientes[`${num} (a) (la) (ala) (al) :num2 :ortodóntico removible en mal estado`] = (num2, hallazgo) => seleccionMultiple(num, num2, 'Ortodontico_Removible_bad')

    listaDeComandosDeDientes[`${num} (a) (la) (ala) (al) :num2 :diastema`] = (num2, hallazgo) => seleccionMultiple(num, num2, 'diastema')
    listaDeComandosDeDientes[`${num} (a) (la) (ala) (al) :num2 :dias tema`] = (num2, hallazgo) => seleccionMultiple(num, num2, 'diastema')
    listaDeComandosDeDientes[`${num} (a) (la) (ala) (al) :num2 :fusión`] = (num2, hallazgo) => seleccionMultiple(num, num2, 'fusion')
    listaDeComandosDeDientes[`${num} (a) (la) (ala) (al) :num2 :función`] = (num2, hallazgo) => seleccionMultiple(num, num2, 'fusion')
    listaDeComandosDeDientes[`${num} (a) (la) (ala) (al) :num2 :dentaria supernumeraria`] = (num2, hallazgo) => seleccionMultiple(num, num2, 'supernumeraria')

    listaDeComandosDeDientes[`${num} (a) (la) (ala) (al) :num2 :protesis parcial fija en buen estado`] = (num2, hallazgo) => seleccionMultiple(num, num2, 'protesis_parcial_fija_good')
    listaDeComandosDeDientes[`${num} (a) (la) (ala) (al) :num2 :protesis parcial fija en mal estado`] = (num2, hallazgo) => seleccionMultiple(num, num2, 'protesis_parcial_fija_bad')

    listaDeComandosDeDientes[`${num} (a) (la) (ala) (al) :num2 :protesis completo en buen estado`] = (num2, hallazgo) => seleccionMultiple(num, num2, 'protesis_completo_good')
    listaDeComandosDeDientes[`${num} (a) (la) (ala) (al) :num2 :protesis completo en mal estado`] = (num2, hallazgo) => seleccionMultiple(num, num2, 'protesis_completo_bad')

    listaDeComandosDeDientes[`${num} (a) (la) (ala) (al) :num2 :protesis parcial fija en buen estado`] = (num2, hallazgo) => seleccionMultiple(num, num2, 'protesis_parcial_good')
    listaDeComandosDeDientes[`${num} (a) (la) (ala) (al) :num2 :protesis parcial fija en mal estado`] = (num2, hallazgo) => seleccionMultiple(num, num2, 'protesis_parcial_bad')

    listaDeComandosDeDientes[`${num} (a) (la) (ala) (al) :num2 :transposición dentaria`] = (num2, hallazgo) => seleccionMultiple(num, num2, 'transposicion_dentaria')

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
        'de (la) :num1 (a) (la) (ala) (al) :num2 :hallazgo': seleccionMultiple,
        'de (la) :num1 (a) (la) (ala) :num2 :hallazgo': seleccionMultiple,
        'del :num1 (a) (la) (ala) (al) :num2 :hallazgo': seleccionMultiple,
        'de (la) :num1 (a la) (al) :num2 :hallazgo': seleccionMultiple,
        'de (la) :num1 (a) (la) (ala) (al) :num2 :hallazgo': seleccionMultiple,
        'del :num1 (a) (la) (ala) (al) :num2 :hallazgo': seleccionMultiple,
    },
    gramatica: '#JSGF V1.0; grammar colors; public <color> = ' + opcionesDeComandosDeVoz.join(' | ') + ' ;',
    saludar,
    agradecer
}