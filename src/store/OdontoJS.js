
function GetDataOdon() {
    document.getElementById("hfControlDisplay").value = "";
    var datacontrol = "";
    var dataAreas = "";
    datacontrol = datacontrol + GeDatatControlDisplay("Odontograma", "flecha");
    datacontrol = datacontrol + "*" + GeDatatControlDisplay("Odontograma", "flecha1", "display");
    datacontrol = datacontrol + "*" + GeDatatControlDisplay("Odontograma", "DivFractura", "display");
    datacontrol = datacontrol + "*" + GeDatatControlDisplay("Odontograma", "DivGiro", "display");
    datacontrol = datacontrol + "*" + GeDatatControlDisplay("Odontograma", "DivremaneteR", "display");
    datacontrol = datacontrol + "*" + GeDatatControlDisplay("Odontograma", "DivPulpar", "display");
    datacontrol = datacontrol + "*" + GeDatatControlDisplay("Odontograma", "DivErupcion", "display");
    datacontrol = datacontrol + "*" + GeDatatControlDisplay("Odontograma", "Divremovible", "display");
    datacontrol = datacontrol + "*" + GeDatatControlDisplay("Odontograma", "Ausente", "display");
    datacontrol = datacontrol + "*" + GeDatatControlDisplay("Odontograma", "Extract", "display");
    datacontrol = datacontrol + "*" + GeDatatControlBorderTop("Odontograma", "AreaTop", "border-top-color");
    datacontrol = datacontrol + "*" + GeDatatControlBorderleft("Odontograma", "AreaLef", "border-left-color");
    datacontrol = datacontrol + "*" + GeDatatControlBorderCent("Odontograma", "Cuadrado", "background");
    datacontrol = datacontrol + "*" + GeDatatControlBorderRigt("Odontograma", "AreaRig", "border-right-color");
    datacontrol = datacontrol + "*" + GeDatatControlBorderBot("Odontograma", "AreaBot", "border-bottom-color");

    var datacontrol1 = "";
    var a = datacontrol.split("*");
    for (index = a.length - 1; index >= 0; --index) {
        var b = a[index].split("|");
        var fila = "";

        for (index1 = b.length - 1; index1 >= 0; --index1) {

            if (b[index1].split("@")[5].trim() == " ") {
                if (b[index1].split("@")[4].trim() == "red") {
                    fila = fila + "|" + b[index1];
                }
                if (b[index1].split("@")[4].trim() == "blue") {
                    fila = fila + "|" + b[index1];
                }
                if (b[index1].split("@")[4].trim() == "cornflowerblue") {
                    fila = fila + "|" + b[index1];
                }
            }
            else {
                fila = fila + "|" + b[index1];
            }
        }

        if (fila.length > 1) {
            datacontrol1 = datacontrol1 + "*" + fila;
        }
    }
    document.getElementById("hfControlDisplay").value = datacontrol1;
    datacontrol = "";
    datacontrol = datacontrol + GeDatatControlBorderColor("Odontograma", "ArrivadIzquierda", "border-color");
    datacontrol = datacontrol + "*" + GeDatatControlBorderColor("Odontograma", "ArrivadDerecha", "border-color");
    datacontrol = datacontrol + "*" + GeDatatControlBorderTop("Odontograma", "Arriva", "border-top-color");
    datacontrol = datacontrol + "*" + GeDatatControlBorderColor("Odontograma", "Izquierda", "border-color");
    datacontrol = datacontrol + "*" + GeDatatControlBorderColor("Odontograma", "IzquierdaAbajo", "border-color");
    datacontrol = datacontrol + "*" + GeDatatControlBorderColor("Odontograma", "Derecha", "border-color");
    datacontrol = datacontrol + "*" + GeDatatControlBorderColor("Odontograma", "ArrivadDerecha", "border-color");
    datacontrol = datacontrol + "*" + GeDatatControlBorderColor("Odontograma", "AbajoDerecha", "border-color");
    datacontrol = datacontrol + "*" + GeDatatControlBorderColor("Odontograma", "Abajo", "border-color");
    datacontrol = datacontrol + "*" + GeDatatControlBorderTop("Odontograma", "Cuadrado", "border-top-color");
    datacontrol = datacontrol + "*" + GeDatatControlBorderleft("Odontograma", "Cuadrado", "border-left-color");
    datacontrol = datacontrol + "*" + GeDatatControlBorderRigt("Odontograma", "Cuadrado", "border-right-color");
    datacontrol = datacontrol + "*" + GeDatatControlBorderBot("Odontograma", "Cuadrado", "border-bottom-color");
    datacontrol = datacontrol + "*" + GeDatatControlBorderColor("Odontograma", "Cuadrado", "border-color");
    datacontrol1 = "";

    var c = datacontrol.split("*");
    for (index = c.length - 1; index >= 0; --index) {
        var d = c[index].split("|");
        var fila = "";
        for (index1 = d.length - 1; index1 >= 0; --index1) {
            if (d[index1].split("@")[4].trim() == "red") {
                fila = fila + "|" + d[index1];
            }
        }
        if (fila.length > 1) {
            datacontrol1 = datacontrol1 + "*" + fila;
        }
    }
    document.getElementById("hfControlBordes").value = datacontrol1;
    document.getElementById("btnGrabar").click();
    return false;
}

function GetDataTra() {
    document.getElementById("hfControlDisplay").value = "";
    var datacontrol = "";
    var dataAreas = "";
    datacontrol = datacontrol + GeDatatControlDisplay("Odontograma1", "flecha");
    datacontrol = datacontrol + "*" + GeDatatControlDisplay("Odontograma1", "flecha1", "display");
    datacontrol = datacontrol + "*" + GeDatatControlDisplay("Odontograma1", "DivFractura", "display");
    datacontrol = datacontrol + "*" + GeDatatControlDisplay("Odontograma1", "DivGiro", "display");
    datacontrol = datacontrol + "*" + GeDatatControlDisplay("Odontograma1", "DivremaneteR", "display");
    datacontrol = datacontrol + "*" + GeDatatControlDisplay("Odontograma1", "DivPulpar", "display");
    datacontrol = datacontrol + "*" + GeDatatControlDisplay("Odontograma1", "DivErupcion", "display");
    datacontrol = datacontrol + "*" + GeDatatControlDisplay("Odontograma1", "Divremovible", "display");
    datacontrol = datacontrol + "*" + GeDatatControlDisplay("Odontograma1", "Ausente", "display");
    datacontrol = datacontrol + "*" + GeDatatControlDisplay("Odontograma1", "Extract", "display");
    datacontrol = datacontrol + "*" + GeDatatControlBorderTop("Odontograma1", "AreaTop", "border-top-color");
    datacontrol = datacontrol + "*" + GeDatatControlBorderleft("Odontograma1", "AreaLef", "border-left-color");
    datacontrol = datacontrol + "*" + GeDatatControlBorderCent("Odontograma1", "Cuadrado", "background");
    datacontrol = datacontrol + "*" + GeDatatControlBorderRigt("Odontograma1", "AreaRig", "border-right-color");
    datacontrol = datacontrol + "*" + GeDatatControlBorderBot("Odontograma1", "AreaBot", "border-bottom-color");

    var datacontrol1 = "";
    var a = datacontrol.split("*");
    for (index = a.length - 1; index >= 0; --index) {
        var b = a[index].split("|");
        var fila = "";

        for (index1 = b.length - 1; index1 >= 0; --index1) {

            if (b[index1].split("@")[5].trim() == " ") {
                if (b[index1].split("@")[4].trim() == "red") {
                    fila = fila + "|" + b[index1];
                }
                if (b[index1].split("@")[4].trim() == "blue") {
                    fila = fila + "|" + b[index1];
                }
                if (b[index1].split("@")[4].trim() == "cornflowerblue") {
                    fila = fila + "|" + b[index1];
                }
            }
            else {
                fila = fila + "|" + b[index1];
            }
        }

        if (fila.length > 1) {
            datacontrol1 = datacontrol1 + "*" + fila;
        }
    }
    document.getElementById("hfControlDisplay").value = datacontrol1;
    datacontrol = "";
    datacontrol = datacontrol + GeDatatControlBorderColor("Odontograma1", "ArrivadIzquierda", "border-color");
    datacontrol = datacontrol + "*" + GeDatatControlBorderColor("Odontograma1", "ArrivadDerecha", "border-color");
    datacontrol = datacontrol + "*" + GeDatatControlBorderTop("Odontograma1", "Arriva", "border-top-color");
    datacontrol = datacontrol + "*" + GeDatatControlBorderColor("Odontograma1", "Izquierda", "border-color");
    datacontrol = datacontrol + "*" + GeDatatControlBorderColor("Odontograma1", "IzquierdaAbajo", "border-color");
    datacontrol = datacontrol + "*" + GeDatatControlBorderColor("Odontograma1", "Derecha", "border-color");
    datacontrol = datacontrol + "*" + GeDatatControlBorderColor("Odontograma1", "ArrivadDerecha", "border-color");
    datacontrol = datacontrol + "*" + GeDatatControlBorderColor("Odontograma1", "AbajoDerecha", "border-color");
    datacontrol = datacontrol + "*" + GeDatatControlBorderColor("Odontograma1", "Abajo", "border-color");
    datacontrol = datacontrol + "*" + GeDatatControlBorderTop("Odontograma1", "Cuadrado", "border-top-color");
    datacontrol = datacontrol + "*" + GeDatatControlBorderleft("Odontograma1", "Cuadrado", "border-left-color");
    datacontrol = datacontrol + "*" + GeDatatControlBorderRigt("Odontograma1", "Cuadrado", "border-right-color");
    datacontrol = datacontrol + "*" + GeDatatControlBorderBot("Odontograma1", "Cuadrado", "border-bottom-color");
    datacontrol = datacontrol + "*" + GeDatatControlBorderColor("Odontograma1", "Cuadrado", "border-color");
    datacontrol1 = "";

    var c = datacontrol.split("*");
    for (index = c.length - 1; index >= 0; --index) {
        var d = c[index].split("|");
        var fila = "";
        for (index1 = d.length - 1; index1 >= 0; --index1) {
            if (d[index1].split("@")[4].trim() == "red") {
                fila = fila + "|" + d[index1];
            }
        }
        if (fila.length > 1) {
            datacontrol1 = datacontrol1 + "*" + fila;
        }
    }
    document.getElementById("hfControlBordes").value = datacontrol1;
    document.getElementById("btnGrabaTra").click();
    return false;
}

function GetDataTrans() {
    document.getElementById("hfControlDisplay").value = "";
    var datacontrol = "";
    var dataAreas = "";
    datacontrol = datacontrol + GeDatatControlDisplay("Odontograma", "flecha");
    datacontrol = datacontrol + "*" + GeDatatControlDisplay("Odontograma", "flecha1", "display");
    datacontrol = datacontrol + "*" + GeDatatControlDisplay("Odontograma", "DivFractura", "display");
    datacontrol = datacontrol + "*" + GeDatatControlDisplay("Odontograma", "DivGiro", "display");
    datacontrol = datacontrol + "*" + GeDatatControlDisplay("Odontograma", "DivremaneteR", "display");
    datacontrol = datacontrol + "*" + GeDatatControlDisplay("Odontograma", "DivPulpar", "display");
    datacontrol = datacontrol + "*" + GeDatatControlDisplay("Odontograma", "DivErupcion", "display");
    datacontrol = datacontrol + "*" + GeDatatControlDisplay("Odontograma", "Divremovible", "display");
    datacontrol = datacontrol + "*" + GeDatatControlDisplay("Odontograma", "Ausente", "display");
    datacontrol = datacontrol + "*" + GeDatatControlDisplay("Odontograma", "Extract", "display");
    datacontrol = datacontrol + "*" + GeDatatControlBorderTop("Odontograma", "AreaTop", "border-top-color");
    datacontrol = datacontrol + "*" + GeDatatControlBorderleft("Odontograma", "AreaLef", "border-left-color");
    datacontrol = datacontrol + "*" + GeDatatControlBorderCent("Odontograma", "Cuadrado", "background");
    datacontrol = datacontrol + "*" + GeDatatControlBorderRigt("Odontograma", "AreaRig", "border-right-color");
    datacontrol = datacontrol + "*" + GeDatatControlBorderBot("Odontograma", "AreaBot", "border-bottom-color");

    var datacontrol1 = "";
    var a = datacontrol.split("*");
    for (index = a.length - 1; index >= 0; --index) {
        var b = a[index].split("|");
        var fila = "";

        for (index1 = b.length - 1; index1 >= 0; --index1) {

            if (b[index1].split("@")[5].trim() == " ") {
                if (b[index1].split("@")[4].trim() == "red") {
                    fila = fila + "|" + b[index1];
                }
                if (b[index1].split("@")[4].trim() == "blue") {
                    fila = fila + "|" + b[index1];
                }
                if (b[index1].split("@")[4].trim() == "cornflowerblue") {
                    fila = fila + "|" + b[index1];
                }
            }
            else {
                fila = fila + "|" + b[index1];
            }
        }

        if (fila.length > 1) {
            datacontrol1 = datacontrol1 + "*" + fila;
        }
    }
    document.getElementById("hfControlDisplay").value = datacontrol1;
    datacontrol = "";
    datacontrol = datacontrol + GeDatatControlBorderColor("Odontograma", "ArrivadIzquierda", "border-color");
    datacontrol = datacontrol + "*" + GeDatatControlBorderColor("Odontograma", "ArrivadDerecha", "border-color");
    datacontrol = datacontrol + "*" + GeDatatControlBorderTop("Odontograma", "Arriva", "border-top-color");
    datacontrol = datacontrol + "*" + GeDatatControlBorderColor("Odontograma", "Izquierda", "border-color");
    datacontrol = datacontrol + "*" + GeDatatControlBorderColor("Odontograma", "IzquierdaAbajo", "border-color");
    datacontrol = datacontrol + "*" + GeDatatControlBorderColor("Odontograma", "Derecha", "border-color");
    datacontrol = datacontrol + "*" + GeDatatControlBorderColor("Odontograma", "ArrivadDerecha", "border-color");
    datacontrol = datacontrol + "*" + GeDatatControlBorderColor("Odontograma", "AbajoDerecha", "border-color");
    datacontrol = datacontrol + "*" + GeDatatControlBorderColor("Odontograma", "Abajo", "border-color");
    datacontrol = datacontrol + "*" + GeDatatControlBorderTop("Odontograma", "Cuadrado", "border-top-color");
    datacontrol = datacontrol + "*" + GeDatatControlBorderleft("Odontograma", "Cuadrado", "border-left-color");
    datacontrol = datacontrol + "*" + GeDatatControlBorderRigt("Odontograma", "Cuadrado", "border-right-color");
    datacontrol = datacontrol + "*" + GeDatatControlBorderBot("Odontograma", "Cuadrado", "border-bottom-color");
    datacontrol = datacontrol + "*" + GeDatatControlBorderColor("Odontograma", "Cuadrado", "border-color");
    datacontrol1 = "";

    var c = datacontrol.split("*");
    for (index = c.length - 1; index >= 0; --index) {
        var d = c[index].split("|");
        var fila = "";
        for (index1 = d.length - 1; index1 >= 0; --index1) {
            if (d[index1].split("@")[4].trim() == "red") {
                fila = fila + "|" + d[index1];
            }
        }
        if (fila.length > 1) {
            datacontrol1 = datacontrol1 + "*" + fila;
        }
    }
    document.getElementById("hfControlBordes").value = datacontrol1;
    document.getElementById("btnGrabarTrans").click();
    return false;
}
/*++++++++++++++++++++++INI DATA A GRABAR +++++++++++++++++++++++++++++++*/
function GeDatatControlDisplay(master, control, estilo) {
    var datacontrol = "";
    datacontrol = control + "@18@" + master + "_Diente18_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente18_" + control).style.display + "@" + document.getElementById(master + "_txt18").value.trim();
    datacontrol = datacontrol + "|" + control + "@17@" + master + "_Diente17_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente17_" + control).style.display + "@" + document.getElementById(master + "_txt17").value.trim();
    datacontrol = datacontrol + "|" + control + "@16@" + master + "_Diente16_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente16_" + control).style.display + "@" + document.getElementById(master + "_txt16").value.trim();
    datacontrol = datacontrol + "|" + control + "@15@" + master + "_Diente15_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente15_" + control).style.display + "@" + document.getElementById(master + "_txt15").value.trim();
    datacontrol = datacontrol + "|" + control + "@14@" + master + "_Diente14_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente14_" + control).style.display + "@" + document.getElementById(master + "_txt14").value.trim();
    datacontrol = datacontrol + "|" + control + "@13@" + master + "_Diente13_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente13_" + control).style.display + "@" + document.getElementById(master + "_txt13").value.trim();
    datacontrol = datacontrol + "|" + control + "@12@" + master + "_Diente12_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente12_" + control).style.display + "@" + document.getElementById(master + "_txt12").value.trim();
    datacontrol = datacontrol + "|" + control + "@11@" + master + "_Diente11_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente11_" + control).style.display + "@" + document.getElementById(master + "_txt11").value.trim();
    datacontrol = datacontrol + "|" + control + "@21@" + master + "_Diente21_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente21_" + control).style.display + "@" + document.getElementById(master + "_txt21").value.trim();
    datacontrol = datacontrol + "|" + control + "@22@" + master + "_Diente22_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente22_" + control).style.display + "@" + document.getElementById(master + "_txt22").value.trim();
    datacontrol = datacontrol + "|" + control + "@23@" + master + "_Diente23_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente23_" + control).style.display + "@" + document.getElementById(master + "_txt23").value.trim();
    datacontrol = datacontrol + "|" + control + "@24@" + master + "_Diente24_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente24_" + control).style.display + "@" + document.getElementById(master + "_txt24").value.trim();
    datacontrol = datacontrol + "|" + control + "@25@" + master + "_Diente25_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente25_" + control).style.display + "@" + document.getElementById(master + "_txt25").value.trim();
    datacontrol = datacontrol + "|" + control + "@26@" + master + "_Diente26_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente26_" + control).style.display + "@" + document.getElementById(master + "_txt26").value.trim();
    datacontrol = datacontrol + "|" + control + "@27@" + master + "_Diente27_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente27_" + control).style.display + "@" + document.getElementById(master + "_txt27").value.trim();
    datacontrol = datacontrol + "|" + control + "@28@" + master + "_Diente28_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente28_" + control).style.display + "@" + document.getElementById(master + "_txt28").value.trim();
    datacontrol = datacontrol + "|" + control + "@55@" + master + "_Diente55_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente55_" + control).style.display + "@" + document.getElementById(master + "_txt55").value.trim();
    datacontrol = datacontrol + "|" + control + "@54@" + master + "_Diente54_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente54_" + control).style.display + "@" + document.getElementById(master + "_txt54").value.trim();
    datacontrol = datacontrol + "|" + control + "@53@" + master + "_Diente53_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente53_" + control).style.display + "@" + document.getElementById(master + "_txt53").value.trim();
    datacontrol = datacontrol + "|" + control + "@52@" + master + "_Diente52_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente52_" + control).style.display + "@" + document.getElementById(master + "_txt52").value.trim();
    datacontrol = datacontrol + "|" + control + "@51@" + master + "_Diente51_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente51_" + control).style.display + "@" + document.getElementById(master + "_txt51").value.trim();
    datacontrol = datacontrol + "|" + control + "@61@" + master + "_Diente61_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente61_" + control).style.display + "@" + document.getElementById(master + "_txt61").value.trim();
    datacontrol = datacontrol + "|" + control + "@62@" + master + "_Diente62_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente62_" + control).style.display + "@" + document.getElementById(master + "_txt62").value.trim();
    datacontrol = datacontrol + "|" + control + "@63@" + master + "_Diente63_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente63_" + control).style.display + "@" + document.getElementById(master + "_txt63").value.trim();
    datacontrol = datacontrol + "|" + control + "@64@" + master + "_Diente64_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente64_" + control).style.display + "@" + document.getElementById(master + "_txt64").value.trim();
    datacontrol = datacontrol + "|" + control + "@65@" + master + "_Diente65_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente65_" + control).style.display + "@" + document.getElementById(master + "_txt65").value.trim();
    datacontrol = datacontrol + "|" + control + "@85@" + master + "_Diente85_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente85_" + control).style.display + "@" + document.getElementById(master + "_txt85").value.trim();
    datacontrol = datacontrol + "|" + control + "@84@" + master + "_Diente84_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente84_" + control).style.display + "@" + document.getElementById(master + "_txt84").value.trim();
    datacontrol = datacontrol + "|" + control + "@83@" + master + "_Diente83_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente83_" + control).style.display + "@" + document.getElementById(master + "_txt83").value.trim();
    datacontrol = datacontrol + "|" + control + "@82@" + master + "_Diente82_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente82_" + control).style.display + "@" + document.getElementById(master + "_txt82").value.trim();
    datacontrol = datacontrol + "|" + control + "@81@" + master + "_Diente81_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente81_" + control).style.display + "@" + document.getElementById(master + "_txt81").value.trim();
    datacontrol = datacontrol + "|" + control + "@71@" + master + "_Diente71_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente71_" + control).style.display + "@" + document.getElementById(master + "_txt71").value.trim();
    datacontrol = datacontrol + "|" + control + "@72@" + master + "_Diente72_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente72_" + control).style.display + "@" + document.getElementById(master + "_txt72").value.trim();
    datacontrol = datacontrol + "|" + control + "@73@" + master + "_Diente73_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente73_" + control).style.display + "@" + document.getElementById(master + "_txt73").value.trim();
    datacontrol = datacontrol + "|" + control + "@74@" + master + "_Diente74_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente74_" + control).style.display + "@" + document.getElementById(master + "_txt74").value.trim();
    datacontrol = datacontrol + "|" + control + "@75@" + master + "_Diente75_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente75_" + control).style.display + "@" + document.getElementById(master + "_txt75").value.trim();
    datacontrol = datacontrol + "|" + control + "@48@" + master + "_Diente48_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente48_" + control).style.display + "@" + document.getElementById(master + "_txt48").value.trim();
    datacontrol = datacontrol + "|" + control + "@47@" + master + "_Diente47_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente47_" + control).style.display + "@" + document.getElementById(master + "_txt47").value.trim();
    datacontrol = datacontrol + "|" + control + "@46@" + master + "_Diente46_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente46_" + control).style.display + "@" + document.getElementById(master + "_txt46").value.trim();
    datacontrol = datacontrol + "|" + control + "@45@" + master + "_Diente45_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente45_" + control).style.display + "@" + document.getElementById(master + "_txt45").value.trim();
    datacontrol = datacontrol + "|" + control + "@44@" + master + "_Diente44_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente44_" + control).style.display + "@" + document.getElementById(master + "_txt44").value.trim();
    datacontrol = datacontrol + "|" + control + "@43@" + master + "_Diente43_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente43_" + control).style.display + "@" + document.getElementById(master + "_txt43").value.trim();
    datacontrol = datacontrol + "|" + control + "@42@" + master + "_Diente42_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente42_" + control).style.display + "@" + document.getElementById(master + "_txt42").value.trim();
    datacontrol = datacontrol + "|" + control + "@41@" + master + "_Diente41_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente41_" + control).style.display + "@" + document.getElementById(master + "_txt41").value.trim();
    datacontrol = datacontrol + "|" + control + "@31@" + master + "_Diente31_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente31_" + control).style.display + "@" + document.getElementById(master + "_txt31").value.trim();
    datacontrol = datacontrol + "|" + control + "@32@" + master + "_Diente32_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente32_" + control).style.display + "@" + document.getElementById(master + "_txt32").value.trim();
    datacontrol = datacontrol + "|" + control + "@33@" + master + "_Diente33_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente33_" + control).style.display + "@" + document.getElementById(master + "_txt33").value.trim();
    datacontrol = datacontrol + "|" + control + "@34@" + master + "_Diente34_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente34_" + control).style.display + "@" + document.getElementById(master + "_txt34").value.trim();
    datacontrol = datacontrol + "|" + control + "@35@" + master + "_Diente35_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente35_" + control).style.display + "@" + document.getElementById(master + "_txt35").value.trim();
    datacontrol = datacontrol + "|" + control + "@36@" + master + "_Diente36_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente36_" + control).style.display + "@" + document.getElementById(master + "_txt36").value.trim();
    datacontrol = datacontrol + "|" + control + "@37@" + master + "_Diente37_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente37_" + control).style.display + "@" + document.getElementById(master + "_txt37").value.trim();
    datacontrol = datacontrol + "|" + control + "@38@" + master + "_Diente38_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente38_" + control).style.display + "@" + document.getElementById(master + "_txt38").value.trim();
    return datacontrol;
}
function GeDatatControlBorderTop(master, control, estilo) {
    var datacontrol = "";
    datacontrol = control + "@18@" + master + "_Diente18_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente18_" + control).style.borderTopColor + "@" + document.getElementById(master + "_txt18").value.trim();
    datacontrol = datacontrol + "|" + control + "@17@" + master + "_Diente17_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente17_" + control).style.borderTopColor + "@" + document.getElementById(master + "_txt17").value.trim();
    datacontrol = datacontrol + "|" + control + "@16@" + master + "_Diente16_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente16_" + control).style.borderTopColor + "@" + document.getElementById(master + "_txt16").value.trim();
    datacontrol = datacontrol + "|" + control + "@15@" + master + "_Diente15_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente15_" + control).style.borderTopColor + "@" + document.getElementById(master + "_txt15").value.trim();
    datacontrol = datacontrol + "|" + control + "@14@" + master + "_Diente14_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente14_" + control).style.borderTopColor + "@" + document.getElementById(master + "_txt14").value.trim();
    datacontrol = datacontrol + "|" + control + "@13@" + master + "_Diente13_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente13_" + control).style.borderTopColor + "@" + document.getElementById(master + "_txt13").value.trim();
    datacontrol = datacontrol + "|" + control + "@12@" + master + "_Diente12_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente12_" + control).style.borderTopColor + "@" + document.getElementById(master + "_txt12").value.trim();
    datacontrol = datacontrol + "|" + control + "@11@" + master + "_Diente11_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente11_" + control).style.borderTopColor + "@" + document.getElementById(master + "_txt11").value.trim();
    datacontrol = datacontrol + "|" + control + "@21@" + master + "_Diente21_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente21_" + control).style.borderTopColor + "@" + document.getElementById(master + "_txt21").value.trim();
    datacontrol = datacontrol + "|" + control + "@22@" + master + "_Diente22_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente22_" + control).style.borderTopColor + "@" + document.getElementById(master + "_txt22").value.trim();
    datacontrol = datacontrol + "|" + control + "@23@" + master + "_Diente23_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente23_" + control).style.borderTopColor + "@" + document.getElementById(master + "_txt23").value.trim();
    datacontrol = datacontrol + "|" + control + "@24@" + master + "_Diente24_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente24_" + control).style.borderTopColor + "@" + document.getElementById(master + "_txt24").value.trim();
    datacontrol = datacontrol + "|" + control + "@25@" + master + "_Diente25_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente25_" + control).style.borderTopColor + "@" + document.getElementById(master + "_txt25").value.trim();
    datacontrol = datacontrol + "|" + control + "@26@" + master + "_Diente26_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente26_" + control).style.borderTopColor + "@" + document.getElementById(master + "_txt26").value.trim();
    datacontrol = datacontrol + "|" + control + "@27@" + master + "_Diente27_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente27_" + control).style.borderTopColor + "@" + document.getElementById(master + "_txt27").value.trim();
    datacontrol = datacontrol + "|" + control + "@28@" + master + "_Diente28_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente28_" + control).style.borderTopColor + "@" + document.getElementById(master + "_txt28").value.trim();
    datacontrol = datacontrol + "|" + control + "@55@" + master + "_Diente55_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente55_" + control).style.borderTopColor + "@" + document.getElementById(master + "_txt55").value.trim();
    datacontrol = datacontrol + "|" + control + "@54@" + master + "_Diente54_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente54_" + control).style.borderTopColor + "@" + document.getElementById(master + "_txt54").value.trim();
    datacontrol = datacontrol + "|" + control + "@53@" + master + "_Diente53_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente53_" + control).style.borderTopColor + "@" + document.getElementById(master + "_txt53").value.trim();
    datacontrol = datacontrol + "|" + control + "@52@" + master + "_Diente52_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente52_" + control).style.borderTopColor + "@" + document.getElementById(master + "_txt52").value.trim();
    datacontrol = datacontrol + "|" + control + "@51@" + master + "_Diente51_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente51_" + control).style.borderTopColor + "@" + document.getElementById(master + "_txt51").value.trim();
    datacontrol = datacontrol + "|" + control + "@61@" + master + "_Diente61_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente61_" + control).style.borderTopColor + "@" + document.getElementById(master + "_txt61").value.trim();
    datacontrol = datacontrol + "|" + control + "@62@" + master + "_Diente62_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente62_" + control).style.borderTopColor + "@" + document.getElementById(master + "_txt62").value.trim();
    datacontrol = datacontrol + "|" + control + "@63@" + master + "_Diente63_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente63_" + control).style.borderTopColor + "@" + document.getElementById(master + "_txt63").value.trim();
    datacontrol = datacontrol + "|" + control + "@64@" + master + "_Diente64_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente64_" + control).style.borderTopColor + "@" + document.getElementById(master + "_txt64").value.trim();
    datacontrol = datacontrol + "|" + control + "@65@" + master + "_Diente65_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente65_" + control).style.borderTopColor + "@" + document.getElementById(master + "_txt65").value.trim();
    datacontrol = datacontrol + "|" + control + "@85@" + master + "_Diente85_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente85_" + control).style.borderTopColor + "@" + document.getElementById(master + "_txt85").value.trim();
    datacontrol = datacontrol + "|" + control + "@84@" + master + "_Diente84_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente84_" + control).style.borderTopColor + "@" + document.getElementById(master + "_txt84").value.trim();
    datacontrol = datacontrol + "|" + control + "@83@" + master + "_Diente83_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente83_" + control).style.borderTopColor + "@" + document.getElementById(master + "_txt83").value.trim();
    datacontrol = datacontrol + "|" + control + "@82@" + master + "_Diente82_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente82_" + control).style.borderTopColor + "@" + document.getElementById(master + "_txt82").value.trim();
    datacontrol = datacontrol + "|" + control + "@81@" + master + "_Diente81_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente81_" + control).style.borderTopColor + "@" + document.getElementById(master + "_txt81").value.trim();
    datacontrol = datacontrol + "|" + control + "@71@" + master + "_Diente71_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente71_" + control).style.borderTopColor + "@" + document.getElementById(master + "_txt71").value.trim();
    datacontrol = datacontrol + "|" + control + "@72@" + master + "_Diente72_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente72_" + control).style.borderTopColor + "@" + document.getElementById(master + "_txt72").value.trim();
    datacontrol = datacontrol + "|" + control + "@73@" + master + "_Diente73_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente73_" + control).style.borderTopColor + "@" + document.getElementById(master + "_txt73").value.trim();
    datacontrol = datacontrol + "|" + control + "@74@" + master + "_Diente74_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente74_" + control).style.borderTopColor + "@" + document.getElementById(master + "_txt74").value.trim();
    datacontrol = datacontrol + "|" + control + "@75@" + master + "_Diente75_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente75_" + control).style.borderTopColor + "@" + document.getElementById(master + "_txt75").value.trim();
    datacontrol = datacontrol + "|" + control + "@48@" + master + "_Diente48_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente48_" + control).style.borderTopColor + "@" + document.getElementById(master + "_txt48").value.trim();
    datacontrol = datacontrol + "|" + control + "@47@" + master + "_Diente47_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente47_" + control).style.borderTopColor + "@" + document.getElementById(master + "_txt47").value.trim();
    datacontrol = datacontrol + "|" + control + "@46@" + master + "_Diente46_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente46_" + control).style.borderTopColor + "@" + document.getElementById(master + "_txt46").value.trim();
    datacontrol = datacontrol + "|" + control + "@45@" + master + "_Diente45_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente45_" + control).style.borderTopColor + "@" + document.getElementById(master + "_txt45").value.trim();
    datacontrol = datacontrol + "|" + control + "@44@" + master + "_Diente44_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente44_" + control).style.borderTopColor + "@" + document.getElementById(master + "_txt44").value.trim();
    datacontrol = datacontrol + "|" + control + "@43@" + master + "_Diente43_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente43_" + control).style.borderTopColor + "@" + document.getElementById(master + "_txt43").value.trim();
    datacontrol = datacontrol + "|" + control + "@42@" + master + "_Diente42_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente42_" + control).style.borderTopColor + "@" + document.getElementById(master + "_txt42").value.trim();
    datacontrol = datacontrol + "|" + control + "@41@" + master + "_Diente41_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente41_" + control).style.borderTopColor + "@" + document.getElementById(master + "_txt41").value.trim();
    datacontrol = datacontrol + "|" + control + "@31@" + master + "_Diente31_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente31_" + control).style.borderTopColor + "@" + document.getElementById(master + "_txt31").value.trim();
    datacontrol = datacontrol + "|" + control + "@32@" + master + "_Diente32_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente32_" + control).style.borderTopColor + "@" + document.getElementById(master + "_txt32").value.trim();
    datacontrol = datacontrol + "|" + control + "@33@" + master + "_Diente33_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente33_" + control).style.borderTopColor + "@" + document.getElementById(master + "_txt33").value.trim();
    datacontrol = datacontrol + "|" + control + "@34@" + master + "_Diente34_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente34_" + control).style.borderTopColor + "@" + document.getElementById(master + "_txt34").value.trim();
    datacontrol = datacontrol + "|" + control + "@35@" + master + "_Diente35_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente35_" + control).style.borderTopColor + "@" + document.getElementById(master + "_txt35").value.trim();
    datacontrol = datacontrol + "|" + control + "@36@" + master + "_Diente36_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente36_" + control).style.borderTopColor + "@" + document.getElementById(master + "_txt36").value.trim();
    datacontrol = datacontrol + "|" + control + "@37@" + master + "_Diente37_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente37_" + control).style.borderTopColor + "@" + document.getElementById(master + "_txt37").value.trim();
    datacontrol = datacontrol + "|" + control + "@38@" + master + "_Diente38_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente38_" + control).style.borderTopColor + "@" + document.getElementById(master + "_txt38").value.trim();
    return datacontrol;
}
function GeDatatControlBorderleft(master, control, estilo) {
    var datacontrol = "";
    datacontrol = control + "@18@" + master + "_Diente18_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente18_" + control).style.borderLeftColor + "@" + document.getElementById(master + "_txt18").value.trim();
    datacontrol = datacontrol + "|" + control + "@17@" + master + "_Diente17_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente17_" + control).style.borderLeftColor + "@" + document.getElementById(master + "_txt17").value.trim();
    datacontrol = datacontrol + "|" + control + "@16@" + master + "_Diente16_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente16_" + control).style.borderLeftColor + "@" + document.getElementById(master + "_txt16").value.trim();
    datacontrol = datacontrol + "|" + control + "@15@" + master + "_Diente15_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente15_" + control).style.borderLeftColor + "@" + document.getElementById(master + "_txt15").value.trim();
    datacontrol = datacontrol + "|" + control + "@14@" + master + "_Diente14_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente14_" + control).style.borderLeftColor + "@" + document.getElementById(master + "_txt14").value.trim();
    datacontrol = datacontrol + "|" + control + "@13@" + master + "_Diente13_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente13_" + control).style.borderLeftColor + "@" + document.getElementById(master + "_txt13").value.trim();
    datacontrol = datacontrol + "|" + control + "@12@" + master + "_Diente12_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente12_" + control).style.borderLeftColor + "@" + document.getElementById(master + "_txt12").value.trim();
    datacontrol = datacontrol + "|" + control + "@11@" + master + "_Diente11_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente11_" + control).style.borderLeftColor + "@" + document.getElementById(master + "_txt11").value.trim();
    datacontrol = datacontrol + "|" + control + "@21@" + master + "_Diente21_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente21_" + control).style.borderLeftColor + "@" + document.getElementById(master + "_txt21").value.trim();
    datacontrol = datacontrol + "|" + control + "@22@" + master + "_Diente22_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente22_" + control).style.borderLeftColor + "@" + document.getElementById(master + "_txt22").value.trim();
    datacontrol = datacontrol + "|" + control + "@23@" + master + "_Diente23_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente23_" + control).style.borderLeftColor + "@" + document.getElementById(master + "_txt23").value.trim();
    datacontrol = datacontrol + "|" + control + "@24@" + master + "_Diente24_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente24_" + control).style.borderLeftColor + "@" + document.getElementById(master + "_txt24").value.trim();
    datacontrol = datacontrol + "|" + control + "@25@" + master + "_Diente25_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente25_" + control).style.borderLeftColor + "@" + document.getElementById(master + "_txt25").value.trim();
    datacontrol = datacontrol + "|" + control + "@26@" + master + "_Diente26_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente26_" + control).style.borderLeftColor + "@" + document.getElementById(master + "_txt26").value.trim();
    datacontrol = datacontrol + "|" + control + "@27@" + master + "_Diente27_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente27_" + control).style.borderLeftColor + "@" + document.getElementById(master + "_txt27").value.trim();
    datacontrol = datacontrol + "|" + control + "@28@" + master + "_Diente28_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente28_" + control).style.borderLeftColor + "@" + document.getElementById(master + "_txt28").value.trim();
    datacontrol = datacontrol + "|" + control + "@55@" + master + "_Diente55_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente55_" + control).style.borderLeftColor + "@" + document.getElementById(master + "_txt55").value.trim();
    datacontrol = datacontrol + "|" + control + "@54@" + master + "_Diente54_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente54_" + control).style.borderLeftColor + "@" + document.getElementById(master + "_txt54").value.trim();
    datacontrol = datacontrol + "|" + control + "@53@" + master + "_Diente53_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente53_" + control).style.borderLeftColor + "@" + document.getElementById(master + "_txt53").value.trim();
    datacontrol = datacontrol + "|" + control + "@52@" + master + "_Diente52_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente52_" + control).style.borderLeftColor + "@" + document.getElementById(master + "_txt52").value.trim();
    datacontrol = datacontrol + "|" + control + "@51@" + master + "_Diente51_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente51_" + control).style.borderLeftColor + "@" + document.getElementById(master + "_txt51").value.trim();
    datacontrol = datacontrol + "|" + control + "@61@" + master + "_Diente61_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente61_" + control).style.borderLeftColor + "@" + document.getElementById(master + "_txt61").value.trim();
    datacontrol = datacontrol + "|" + control + "@62@" + master + "_Diente62_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente62_" + control).style.borderLeftColor + "@" + document.getElementById(master + "_txt62").value.trim();
    datacontrol = datacontrol + "|" + control + "@63@" + master + "_Diente63_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente63_" + control).style.borderLeftColor + "@" + document.getElementById(master + "_txt63").value.trim();
    datacontrol = datacontrol + "|" + control + "@64@" + master + "_Diente64_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente64_" + control).style.borderLeftColor + "@" + document.getElementById(master + "_txt64").value.trim();
    datacontrol = datacontrol + "|" + control + "@65@" + master + "_Diente65_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente65_" + control).style.borderLeftColor + "@" + document.getElementById(master + "_txt65").value.trim();
    datacontrol = datacontrol + "|" + control + "@85@" + master + "_Diente85_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente85_" + control).style.borderLeftColor + "@" + document.getElementById(master + "_txt85").value.trim();
    datacontrol = datacontrol + "|" + control + "@84@" + master + "_Diente84_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente84_" + control).style.borderLeftColor + "@" + document.getElementById(master + "_txt84").value.trim();
    datacontrol = datacontrol + "|" + control + "@83@" + master + "_Diente83_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente83_" + control).style.borderLeftColor + "@" + document.getElementById(master + "_txt83").value.trim();
    datacontrol = datacontrol + "|" + control + "@82@" + master + "_Diente82_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente82_" + control).style.borderLeftColor + "@" + document.getElementById(master + "_txt82").value.trim();
    datacontrol = datacontrol + "|" + control + "@81@" + master + "_Diente81_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente81_" + control).style.borderLeftColor + "@" + document.getElementById(master + "_txt81").value.trim();
    datacontrol = datacontrol + "|" + control + "@71@" + master + "_Diente71_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente71_" + control).style.borderLeftColor + "@" + document.getElementById(master + "_txt71").value.trim();
    datacontrol = datacontrol + "|" + control + "@72@" + master + "_Diente72_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente72_" + control).style.borderLeftColor + "@" + document.getElementById(master + "_txt72").value.trim();
    datacontrol = datacontrol + "|" + control + "@73@" + master + "_Diente73_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente73_" + control).style.borderLeftColor + "@" + document.getElementById(master + "_txt73").value.trim();
    datacontrol = datacontrol + "|" + control + "@74@" + master + "_Diente74_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente74_" + control).style.borderLeftColor + "@" + document.getElementById(master + "_txt74").value.trim();
    datacontrol = datacontrol + "|" + control + "@75@" + master + "_Diente75_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente75_" + control).style.borderLeftColor + "@" + document.getElementById(master + "_txt75").value.trim();
    datacontrol = datacontrol + "|" + control + "@48@" + master + "_Diente48_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente48_" + control).style.borderLeftColor + "@" + document.getElementById(master + "_txt48").value.trim();
    datacontrol = datacontrol + "|" + control + "@47@" + master + "_Diente47_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente47_" + control).style.borderLeftColor + "@" + document.getElementById(master + "_txt47").value.trim();
    datacontrol = datacontrol + "|" + control + "@46@" + master + "_Diente46_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente46_" + control).style.borderLeftColor + "@" + document.getElementById(master + "_txt46").value.trim();
    datacontrol = datacontrol + "|" + control + "@45@" + master + "_Diente45_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente45_" + control).style.borderLeftColor + "@" + document.getElementById(master + "_txt45").value.trim();
    datacontrol = datacontrol + "|" + control + "@44@" + master + "_Diente44_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente44_" + control).style.borderLeftColor + "@" + document.getElementById(master + "_txt44").value.trim();
    datacontrol = datacontrol + "|" + control + "@43@" + master + "_Diente43_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente43_" + control).style.borderLeftColor + "@" + document.getElementById(master + "_txt43").value.trim();
    datacontrol = datacontrol + "|" + control + "@42@" + master + "_Diente42_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente42_" + control).style.borderLeftColor + "@" + document.getElementById(master + "_txt42").value.trim();
    datacontrol = datacontrol + "|" + control + "@41@" + master + "_Diente41_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente41_" + control).style.borderLeftColor + "@" + document.getElementById(master + "_txt41").value.trim();
    datacontrol = datacontrol + "|" + control + "@31@" + master + "_Diente31_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente31_" + control).style.borderLeftColor + "@" + document.getElementById(master + "_txt31").value.trim();
    datacontrol = datacontrol + "|" + control + "@32@" + master + "_Diente32_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente32_" + control).style.borderLeftColor + "@" + document.getElementById(master + "_txt32").value.trim();
    datacontrol = datacontrol + "|" + control + "@33@" + master + "_Diente33_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente33_" + control).style.borderLeftColor + "@" + document.getElementById(master + "_txt33").value.trim();
    datacontrol = datacontrol + "|" + control + "@34@" + master + "_Diente34_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente34_" + control).style.borderLeftColor + "@" + document.getElementById(master + "_txt34").value.trim();
    datacontrol = datacontrol + "|" + control + "@35@" + master + "_Diente35_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente35_" + control).style.borderLeftColor + "@" + document.getElementById(master + "_txt35").value.trim();
    datacontrol = datacontrol + "|" + control + "@36@" + master + "_Diente36_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente36_" + control).style.borderLeftColor + "@" + document.getElementById(master + "_txt36").value.trim();
    datacontrol = datacontrol + "|" + control + "@37@" + master + "_Diente37_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente37_" + control).style.borderLeftColor + "@" + document.getElementById(master + "_txt37").value.trim();
    datacontrol = datacontrol + "|" + control + "@38@" + master + "_Diente38_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente38_" + control).style.borderLeftColor + "@" + document.getElementById(master + "_txt38").value.trim();
    return datacontrol;
}
function GeDatatControlBorderCent(master, control, estilo) {
    var datacontrol = "";
    datacontrol = control + "@18@" + master + "_Diente18_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente18_" + control).style.backgroundColor + "@" + document.getElementById(master + "_txt18").value.trim();
    datacontrol = datacontrol + "|" + control + "@17@" + master + "_Diente17_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente17_" + control).style.backgroundColor + "@" + document.getElementById(master + "_txt17").value.trim();
    datacontrol = datacontrol + "|" + control + "@16@" + master + "_Diente16_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente16_" + control).style.backgroundColor + "@" + document.getElementById(master + "_txt16").value.trim();
    datacontrol = datacontrol + "|" + control + "@15@" + master + "_Diente15_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente15_" + control).style.backgroundColor + "@" + document.getElementById(master + "_txt15").value.trim();
    datacontrol = datacontrol + "|" + control + "@14@" + master + "_Diente14_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente14_" + control).style.backgroundColor + "@" + document.getElementById(master + "_txt14").value.trim();
    datacontrol = datacontrol + "|" + control + "@13@" + master + "_Diente13_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente13_" + control).style.backgroundColor + "@" + document.getElementById(master + "_txt13").value.trim();
    datacontrol = datacontrol + "|" + control + "@12@" + master + "_Diente12_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente12_" + control).style.backgroundColor + "@" + document.getElementById(master + "_txt12").value.trim();
    datacontrol = datacontrol + "|" + control + "@11@" + master + "_Diente11_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente11_" + control).style.backgroundColor + "@" + document.getElementById(master + "_txt11").value.trim();
    datacontrol = datacontrol + "|" + control + "@21@" + master + "_Diente21_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente21_" + control).style.backgroundColor + "@" + document.getElementById(master + "_txt21").value.trim();
    datacontrol = datacontrol + "|" + control + "@22@" + master + "_Diente22_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente22_" + control).style.backgroundColor + "@" + document.getElementById(master + "_txt22").value.trim();
    datacontrol = datacontrol + "|" + control + "@23@" + master + "_Diente23_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente23_" + control).style.backgroundColor + "@" + document.getElementById(master + "_txt23").value.trim();
    datacontrol = datacontrol + "|" + control + "@24@" + master + "_Diente24_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente24_" + control).style.backgroundColor + "@" + document.getElementById(master + "_txt24").value.trim();
    datacontrol = datacontrol + "|" + control + "@25@" + master + "_Diente25_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente25_" + control).style.backgroundColor + "@" + document.getElementById(master + "_txt25").value.trim();
    datacontrol = datacontrol + "|" + control + "@26@" + master + "_Diente26_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente26_" + control).style.backgroundColor + "@" + document.getElementById(master + "_txt26").value.trim();
    datacontrol = datacontrol + "|" + control + "@27@" + master + "_Diente27_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente27_" + control).style.backgroundColor + "@" + document.getElementById(master + "_txt27").value.trim();
    datacontrol = datacontrol + "|" + control + "@28@" + master + "_Diente28_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente28_" + control).style.backgroundColor + "@" + document.getElementById(master + "_txt28").value.trim();
    datacontrol = datacontrol + "|" + control + "@55@" + master + "_Diente55_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente55_" + control).style.backgroundColor + "@" + document.getElementById(master + "_txt55").value.trim();
    datacontrol = datacontrol + "|" + control + "@54@" + master + "_Diente54_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente54_" + control).style.backgroundColor + "@" + document.getElementById(master + "_txt54").value.trim();
    datacontrol = datacontrol + "|" + control + "@53@" + master + "_Diente53_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente53_" + control).style.backgroundColor + "@" + document.getElementById(master + "_txt53").value.trim();
    datacontrol = datacontrol + "|" + control + "@52@" + master + "_Diente52_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente52_" + control).style.backgroundColor + "@" + document.getElementById(master + "_txt52").value.trim();
    datacontrol = datacontrol + "|" + control + "@51@" + master + "_Diente51_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente51_" + control).style.backgroundColor + "@" + document.getElementById(master + "_txt51").value.trim();
    datacontrol = datacontrol + "|" + control + "@61@" + master + "_Diente61_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente61_" + control).style.backgroundColor + "@" + document.getElementById(master + "_txt61").value.trim();
    datacontrol = datacontrol + "|" + control + "@62@" + master + "_Diente62_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente62_" + control).style.backgroundColor + "@" + document.getElementById(master + "_txt62").value.trim();
    datacontrol = datacontrol + "|" + control + "@63@" + master + "_Diente63_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente63_" + control).style.backgroundColor + "@" + document.getElementById(master + "_txt63").value.trim();
    datacontrol = datacontrol + "|" + control + "@64@" + master + "_Diente64_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente64_" + control).style.backgroundColor + "@" + document.getElementById(master + "_txt64").value.trim();
    datacontrol = datacontrol + "|" + control + "@65@" + master + "_Diente65_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente65_" + control).style.backgroundColor + "@" + document.getElementById(master + "_txt65").value.trim();
    datacontrol = datacontrol + "|" + control + "@85@" + master + "_Diente85_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente85_" + control).style.backgroundColor + "@" + document.getElementById(master + "_txt85").value.trim();
    datacontrol = datacontrol + "|" + control + "@84@" + master + "_Diente84_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente84_" + control).style.backgroundColor + "@" + document.getElementById(master + "_txt84").value.trim();
    datacontrol = datacontrol + "|" + control + "@83@" + master + "_Diente83_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente83_" + control).style.backgroundColor + "@" + document.getElementById(master + "_txt83").value.trim();
    datacontrol = datacontrol + "|" + control + "@82@" + master + "_Diente82_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente82_" + control).style.backgroundColor + "@" + document.getElementById(master + "_txt82").value.trim();
    datacontrol = datacontrol + "|" + control + "@81@" + master + "_Diente81_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente81_" + control).style.backgroundColor + "@" + document.getElementById(master + "_txt81").value.trim();
    datacontrol = datacontrol + "|" + control + "@71@" + master + "_Diente71_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente71_" + control).style.backgroundColor + "@" + document.getElementById(master + "_txt71").value.trim();
    datacontrol = datacontrol + "|" + control + "@72@" + master + "_Diente72_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente72_" + control).style.backgroundColor + "@" + document.getElementById(master + "_txt72").value.trim();
    datacontrol = datacontrol + "|" + control + "@73@" + master + "_Diente73_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente73_" + control).style.backgroundColor + "@" + document.getElementById(master + "_txt73").value.trim();
    datacontrol = datacontrol + "|" + control + "@74@" + master + "_Diente74_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente74_" + control).style.backgroundColor + "@" + document.getElementById(master + "_txt74").value.trim();
    datacontrol = datacontrol + "|" + control + "@75@" + master + "_Diente75_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente75_" + control).style.backgroundColor + "@" + document.getElementById(master + "_txt75").value.trim();
    datacontrol = datacontrol + "|" + control + "@48@" + master + "_Diente48_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente48_" + control).style.backgroundColor + "@" + document.getElementById(master + "_txt48").value.trim();
    datacontrol = datacontrol + "|" + control + "@47@" + master + "_Diente47_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente47_" + control).style.backgroundColor + "@" + document.getElementById(master + "_txt47").value.trim();
    datacontrol = datacontrol + "|" + control + "@46@" + master + "_Diente46_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente46_" + control).style.backgroundColor + "@" + document.getElementById(master + "_txt46").value.trim();
    datacontrol = datacontrol + "|" + control + "@45@" + master + "_Diente45_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente45_" + control).style.backgroundColor + "@" + document.getElementById(master + "_txt45").value.trim();
    datacontrol = datacontrol + "|" + control + "@44@" + master + "_Diente44_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente44_" + control).style.backgroundColor + "@" + document.getElementById(master + "_txt44").value.trim();
    datacontrol = datacontrol + "|" + control + "@43@" + master + "_Diente43_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente43_" + control).style.backgroundColor + "@" + document.getElementById(master + "_txt43").value.trim();
    datacontrol = datacontrol + "|" + control + "@42@" + master + "_Diente42_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente42_" + control).style.backgroundColor + "@" + document.getElementById(master + "_txt42").value.trim();
    datacontrol = datacontrol + "|" + control + "@41@" + master + "_Diente41_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente41_" + control).style.backgroundColor + "@" + document.getElementById(master + "_txt41").value.trim();
    datacontrol = datacontrol + "|" + control + "@31@" + master + "_Diente31_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente31_" + control).style.backgroundColor + "@" + document.getElementById(master + "_txt31").value.trim();
    datacontrol = datacontrol + "|" + control + "@32@" + master + "_Diente32_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente32_" + control).style.backgroundColor + "@" + document.getElementById(master + "_txt32").value.trim();
    datacontrol = datacontrol + "|" + control + "@33@" + master + "_Diente33_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente33_" + control).style.backgroundColor + "@" + document.getElementById(master + "_txt33").value.trim();
    datacontrol = datacontrol + "|" + control + "@34@" + master + "_Diente34_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente34_" + control).style.backgroundColor + "@" + document.getElementById(master + "_txt34").value.trim();
    datacontrol = datacontrol + "|" + control + "@35@" + master + "_Diente35_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente35_" + control).style.backgroundColor + "@" + document.getElementById(master + "_txt35").value.trim();
    datacontrol = datacontrol + "|" + control + "@36@" + master + "_Diente36_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente36_" + control).style.backgroundColor + "@" + document.getElementById(master + "_txt36").value.trim();
    datacontrol = datacontrol + "|" + control + "@37@" + master + "_Diente37_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente37_" + control).style.backgroundColor + "@" + document.getElementById(master + "_txt37").value.trim();
    datacontrol = datacontrol + "|" + control + "@38@" + master + "_Diente38_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente38_" + control).style.backgroundColor + "@" + document.getElementById(master + "_txt38").value.trim();
    return datacontrol;
}
function GeDatatControlBorderRigt(master, control, estilo) {
    var datacontrol = "";
    datacontrol = control + "@18@" + master + "_Diente18_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente18_" + control).style.borderRightColor + "@" + document.getElementById(master + "_txt18").value.trim();
    datacontrol = datacontrol + "|" + control + "@17@" + master + "_Diente17_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente17_" + control).style.borderRightColor + "@" + document.getElementById(master + "_txt17").value.trim();
    datacontrol = datacontrol + "|" + control + "@16@" + master + "_Diente16_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente16_" + control).style.borderRightColor + "@" + document.getElementById(master + "_txt16").value.trim();
    datacontrol = datacontrol + "|" + control + "@15@" + master + "_Diente15_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente15_" + control).style.borderRightColor + "@" + document.getElementById(master + "_txt15").value.trim();
    datacontrol = datacontrol + "|" + control + "@14@" + master + "_Diente14_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente14_" + control).style.borderRightColor + "@" + document.getElementById(master + "_txt14").value.trim();
    datacontrol = datacontrol + "|" + control + "@13@" + master + "_Diente13_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente13_" + control).style.borderRightColor + "@" + document.getElementById(master + "_txt13").value.trim();
    datacontrol = datacontrol + "|" + control + "@12@" + master + "_Diente12_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente12_" + control).style.borderRightColor + "@" + document.getElementById(master + "_txt12").value.trim();
    datacontrol = datacontrol + "|" + control + "@11@" + master + "_Diente11_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente11_" + control).style.borderRightColor + "@" + document.getElementById(master + "_txt11").value.trim();
    datacontrol = datacontrol + "|" + control + "@21@" + master + "_Diente21_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente21_" + control).style.borderRightColor + "@" + document.getElementById(master + "_txt21").value.trim();
    datacontrol = datacontrol + "|" + control + "@22@" + master + "_Diente22_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente22_" + control).style.borderRightColor + "@" + document.getElementById(master + "_txt22").value.trim();
    datacontrol = datacontrol + "|" + control + "@23@" + master + "_Diente23_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente23_" + control).style.borderRightColor + "@" + document.getElementById(master + "_txt23").value.trim();
    datacontrol = datacontrol + "|" + control + "@24@" + master + "_Diente24_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente24_" + control).style.borderRightColor + "@" + document.getElementById(master + "_txt24").value.trim();
    datacontrol = datacontrol + "|" + control + "@25@" + master + "_Diente25_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente25_" + control).style.borderRightColor + "@" + document.getElementById(master + "_txt25").value.trim();
    datacontrol = datacontrol + "|" + control + "@26@" + master + "_Diente26_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente26_" + control).style.borderRightColor + "@" + document.getElementById(master + "_txt26").value.trim();
    datacontrol = datacontrol + "|" + control + "@27@" + master + "_Diente27_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente27_" + control).style.borderRightColor + "@" + document.getElementById(master + "_txt27").value.trim();
    datacontrol = datacontrol + "|" + control + "@28@" + master + "_Diente28_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente28_" + control).style.borderRightColor + "@" + document.getElementById(master + "_txt28").value.trim();
    datacontrol = datacontrol + "|" + control + "@55@" + master + "_Diente55_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente55_" + control).style.borderRightColor + "@" + document.getElementById(master + "_txt55").value.trim();
    datacontrol = datacontrol + "|" + control + "@54@" + master + "_Diente54_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente54_" + control).style.borderRightColor + "@" + document.getElementById(master + "_txt54").value.trim();
    datacontrol = datacontrol + "|" + control + "@53@" + master + "_Diente53_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente53_" + control).style.borderRightColor + "@" + document.getElementById(master + "_txt53").value.trim();
    datacontrol = datacontrol + "|" + control + "@52@" + master + "_Diente52_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente52_" + control).style.borderRightColor + "@" + document.getElementById(master + "_txt52").value.trim();
    datacontrol = datacontrol + "|" + control + "@51@" + master + "_Diente51_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente51_" + control).style.borderRightColor + "@" + document.getElementById(master + "_txt51").value.trim();
    datacontrol = datacontrol + "|" + control + "@61@" + master + "_Diente61_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente61_" + control).style.borderRightColor + "@" + document.getElementById(master + "_txt61").value.trim();
    datacontrol = datacontrol + "|" + control + "@62@" + master + "_Diente62_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente62_" + control).style.borderRightColor + "@" + document.getElementById(master + "_txt62").value.trim();
    datacontrol = datacontrol + "|" + control + "@63@" + master + "_Diente63_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente63_" + control).style.borderRightColor + "@" + document.getElementById(master + "_txt63").value.trim();
    datacontrol = datacontrol + "|" + control + "@64@" + master + "_Diente64_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente64_" + control).style.borderRightColor + "@" + document.getElementById(master + "_txt64").value.trim();
    datacontrol = datacontrol + "|" + control + "@65@" + master + "_Diente65_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente65_" + control).style.borderRightColor + "@" + document.getElementById(master + "_txt65").value.trim();
    datacontrol = datacontrol + "|" + control + "@85@" + master + "_Diente85_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente85_" + control).style.borderRightColor + "@" + document.getElementById(master + "_txt85").value.trim();
    datacontrol = datacontrol + "|" + control + "@84@" + master + "_Diente84_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente84_" + control).style.borderRightColor + "@" + document.getElementById(master + "_txt84").value.trim();
    datacontrol = datacontrol + "|" + control + "@83@" + master + "_Diente83_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente83_" + control).style.borderRightColor + "@" + document.getElementById(master + "_txt83").value.trim();
    datacontrol = datacontrol + "|" + control + "@82@" + master + "_Diente82_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente82_" + control).style.borderRightColor + "@" + document.getElementById(master + "_txt82").value.trim();
    datacontrol = datacontrol + "|" + control + "@81@" + master + "_Diente81_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente81_" + control).style.borderRightColor + "@" + document.getElementById(master + "_txt81").value.trim();
    datacontrol = datacontrol + "|" + control + "@71@" + master + "_Diente71_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente71_" + control).style.borderRightColor + "@" + document.getElementById(master + "_txt71").value.trim();
    datacontrol = datacontrol + "|" + control + "@72@" + master + "_Diente72_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente72_" + control).style.borderRightColor + "@" + document.getElementById(master + "_txt72").value.trim();
    datacontrol = datacontrol + "|" + control + "@73@" + master + "_Diente73_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente73_" + control).style.borderRightColor + "@" + document.getElementById(master + "_txt73").value.trim();
    datacontrol = datacontrol + "|" + control + "@74@" + master + "_Diente74_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente74_" + control).style.borderRightColor + "@" + document.getElementById(master + "_txt74").value.trim();
    datacontrol = datacontrol + "|" + control + "@75@" + master + "_Diente75_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente75_" + control).style.borderRightColor + "@" + document.getElementById(master + "_txt75").value.trim();
    datacontrol = datacontrol + "|" + control + "@48@" + master + "_Diente48_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente48_" + control).style.borderRightColor + "@" + document.getElementById(master + "_txt48").value.trim();
    datacontrol = datacontrol + "|" + control + "@47@" + master + "_Diente47_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente47_" + control).style.borderRightColor + "@" + document.getElementById(master + "_txt47").value.trim();
    datacontrol = datacontrol + "|" + control + "@46@" + master + "_Diente46_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente46_" + control).style.borderRightColor + "@" + document.getElementById(master + "_txt46").value.trim();
    datacontrol = datacontrol + "|" + control + "@45@" + master + "_Diente45_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente45_" + control).style.borderRightColor + "@" + document.getElementById(master + "_txt45").value.trim();
    datacontrol = datacontrol + "|" + control + "@44@" + master + "_Diente44_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente44_" + control).style.borderRightColor + "@" + document.getElementById(master + "_txt44").value.trim();
    datacontrol = datacontrol + "|" + control + "@43@" + master + "_Diente43_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente43_" + control).style.borderRightColor + "@" + document.getElementById(master + "_txt43").value.trim();
    datacontrol = datacontrol + "|" + control + "@42@" + master + "_Diente42_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente42_" + control).style.borderRightColor + "@" + document.getElementById(master + "_txt42").value.trim();
    datacontrol = datacontrol + "|" + control + "@41@" + master + "_Diente41_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente41_" + control).style.borderRightColor + "@" + document.getElementById(master + "_txt41").value.trim();
    datacontrol = datacontrol + "|" + control + "@31@" + master + "_Diente31_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente31_" + control).style.borderRightColor + "@" + document.getElementById(master + "_txt31").value.trim();
    datacontrol = datacontrol + "|" + control + "@32@" + master + "_Diente32_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente32_" + control).style.borderRightColor + "@" + document.getElementById(master + "_txt32").value.trim();
    datacontrol = datacontrol + "|" + control + "@33@" + master + "_Diente33_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente33_" + control).style.borderRightColor + "@" + document.getElementById(master + "_txt33").value.trim();
    datacontrol = datacontrol + "|" + control + "@34@" + master + "_Diente34_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente34_" + control).style.borderRightColor + "@" + document.getElementById(master + "_txt34").value.trim();
    datacontrol = datacontrol + "|" + control + "@35@" + master + "_Diente35_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente35_" + control).style.borderRightColor + "@" + document.getElementById(master + "_txt35").value.trim();
    datacontrol = datacontrol + "|" + control + "@36@" + master + "_Diente36_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente36_" + control).style.borderRightColor + "@" + document.getElementById(master + "_txt36").value.trim();
    datacontrol = datacontrol + "|" + control + "@37@" + master + "_Diente37_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente37_" + control).style.borderRightColor + "@" + document.getElementById(master + "_txt37").value.trim();
    datacontrol = datacontrol + "|" + control + "@38@" + master + "_Diente38_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente38_" + control).style.borderRightColor + "@" + document.getElementById(master + "_txt38").value.trim();
    return datacontrol;
}
function GeDatatControlBorderBot(master, control, estilo) {
    var datacontrol = "";
    datacontrol = control + "@18@" + master + "_Diente18_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente18_" + control).style.borderBottomColor + "@" + document.getElementById(master + "_txt18").value.trim();
    datacontrol = datacontrol + "|" + control + "@17@" + master + "_Diente17_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente17_" + control).style.borderBottomColor + "@" + document.getElementById(master + "_txt17").value.trim();
    datacontrol = datacontrol + "|" + control + "@16@" + master + "_Diente16_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente16_" + control).style.borderBottomColor + "@" + document.getElementById(master + "_txt16").value.trim();
    datacontrol = datacontrol + "|" + control + "@15@" + master + "_Diente15_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente15_" + control).style.borderBottomColor + "@" + document.getElementById(master + "_txt15").value.trim();
    datacontrol = datacontrol + "|" + control + "@14@" + master + "_Diente14_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente14_" + control).style.borderBottomColor + "@" + document.getElementById(master + "_txt14").value.trim();
    datacontrol = datacontrol + "|" + control + "@13@" + master + "_Diente13_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente13_" + control).style.borderBottomColor + "@" + document.getElementById(master + "_txt13").value.trim();
    datacontrol = datacontrol + "|" + control + "@12@" + master + "_Diente12_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente12_" + control).style.borderBottomColor + "@" + document.getElementById(master + "_txt12").value.trim();
    datacontrol = datacontrol + "|" + control + "@11@" + master + "_Diente11_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente11_" + control).style.borderBottomColor + "@" + document.getElementById(master + "_txt11").value.trim();
    datacontrol = datacontrol + "|" + control + "@21@" + master + "_Diente21_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente21_" + control).style.borderBottomColor + "@" + document.getElementById(master + "_txt21").value.trim();
    datacontrol = datacontrol + "|" + control + "@22@" + master + "_Diente22_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente22_" + control).style.borderBottomColor + "@" + document.getElementById(master + "_txt22").value.trim();
    datacontrol = datacontrol + "|" + control + "@23@" + master + "_Diente23_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente23_" + control).style.borderBottomColor + "@" + document.getElementById(master + "_txt23").value.trim();
    datacontrol = datacontrol + "|" + control + "@24@" + master + "_Diente24_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente24_" + control).style.borderBottomColor + "@" + document.getElementById(master + "_txt24").value.trim();
    datacontrol = datacontrol + "|" + control + "@25@" + master + "_Diente25_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente25_" + control).style.borderBottomColor + "@" + document.getElementById(master + "_txt25").value.trim();
    datacontrol = datacontrol + "|" + control + "@26@" + master + "_Diente26_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente26_" + control).style.borderBottomColor + "@" + document.getElementById(master + "_txt26").value.trim();
    datacontrol = datacontrol + "|" + control + "@27@" + master + "_Diente27_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente27_" + control).style.borderBottomColor + "@" + document.getElementById(master + "_txt27").value.trim();
    datacontrol = datacontrol + "|" + control + "@28@" + master + "_Diente28_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente28_" + control).style.borderBottomColor + "@" + document.getElementById(master + "_txt28").value.trim();
    datacontrol = datacontrol + "|" + control + "@55@" + master + "_Diente55_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente55_" + control).style.borderBottomColor + "@" + document.getElementById(master + "_txt55").value.trim();
    datacontrol = datacontrol + "|" + control + "@54@" + master + "_Diente54_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente54_" + control).style.borderBottomColor + "@" + document.getElementById(master + "_txt54").value.trim();
    datacontrol = datacontrol + "|" + control + "@53@" + master + "_Diente53_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente53_" + control).style.borderBottomColor + "@" + document.getElementById(master + "_txt53").value.trim();
    datacontrol = datacontrol + "|" + control + "@52@" + master + "_Diente52_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente52_" + control).style.borderBottomColor + "@" + document.getElementById(master + "_txt52").value.trim();
    datacontrol = datacontrol + "|" + control + "@51@" + master + "_Diente51_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente51_" + control).style.borderBottomColor + "@" + document.getElementById(master + "_txt51").value.trim();
    datacontrol = datacontrol + "|" + control + "@61@" + master + "_Diente61_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente61_" + control).style.borderBottomColor + "@" + document.getElementById(master + "_txt61").value.trim();
    datacontrol = datacontrol + "|" + control + "@62@" + master + "_Diente62_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente62_" + control).style.borderBottomColor + "@" + document.getElementById(master + "_txt62").value.trim();
    datacontrol = datacontrol + "|" + control + "@63@" + master + "_Diente63_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente63_" + control).style.borderBottomColor + "@" + document.getElementById(master + "_txt63").value.trim();
    datacontrol = datacontrol + "|" + control + "@64@" + master + "_Diente64_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente64_" + control).style.borderBottomColor + "@" + document.getElementById(master + "_txt64").value.trim();
    datacontrol = datacontrol + "|" + control + "@65@" + master + "_Diente65_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente65_" + control).style.borderBottomColor + "@" + document.getElementById(master + "_txt65").value.trim();
    datacontrol = datacontrol + "|" + control + "@85@" + master + "_Diente85_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente85_" + control).style.borderBottomColor + "@" + document.getElementById(master + "_txt85").value.trim();
    datacontrol = datacontrol + "|" + control + "@84@" + master + "_Diente84_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente84_" + control).style.borderBottomColor + "@" + document.getElementById(master + "_txt84").value.trim();
    datacontrol = datacontrol + "|" + control + "@83@" + master + "_Diente83_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente83_" + control).style.borderBottomColor + "@" + document.getElementById(master + "_txt83").value.trim();
    datacontrol = datacontrol + "|" + control + "@82@" + master + "_Diente82_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente82_" + control).style.borderBottomColor + "@" + document.getElementById(master + "_txt82").value.trim();
    datacontrol = datacontrol + "|" + control + "@81@" + master + "_Diente81_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente81_" + control).style.borderBottomColor + "@" + document.getElementById(master + "_txt81").value.trim();
    datacontrol = datacontrol + "|" + control + "@71@" + master + "_Diente71_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente71_" + control).style.borderBottomColor + "@" + document.getElementById(master + "_txt71").value.trim();
    datacontrol = datacontrol + "|" + control + "@72@" + master + "_Diente72_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente72_" + control).style.borderBottomColor + "@" + document.getElementById(master + "_txt72").value.trim();
    datacontrol = datacontrol + "|" + control + "@73@" + master + "_Diente73_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente73_" + control).style.borderBottomColor + "@" + document.getElementById(master + "_txt73").value.trim();
    datacontrol = datacontrol + "|" + control + "@74@" + master + "_Diente74_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente74_" + control).style.borderBottomColor + "@" + document.getElementById(master + "_txt74").value.trim();
    datacontrol = datacontrol + "|" + control + "@75@" + master + "_Diente75_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente75_" + control).style.borderBottomColor + "@" + document.getElementById(master + "_txt75").value.trim();
    datacontrol = datacontrol + "|" + control + "@48@" + master + "_Diente48_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente48_" + control).style.borderBottomColor + "@" + document.getElementById(master + "_txt48").value.trim();
    datacontrol = datacontrol + "|" + control + "@47@" + master + "_Diente47_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente47_" + control).style.borderBottomColor + "@" + document.getElementById(master + "_txt47").value.trim();
    datacontrol = datacontrol + "|" + control + "@46@" + master + "_Diente46_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente46_" + control).style.borderBottomColor + "@" + document.getElementById(master + "_txt46").value.trim();
    datacontrol = datacontrol + "|" + control + "@45@" + master + "_Diente45_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente45_" + control).style.borderBottomColor + "@" + document.getElementById(master + "_txt45").value.trim();
    datacontrol = datacontrol + "|" + control + "@44@" + master + "_Diente44_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente44_" + control).style.borderBottomColor + "@" + document.getElementById(master + "_txt44").value.trim();
    datacontrol = datacontrol + "|" + control + "@43@" + master + "_Diente43_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente43_" + control).style.borderBottomColor + "@" + document.getElementById(master + "_txt43").value.trim();
    datacontrol = datacontrol + "|" + control + "@42@" + master + "_Diente42_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente42_" + control).style.borderBottomColor + "@" + document.getElementById(master + "_txt42").value.trim();
    datacontrol = datacontrol + "|" + control + "@41@" + master + "_Diente41_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente41_" + control).style.borderBottomColor + "@" + document.getElementById(master + "_txt41").value.trim();
    datacontrol = datacontrol + "|" + control + "@31@" + master + "_Diente31_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente31_" + control).style.borderBottomColor + "@" + document.getElementById(master + "_txt31").value.trim();
    datacontrol = datacontrol + "|" + control + "@32@" + master + "_Diente32_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente32_" + control).style.borderBottomColor + "@" + document.getElementById(master + "_txt32").value.trim();
    datacontrol = datacontrol + "|" + control + "@33@" + master + "_Diente33_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente33_" + control).style.borderBottomColor + "@" + document.getElementById(master + "_txt33").value.trim();
    datacontrol = datacontrol + "|" + control + "@34@" + master + "_Diente34_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente34_" + control).style.borderBottomColor + "@" + document.getElementById(master + "_txt34").value.trim();
    datacontrol = datacontrol + "|" + control + "@35@" + master + "_Diente35_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente35_" + control).style.borderBottomColor + "@" + document.getElementById(master + "_txt35").value.trim();
    datacontrol = datacontrol + "|" + control + "@36@" + master + "_Diente36_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente36_" + control).style.borderBottomColor + "@" + document.getElementById(master + "_txt36").value.trim();
    datacontrol = datacontrol + "|" + control + "@37@" + master + "_Diente37_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente37_" + control).style.borderBottomColor + "@" + document.getElementById(master + "_txt37").value.trim();
    datacontrol = datacontrol + "|" + control + "@38@" + master + "_Diente38_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente38_" + control).style.borderBottomColor + "@" + document.getElementById(master + "_txt38").value.trim();
    return datacontrol;
}
function GeDatatControlBorderColor(master, control, estilo) {
    var datacontrol = "";
    datacontrol = control + "@18@" + master + "_Diente18_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente18_" + control).style.borderColor + "@" + document.getElementById(master + "_txt18").value.trim();
    datacontrol = datacontrol + "|" + control + "@17@" + master + "_Diente17_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente17_" + control).style.borderColor + "@" + document.getElementById(master + "_txt17").value.trim();
    datacontrol = datacontrol + "|" + control + "@16@" + master + "_Diente16_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente16_" + control).style.borderColor + "@" + document.getElementById(master + "_txt16").value.trim();
    datacontrol = datacontrol + "|" + control + "@15@" + master + "_Diente15_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente15_" + control).style.borderColor + "@" + document.getElementById(master + "_txt15").value.trim();
    datacontrol = datacontrol + "|" + control + "@14@" + master + "_Diente14_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente14_" + control).style.borderColor + "@" + document.getElementById(master + "_txt14").value.trim();
    datacontrol = datacontrol + "|" + control + "@13@" + master + "_Diente13_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente13_" + control).style.borderColor + "@" + document.getElementById(master + "_txt13").value.trim();
    datacontrol = datacontrol + "|" + control + "@12@" + master + "_Diente12_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente12_" + control).style.borderColor + "@" + document.getElementById(master + "_txt12").value.trim();
    datacontrol = datacontrol + "|" + control + "@11@" + master + "_Diente11_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente11_" + control).style.borderColor + "@" + document.getElementById(master + "_txt11").value.trim();
    datacontrol = datacontrol + "|" + control + "@21@" + master + "_Diente21_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente21_" + control).style.borderColor + "@" + document.getElementById(master + "_txt21").value.trim();
    datacontrol = datacontrol + "|" + control + "@22@" + master + "_Diente22_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente22_" + control).style.borderColor + "@" + document.getElementById(master + "_txt22").value.trim();
    datacontrol = datacontrol + "|" + control + "@23@" + master + "_Diente23_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente23_" + control).style.borderColor + "@" + document.getElementById(master + "_txt23").value.trim();
    datacontrol = datacontrol + "|" + control + "@24@" + master + "_Diente24_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente24_" + control).style.borderColor + "@" + document.getElementById(master + "_txt24").value.trim();
    datacontrol = datacontrol + "|" + control + "@25@" + master + "_Diente25_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente25_" + control).style.borderColor + "@" + document.getElementById(master + "_txt25").value.trim();
    datacontrol = datacontrol + "|" + control + "@26@" + master + "_Diente26_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente26_" + control).style.borderColor + "@" + document.getElementById(master + "_txt26").value.trim();
    datacontrol = datacontrol + "|" + control + "@27@" + master + "_Diente27_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente27_" + control).style.borderColor + "@" + document.getElementById(master + "_txt27").value.trim();
    datacontrol = datacontrol + "|" + control + "@28@" + master + "_Diente28_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente28_" + control).style.borderColor + "@" + document.getElementById(master + "_txt28").value.trim();
    datacontrol = datacontrol + "|" + control + "@55@" + master + "_Diente55_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente55_" + control).style.borderColor + "@" + document.getElementById(master + "_txt55").value.trim();
    datacontrol = datacontrol + "|" + control + "@54@" + master + "_Diente54_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente54_" + control).style.borderColor + "@" + document.getElementById(master + "_txt54").value.trim();
    datacontrol = datacontrol + "|" + control + "@53@" + master + "_Diente53_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente53_" + control).style.borderColor + "@" + document.getElementById(master + "_txt53").value.trim();
    datacontrol = datacontrol + "|" + control + "@52@" + master + "_Diente52_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente52_" + control).style.borderColor + "@" + document.getElementById(master + "_txt52").value.trim();
    datacontrol = datacontrol + "|" + control + "@51@" + master + "_Diente51_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente51_" + control).style.borderColor + "@" + document.getElementById(master + "_txt51").value.trim();
    datacontrol = datacontrol + "|" + control + "@61@" + master + "_Diente61_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente61_" + control).style.borderColor + "@" + document.getElementById(master + "_txt61").value.trim();
    datacontrol = datacontrol + "|" + control + "@62@" + master + "_Diente62_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente62_" + control).style.borderColor + "@" + document.getElementById(master + "_txt62").value.trim();
    datacontrol = datacontrol + "|" + control + "@63@" + master + "_Diente63_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente63_" + control).style.borderColor + "@" + document.getElementById(master + "_txt63").value.trim();
    datacontrol = datacontrol + "|" + control + "@64@" + master + "_Diente64_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente64_" + control).style.borderColor + "@" + document.getElementById(master + "_txt64").value.trim();
    datacontrol = datacontrol + "|" + control + "@65@" + master + "_Diente65_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente65_" + control).style.borderColor + "@" + document.getElementById(master + "_txt65").value.trim();
    datacontrol = datacontrol + "|" + control + "@85@" + master + "_Diente85_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente85_" + control).style.borderColor + "@" + document.getElementById(master + "_txt85").value.trim();
    datacontrol = datacontrol + "|" + control + "@84@" + master + "_Diente84_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente84_" + control).style.borderColor + "@" + document.getElementById(master + "_txt84").value.trim();
    datacontrol = datacontrol + "|" + control + "@83@" + master + "_Diente83_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente83_" + control).style.borderColor + "@" + document.getElementById(master + "_txt83").value.trim();
    datacontrol = datacontrol + "|" + control + "@82@" + master + "_Diente82_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente82_" + control).style.borderColor + "@" + document.getElementById(master + "_txt82").value.trim();
    datacontrol = datacontrol + "|" + control + "@81@" + master + "_Diente81_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente81_" + control).style.borderColor + "@" + document.getElementById(master + "_txt81").value.trim();
    datacontrol = datacontrol + "|" + control + "@71@" + master + "_Diente71_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente71_" + control).style.borderColor + "@" + document.getElementById(master + "_txt71").value.trim();
    datacontrol = datacontrol + "|" + control + "@72@" + master + "_Diente72_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente72_" + control).style.borderColor + "@" + document.getElementById(master + "_txt72").value.trim();
    datacontrol = datacontrol + "|" + control + "@73@" + master + "_Diente73_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente73_" + control).style.borderColor + "@" + document.getElementById(master + "_txt73").value.trim();
    datacontrol = datacontrol + "|" + control + "@74@" + master + "_Diente74_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente74_" + control).style.borderColor + "@" + document.getElementById(master + "_txt74").value.trim();
    datacontrol = datacontrol + "|" + control + "@75@" + master + "_Diente75_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente75_" + control).style.borderColor + "@" + document.getElementById(master + "_txt75").value.trim();
    datacontrol = datacontrol + "|" + control + "@48@" + master + "_Diente48_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente48_" + control).style.borderColor + "@" + document.getElementById(master + "_txt48").value.trim();
    datacontrol = datacontrol + "|" + control + "@47@" + master + "_Diente47_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente47_" + control).style.borderColor + "@" + document.getElementById(master + "_txt47").value.trim();
    datacontrol = datacontrol + "|" + control + "@46@" + master + "_Diente46_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente46_" + control).style.borderColor + "@" + document.getElementById(master + "_txt46").value.trim();
    datacontrol = datacontrol + "|" + control + "@45@" + master + "_Diente45_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente45_" + control).style.borderColor + "@" + document.getElementById(master + "_txt45").value.trim();
    datacontrol = datacontrol + "|" + control + "@44@" + master + "_Diente44_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente44_" + control).style.borderColor + "@" + document.getElementById(master + "_txt44").value.trim();
    datacontrol = datacontrol + "|" + control + "@43@" + master + "_Diente43_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente43_" + control).style.borderColor + "@" + document.getElementById(master + "_txt43").value.trim();
    datacontrol = datacontrol + "|" + control + "@42@" + master + "_Diente42_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente42_" + control).style.borderColor + "@" + document.getElementById(master + "_txt42").value.trim();
    datacontrol = datacontrol + "|" + control + "@41@" + master + "_Diente41_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente41_" + control).style.borderColor + "@" + document.getElementById(master + "_txt41").value.trim();
    datacontrol = datacontrol + "|" + control + "@31@" + master + "_Diente31_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente31_" + control).style.borderColor + "@" + document.getElementById(master + "_txt31").value.trim();
    datacontrol = datacontrol + "|" + control + "@32@" + master + "_Diente32_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente32_" + control).style.borderColor + "@" + document.getElementById(master + "_txt32").value.trim();
    datacontrol = datacontrol + "|" + control + "@33@" + master + "_Diente33_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente33_" + control).style.borderColor + "@" + document.getElementById(master + "_txt33").value.trim();
    datacontrol = datacontrol + "|" + control + "@34@" + master + "_Diente34_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente34_" + control).style.borderColor + "@" + document.getElementById(master + "_txt34").value.trim();
    datacontrol = datacontrol + "|" + control + "@35@" + master + "_Diente35_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente35_" + control).style.borderColor + "@" + document.getElementById(master + "_txt35").value.trim();
    datacontrol = datacontrol + "|" + control + "@36@" + master + "_Diente36_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente36_" + control).style.borderColor + "@" + document.getElementById(master + "_txt36").value.trim();
    datacontrol = datacontrol + "|" + control + "@37@" + master + "_Diente37_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente37_" + control).style.borderColor + "@" + document.getElementById(master + "_txt37").value.trim();
    datacontrol = datacontrol + "|" + control + "@38@" + master + "_Diente38_" + control + "@" + estilo + "@" + document.getElementById(master + "_Diente38_" + control).style.borderColor + "@" + document.getElementById(master + "_txt38").value.trim();
    return datacontrol;
}
/*++++++++++++++++++++++FIN DATA A GRABAR +++++++++++++++++++++++++++++++*/

function changeValueText(cb) {
    if (cb.id == "chkCon") {
        document.getElementById('chkCon').checked = true;
        document.getElementById('chkPul').checked = false;
        document.getElementById('chkPul1').checked = false;
    }

    if (cb.id == "chkPul") {
        document.getElementById('chkCon').checked = false;
        document.getElementById('chkPul').checked = true;
        document.getElementById('chkPul1').checked = false;
    }

    if (cb.id == "chkPul1") {
        document.getElementById('chkCon').checked = false;
        document.getElementById('chkPul').checked = false;
        document.getElementById('chkPul1').checked = true;
    }
    if (cb.id == 'chkAm') {
        document.getElementById('chkAm').checked = true;
        document.getElementById('chkRe').checked = false;
        document.getElementById('chkVi').checked = false;
        document.getElementById('chkMe').checked = false;
        document.getElementById('ckkEs').checked = false;
    }
    if (cb.id == 'chkRe') {
        document.getElementById('chkAm').checked = false;
        document.getElementById('chkRe').checked = true;
        document.getElementById('chkVi').checked = false;
        document.getElementById('chkMe').checked = false;
        document.getElementById('ckkEs').checked = false;
    }
    if (cb.id == 'chkVi') {
        document.getElementById('chkAm').checked = false;
        document.getElementById('chkRe').checked = false;
        document.getElementById('chkVi').checked = true;
        document.getElementById('chkMe').checked = false;
        document.getElementById('ckkEs').checked = false;
    }
    if (cb.id == 'chkMe') {
        document.getElementById('chkAm').checked = false;
        document.getElementById('chkRe').checked = false;
        document.getElementById('chkVi').checked = false;
        document.getElementById('chkMe').checked = true;
        document.getElementById('ckkEs').checked = false;
    }
    if (cb.id == 'ckkEs') {
        document.getElementById('chkAm').checked = false;
        document.getElementById('chkRe').checked = false;
        document.getElementById('chkVi').checked = false;
        document.getElementById('chkMe').checked = false;
        document.getElementById('ckkEs').checked = true;
    }
}
function showmydiv(e) {
    alert(e.innerText);
}
function showmydiv2(value) {
    document.getElementById('ctlOdontograma').style.display = "block";
    document.getElementById('ctlTratamiento').style.display = "none";
    document.getElementById('hfTipoArch').value = "O";
    document.getElementById('hfIDControl').value = value.split("_")[0] + "_" + value.split("_")[1] + "_";
    var resul = document.getElementById(document.getElementById('hfIDControl').value.trim() + "LnkNumero").innerText;
    document.getElementById('hfnroControl').value = value.split("_")[0] + "_txt" + resul;
    document.getElementById('Botonera').style.display = "block";
    document.getElementById('txtId').value = resul;
    //limpiarRestauracion();
    //limpiarCaries();
    document.getElementById('DienteGiroDiv').style.display = "none";
    document.getElementById('DienteDiv').style.display = "none";
    document.getElementById('DienteAusenteDiv').style.display = "none";
    document.getElementById('DienteMovilidadDiv').style.display = "none";
    document.getElementById('DienteEctopicoDiv').style.display = "none";
    document.getElementById('DienteExtruidoDiv').style.display = "none";
    document.getElementById('DienteFracturadoDiv').style.display = "none";
    document.getElementById('DienteIntruidoDiv').style.display = "none";
    document.getElementById('DienteRemanenteDiv').style.display = "none";
    document.getElementById('DienteRestauracionDiv').style.display = "none";
    document.getElementById('DienteCareiesDiv').style.display = "none";
    document.getElementById('DientePulparDiv').style.display = "none";
    document.getElementById('DienteErupcionDiv').style.display = "none";
    document.getElementById('DienteErupcionDiv').style.display = "none";
    document.getElementById('DienteremovibleDiv').style.display = "none";
    document.getElementById('DienteDicromicoDiv').style.display = "none";
    document.getElementById("btntopcar").style.background = "";
    document.getElementById("btnleftCar").style.background = "";
    document.getElementById("btncenterCar").style.background = "";
    document.getElementById("btnrigthCar").style.background = "";
    document.getElementById("btnbotCar").style.background = "";
    return false;
}
function showmydiv1(value) {
    document.getElementById('ctlTratamiento').style.display = "block";
    document.getElementById('ctlOdontograma').style.display = "none";
    document.getElementById('DivTranfiere').style.display = "none";
    document.getElementById('hfTipoArch').value = "T";
    document.getElementById('hfIDControl').value = value.split("_")[0] + "_" + value.split("_")[1] + "_";
    var resul = document.getElementById(document.getElementById('hfIDControl').value.trim() + "LnkNumero").innerText;
    document.getElementById('hfnroControl').value = value.split("_")[0] + "_txt" + resul;
    document.getElementById('Botonera').style.display = "block";
    document.getElementById('txtId').value = resul;
    //limpiarRestauracion();
    //limpiarCaries();
    document.getElementById('DienteGiroDiv').style.display = "none";
    document.getElementById('DienteDiv').style.display = "none";
    document.getElementById('DienteAusenteDiv').style.display = "none";
    document.getElementById('DienteMovilidadDiv').style.display = "none";
    document.getElementById('DienteEctopicoDiv').style.display = "none";
    document.getElementById('DienteExtruidoDiv').style.display = "none";
    document.getElementById('DienteFracturadoDiv').style.display = "none";
    document.getElementById('DienteIntruidoDiv').style.display = "none";
    document.getElementById('DienteRemanenteDiv').style.display = "none";
    document.getElementById('DienteRestauracionDiv').style.display = "none";
    document.getElementById('DienteCareiesDiv').style.display = "none";
    document.getElementById('DientePulparDiv').style.display = "none";
    document.getElementById('DienteErupcionDiv').style.display = "none";
    document.getElementById('DienteErupcionDiv').style.display = "none";
    document.getElementById('DienteremovibleDiv').style.display = "none";
    document.getElementById('DienteDicromicoDiv').style.display = "none";
    return false;
}
function hidediv() {
    document.getElementById('DienteGiroDiv').style.display = "none";
    document.getElementById('DienteDiv').style.display = "none";
    document.getElementById('DienteAusenteDiv').style.display = "none";
    document.getElementById('DienteMovilidadDiv').style.display = "none";
    document.getElementById('DienteEctopicoDiv').style.display = "none";
    document.getElementById('DienteExtruidoDiv').style.display = "none";
    document.getElementById('DienteFracturadoDiv').style.display = "none";
    document.getElementById('DienteIntruidoDiv').style.display = "none";
    document.getElementById('DienteRemanenteDiv').style.display = "none";
    document.getElementById('DienteRestauracionDiv').style.display = "none";
    document.getElementById('DienteCareiesDiv').style.display = "none";
    document.getElementById('DientePulparDiv').style.display = "none";
    document.getElementById('DienteErupcionDiv').style.display = "none";
    document.getElementById('DienteErupcionDiv').style.display = "none";
    document.getElementById('DienteremovibleDiv').style.display = "none";
    document.getElementById('DienteDicromicoDiv').style.display = "none";
    return false;
}
function showMyControls(item) {
    document.getElementById('DienteGiroDiv').style.display = "none";
    document.getElementById('DienteDiv').style.display = "none";
    document.getElementById('DienteAusenteDiv').style.display = "none";
    document.getElementById('DienteMovilidadDiv').style.display = "none";
    document.getElementById('DienteEctopicoDiv').style.display = "none";
    document.getElementById('DienteExtruidoDiv').style.display = "none";
    document.getElementById('DienteFracturadoDiv').style.display = "none";
    document.getElementById('DienteIntruidoDiv').style.display = "none";
    document.getElementById('DienteRemanenteDiv').style.display = "none";
    document.getElementById('DienteRestauracionDiv').style.display = "none";
    document.getElementById('DienteCareiesDiv').style.display = "none";
    document.getElementById('DientePulparDiv').style.display = "none";
    document.getElementById('DienteErupcionDiv').style.display = "none";
    document.getElementById('DienteErupcionDiv').style.display = "none";
    document.getElementById('DienteremovibleDiv').style.display = "none";
    document.getElementById('DienteDicromicoDiv').style.display = "none";
    document.getElementById('DienteExodonciaDiv').style.display = "none";
    document.getElementById("btntopcar").style.background = "";
    document.getElementById("btnleftCar").style.background = "";
    document.getElementById("btncenterCar").style.background = "";
    document.getElementById("btnrigthCar").style.background = "";
    document.getElementById("btnbotCar").style.background = "";
    if (item == "1") {
        document.getElementById('txtDes').value = "RESTAURACIÓN TEMPORAL";
        document.getElementById('DienteDiv').style.display = "block";
    }
    if (item == "2") {
        document.getElementById('txtDes').value = "AUSENTE";
        document.getElementById('DienteAusenteDiv').style.display = "block";
        DienteAusente('R');
    }
    if (item == "3") {
        document.getElementById('txtDes').value = "MOVILIDAD ";
        document.getElementById('DienteMovilidadDiv').style.display = "block";
    }
    if (item == "4") {
        document.getElementById('txtDes').value = "ECTOPICO ";
        document.getElementById('DienteEctopicoDiv').style.display = "block";
        DienteMovilidad('E');
    }
    if (item == "5") {
        document.getElementById('txtDes').value = "EXTRUIDO";
        document.getElementById('DienteExtruidoDiv').style.display = "block";
        DienteExtruido('E');
    }
    if (item == "6") {
        document.getElementById('txtDes').value = "FRACTURADO";
        document.getElementById('DienteFracturadoDiv').style.display = "block";
        DienteFracturado('F');
    }
    if (item == "7") {
        document.getElementById('txtDes').value = "INTRUIDO";
        document.getElementById('DienteIntruidoDiv').style.display = "block";
        DienteIntruido('E');
    }
    if (item == "8") {
        document.getElementById('txtDes').value = "GIROVERSION  ";
        document.getElementById('DienteGiroDiv').style.display = "block";
        DienteGiro('G');
    }
    if (item == "9") {
        document.getElementById('txtDes').value = "REMANENTE RADICULAR ";
        document.getElementById('DienteRemanenteDiv').style.display = "block";
        DienteRemanete('R');
    }
    if (item == "10") {
        document.getElementById('txtDes').value = "RESTAURACIÓN ";
        document.getElementById('DienteRestauracionDiv').style.display = "block";

        document.getElementById("Div_chkAm").style.display = "block";
        document.getElementById("Div_chkMe").style.display = "block";
        document.getElementById("Div_ckkEs").style.display = "block";

        document.getElementById("btntopres").style.visibility = "visible";
        document.getElementById("btnleftres").style.visibility = "visible";
        document.getElementById("btncenterres").style.visibility = "visible";
        document.getElementById("btnrigthres").style.visibility = "visible";
        document.getElementById("btnbotres").style.visibility = "visible";

    }
    if (item == "11") {
        document.getElementById('txtDes').value = "CARIES";
        document.getElementById('DienteCareiesDiv').style.display = "block";
    }
    if (item == "12") {
        document.getElementById('txtDes').value = "TRATAMIENTO PULPAR ";
        document.getElementById('DientePulparDiv').style.display = "block";
        document.getElementById('DivTranfiere').style.display = "block";
    }
    if (item == "13") {
        document.getElementById('txtDes').value = "DIENTE EN ERUPCIÓN";
        document.getElementById('DienteErupcionDiv').style.display = "block";
        DienteErupcion('R');
    }
    if (item == "14") {
        document.getElementById('txtDes').value = "APARATO ORTODONTICO REMOVIBLE";
        document.getElementById('DienteremovibleDiv').style.display = "block";
        DienteRemovible('R');
    }
    if (item == "15") {
        document.getElementById('txtDes').value = "DIENTE DISCROMICO";
        document.getElementById('DienteDicromicoDiv').style.display = "block";
        DienteDiscromico('R');
    }
    if (item == "16") {
        document.getElementById('txtDes').value = "EXODONCIA";
        document.getElementById('DienteExodonciaDiv').style.display = "block";
        DienteAusente('R');
    }
    if (item == "17") {
        document.getElementById('txtDes').value = "PARA EXTRAER";
        document.getElementById('DienteAusenteDiv').style.display = "block";
        DienteAusente('A');
    }
    if (item == "18") {
        document.getElementById('txtDes').value = "RESTAURACIÓN ";
        var IDControl = document.getElementById('hfIDControl').value;
        document.getElementById("btntopres").style.visibility = "hidden";
        document.getElementById("btnleftres").style.visibility = "hidden";
        document.getElementById("btncenterres").style.visibility = "hidden";
        document.getElementById("btnrigthres").style.visibility = "hidden";
        document.getElementById("btnbotres").style.visibility = "hidden";


        document.getElementById("Div_chkAm").style.display = "none";
        document.getElementById("Div_chkMe").style.display = "none";
        document.getElementById("Div_ckkEs").style.display = "none";

        if (document.getElementById(IDControl.replace("Odontograma1", "Odontograma") + "AreaTop").style.borderTopColor == "red") {
            document.getElementById("btntopres").style.visibility = "visible";
        }
        if (document.getElementById(IDControl.replace("Odontograma1", "Odontograma") + "AreaLef").style.borderLeftColor == "red") {
            document.getElementById("btnleftres").style.visibility = "visible";
        }
        if (document.getElementById(IDControl.replace("Odontograma1", "Odontograma") + "Cuadrado").style.backgroundColor == "red") {
            document.getElementById("btncenterres").style.visibility = "visible";
        }
        if (document.getElementById(IDControl.replace("Odontograma1", "Odontograma") + "AreaRig").style.borderRightColor == "red") {
            document.getElementById("btnrigthres").style.visibility = "visible";
        }
        if (document.getElementById(IDControl.replace("Odontograma1", "Odontograma") + "AreaBot").style.borderBottomColor == "red") {
            document.getElementById("btnbotres").style.visibility = "visible";
        }
        document.getElementById('DienteRestauracionDiv').style.display = "block";
    }
    return false;
}
function hidediv1() {
    document.getElementById('DienteDiv').style.display = "none";
    return false;
}
/*+++++++++++++++++++++++++++++++++++++++++++++++++++++*/
function ChangeColorArriba(value) {
    var chkIzquierda = document.getElementById('chkIzquierda');
    var chkDerecha = document.getElementById('chkDerecha');
    var chkArriva = document.getElementById('chkArriva');
    var chkAbajo = document.getElementById('chkAbajo');
    var IDControl = "";
    //var IDControl = document.getElementById('hfIDControl').value;
    if (chkIzquierda.checked == true) {
        document.getElementById(value).style.borderLeftColor = "red";
        document.getElementById(value).style.borderLeftWidth = "5px";
        document.getElementById(IDControl + "ArrivadIzquierda").style.borderColor = "red";
    }
    else {
        document.getElementById(value).style.borderLeftColor = "#FFFFFF";
        document.getElementById(value).style.borderLeftWidth = "0px";
        document.getElementById(IDControl + "ArrivadIzquierda").style.borderColor = "black";
    }
    if (chkDerecha.checked == true) {
        document.getElementById(value).style.borderRightColor = "red";
        document.getElementById(value).style.borderRightWidth = "5px";
        document.getElementById(IDControl + "ArrivadDerecha").style.borderColor = "red";
    }
    else {
        document.getElementById(value).style.borderRightColor = "#FFFFFF";
        document.getElementById(value).style.borderRightWidth = "0px";
        document.getElementById(IDControl + "ArrivadDerecha").style.borderColor = "black";
    }
    if (chkArriva.checked == true) {
        document.getElementById(value).style.borderTopColor = "red";
        document.getElementById(value).style.borderTopWidth = "5px";
        document.getElementById(IDControl + "Arriva").style.borderTopColor = "red";
    }
    else {
        document.getElementById(value).style.borderTopColor = "#FFFFFF";
        document.getElementById(value).style.borderTopWidth = "0px";
        document.getElementById(IDControl + "Arriva").style.borderTopColor = "black";
    }
    if (chkAbajo.checked == true) {
        document.getElementById(value).style.borderBottomColor = "red";
        document.getElementById(value).style.borderBottomWidth = "5px";
        document.getElementById(IDControl + "Cuadrado").style.borderTopColor = "red";
    }
    else {
        document.getElementById(value).style.borderBottomColor = "#FFFFFF";
        document.getElementById(value).style.borderBottomWidth = "0px";
        document.getElementById(IDControl + "Cuadrado").style.borderTopColor = "black";
    }
    //document.getElementById('Button2').style.backgroundColor = "blue";
    return false;
}
function ChangeColorIzquierda(value) {
    var chkIzquierda = document.getElementById('chkIzquierda');
    var chkDerecha = document.getElementById('chkDerecha');
    var chkArriva = document.getElementById('chkArriva');
    var chkAbajo = document.getElementById('chkAbajo');
    var IDControl = "";
    //var IDControl = document.getElementById('hfIDControl').value;
    if (chkIzquierda.checked == true) {
        document.getElementById(value).style.borderLeftColor = "red";
        document.getElementById(value).style.borderLeftWidth = "5px";
        document.getElementById(IDControl + "Izquierda").style.borderColor = "red";
    }
    else {
        document.getElementById(value).style.borderLeftColor = "#FFFFFF";
        document.getElementById(value).style.borderLeftWidth = "0px";
        document.getElementById(IDControl + "Izquierda").style.borderColor = "black";
    }
    if (chkDerecha.checked == true) {
        document.getElementById(value).style.borderRightColor = "red";
        document.getElementById(value).style.borderRightWidth = "5px";
        document.getElementById(IDControl + "Cuadrado").style.borderLeftColor = "red";
    }
    else {
        document.getElementById(value).style.borderRightColor = "#FFFFFF";
        document.getElementById(value).style.borderRightWidth = "0px";
        document.getElementById(IDControl + "Cuadrado").style.borderLeftColor = "black";
    }
    if (chkArriva.checked == true) {
        document.getElementById(value).style.borderTopColor = "red";
        document.getElementById(value).style.borderTopWidth = "5px";
        document.getElementById(IDControl + "ArrivadIzquierda").style.borderColor = "red";
    }
    else {
        document.getElementById(value).style.borderTopColor = "#FFFFFF";
        document.getElementById(value).style.borderTopWidth = "0px";
        document.getElementById(IDControl + "ArrivadIzquierda").style.borderColor = "black";
    }
    if (chkAbajo.checked == true) {
        document.getElementById(value).style.borderBottomColor = "red";
        document.getElementById(value).style.borderBottomWidth = "5px";
        document.getElementById(IDControl + "IzquierdaAbajo").style.borderColor = "red";
    }
    else {
        document.getElementById(value).style.borderBottomColor = "#FFFFFF";
        document.getElementById(value).style.borderBottomWidth = "0px";
        document.getElementById(IDControl + "IzquierdaAbajo").style.borderColor = "black";
    }
    //document.getElementById('Button2').style.backgroundColor = "blue";
    return false;
}
function ChangeColorCentro(value) {
    var chkIzquierda = document.getElementById('chkIzquierda');
    var chkDerecha = document.getElementById('chkDerecha');
    var chkArriva = document.getElementById('chkArriva');
    var chkAbajo = document.getElementById('chkAbajo');
    var IDControl = "";
    //var IDControl = document.getElementById('hfIDControl').value;
    if (chkIzquierda.checked == true) {
        document.getElementById(value).style.borderLeftColor = "red";
        document.getElementById(value).style.borderLeftWidth = "5px";
        document.getElementById(IDControl + "Cuadrado").style.borderLeftColor = "red";
    }
    else {
        document.getElementById(value).style.borderLeftColor = "#FFFFFF";
        document.getElementById(value).style.borderLeftWidth = "0px";
        document.getElementById(IDControl + "Cuadrado").style.borderLeftColor = "black";
    }
    if (chkDerecha.checked == true) {
        document.getElementById(value).style.borderRightColor = "red";
        document.getElementById(value).style.borderRightWidth = "5px";
        document.getElementById(IDControl + "Cuadrado").style.borderRightColor = "red";
    }
    else {
        document.getElementById(value).style.borderRightColor = "#FFFFFF";
        document.getElementById(value).style.borderRightWidth = "0px";
        document.getElementById(IDControl + "Cuadrado").style.borderRightColor = "black";
    }
    if (chkArriva.checked == true) {
        document.getElementById(value).style.borderTopColor = "red";
        document.getElementById(value).style.borderTopWidth = "5px";
        document.getElementById(IDControl + "Cuadrado").style.borderTopColor = "red";
    }
    else {
        document.getElementById(value).style.borderTopColor = "#FFFFFF";
        document.getElementById(value).style.borderTopWidth = "0px";
        document.getElementById(IDControl + "Cuadrado").style.borderTopColor = "black";
    }
    if (chkAbajo.checked == true) {
        document.getElementById(value).style.borderBottomColor = "red";
        document.getElementById(value).style.borderBottomWidth = "5px";
        document.getElementById(IDControl + "Cuadrado").style.borderBottomColor = "red";
    }
    else {
        document.getElementById(value).style.borderBottomColor = "#FFFFFF";
        document.getElementById(value).style.borderBottomWidth = "0px";
        document.getElementById(IDControl + "Cuadrado").style.borderBottomColor = "black";
    }
    return false;
}
function ChangeColorDerecha(value) {
    var chkIzquierda = document.getElementById('chkIzquierda');
    var chkDerecha = document.getElementById('chkDerecha');
    var chkArriva = document.getElementById('chkArriva');
    var chkAbajo = document.getElementById('chkAbajo');
    var IDControl = "";
    //var IDControl = document.getElementById('hfIDControl').value;
    if (chkIzquierda.checked == true) {
        document.getElementById(value).style.borderLeftColor = "red";
        document.getElementById(value).style.borderLeftWidth = "5px";
        document.getElementById(IDControl + "Cuadrado").style.borderRightColor = "red";
    }
    else {
        document.getElementById(value).style.borderLeftColor = "#FFFFFF";
        document.getElementById(value).style.borderLeftWidth = "0px";
        document.getElementById(IDControl + "Cuadrado").style.borderRightColor = "black";
    }
    if (chkDerecha.checked == true) {
        document.getElementById(value).style.borderRightColor = "red";
        document.getElementById(value).style.borderRightWidth = "5px";
        document.getElementById(IDControl + "Derecha").style.borderColor = "red";
    }
    else {
        document.getElementById(value).style.borderRightColor = "#FFFFFF";
        document.getElementById(value).style.borderRightWidth = "0px";
        document.getElementById(IDControl + "Derecha").style.borderColor = "black";
    }
    if (chkArriva.checked == true) {
        document.getElementById(value).style.borderTopColor = "red";
        document.getElementById(value).style.borderTopWidth = "5px";
        document.getElementById(IDControl + "ArrivadDerecha").style.borderColor = "red";
    }
    else {
        document.getElementById(value).style.borderTopColor = "#FFFFFF";
        document.getElementById(value).style.borderTopWidth = "0px";
        document.getElementById(IDControl + "ArrivadDerecha").style.borderColor = "black";
    }
    if (chkAbajo.checked == true) {
        document.getElementById(value).style.borderBottomColor = "red";
        document.getElementById(value).style.borderBottomWidth = "5px";
        document.getElementById(IDControl + "AbajoDerecha").style.borderColor = "red";
    }
    else {
        document.getElementById(value).style.borderBottomColor = "#FFFFFF";
        document.getElementById(value).style.borderBottomWidth = "0px";
        document.getElementById(IDControl + "AbajoDerecha").style.borderColor = "black";
    }
    //document.getElementById('Button2').style.backgroundColor = "blue";
    return false;
}
function ChangeColorAbajo(value) {
    var chkIzquierda = document.getElementById('chkIzquierda');
    var chkDerecha = document.getElementById('chkDerecha');
    var chkArriva = document.getElementById('chkArriva');
    var chkAbajo = document.getElementById('chkAbajo');
    var IDControl = "";
    //var IDControl = document.getElementById('hfIDControl').value;
    if (chkIzquierda.checked == true) {
        document.getElementById(value).style.borderLeftColor = "red";
        document.getElementById(value).style.borderLeftWidth = "5px";
        document.getElementById(IDControl + "IzquierdaAbajo").style.borderColor = "red";
    }
    else {
        document.getElementById(value).style.borderLeftColor = "#FFFFFF";
        document.getElementById(value).style.borderLeftWidth = "0px";
        document.getElementById(IDControl + "IzquierdaAbajo").style.borderColor = "black";
    }
    if (chkDerecha.checked == true) {
        document.getElementById(value).style.borderRightColor = "red";
        document.getElementById(value).style.borderRightWidth = "5px";
        document.getElementById(IDControl + "AbajoDerecha").style.borderColor = "red";
    }
    else {
        document.getElementById(value).style.borderRightColor = "#FFFFFF";
        document.getElementById(value).style.borderRightWidth = "0px";
        document.getElementById(IDControl + "AbajoDerecha").style.borderColor = "black";
    }
    if (chkArriva.checked == true) {
        document.getElementById(value).style.borderTopColor = "red";
        document.getElementById(value).style.borderTopWidth = "5px";
        document.getElementById(IDControl + "Cuadrado").style.borderBottomColor = "red";
    }
    else {
        document.getElementById(value).style.borderTopColor = "#FFFFFF";
        document.getElementById(value).style.borderTopWidth = "0px";
        document.getElementById(IDControl + "Cuadrado").style.borderBottomColor = "black";
    }
    if (chkAbajo.checked == true) {
        document.getElementById(value).style.borderBottomColor = "red";
        document.getElementById(value).style.borderBottomWidth = "5px";
        document.getElementById(IDControl + "Abajo").style.borderColor = "red";
    }
    else {
        document.getElementById(value).style.borderBottomColor = "#FFFFFF";
        document.getElementById(value).style.borderBottomWidth = "0px";
        document.getElementById(IDControl + "Abajo").style.borderColor = "black";
    }
    //document.getElementById('Button2').style.backgroundColor = "blue";
    return false;
}
/*+++++++++++++++++++++++++++++++++++++++++++++++++++++*/
export function ChangeHallazgo(event) {
    clearcanvas("cvhallazgo")
    if (event.target.value=="extraccion"){
        DienteAusente("cvhallazgo", "red");
    }
    else if (event.target.value=="ausente"){
        DienteAusente("cvhallazgo", "blue");
    }
    else if (event.target.value=="fractura"){
        DienteFracturado("cvhallazgo", "red");
    }
    return false;
}
export function clearcanvas(id) {
    var canvas = document.getElementById(id);
    var contexto = canvas.getContext("2d");
	contexto.clearRect(0, 0, canvas.width, canvas.height);
}
export function DienteAusente(id, color) {
    var canvas = document.getElementById(id);
    if (canvas && canvas.getContext) {
    var ctx = canvas.getContext("2d");
        if (ctx) {
            ctx.lineWidth = 5;
            ctx.strokeStyle = color;
            ctx.beginPath();
            ctx.moveTo(20, 150);
            ctx.lineTo(130, 20);
            ctx.moveTo(40, 20);
            ctx.lineTo(140, 150);
            ctx.stroke();
        }
    }
            return false;
    }
function DienteMovilidad(value) {
    if (value == "M1") {

        document.getElementById(document.getElementById('hfnroControl').value).value = "M1";
    }
    if (value == "M2") {

        document.getElementById(document.getElementById('hfnroControl').value).value = "M2";
    }
    if (value == "M3") {

        document.getElementById(document.getElementById('hfnroControl').value).value = "M3";
    }
    if (value == "E") {

        document.getElementById(document.getElementById('hfnroControl').value).value = "E";
    }
    if (value == "L") {
        document.getElementById(document.getElementById('hfnroControl').value).value = "";
    }
    return false;
}
function DienteExtruido(value) {
    var IDControl = document.getElementById('hfIDControl').value;
    var direccion = document.getElementById(IDControl + 'hfDireccion').value;
    if (direccion == "Top") {
        document.getElementById(IDControl + 'flecha').style.display = "block";
    }
    if (direccion == "Bot") {
        document.getElementById(IDControl + 'flecha').style.display = "block";
    }
    if (value == "L") {
        document.getElementById(IDControl + 'flecha').style.display = "none";
    }
    return false;
}

    export function DienteFracturado(id, color) {
        var canvas = document.getElementById(id);
        if (canvas && canvas.getContext) {
        var ctx = canvas.getContext("2d");
            if (ctx) {
                ctx.lineWidth = 5;
                ctx.strokeStyle = color;
                ctx.beginPath();
                ctx.moveTo(40, 20);
                ctx.lineTo(140, 150);
                ctx.stroke();
            }
        }
                return false;
}
function DienteIntruido(value) {
    var IDControl = document.getElementById('hfIDControl').value;
    var direccion = document.getElementById(IDControl + 'hfDireccion').value;
    if (direccion == "Top") {
        document.getElementById(IDControl + 'flecha1').style.display = "block";
    }
    if (direccion == "Bot") {
        document.getElementById(IDControl + 'flecha1').style.display = "block";
    }
    if (value == "L") {
        document.getElementById(IDControl + 'flecha1').style.display = "none";
    }
    return false;
}
function DienteGiro(value) {
    var IDControl = document.getElementById('hfIDControl').value;
    if (value == "G") {
        document.getElementById(IDControl + 'DivGiro').style.display = "block";
    }
    if (value == "L") {
        document.getElementById(IDControl + 'DivGiro').style.display = "none";
    }
    return false;
}
function DienteRemanete(value) {
    var IDControl = document.getElementById('hfIDControl').value;
    if (value == "R") {
        document.getElementById(IDControl + 'DivremaneteR').style.display = "block";
    }
    if (value == "L") {
        document.getElementById(IDControl + 'DivremaneteR').style.display = "none";
    }
    return false;
}
function DienteRestauracion(value) {
    var chkAm = document.getElementById('chkAm');
    var chkRe = document.getElementById('chkRe');
    var chkVi = document.getElementById('chkVi');
    var chkMe = document.getElementById('chkMe');
    var ckkEs = document.getElementById('ckkEs');
    var IDControl = document.getElementById('hfIDControl').value;

    document.getElementById(value).style.background = "cornflowerblue";

    if (value == "btntopres") {
        document.getElementById(IDControl + "AreaTop").style.borderTopColor = "cornflowerblue";
    }
    if (value == "btnleftres") {
        document.getElementById(IDControl + "AreaLef").style.borderLeftColor = "cornflowerblue";
    }
    if (value == "btncenterres") {
        document.getElementById(IDControl + "Cuadrado").style.backgroundColor = "cornflowerblue";
    }
    if (value == "btnrigthres") {
        document.getElementById(IDControl + "AreaRig").style.borderRightColor = "cornflowerblue";
    }
    if (value == "btnbotres") {
        document.getElementById(IDControl + "AreaBot").style.borderBottomColor = "cornflowerblue";
    }

    if (chkAm.checked == true) {
        document.getElementById(document.getElementById('hfnroControl').value).value = "AM";
    }

    if (chkRe.checked == true) {
        document.getElementById(document.getElementById('hfnroControl').value).value = "R";
    }

    if (chkVi.checked == true) {
        document.getElementById(document.getElementById('hfnroControl').value).value = "IV";
    }

    if (chkMe.checked == true) {
        document.getElementById(document.getElementById('hfnroControl').value).value = "IM";
    }

    if (ckkEs.checked == true) {
        document.getElementById(document.getElementById('hfnroControl').value).value = "IE";
    }
    return false;
}
function limpiarRestauracion() {
    document.getElementById('chkAm').checked = false;
    document.getElementById('chkRe').checked = false;
    document.getElementById('chkVi').checked = false;
    document.getElementById('chkMe').checked = false;
    document.getElementById('ckkEs').checked = false;
    var IDControl = document.getElementById('hfIDControl').value;
    document.getElementById("btntopres").style.background = "";
    document.getElementById("btnleftres").style.background = "";
    document.getElementById("btncenterres").style.background = "";
    document.getElementById("btnrigthres").style.background = "";
    document.getElementById("btnbotres").style.background = "";
    document.getElementById(IDControl + "AreaTop").style.borderTopColor = "white";
    document.getElementById(IDControl + "AreaLef").style.borderLeftColor = "white";
    document.getElementById(IDControl + "Cuadrado").style.backgroundColor = "white";
    document.getElementById(IDControl + "AreaRig").style.borderRightColor = "white";
    document.getElementById(IDControl + "AreaBot").style.borderBottomColor = "white";
    document.getElementById(document.getElementById('hfnroControl').value).value = "";
    document.getElementById(document.getElementById('hfnroControl').value).value = "";
    document.getElementById(document.getElementById('hfnroControl').value).value = "";
    document.getElementById(document.getElementById('hfnroControl').value).value = "";
    document.getElementById(document.getElementById('hfnroControl').value).value = "";
    return false;
}

export function DienteCaries(value) {
    var _control = document.getElementById(value);
    var tipoReg= document.getElementById("tipoReg");
    var stle="width: 100%; height:60px;";
    var clor="";
    if (tipoReg.value == "1") {
        clor="background-color: blue;";
    }
    else{
        clor="background-color: red;";
    }
    if (value == "btnleftCar") {
        piezaleftCar.value="1";
    }
    if (value == "btncenterCar") {
        piezacenterCar.value="1";
    }
    if (value == "btnrigthCar") {
        piezarigthCar.value="1";
    }
    if (value == "btntopcar") {
        piezatopcar.value="1";
        stle=stle + "border-radius: 90% 90% 0% 0%;";
    }
    if (value == "btnbotCar") {
        piezabotCar.value="1";
        stle=stle +"border-radius: 0% 0% 90% 90%;";
    }
    _control.style = stle +clor;  
    return false;
}

function grabarDiagnostico() {
    const datosJson = '{' +
        ' "Vestibular":' + $("#btntopcar").val() + ',' +
        ' "Distal"' + $("#btnleftCar").val() + ',' +
        ' "Oclusal"' + $("#btncenterCar").val() + ',' +
        ' "Mesial"' + $("#btnrigthCar").val() + ',' +
        ' "Palatino"' + $("#btnbotCar").val() + '}';
    const Hallazgo = $("#comboHallazgo").val();
    const pieza = $("#comboPieza").val();
    var request =
        {
            iddetalleHC: 0,
            tipoOdontograma: 1,
            diagnóstico: Hallazgo,
            pieza: pieza,
            datosJson: datosJson,
            usuarioCreacion: "usuariocreacion",
            idOdontograma: 1
        };
    $.ajax({
        type: "POST",
        url: "/Odontograma/AddDetalleOdontograma",
        contentType: "application/json; charset=utf-8",
        data: request,
        dataType: "json",
        success: function (d) {
            if (d === true) {
            }
            else {            }
        },
        error: function (d) {}
    });
    return false;
}


export function limpiarCaries() {
    var stle="width: 100%; height:60px;";
    document.getElementById("btntopcar").style =stle + "border-radius: 90% 90% 0% 0%;";
    document.getElementById("btnleftCar").style=stle;
    document.getElementById("btncenterCar").style=stle;
    document.getElementById("btnrigthCar").style=stle;
    document.getElementById("btnbotCar").style=stle + " border-radius: 0% 0% 90% 90%;";
    return false;
}
function DientePulpar(value) {
    document.getElementById(document.getElementById('hfnroControl').value).style.color = "blue";
    document.getElementById(document.getElementById('hfnroControl').value).style.fontSize = "18";
    document.getElementById(document.getElementById('hfnroControl').value).style.fontWeight = "bold";
    document.getElementById(document.getElementById('hfnroControl').value).style.textAlign = "center";

    document.getElementById('DivTranfiere').style.display = "block";
    var IDControl = document.getElementById('hfIDControl').value;
    if (value == "R") {
        document.getElementById(IDControl + 'DivPulpar').style.display = "block";
        SavePulpar();
    }
    if (value == "L") {
        document.getElementById(IDControl + 'DivPulpar').style.display = "none";
        document.getElementById(document.getElementById('hfnroControl').value).value = "";
    }
    if (chkCon.checked == true) {
        document.getElementById(document.getElementById('hfnroControl').value).value = "TC";
    }
    if (chkPul.checked == true) {
        document.getElementById(document.getElementById('hfnroControl').value).value = "PC";
    }
    if (chkPul1.checked == true) {
        document.getElementById(document.getElementById('hfnroControl').value).value = "PP";
    }

    return false;
}
function DienteErupcion(value) {
    var IDControl = document.getElementById('hfIDControl').value;
    if (value == "R") {
        document.getElementById(IDControl + 'DivErupcion').style.display = "block";
    }
    if (value == "L") {
        document.getElementById(IDControl + 'DivErupcion').style.display = "none";
    }

    return false;
}
function DienteRemovible(value) {
    var IDControl = document.getElementById('hfIDControl').value;
    if (value == "R") {
        document.getElementById(IDControl + 'Divremovible').style.display = "block";
    }
    if (value == "L") {
        document.getElementById(IDControl + 'Divremovible').style.display = "none";
    }

    return false;
}
function DienteDiscromico(value) {
    document.getElementById(document.getElementById('hfnroControl').value).style.color = "blue";
    document.getElementById(document.getElementById('hfnroControl').value).style.fontSize = "18";
    document.getElementById(document.getElementById('hfnroControl').value).style.fontWeight = "bold";
    document.getElementById(document.getElementById('hfnroControl').value).style.textAlign = "center";
    if (value == "R") {
        document.getElementById(document.getElementById('hfnroControl').value).value = "DIS";
    }
    if (value == "L") {
        document.getElementById(document.getElementById('hfnroControl').value).value = "";
    }

    return false;
}
