import { item, verOdontograma, detenerVoz, speak, flagLimpiar } from './odontograma'
import { listaDeHallazgos, listaDeDientesCombo, listaDeTipos } from '../config/Parametros';
import { item as itemodontograma, actualizarDetalle, agregarLista, validaDoble } from './formodontograma';
import escenarios from '../config/Escenarios.json';
import { useRoute } from "vue-router";
const route = useRoute()

const saludar = () => speak('Hola, soy Quiru')
const seleccionHallazgo = (par1, par2) => {
    let numeros = par2.match(/-?\d+(?:\.\d+)?/g);
    let num1_ = Math.abs(par1) < 10 ? Math.abs(par1) * 10 : Math.abs(par1)
    let num2_ = Math.abs(numeros) < 10 ? Math.abs(numeros) * 10 : Math.abs(numeros)
    if (num2_ > 0) {
        par2 = par2.substring(par2.indexOf(numeros[0]) + numeros[0].length, par2.length).trim()
    }
    let hazgoUbi = obtnerDatos(par2)
    if (hazgoUbi.hallazgo == "") {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({
            "orden": par2
        });
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://us-central1-quiru-free.cloudfunctions.net/corecttext", requestOptions)
            .then(response => response.text())
            .then(result => {
                let _hazgoUbi = obtnerDatos(result.toLowerCase())
                if (_hazgoUbi.hallazgo == "") {
                    speak('El Hallazgo' + result.toLowerCase() + ' seleccionado no existe')
                    /* let _similitud = 0.75
                     listaDeHallazgos.forEach(element => {
                         let _conjunto1 = new Set(element.text.toLowerCase().split(""));
                         let _conjunto2 = new Set(result.replace(hazgoUbi.ubicacion, "").trim().toLowerCase().split(""));
                         let interseccion = new Set([..._conjunto1].filter(caracter => _conjunto2.has(caracter)));
                         let similitud = interseccion.size / (_conjunto1.size + _conjunto2.size - interseccion.size);
                         if (similitud > _similitud) {
                             _hazgoUbi.hallazgo = element.value.toLowerCase();
                             _similitud = similitud;
                         }
                     });*/
                } else {
                    GrabarHallazgo(num1_, num2_, _hazgoUbi.hallazgo, _hazgoUbi.ubicacion);
                }

            })
            .catch(error => {
                speak('por favor vuelve a intentarlo')
                console.log('error', error)
            });
    }
    else {
        GrabarHallazgo(num1_, num2_, hazgoUbi.hallazgo, hazgoUbi.ubicacion);
    }
}
const obtnerDatos = (frase) => {
    let ubicacion = ""
    let hallazgoencontrado = ""
    let _similitud = 0.6;
    let extraeubucacion = frase.split(" ")
    let _ubic = frase;
    if (extraeubucacion.length > 0) {
        _ubic = extraeubucacion[extraeubucacion.length - 1]
    }
    listaDeTipos.forEach(element => {
        let conjunto1 = new Set(element.value.toLowerCase().split(""));
        let conjunto2 = new Set(_ubic.toLowerCase().split(""));
        let interseccion = new Set([...conjunto1].filter(caracter => conjunto2.has(caracter)));
        let similitud = interseccion.size / (conjunto1.size + conjunto2.size - interseccion.size);
        if (similitud >= _similitud) {
            ubicacion = element.value.toLowerCase();
            _similitud = similitud;
        }
    });
    switch (_ubic) {
        case 'mesializado':
            ubicacion = "";
            break;
        case 'distalizado':
            ubicacion = "";
            break;
        case 'vestibularizado':
            ubicacion = "";
            break;
        case 'palatinizado':
            ubicacion = "";
            break;
        case 'lingualizado':
            ubicacion = "";
            break;
        case 'plural':
            ubicacion = "oclusal";
            break;
        case 'plusal':
            ubicacion = "oclusal";
            break;
    }

    let hallazagoFil = listaDeHallazgos.filter(coincidencias => coincidencias.text.toLowerCase().includes(frase.replace(ubicacion, "").trim().toLowerCase()));
    if (hallazagoFil.length > 0) {
        let _similitud = 0.65
        hallazagoFil.forEach(element => {
            let _conjunto1 = new Set(element.text.toLowerCase().split(""));
            let _conjunto2 = new Set(frase.replace(ubicacion, "").trim().toLowerCase().split(""));
            let interseccion = new Set([..._conjunto1].filter(caracter => _conjunto2.has(caracter)));
            let similitud = interseccion.size / (_conjunto1.size + _conjunto2.size - interseccion.size);
            if (similitud > _similitud) {
                hallazgoencontrado = element.value.toLowerCase();
                _similitud = similitud;
            }
        });
    }
    return { hallazgo: hallazgoencontrado, ubicacion: ubicacion };
}
const GrabarHallazgo = (num1_, num2_, hallazgo, ubicacion) => {
    if (num2_ > 0) {
        seleccionMultiple(num1_, num2_, hallazgo);
    }
    else {
        actualizarItem(num1_, hallazgo, ubicacion)
    }
}

const seleccionMultiple = (num1_, num2_, hallazgo) => {
    let mensaje = ''
    let hablar = true
    const hzgoMatriz = listaDeHallazgos.filter((elem) =>
        elem.value.toLowerCase().includes(hallazgo.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")) && elem.label != "",
    );
    const index = listaDeDientesCombo?.findIndex(i => i.value == num1_)
    if (index < 0) {
        speak('La pieza seleccionada no existe')
        return false
    }
    const indexHgo = listaDeHallazgos?.findIndex(i => i.value == hzgoMatriz[0]?.value)
    if (indexHgo < 0) {
        speak('El Hallazgo seleccionado no existe')
        return false
    }
    const indexAlt = listaDeDientesCombo?.findIndex(i => i.value == num2_)
    if (indexAlt < 0) {
        speak('La segunda pieza seleccionada no existe')
        return false
    }

    if (hzgoMatriz.length > 0) {
        let fila = {
            diente: num1_,
            hallazgo: hzgoMatriz[0]?.value,
            ubicacion: "",
            sigla: hzgoMatriz[0]?.sigla,
            posicion: "",
            dienteAlterno: num2_
        }
        if (hzgoMatriz[0]?.DobleD == "DD") {
            if (!validaDoble(fila)) {
                speak('Solo puede seleccionar una pieza adyacente para este hallazgo')
                return false
            }
        }
        if (fila) {

            mensaje += `Pieza ${num1_} a ${num2_}`
        }
        let _hallazgo = hzgoMatriz[0]?.value;
        if (hzgoMatriz[0]?.esDirecto == "SI" && hzgoMatriz[0]?.EsMultiple == "SI" && hzgoMatriz[0]?.Replicable_Intermedio != "RE") {
            item.value.hallazgos.push({
                diente: num1_,
                hallazgo: hzgoMatriz[0]?.value,
                ubicacion: "",
                sigla: hzgoMatriz[0]?.sigla,
                posicion: "",
                dienteAlterno: num2_,
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
                        dienteAlterno: "",
                        descripcion: hzgoMatriz[0]?.text
                    })
                })
            }
        }
        item.diente = num1_;
        item.value.diente = num1_;
        agregarLista(itemodontograma.value.id, item.value);
    }
    return hablar && speak(mensaje)
}

export const limpiar = () => {
    item.value = {
        diente: '',
        hallazgos: []
    }
    flagLimpiar.value = !flagLimpiar.value
    speak('Limpiando')
}
export const ejecutarVoz = (texto) => {
    speak(texto)
}
export const limpiarSinVoz = () => {
    item.value = {
        diente: '',
        hallazgos: []
    }
}

const listaDeDientes_ = [
    1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 3.1, 3.2, 3.3,
    3.4, 3.5, 3.6, 3.7, 3.8, 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8, 5.1, 5.2, 5.3, 5.4, 5.5, 6.1,
    6.2, 6.3, 6.4, 6.5, 7.1, 7.2, 7.3, 7.4, 7.5, 8.1, 8.2, 8.3, 8.4, 8.5,
    11, 12, 13, 14, 15, 16, 17, 18, 21, 22, 23, 24, 25, 26, 27, 28, 31, 32, 33,
    34, 35, 36, 37, 38, 41, 42, 43, 44, 45, 46, 47, 48, 51, 52, 53, 54, 55, 61,
    62, 63, 64, 65, 71, 72, 73, 74, 75, 81, 82, 83, 84, 85,
];

export const actualizarItem = (pieza, hallazgo, ubicacion) => {
    let mensaje = ''
    const hablar = true
    if (pieza) {

        if (item.value.diente != pieza) {
            item.value.hallazgos = []
            item.value.diente = pieza
        }
        mensaje += `Pieza ${pieza}`
    }
    const ubicacionnes = escenarios.Esenarios.filter((elem) => elem.pieza == item.value.diente)[0];
    const hzgoMatriz = listaDeHallazgos.filter((elem) => elem.value == hallazgo && elem.label != "");
    let _posicion = "";
    if (ubicacionnes != undefined) {
        _posicion = (ubicacionnes.arriba.trim() == ubicacion) ? 'arriba' : _posicion;
        _posicion = (ubicacionnes.centro.trim() == ubicacion) ? 'centro' : _posicion;
        _posicion = (ubicacionnes.abajo.trim() == ubicacion) ? 'abajo' : _posicion;
        _posicion = (ubicacionnes.izquierda.trim() == ubicacion) ? 'izquierda' : _posicion;
        _posicion = (ubicacionnes.derecha.trim() == ubicacion) ? 'derecha' : _posicion;
    }
    const index = listaDeDientesCombo?.findIndex(i => i.value == pieza)
    if (index < 0) {
        speak('La pieza seleccionada no existe')
        return false
    }
    const indexHgo = listaDeHallazgos?.findIndex(i => i.value == hzgoMatriz[0]?.value)
    if (indexHgo < 0) {
        speak('El Hallazgo seleccionado no existe')
        return false
    }
    if (hzgoMatriz.length > 0) {

        if (hzgoMatriz[0]?.esDirecto == "SI") {
            item.value.hallazgos.push({
                diente: pieza,
                hallazgo: hzgoMatriz[0]?.value,
                ubicacion: "",
                sigla: hzgoMatriz[0]?.sigla,
                posicion: "",
                fechaHallazgo: new Date(),
                descripcion: hzgoMatriz[0]?.text,
                dienteAlterno: "",
            })
        }
        else {
            if (ubicacion == "") {
                speak('El hallazgo ' + hzgoMatriz[0]?.text + ', requiere de la zona o superficie del diente, vuelve a intentarlo')
                return false
            }
            item.value.hallazgos.push({
                diente: pieza,
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

const prefijosParaUbicacion = '(vestibular) (distal) (oclusal) (mesial) (palatino) (incisal) (lingual)'
const listaDeComandosDeDientes = {}
listaDeDientes_?.map(num => {
    listaDeComandosDeDientes[`${num} *frase`] = (frase) => seleccionHallazgo(num, frase, "")
})


export default {

    conVozEncendida: {
        ...listaDeComandosDeDientes,
        'borrar (fila) :fila': eliminarFila,
        'eliminar (fila) :fila': eliminarFila
    },
    /*     'gracias': detenerVoz,
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
     },*/
    //gramatica: '#JSGF V1.0; grammar colors; public <color> = ' + opcionesDeComandosDeVoz.join(' | ') + ' ;',
    saludar,
}