import { item as itemPas, leerEnRegistro } from "../store/paciente";
import { obtenerPacienteOdontograma } from "../store/formodontograma";
import { obtenerPacienteAdmision } from "../store/admision";
import { obtenerOdontologo } from "../store/usuario";
import { miUsuario } from '../store/sesion';
import Cie10 from '../config/Cie10.json';
import jsPDF from 'jsPDF'
import autoTable from 'jspdf-autotable'
import { getDownloadURL, ref as storageRef, getStorage} from 'firebase/storage';
const storage = getStorage();
async function getDocumentImageUrls(documentLinks) {
  const imageUrls = [];
  for (const link of documentLinks) {
    try {
      const storageReference = storageRef(storage, link);
      const downloadUrl = await getDownloadURL(storageReference);
      imageUrls.push(downloadUrl);
    } catch (error) {
      console.error('Error al obtener la URL de imagen:', error);
    }
  }
  return imageUrls;
}

function getImageType(imageUrl) {
    var extension = imageUrl.substr(imageUrl.lastIndexOf('.') + 1).toLowerCase();
    if (extension === 'pdf') {
      return 'PDF';
    } else if (extension === 'png') {
      return 'PNG';
    } else if (extension === 'jpg' || extension === 'jpeg') {
      return 'JPEG';
    }
    return 'PNG';
  }

export function printHistoriaClinicaPaciente(idPaciente) {
    var pdf = new jsPDF()
    let posis = 39;
    let posis1 = 0;
    const today = new Date();
    const fechaFormato = padLeadingZeros(today.getDate(), 2) + '/' + padLeadingZeros((today.getMonth() + 1)) + '/' + today.getFullYear();
    const horaFormato = padLeadingZeros(today.getHours(), 2) + ":" + padLeadingZeros(today.getMinutes(), 2);
    const idOdontologo = miUsuario()?.uid;
    obtenerPacienteOdontograma(idPaciente, idOdontologo).then((odontograma) => {
        const lastDiagnostico = Math.max(...odontograma.map(o => o.order));
        const pacienteOdontograma = odontograma.filter(o => o.order == lastDiagnostico)
        obtenerPacienteAdmision(idPaciente, idOdontologo).then((admision) => {
            const pacienteAdmision = (admision.length > 0) ? admision[0] : {};
            leerEnRegistro(idPaciente);
            obtenerOdontologo(itemPas.value.idOdontologo).then((odonto) => {
                const odontologo = odonto[0];
                //datos admision
                let fechaNacimiento = (itemPas.value.fechaNacimiento != undefined) ? itemPas.value.fechaNacimiento : '          '
                let departamento = (itemPas.value.departamento != undefined) ? itemPas.value.departamento : '          '
                let Direccion = (itemPas.value.Direccion != undefined) ? itemPas.value.Direccion : '          '
                let motivoConsulta = (pacienteAdmision.motivoConsulta != undefined) ? pacienteAdmision.motivoConsulta : ''
                let motivoConsulta1 = motivoConsulta.substring(0, 99)
                let motivoConsulta2 = motivoConsulta.substring(99, motivoConsulta.length)
                let enfermedadActual = (pacienteAdmision.enfermedadActual != undefined) ? pacienteAdmision.enfermedadActual : ''
                let enfermedadActual1 = enfermedadActual.substring(0, 99)
                let enfermedadActual2 = enfermedadActual.substring(99, enfermedadActual.length)
                let examenClinicoGene = (pacienteAdmision.examClinicoGeneral != undefined) ? pacienteAdmision.examClinicoGeneral : ''
                let examenClinicoGene1 = examenClinicoGene.substring(0, 99)
                let examenClinicoGene2 = examenClinicoGene.substring(99, examenClinicoGene.length)
                let examenClinicoEstoma = (pacienteAdmision.examClinicoOdonto != undefined) ? pacienteAdmision.examClinicoOdonto : ''
                let examenClinicoEstoma1 = examenClinicoEstoma.substring(0, 99)
                let examenClinicoEstoma2 = examenClinicoEstoma.substring(99, examenClinicoEstoma.length)
                let sexoPaciente = (itemPas.value.sexo == 'F') ? 'Femenino' : 'Masculino'
                let procedencia = (pacienteAdmision.procedencia != undefined) ? pacienteAdmision.procedencia : '';
                let ocupacion = (pacienteAdmision.ocupacion != undefined) ? pacienteAdmision.ocupacion : '';
                let viajesUltimos = (pacienteAdmision.viajesUltimos != undefined) ? pacienteAdmision.viajesUltimos : '';
                let numeroEmergencia = (pacienteAdmision.numeroEmergencia != undefined) ? pacienteAdmision.numeroEmergencia : '';
                let tiempoEnfermedad = (pacienteAdmision.tiempoEnfermedad != undefined) ? pacienteAdmision.tiempoEnfermedad : '';
                let signosYSintomas = (pacienteAdmision.signosYSintomas != undefined) ? pacienteAdmision.signosYSintomas : '';
                let relatoCronologico = (pacienteAdmision.relatoCronologico != undefined) ? pacienteAdmision.relatoCronologico : '';
                let antecedentesFam = (pacienteAdmision.antecedentesFam != undefined) ? pacienteAdmision.antecedentesFam : '';
                let antecedentesPer = (pacienteAdmision.antecedentesPer != undefined) ? pacienteAdmision.antecedentesPer : '';
                let pa = (pacienteAdmision.pa != undefined) ? pacienteAdmision.pa : '';
                let pulso = (pacienteAdmision.pulso != undefined) ? pacienteAdmision.pulso : '';
                let temperatura = (pacienteAdmision.temperatura != undefined) ? pacienteAdmision.temperatura : '';
                let fc = (pacienteAdmision.fc != undefined) ? pacienteAdmision.fc : '';
                let fResp = (pacienteAdmision.fResp != undefined) ? pacienteAdmision.fResp : '';
                let fotoPDF = (pacienteAdmision.archivos!= undefined) ? pacienteAdmision.archivos : '';
                getDocumentImageUrls(fotoPDF)
                    .then((imageUrls) => {
                        return imageUrls
                    })
                    .catch((error) => {
                        console.error(error)
                    })
                pdf.html("", {
                    callback: function (pdf) {
                        pdf.setFontSize(17);
                        pdf.setFont(undefined, 'bold')
                        pdf.text(45, 20, 'HISTORIA CLÍNICA ODONTOLÓGICA');
                        pdf.setFont(undefined, 'normal')
                        pdf.setFontSize(12);
                        pdf.text(10, 30, pad('HC : ' + itemPas.value.numeroDocumento, 50, ' ') + pad('Fecha : ' + fechaFormato, 50, ' ') + pad('Hora : ' + horaFormato, 50, ' '));
                        pdf.setFontSize(14);
                        pdf.setFont(undefined, 'bold')
                        pdf.text(10, 40, 'ANAMNESIS');
                        pdf.text(10, 50, 'FILIACIÓN');
                        pdf.setFont(undefined, 'normal')
                        pdf.setFontSize(12);
                        pdf.text(10, 57, pad('Nombres del paciente : ' + itemPas.value.nombre + ' ' + itemPas.value.apellidoPaterno + ' ' + itemPas.value.apellidoMaterno, 70, ' ') + pad('Edad : ' + getEdad(itemPas.value.fechaNacimiento), 15, ' ') + pad('Sexo : ' + sexoPaciente, 35, ' '));
                        pdf.text(10, 64, pad('Fecha de nacimiento : ' + fechaNacimiento, 80, ' '));
                        pdf.text(10, 71, pad('Dirección : ' + departamento, 100, ' ') + pad(' ' + Direccion, 60, ' '));
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
                        pdf.text(10, 175, pad('Funciones biológicas : ' + ' ', 90, ' '));
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
                        pdf.text(10, 20, 'DIAGNÓSTICO(S)');
                        let fila = 1;
                        let resultSorted = odontograma.sort((a, b) => a.order - b.order);
                        var startY = 28;
                        var startX = 10;
                        var headerOptions = {
                            fillColor: '#e8fffa',
                            textColor: '#395d56'
                        };
                        resultSorted.forEach(item => {
                            let _fila = 1;
                            pdf.text(15, startY, item.fechaRegistro.toDate().toISOString().slice(0, 10) + ' :');
                            let _body = [];
                            item?.hallazgos.forEach(_item => {
                                let alterno = item.dienteAlterno
                                let sigla = _item.sigla
                                let ubicacion = _item.ubicacion
                                if (alterno) alterno = ' - ' + alterno.toString()
                                if (ubicacion) ubicacion = ' - ' + ubicacion;
                                if (sigla) sigla = ' (' + sigla + ')';
                                _body.push([_item.diente + (alterno == undefined ? '' : alterno), _item.descripcion + ubicacion + sigla])
                                _fila = 1 + _fila;
                            })
                            startY = startY + 2;
                            autoTable(pdf, {
                                head: [['Pieza(s)', 'Diagnóstico']],
                                body: _body,
                                startX: startX,
                                startY: startY,
                                didParseCell: function (data) {
                                    if (data.section === 'head') {
                                        data.cell.styles.fillColor = headerOptions.fillColor;
                                        data.cell.styles.textColor = headerOptions.textColor;
                                    }
                                }
                            })
                            startY = startY + 8 * (_fila) + 4;
                            fila = fila + 1;
                        })
                        pdf.setFontSize(14);
                        pdf.setFont(undefined, 'bold')
                        startY = startY + 4;
                        pdf.text(10, startY, 'PLAN DE TRATAMIENTO');
                        startY = startY + 8;
                        resultSorted.forEach(item => {
                            let _bodyPlant = [];
                            let _fila = 1;
                            pdf.text(15, startY, item.fechaRegistro.toDate().toISOString().slice(0, 10) + ' :');
                            item?.planTrata?.forEach(_item => {
                                let _tratamien = "";
                                let fila = 1;
                                let filas = _item.Tratamiento.length;
                                _item.Tratamiento?.forEach(subitem => {
                                    _tratamien = _tratamien + fila + '.- ' + subitem.Tratamiento.label + ' (' + subitem.Fecha + ')';
                                    if (fila < filas) {
                                        _tratamien = _tratamien + '),\n'
                                    }
                                    fila = fila + 1;
                                })
                                _bodyPlant.push([_item.Pieza, _item.Diagnostico, _tratamien])
                                _fila = 1 + _fila;
                            })
                            startY = startY + 2;
                            autoTable(pdf, {
                                head: [['Pieza(s)', 'Diagnóstico', 'Tratamiento(s)']],
                                body: _bodyPlant,
                                startX: startX,
                                startY: startY,
                                didParseCell: function (data) {
                                    if (data.section === 'head') {
                                        data.cell.styles.fillColor = headerOptions.fillColor;
                                        data.cell.styles.textColor = headerOptions.textColor;
                                    }
                                }
                            })
                            startY = startY + 8 * (_fila) + 6;
                            fila = fila + 1;
                        })
                        pdf.insertPage();
                        pdf.setFont(undefined, 'normal')
                        pdf.setFontSize(12);
                        pdf.text(10, 25, pad(' ', 100, ' '));
                        pdf.text(10, 35, pad('Nombres y apellidos del profesional : ' + odontologo.nombre + ' ' + odontologo.apellidoPaterno + ' ' + odontologo.apellidoMaterno, 90, ' '));
                        let fotoPDF = (pacienteAdmision.archivos != undefined) ? pacienteAdmision.archivos : '';
                        getDocumentImageUrls(fotoPDF)
                            .then((imageUrls) => {
                                console.log(imageUrls);
                                imageUrls.forEach((imageUrl) => {
                                var imageType = getImageType(imageUrl); // Obtener el tipo de imagen (PDF, PNG o JPEG)
                                // Verificar si la URL de la imagen es un archivo PDF válido
                                if (imageType === 'PDF') {
                                    // Añadir el archivo PDF al PDF generado
                                    pdf.addPage();
                                    pdf.addImage(imageUrl, 'PDF', 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());
                                }
                                });
                                pdf.setFont(undefined, 'bold');
                                pdf.text(10, 200, 'Sello y firma');
                                var pdfName = 'historiaClinica' + itemPas.value.numeroDocumento;
                                pdf.save(pdfName + '.pdf');
                            });
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

export function printHistoriaMedicaPaciente(idPaciente) {
    var pdf = new jsPDF()
    const today = new Date();
    const fechaFormato = padLeadingZeros(today.getDate(), 2) + '/' + padLeadingZeros((today.getMonth() + 1)) + '/' + today.getFullYear();
    const horaFormato = padLeadingZeros(today.getHours(), 2) + ":" + padLeadingZeros(today.getMinutes(), 2);
    const idOdontologo = miUsuario()?.uid;
    obtenerPacienteOdontograma(idPaciente, idOdontologo).then((odontograma) => {
        const lastDiagnostico = Math.max(...odontograma.map(o => o.order));
        const pacienteOdontograma = odontograma.filter(o => o.order == lastDiagnostico)
        obtenerPacienteAdmision(idPaciente, idOdontologo).then((admision) => {
            const pacienteAdmision = (admision.length > 0) ? admision[0] : {};
            leerEnRegistro(idPaciente);
            obtenerOdontologo(itemPas.value.idOdontologo).then((odonto) => {
                const odontologo = odonto[0];
                let fechaNacimiento = (itemPas.value.fechaNacimiento != undefined) ? itemPas.value.fechaNacimiento : '          '
                let estatura = (itemPas.value.estatura != undefined) ? itemPas.value.estatura : '          '
                let peso = (itemPas.value.peso != undefined) ? itemPas.value.peso : '          '
                let centroLaboral = (itemPas.value.centroLaboral != undefined) ? itemPas.value.centroLaboral : '          '
                let ocupacion = (itemPas.value.ocupacion != undefined) ? itemPas.value.ocupacion : '          '
                let departamento = (itemPas.value.departamento != undefined) ? itemPas.value.departamento : '          '
                let Direccion = (itemPas.value.Direccion != undefined) ? itemPas.value.Direccion : '          '
                let sexoPaciente = (itemPas.value.sexo == 'F') ? 'Femenino' : 'Masculino'
                let askHCG1 = (itemPas.value.askHCG1 != undefined) ? itemPas.value.askHCG1 : '       '
                let askHCG2 = (itemPas.value.askHCG2 != undefined) ? itemPas.value.askHCG2 : '       '
                let askHCG3 = (itemPas.value.askHCG3 != undefined) ? itemPas.value.askHCG3 : '       '
                let askHCG4 = (itemPas.value.askHCG4 != undefined) ? itemPas.value.askHCG4 : '       '
                let askHCG5 = (itemPas.value.askHCG5 != undefined) ? itemPas.value.askHCG5 : '       '
                let askHCG6 = (itemPas.value.askHCG6 != undefined) ? itemPas.value.askHCG6 : '       '
                let askHCG7 = (itemPas.value.askHCG7 != undefined) ? itemPas.value.askHCG7 : '       '
                let askHCG8 = (itemPas.value.askHCG8 != undefined) ? itemPas.value.askHCG8 : '       '
                let askHCG9 = (itemPas.value.askHCG9 != undefined) ? itemPas.value.askHCG9 : '       '
                let askHCG0 = (itemPas.value.askHCG0 != undefined) ? itemPas.value.askHCG0 : '       '
                pdf.html("", {
                    callback: function (pdf) {
                        pdf.setFontSize(17);
                        pdf.setFont(undefined, 'bold')
                        pdf.text(60, 20, 'HISTORIA MÉDICA GENERAL');
                        pdf.setFont(undefined, 'normal')
                        pdf.setFontSize(14);
                        pdf.text(10, 38, pad('Paciente : ' + itemPas.value.nombre + ' ' + itemPas.value.apellidoPaterno + ' ' + itemPas.value.apellidoMaterno, 70, ' '));
                        pdf.text(10, 46, pad('Fecha de nacimiento : ' + fechaNacimiento, 80, ' '));
                        pdf.text(10, 54, pad('Dirección : ' + departamento, 40, ' ') + pad(Direccion, 60, ' '));
                        pdf.text(10, 62, pad('Email : ' + itemPas.value.email, 60, ' ') + pad('Ocupación : ' + ocupacion, 60, ' '));
                        pdf.text(10, 70, pad('Teléfono : ' + itemPas.value.telefono, 50, ' '));
                        pdf.text(10, 78, pad('Centro de trabajo :' + centroLaboral, 90, ' '));
                        pdf.setFont(undefined, 'normal')
                        pdf.setFontSize(12);
                        pdf.text(10, 90, '1. ¿Está en la actualidad bajo tratamiento médico?');
                        pdf.text(192, 97, pad(askHCG1, 120, ' '));
                        pdf.text(10, 104, '2. ¿Tiene reacciones alérgicas o es alérgico a algún farmaco o medicamento?');
                        pdf.text(192, 111, pad(askHCG2, 120, ' '));
                        pdf.text(10, 118, '3. ¿Ha presentado alguna vez una reacción a la anestesia dental o general?');
                        pdf.text(192, 125, pad(askHCG3, 120, ' '));
                        pdf.text(10, 132, '4. ¿Se le ha intervenido alguna vez?');
                        pdf.text(192, 139, pad(askHCG4, 120, ' '));
                        pdf.text(10, 146, '5. ¿Ha estado alguna vez hospitalizado?');
                        pdf.text(192, 153, pad(askHCG5, 120, ' '));
                        pdf.text(10, 160, '6. Cuando sube las escaleras o pases ¿ha tenido que pararse por dolor torácico o cansancio?');
                        pdf.text(192, 167, pad(askHCG6, 120, ' '));
                        pdf.text(10, 174, '7. ¿Ha perdido o ganado involuntariamente más de 4.5Kg en el último año?');
                        pdf.text(192, 181, pad(askHCG7, 120, ' '));
                        pdf.text(10, 188, '8. ¿Esta siguiendo alguna dieta especial?');
                        pdf.text(192, 195, pad(askHCG8, 120, ' '));
                        pdf.text(10, 202, '9. ¿Tiene contacto, por su trabajo, con sangre, derivados sanguíneos o agujas?');
                        pdf.text(192, 209, pad(askHCG9, 120, ' '));
                        //if(itemPas.value.askHCG0) {
                        pdf.text(10, 216, '10. Si es mujer, ¿Está embarazada?');
                        pdf.text(192, 223, pad(askHCG0, 120, ' '));
                        //}
                        pdf.text(10, 230, pad('Estatura : ' + estatura + ' cm. ', 60, ' ') + pad('Peso : ' + peso + ' g. ', 60, ' '));
                        pdf.text(10, 240, 'Doy fe que las respuestas anteriores son verdaderas y correctas. Si se produce algún cambio en mi ');
                        pdf.text(10, 246, 'estado de salud actual, tengo algún resultado de laboratorio anormal o cambia mi mediación, ');
                        pdf.text(10, 252, 'informaré a mi Odontólogo en mi próxima visita.');
                        pdf.text(10, 260, pad('Fecha : ' + fechaFormato, 50, ' '));
                        pdf.text(140, 275, pad('___________________________', 50, ' '));
                        pdf.text(150, 280, pad('Firma del paciente o tutor', 50, ' '));
                        var pdfName = 'Historia Médica de ' + itemPas.value.numeroDocumento
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