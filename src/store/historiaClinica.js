import { item as itemPas, leerEnRegistro } from "../store/paciente";
import { obtenerPacienteOdontograma } from "../store/formodontograma";
import { obtenerPacienteAdmision } from "../store/admision";
import { obtenerOdontologo } from "../store/usuario";
import { miUsuario } from '../store/sesion';
import Cie10 from '../config/Cie10.json';
import jsPDF from 'jsPDF'

export function printHistoriaClinicaPaciente(idPaciente) {
    var pdf = new jsPDF()
    let posis = 39;
    let posis1 = 0;
    const today = new Date();
    const fechaFormato = padLeadingZeros(today.getDate(), 2) + '/' + padLeadingZeros((today.getMonth() + 1)) + '/' + today.getFullYear();
    const horaFormato = padLeadingZeros(today.getHours(), 2) + ":" + padLeadingZeros(today.getMinutes(), 2);
    const idOdontologo = miUsuario()?.uid;
    obtenerPacienteOdontograma(idPaciente,idOdontologo).then((odontograma) => {
        //debugger;
        //console.log(odontograma)
        const lastDiagnostico= Math.max(...odontograma.map(o => o.order));
        const pacienteOdontograma = odontograma.filter(o=> o.order==lastDiagnostico)
        
        obtenerPacienteAdmision(idPaciente,idOdontologo).then((admision) => {
            //console.log(admision);
            const pacienteAdmision =  (admision.length>0)? admision[0]:{};
            leerEnRegistro(idPaciente);
            obtenerOdontologo(itemPas.value.idOdontologo).then((odonto) => {
                //console.log(odonto);
                const odontologo = odonto[0];
                //datos admision
                let motivoConsulta = (pacienteAdmision.motivoConsulta != undefined)? pacienteAdmision.motivoConsulta:''
                let motivoConsulta1 = motivoConsulta.substring(0, 99)
                let motivoConsulta2 = motivoConsulta.substring(99, motivoConsulta.length)
                let enfermedadActual = (pacienteAdmision.enfermedadActual != undefined)? pacienteAdmision.enfermedadActual:''
                let enfermedadActual1 = enfermedadActual.substring(0, 99)
                let enfermedadActual2 = enfermedadActual.substring(99, enfermedadActual.length)
                let examenClinicoGene = (pacienteAdmision.examClinicoGeneral != undefined)? pacienteAdmision.examClinicoGeneral:''
                let examenClinicoGene1 = examenClinicoGene.substring(0, 99)
                let examenClinicoGene2 = examenClinicoGene.substring(99, examenClinicoGene.length)
                let examenClinicoEstoma = (pacienteAdmision.examClinicoOdonto != undefined)? pacienteAdmision.examClinicoOdonto:''
                let examenClinicoEstoma1 = examenClinicoEstoma.substring(0, 99)
                let examenClinicoEstoma2 = examenClinicoEstoma.substring(99, examenClinicoEstoma.length)
                //debugger;
                let sexoPaciente = (itemPas.value.sexo=='F')? 'Femenino':'Masculino'
                let procedencia = (pacienteAdmision.procedencia != undefined)?pacienteAdmision.procedencia:'';
                let ocupacion = (pacienteAdmision.ocupacion != undefined)?pacienteAdmision.ocupacion:'';
                let viajesUltimos = (pacienteAdmision.viajesUltimos != undefined)?pacienteAdmision.viajesUltimos:'';
                let numeroEmergencia = (pacienteAdmision.numeroEmergencia != undefined)?pacienteAdmision.numeroEmergencia:'';
                let tiempoEnfermedad = (pacienteAdmision.tiempoEnfermedad != undefined)?pacienteAdmision.tiempoEnfermedad:'';
                let signosYSintomas = (pacienteAdmision.signosYSintomas != undefined)?pacienteAdmision.signosYSintomas:'';
                let relatoCronologico = (pacienteAdmision.relatoCronologico != undefined)?pacienteAdmision.relatoCronologico:'';

                let antecedentesFam = (pacienteAdmision.antecedentesFam != undefined)?pacienteAdmision.antecedentesFam:'';
                let antecedentesPer = (pacienteAdmision.antecedentesPer != undefined)?pacienteAdmision.antecedentesPer:'';

                let pa = (pacienteAdmision.pa != undefined)?pacienteAdmision.pa:'';
                let pulso = (pacienteAdmision.pulso != undefined)?pacienteAdmision.pulso:'';
                let temperatura = (pacienteAdmision.temperatura != undefined)?pacienteAdmision.temperatura:'';
                let fc = (pacienteAdmision.fc != undefined)?pacienteAdmision.fc:'';
                let fResp = (pacienteAdmision.fResp != undefined)?pacienteAdmision.fResp:'';
                pdf.html("", {
                    callback: function (pdf) {
                        pdf.setFontSize(17);
                        pdf.setFont(undefined, 'bold')
                        pdf.text(45, 20, 'HISTORIA CLÍNICA ODONTOLÓGICA');
                        pdf.setFont(undefined, 'normal')
                        pdf.setFontSize(12);
                        pdf.text(10, 30, pad('HC : ' + itemPas.value.numeroDocumento, 50, ' ')+pad('Fecha : ' + fechaFormato, 50, ' ') + pad('Hora : ' + horaFormato, 50, ' '));
                        pdf.setFontSize(14);
                        pdf.setFont(undefined, 'bold')
                        pdf.text(10, 40, 'ANAMNESIS');
                        pdf.text(10, 50, 'FILIACIÓN');
                        pdf.setFont(undefined, 'normal')
                        pdf.setFontSize(12);
                        pdf.text(10, 57, pad('Nombres del paciente : ' + itemPas.value.nombre + ' ' + itemPas.value.apellidoPaterno + ' ' + itemPas.value.apellidoMaterno, 70, ' ') + pad('Edad : ' + getEdad(itemPas.value.fechaNacimiento), 15, ' ') + pad('Sexo : ' + sexoPaciente, 35, ' '));
                        pdf.text(10, 64, pad('Fecha de nacimiento : ' + itemPas.value.fechaNacimiento, 80, ' '));
                        pdf.text(10, 71, pad('Dirección : ' + itemPas.value.Direccion, 100, ' '));
                        pdf.text(10, 78, pad('Procedencia : ' + procedencia, 60, ' ') + pad('Ocupación : ' + ocupacion, 60, ' '));
                        pdf.text(10, 85, pad('Viajes en el último año : ' + viajesUltimos, 100, ' '));
                        pdf.text(10, 92, pad('Teléfono : ' + itemPas.value.telefono, 50, ' '));
                        pdf.text(10, 99, pad('En caso de emergencia comunicarse a : ' + numeroEmergencia, 90, ' '));
                        pdf.setFontSize(14);
                        pdf.setFont(undefined, 'bold')
                        pdf.text(10, 109, 'MOTIVO DE CONSULTA');
                        pdf.setFont(undefined, 'normal')
                        pdf.setFontSize(12);
                        pdf.text(10, 116, pad(motivoConsulta1, 120, ' '));
                        pdf.text(10, 123, pad(motivoConsulta2, 120, ' '));
                        pdf.setFontSize(14);
                        pdf.setFont(undefined, 'bold')
                        pdf.text(10, 133, 'ENFERMEDAD ACTUAL');
                        pdf.setFont(undefined, 'normal')
                        pdf.setFontSize(12);
                        pdf.text(10, 140, pad(enfermedadActual1, 120, ' '));
                        pdf.text(10, 147, pad(enfermedadActual2, 120, ' '));
                        pdf.text(10, 154, pad('Tiempo de enfermedad : ' + tiempoEnfermedad, 90, ' '));
                        pdf.text(10, 161, pad('Signos y sintómas principales : ' + signosYSintomas, 90, ' '));
                        pdf.text(10, 168, pad('Relato cronológico : ' + relatoCronologico, 90, ' '));
                        pdf.text(10, 175, pad('Funciones biológicas : ' + ' ', 90, ' '));//pacienteAdmision.funcionesBiologicas    
                        
                        pdf.setFontSize(14);
                        pdf.setFont(undefined, 'bold')
                        pdf.text(10, 185, 'ANTECENDENTES');
                        pdf.setFont(undefined, 'normal')
                        pdf.text(10, 192, pad('Antecedentes familiares : ' + antecedentesFam, 90, ' '));
                        pdf.text(10, 199, pad('Antecedentes personales : ' + antecedentesPer, 90, ' '));
                        pdf.setFontSize(14);
                        pdf.setFont(undefined, 'bold')
                        pdf.text(10, 209, 'EXAMEN CLÍNICO');
                        pdf.setFont(undefined, 'normal')
                        pdf.setFontSize(12);
                        pdf.text(10, 216, pad('Signos Vitales. P.A. : ' + pa, 35, ' ') + pad('Pulso : ' + pulso, 25, ' ') + pad('Temp : ' + temperatura, 25, ' ') + pad('F.C. : ' + fc, 20, ' ') + pad('F.Resp. : ' + fResp, 20, ' '));

                        pdf.text(10, 223, 'Examen clínico general : ');
                        pdf.text(10, 230, pad(examenClinicoGene1, 120, ' '));
                        pdf.text(10, 237, pad(examenClinicoGene2, 120, ' '));
                        pdf.text(10, 244, 'Examen clínico odontoestomatológico : ');
                        pdf.text(10, 251, pad(examenClinicoEstoma1, 120, ' '));
                        pdf.text(10, 258, pad(examenClinicoEstoma2, 120, ' '));
                        pdf.insertPage();
                        pdf.setFontSize(14);
                        pdf.setFont(undefined, 'bold')
                        pdf.text(10, 30, 'DIAGNÓSTICO(CIE 10)');
                        pdf.setFont(undefined, 'normal')
                        //Existe odontograma
                        if (pacienteOdontograma.length > 0) {
                            pdf.setFontSize(12);
                            Cie10.CIE10.forEach(element => {
                                let ubicacionnes = pacienteOdontograma[0].hallazgos.filter((elem) => elem.hallazgo == element.HALLAZGO);
                                let Piezas = "";
                                if (ubicacionnes != undefined && ubicacionnes?.length > 0) {
                                    ubicacionnes.forEach(dient => {
                                        if (!Piezas.includes(dient.diente)) {
                                            Piezas = Piezas + dient.diente + '; ';
                                        }
                                    });
                                    if (element.TRATAMIENTO != "") {
                                        pdf.text(10, posis, element.DECRICIE10 + " / Piezas : " + Piezas + " / " + element.CIE10);
                                        posis = posis + 7;
                                    }
                                }
                            });
                        }
                        pdf.setFontSize(14);
                        pdf.setFont(undefined, 'bold')
                        pdf.text(10, posis + 4, 'PLAN DE TRATAMIENTO');
                        pdf.setFont(undefined, 'normal')
                        if (pacienteOdontograma.length > 0) {
                            posis1 = posis + 12;
                            pdf.setFontSize(12);
                            Cie10.CIE10.forEach(element => {
                                let ubicacionnes = pacienteOdontograma[0].hallazgos.filter((elem) => elem.hallazgo == element.HALLAZGO);
                                let Piezas = "";
                                if (ubicacionnes != undefined && ubicacionnes?.length > 0) {
                                    ubicacionnes.forEach(dient => {
                                        if (!Piezas.includes(dient.diente)) {
                                            Piezas = Piezas + dient.diente + '; ';
                                        }
                                    });
                                    if (element.TRATAMIENTO != "") {
                                        pdf.text(10, posis1, element.TRATAMIENTO + " / Piezas : " + Piezas);
                                        posis1 = posis1 + 7;
                                    }
                                }
                            });
                        } else {
                            posis1 = 54;
                        }
                        pdf.setFontSize(14);
                        pdf.setFont(undefined, 'bold')
                        pdf.text(10, posis1 + 3, 'PRONÓSTICO');
                        pdf.setFont(undefined, 'normal')
                        pdf.setFontSize(12);
                        pdf.text(10, posis1 + 10, pad(' ', 100, ' '));//pacienteOdontograma.pronostico
                        pdf.text(10, posis1 + 25, pad('Nombres y apellidos del profesional : ' + odontologo.nombre + ' ' + odontologo.apellidoPaterno + ' ' + odontologo.apellidoMaterno, 90, ' '));
                        pdf.setFont(undefined, 'bold')
                        pdf.text(10, posis1 + 45, 'Sello y firma');
                        var pdfName = 'historiaClinica' + itemPas.value.numeroDocumento
                        pdf.save(pdfName + '.pdf');
                    }
                });
            })
                .catch(error => {
                    console.error(error);
                })
        })
            .catch(error => {
                console.error(error);
            })
    })
        .catch(error => {
            console.error(error);
        })
}
function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : n + new Array(width - n.length + 1).join(z);
}
function padLeadingZeros(num, size) {
    var s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
}
function getEdad(dateString) {
    let hoy = new Date()
    let fechaNacimiento = new Date(dateString)
    let edad = hoy.getFullYear() - fechaNacimiento.getFullYear()
    let diferenciaMeses = hoy.getMonth() - fechaNacimiento.getMonth()
    if (diferenciaMeses < 0 || (diferenciaMeses === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
      edad--
    }
    return edad
  }