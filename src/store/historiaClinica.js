import { item as itemPas, leerEnRegistro } from "../store/paciente";
import { obtenerPacienteOdontograma } from "../store/formodontograma";
import { obtenerPacienteAdmision } from "../store/admision";
import { obtenerOdontologo } from "../store/usuario";
import Cie10 from '../config/Cie10.json';
import jsPDF from 'jsPDF'

export function printHistoriaClinicaPaciente(idPaciente) {
    var pdf = new jsPDF()
    let posis = 39;
    let posis1 = 0;
    const today = new Date();
    const fechaFormato = padLeadingZeros(today.getDate(), 2) + '/' + padLeadingZeros((today.getMonth() + 1)) + '/' + today.getFullYear();
    const horaFormato = padLeadingZeros(today.getHours(), 2) + ":" + padLeadingZeros(today.getMinutes(), 2);
    obtenerPacienteOdontograma(idPaciente).then((odontograma) => {
        const pacienteOdontograma = odontograma[0];
        obtenerPacienteAdmision(idPaciente).then((admision) => {
            //console.log(admision);
            const pacienteAdmision = admision[0];
            leerEnRegistro(idPaciente);            
            obtenerOdontologo(itemPas.value.idOdontologo).then((odonto) => {
                //console.log(odonto);
                const odontologo = odonto[0];                                
                //datos admision
                const motivoConsulta = ''
                const motivoConsulta1 = ''
                const motivoConsulta2 = ''
                const enfermedadActual = ''
                const enfermedadActual1 = ''
                const enfermedadActual2 = ''
                const examenClinicoGene = ''
                const examenClinicoGene1 = ''
                const examenClinicoGene2 = ''
                const examenClinicoEstoma = ''
                const examenClinicoEstoma1 = ''
                const examenClinicoEstoma2 = ''
                if (admision.length > 0) {
                    motivoConsulta = '----';//pacienteAdmision.motivoCOnsulta
                    motivoConsulta1 = motivoConsulta.substring(0, 99)
                    motivoConsulta2 = motivoConsulta.substring(99, motivoConsulta.length)

                    enfermedadActual = '--';//pacienteAdmision.enfermedadActual
                    enfermedadActual1 = enfermedadActual.substring(0, 99)
                    enfermedadActual2 = enfermedadActual.substring(99, enfermedadActual.length)

                    examenClinicoGene = '--';//pacienteAdmision.examenClinicoGeneral
                    examenClinicoGene1 = examenClinicoGene.substring(0, 99)
                    examenClinicoGene2 = examenClinicoGene.substring(99, examenClinicoGene.length)

                    examenClinicoEstoma = '--';//pacienteAdmision.examenClinicoEstoma
                    examenClinicoEstoma1 = examenClinicoEstoma.substring(0, 99)
                    examenClinicoEstoma2 = examenClinicoEstoma.substring(99, examenClinicoEstoma.length)
                }
                pdf.html("", {
                    callback: function (pdf) {
                        pdf.setFontSize(17);
                        pdf.setFont(undefined, 'bold')
                        pdf.text(45, 20, 'HISTORIA CLÍNICA ODONTOLÓGICA');
                        pdf.setFont(undefined, 'normal')
                        pdf.setFontSize(12);                       
                        pdf.text(10, 30, pad('Fecha : ' + fechaFormato, 40, ' ') + pad('Hora : ' + horaFormato, 40, ' '));
                        pdf.setFontSize(14);
                        pdf.setFont(undefined, 'bold')
                        pdf.text(10, 40, 'ANAMNESIS');
                        pdf.text(10, 50, 'FILIACIÓN');
                        pdf.setFont(undefined, 'normal')
                        pdf.setFontSize(12);
                        pdf.text(10, 57, pad('Nombres del paciente : ' + itemPas.value.nombre + ' ' + itemPas.value.apellidoPaterno + ' ' + itemPas.value.apellidoMaterno, 90, ' ') + pad('Edad : ' + '', 15, ' ') + pad('Sexo : ' + itemPas.value.sexo, 15, ' '));//itemPas.value.edad
                        pdf.text(10, 64, pad('Fecha de nacimiento : ' + itemPas.value.fechaNacimiento, 80, ' '));
                        pdf.text(10, 71, pad('Dirección : ' + itemPas.value.Direccion, 100, ' '));
                        pdf.text(10, 78, pad('Procedencia : ' + '', 60, ' ') + pad('Ocupación : ' + '', 60, ' '));//itemPas.value.prcedencia,itemPas.value.ocupacion
                        pdf.text(10, 85, pad('Viajes en el último año : ' + '', 100, ' '));//itemPas.value.viajeUltimoAnio
                        pdf.text(10, 92, pad('Teléfono : ' + itemPas.value.telefono, 50, ' '));
                        pdf.text(10, 99, pad('En caso de emergencia comunicarse a : ' + '', 90, ' '));//itemPas.value.telefonoEmergencia
                        pdf.setFontSize(14);
                        pdf.setFont(undefined, 'bold')
                        pdf.text(10, 109, 'MOTIVO DE CONSULTA');
                        pdf.setFont(undefined, 'normal')
                        pdf.setFontSize(12);
                        pdf.text(10, 116, pad(motivoConsulta1, 120, ' '));
                        pdf.text(10, 123, pad(motivoConsulta2, 120, ' '));
                        pdf.setFontSize(14);
                        pdf.setFont(undefined, 'bold')
                        pdf.text(10, 133, 'ENFERMDAD ACTUAL');
                        pdf.setFont(undefined, 'normal')
                        pdf.setFontSize(12);
                        pdf.text(10, 140, pad(enfermedadActual1, 120, ' '));
                        pdf.text(10, 147, pad(enfermedadActual2, 120, ' '));
                        if (admision.length > 0) {
                            pdf.text(10, 154, pad('Tiempo de enfermedad : ' + '---------------------', 90, ' ')); //pacienteAdmision.tiempoEnfermedad
                            pdf.text(10, 161, pad('Signos y sintómas principales : ' + '---------------------', 90, ' '));//pacienteAdmision.signosSintomas
                            pdf.text(10, 168, pad('Relato cronológico : ' + '---------------------', 90, ' '));//pacienteAdmision.relatoCronologico
                            pdf.text(10, 175, pad('Funciones biológicas : ' + '---------------------', 90, ' '));//pacienteAdmision.funcionesBiologicas    
                        } else {
                            pdf.text(10, 154, pad('Tiempo de enfermedad : ' + '', 90, ' ')); 
                            pdf.text(10, 161, pad('Signos y sintómas principales : ' + '', 90, ' '));
                            pdf.text(10, 168, pad('Relato cronológico : ' + '', 90, ' '));
                            pdf.text(10, 175, pad('Funciones biológicas : ' + '', 90, ' '));
                        }
                        pdf.setFontSize(14);
                        pdf.setFont(undefined, 'bold')
                        pdf.text(10, 185, 'EXAMEN CLÍNICO');
                        pdf.setFont(undefined, 'normal')
                        pdf.setFontSize(12);
                        if (admision.length > 0) {
                            pdf.text(10, 192, pad('Signos Vitales. P.A. : ' + '-------', 35, ' ') + pad('Pulso : ' + '-------', 25, ' ') + pad('Temp : ' + '-------', 25, ' ') + pad('F.C. : ' + '-------', 20, ' ') + pad('F.Resp. : ' + '-------', 20, ' '));
                            //pacienteAdmision.signosVitales,pacienteAdmision.pulso,pacienteAdmision.temperatura,pacienteAdmision.fc,pacienteAdmision.fResp
                        } else {
                            pdf.text(10, 192, pad('Signos Vitales. P.A. : ' + '', 35, ' ') + pad('Pulso : ' + '', 25, ' ') + pad('Temp : ' + '', 25, ' ') + pad('F.C. : ' + '', 20, ' ') + pad('F.Resp. : ' + '', 20, ' '));
                        }

                        pdf.text(10, 199, 'Examen clínico general : ');
                        pdf.text(10, 206, pad(examenClinicoGene1, 120, ' '));
                        pdf.text(10, 213, pad(examenClinicoGene2, 120, ' '));
                        pdf.text(10, 220, 'Examen clínico estomatológico : ');
                        pdf.text(10, 227, pad(examenClinicoEstoma1, 120, ' '));
                        pdf.text(10, 235, pad(examenClinicoEstoma2, 120, ' '));
                        pdf.insertPage();
                        pdf.setFontSize(14);
                        pdf.setFont(undefined, 'bold')
                        pdf.text(10, 30, 'DIAGNÓSTICO(CIE 10)');
                        pdf.setFont(undefined, 'normal')
                        //Existe odontograma
                        if (odontograma.length > 0) {
                            pdf.setFontSize(12);
                            Cie10.CIE10.forEach(element => {
                                let ubicacionnes = pacienteOdontograma.hallazgos.filter((elem) => elem.hallazgo == element.HALLAZGO);
                                let Piezas = "";
                                if (ubicacionnes != undefined && ubicacionnes?.length > 0) {
                                    ubicacionnes.forEach(dient => {
                                        if (!Piezas.includes(dient.diente)) {
                                            Piezas = Piezas + dient.diente + '; ';
                                        }
                                    });
                                    pdf.text(10, posis, element.DECRICIE10 + " / Piezas : " + Piezas + " / " + element.CIE10);
                                    posis = posis + 7;
                                }
                            });
                        }
                        pdf.setFontSize(14);
                        pdf.setFont(undefined, 'bold')
                        pdf.text(10, posis + 4, 'PLAN DE TRATAMIENTO');
                        pdf.setFont(undefined, 'normal')
                        if (odontograma.length > 0) {
                            posis1 = posis + 12;
                            pdf.setFontSize(12);
                            Cie10.CIE10.forEach(element => {
                                let ubicacionnes = pacienteOdontograma.hallazgos.filter((elem) => elem.hallazgo == element.HALLAZGO);
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
                        pdf.text(10, posis1 + 25, pad('Nombres y apellidos del profesional : ' + odontologo.nombre + ' '+odontologo.apellidoPaterno+' '+odontologo.apellidoMaterno, 90, ' '));
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