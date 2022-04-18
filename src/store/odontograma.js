import {limpiarCaries} from "./OdontoJS"

    var fila = "";
    var nro = 0;
    var isSpeech = false;

    function GetDemoDto() {

        $.ajax({
            type: "POST",
            url: "/Odontograma/GetDemoDto",
            contentType: "application/json; charset=utf-8",
            //data: JSON.stringify(oOrgano),
            success: function (d) {
                console.log(d)
            },
            error: function (d) {

            }
        });
    }
    function grabarOdontograma() {
        var employee = {}
        employee.Name = 'Juan'
        employee.Designation = 'Gerente'
        employee.Location = 'Milano'

                $.ajax({
                    type: "POST",
                    url: "/Odontograma/grabar",
                    data: employee,
                    success: function (response) {
                        alert("Hello: " + response.name + ".\nCurrent Date and Time: " + response.fecha);
                    },
                    failure: function (response) {
                        alert(response.responseText);
                    },
                    error: function (response) {
                        alert(response.responseText);
                    }
                });

    }
    //--ini speech recognition
    if (annyang) {
        annyang.setLanguage("es-PE");
        var commands = {
            'hola': activarVoz,
            //'oye': activarVoz,
            'oye kiru': activarVoz,
            'oye kiro': activarVoz,
            'detener': detenerVoz,
            'comprimir': comprimir,
            'diagnóstico': diagnostico,
            'tratamiento': tratamiento,
            'salir': cerrar,
            'limpiar': limpiar,
            'grabar': grabar,
            'aceptar': aceptar
        }
        annyang.addCallback('result', function (phrases) {
            var comandoTemp = phrases[0];
            comandoTemp = comandoTemp.replace(/\s/g, '/');
            var comandoAct = comandoTemp.split('/');
            if (comandoAct[0].toLowerCase()=='oye') {
                activarVoz();
            }
            if (isSpeech) {
                var comandoTemp = phrases[0];
                var comando = comandoTemp.replace(/\s/g, '')
                if (comando != 'detener') {
                    if (comando.toLowerCase() == 'odontogramainicial') {
                        odontogramaInicial();
                    } else {
                        if (comando.toLowerCase() == 'odontogramadeevolución') {
                            odontogramaEvolucion();
                        } else {
                            if (comando.toLowerCase() == 'especificaciones') {
                                especificaciones();
                            } else {
                                if (comando.toLowerCase() == 'observaciones') {
                                    observaciones();
                                } else {
                                    if (comando.toLowerCase() == 'terminar') {
                                        terminar();
                                    } else {

                                        if (comando != 'comprimir' && comando != 'diagnóstico' && comando != 'tratamiento' && comando != 'salir') {

                                            var inputespecificaciones = document.getElementById('inputDescription');
                                            if (inputespecificaciones === document.activeElement) {
                                                inputespecificaciones.value = comandoTemp;
                                            }
                                            var inputObservacion = document.getElementById('inputObservacion');
                                            if (inputObservacion === document.activeElement) {
                                                inputObservacion.value = comandoTemp;
                                            }

                                            comando = comandoTemp.replace(/\s/g, '/');
                                            comandoCompleto = comando.split('/')
                                            if (comandoCompleto[0] === 'pieza') {
                                                limpiarCaries();
                                                var comboPieza = document.getElementById('comboPieza');
                                                comboPieza.value = comandoCompleto[1];

                                            }
                                            if (comandoCompleto[0] === 'hallazgo') {
                                                limpiarCaries()
                                                var comboHallazgo = document.getElementById('comboHallazgo');
                                                comboHallazgo.value = comandoCompleto[1];
                                            }
                                            if (comandoCompleto[0] === 'caries') {
                                                pintarDiente(comandoCompleto[1])
                                            }
                                            if (comandoCompleto[0] === 'eliminar') {
                                                if (comandoCompleto[2] != undefined) {
                                                    eliminarVoz(comandoCompleto[2])
                                                }
                                            }
                                        }
                                    }

                                }
                            }


                        }
                    }
                }
            }
        });
        function odontogramaInicial() {

        }
        function odontogramaEvolucion() {

        }
        function activarVoz() {
            isSpeech = true;
            document.getElementById("btnEscuchando").hidden = false;//start
            document.getElementById("btnActivar").hidden = true;
        }

        function detenerVoz() {
            isSpeech = false;
            document.getElementById("btnEscuchando").hidden = true;//stop
            document.getElementById("btnActivar").hidden = false;
        }

        annyang.addCommands(commands);
        annyang.start();
    }
    //--fin speech recognition
    function comprimir() {
        if (isSpeech) {

        }
    }

    function diagnostico(param) {
        if (param === 'manual') {
            var headerVoz = document.getElementById('headerVoz');
            headerVoz.style.display = 'none';

            var headerVozSmall = document.getElementById('headerVozSmall');
            headerVozSmall.style.display = 'block';
            //--activar small buttom
            var btnActivarSmall = document.getElementById('btnActivarSmall');
            var btnEscuchandoSmall = document.getElementById('btnEscuchandoSmall');
            if (isSpeech === true) {
                btnActivarSmall.hidden = true;
                btnEscuchandoSmall.hidden = false;
            } else {
                btnActivarSmall.hidden = false;
                btnEscuchandoSmall.hidden = true;
            }

            var divNuevo = document.getElementById('divNuevo');
            divNuevo.style.display = 'block';

            //var odontograma = document.getElementById('odontograma');
            //odontograma.style.display = 'none';
            var tituloTratamiento = document.getElementById('tituloTratamiento');
            tituloTratamiento.innerText = 'Registro de Diagnóstico';

            var comboPieza = document.getElementById('comboPieza');
            comboPieza.value = '1.1';
            var comboHallazgo = document.getElementById('comboHallazgo');
            comboHallazgo.value = 'caries';
            limpiarCaries();

        } else {
            if (isSpeech) {
                var headerVoz = document.getElementById('headerVoz');
                headerVoz.style.display = 'none';

                var headerVozSmall = document.getElementById('headerVozSmall');
                headerVozSmall.style.display = 'block';
                //--activar small buttom
                var btnActivarSmall = document.getElementById('btnActivarSmall');
                var btnEscuchandoSmall = document.getElementById('btnEscuchandoSmall');
                if (isSpeech === true) {
                    btnActivarSmall.hidden = true;
                    btnEscuchandoSmall.hidden = false;
                } else {
                    btnActivarSmall.hidden = false;
                    btnEscuchandoSmall.hidden = true;
                }

                var divNuevo = document.getElementById('divNuevo');
                divNuevo.style.display = 'block';

                //var odontograma = document.getElementById('odontograma');
                //odontograma.style.display = 'none';
                var tituloTratamiento = document.getElementById('tituloTratamiento');
                tituloTratamiento.innerText = 'Registro de Diagnóstico';

                var comboPieza = document.getElementById('comboPieza');
                comboPieza.value = '1.1';
                var comboHallazgo = document.getElementById('comboHallazgo');
                comboHallazgo.value = 'caries';
                limpiarCaries();
            }

        }
    }

    function tratamiento() {
        if (isSpeech) {
            var divNuevo = document.getElementById('divNuevo');
            divNuevo.style.display = 'block';

            var odontograma = document.getElementById('odontograma');
            odontograma.style.display = 'none';
            var tituloTratamiento = document.getElementById('tituloTratamiento');
            tituloTratamiento.innerText = 'Registro de Tratamiento';

            var comboPieza = document.getElementById('comboPieza');
            comboPieza.value = '1.1';
            var comboHallazgo = document.getElementById('comboHallazgo');
            comboHallazgo.value = 'caries';
            limpiarCaries();
        }
    }
    function cerrar(param) {
        if (isSpeech || param==='manual') {
            var headerVoz = document.getElementById('headerVoz');
            headerVoz.style.display = 'block';

            var headerVozSmall = document.getElementById('headerVozSmall');
            headerVozSmall.style.display = 'none';

            var divNuevo = document.getElementById('divNuevo');
            divNuevo.style.display = 'none';

            var odontograma = document.getElementById('odontograma');
            odontograma.style.display = 'block';
            //limpiar tabla
            var tablaDetalle = document.getElementById('tablaDetalle');
            nro = 0;
            fila = "";
            tablaDetalle.innerHTML = fila;
        }
    }
    function limpiar() {
        if (isSpeech) {
            document.getElementById("inputDescription").value = '';
            document.getElementById("inputObservacion").value = '';
        }
    }
    function grabar(param) {
        grabarOdontograma();
        if (isSpeech || param === 'manual') {
            var tablaDetalle = document.getElementById('tablaDetalle');
            comboHallazgo = document.getElementById('comboHallazgo');
            var hallazgo = comboHallazgo.options[comboHallazgo.selectedIndex];
            comboPieza = document.getElementById('comboPieza');
            var pieza = comboPieza.options[comboPieza.selectedIndex];

            //hallazgo.value;  //hallazgo.text;
            //--buscar el diente k no exista en la tabla
            if (!buscarTabla(hallazgo.text, pieza.text)) {
                nro = nro + 1;
                fila += "<tr class='fila'><td>" + nro + "</td><td><img src='/images/tooth-solid.svg' style ='width:40%'/> </td><td>" + hallazgo.text + "</td><td>" + pieza.text + "</td> <td><button type='button' class='btn' onclick='eliminarManual(this)'><img src='/images/trash-can-solid.svg' style='width:40%' /></button> </td> </tr> ";
                tablaDetalle.innerHTML = fila;

            } else {
                $('#modalOdongramaDuplicado').modal('show');
            }
            //$('#listaDientesAgregar').append("<div class='JuicioTop' id='Diente18'>content</div>");
        }
    }
    function aceptar() {
        if (isSpeech) {
           // $('#modalOdongramaDuplicado').modal('hide');
        }
    }

    function procesar() {
        var btnActivar = document.getElementById('btnActivar');
        var btnEscuchando = document.getElementById('btnEscuchando');
        if (isSpeech === true) {
            btnActivar.hidden = false;
            btnEscuchando.hidden = true;//stop
            isSpeech = false;
        } else {
            btnActivar.hidden = true;
            btnEscuchando.hidden = false;//start
            isSpeech = true;
        }
    }
    function pintarDiente(posicion) {
        if (posicion === 'vestibular')
            DienteCaries('btntopcar');
        if (posicion === 'distal')
            DienteCaries('btnleftCar');
        if (posicion === 'oclusal')
            DienteCaries('btncenterCar');
        if (posicion === 'mesial')
            DienteCaries('btnrigthCar');
        if (posicion === 'palatino')
            DienteCaries('btnbotCar');

    }
    function buscarTabla(hallazgo, pieza) {
        var rows = document.getElementsByClassName("fila");
        var resultado = false;
        for (var i = 0; i < rows.length; i++) {
            var columna = rows[i].getElementsByTagName("td");
            var hallazgoTabla = columna[2].innerHTML.toLowerCase();
            var piezaTabla = columna[3].innerHTML.toLowerCase();
            if (hallazgoTabla == hallazgo.toLowerCase() && piezaTabla == pieza.toLowerCase()) {
                resultado = true;
                break;
            }
        }
        return resultado;

    }
    function especificaciones() {
        document.getElementById("inputDescription").focus();

    }
    function observaciones() {
        document.getElementById("inputObservacion").focus();
    }

    function terminar() {
        document.getElementById("btnDiagnostico").focus();
    }
    function eliminarManual(element) {
        document.getElementById("tablaDetalle").deleteRow(element.parentNode.parentNode.rowIndex - 1);
        var tablaDetalle = document.getElementById('tablaDetalle');

        var rows = document.getElementsByClassName("fila");
        fila = "";
        nro=0
        for (var i = 0; i < rows.length; i++) {
            nro++;
            var columna = rows[i].getElementsByTagName("td");
            var hallazgoTabla = columna[2].innerHTML;
            var piezaTabla = columna[3].innerHTML;
            fila += "<tr class='fila'><td>" + nro + "</td><td><img src='/images/tooth-solid.svg' style ='width:40%'/> </td><td>" + hallazgoTabla + "</td><td>" + piezaTabla + "</td> <td><button type='button' class='btn' onclick='eliminarManual(this)'><img src='/images/trash-can-solid.svg' style='width:40%' /></button> </td> </tr> ";

        }
        tablaDetalle.innerHTML = fila;

    }
    function eliminarVoz(index) {
        document.getElementById("tablaDetalle").deleteRow(index-1);
        var tablaDetalle = document.getElementById('tablaDetalle');

        var rows = document.getElementsByClassName("fila");
        fila = "";
        nro = 0
        for (var i = 0; i < rows.length; i++) {
            nro++;
            var columna = rows[i].getElementsByTagName("td");
            var hallazgoTabla = columna[2].innerHTML;
            var piezaTabla = columna[3].innerHTML;
            fila += "<tr class='fila'><td>" + nro + "</td><td><img src='/images/tooth-solid.svg' style ='width:40%'/> </td><td>" + hallazgoTabla + "</td><td>" + piezaTabla + "</td> <td><button type='button' class='btn' onclick='eliminarManual(this)'><img src='/images/trash-can-solid.svg' style='width:40%' /></button> </td> </tr> ";

        }
        tablaDetalle.innerHTML = fila;

    }
    export {
        diagnostico,
        tratamiento,
        procesar,
        cerrar,
        limpiar,
        grabar
    }