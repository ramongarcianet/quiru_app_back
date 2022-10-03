import { listaDeHallazgos, listaDeDientesCombo } from '../config/Parametros';
export function VerFormato(registro) {
    var canvas = document.getElementById('myCanvas');
    var contexto = canvas.getContext("2d");
    contexto.clearRect(0, 0, canvas.width, canvas.height);
    var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');
    var colo_cab = '#bfbfbf';
    context.font = '8pt Calibri';
    context.textAlign = 'center';
    context.fillStyle = 'blue';
    var medida = 21;
    var iniciar_x = 0;
    var inicio_y = 0;
    var x = 0;
    iniciar_x = 2;
    var arr = ['18', '17', '16', '15', '14', '13', '12', '11', '21', '22', '23', '24', '25', '26', '27', '28'];
    arr.forEach(function (entry) {
        inicio_y = 75;
        context.fillText(entry, iniciar_x + 10, 45);
        dibuja_contorno(context, iniciar_x, inicio_y, medida, entry, registro);
        dibuja_ControlTop(context, iniciar_x - 12, inicio_y - 75, medida, registro, entry);
        if (entry == "18" || entry == "17" || entry == "16" || entry == "28" || entry == "27" || entry == "26") {
            dibuja_raiz(context, iniciar_x, medida, inicio_y, colo_cab, "top_tri");
        }
        else if (entry == "13" || entry == "12" || entry == "11" || entry == "21" || entry == "22" || entry == "23") {
            dibuja_raiz(context, iniciar_x, medida, inicio_y, colo_cab, "top");
        }
        else if (entry == "15" || entry == "25") {
            dibuja_raiz(context, iniciar_x, medida, inicio_y, colo_cab, "top_one");
        }
        else if (entry == "14" || entry == "24") {
            dibuja_raiz(context, iniciar_x, medida, inicio_y, colo_cab, "top_duo");
        }
        context.fillStyle = 'blue';
        //SetFinding(context, iniciar_x, inicio_y, medida, entry, registro);
        iniciar_x = iniciar_x + 24;
    }, this);
    iniciar_x = 2;
    arr = ['1', '1', '1', '55', '54', '53', '52', '51', '61', '62', '63', '64', '65', '1', '1', '1'];
    arr.forEach(function (entry) {
        if (entry != "1") {
            inicio_y = 180;
            context.fillText(entry, iniciar_x + 10, 150);
            dibuja_contorno(context, iniciar_x, inicio_y, medida, entry, registro);
            if (entry == "55" || entry == "54" || entry == "28" || entry == "64" || entry == "65") {
                dibuja_raiz(context, iniciar_x, medida, inicio_y, colo_cab, "top_tri");
            }
            else {

                dibuja_raiz(context, iniciar_x, medida, inicio_y, colo_cab, "top");
            }
            dibuja_ControlTop(context, iniciar_x - 12, inicio_y - 75, medida, registro, entry);
            context.fillStyle = 'blue';
            //SetFinding(context, iniciar_x, inicio_y, medida, entry, registro);
        }
        iniciar_x = iniciar_x + 24;
    }, this);
    iniciar_x = 2;
    arr = ['1', '1', '1', '85', '84', '83', '82', '81', '71', '72', '73', '74', '75', '1', '1', '1'];
    arr.forEach(function (entry) {
        if (entry != "1") {
            inicio_y = 213;
            context.fillText(entry, iniciar_x + 10, 270);
            dibuja_contorno(context, iniciar_x, inicio_y, medida, entry, registro);

            if (entry == "85" || entry == "84" || entry == "74" || entry == "75") {
                dibuja_raiz(context, iniciar_x, medida, inicio_y + 47, colo_cab, "bot_duo");
            }
            else {

                dibuja_raiz(context, iniciar_x, medida, inicio_y + 47, colo_cab, "bot");
            }
            dibuja_ControlBot(context, iniciar_x - 12, inicio_y + 50, medida, registro, entry);
            context.fillStyle = 'blue';
            //SetFinding(context, iniciar_x, inicio_y, medida, entry, registro);
        }
        iniciar_x = iniciar_x + 24;
    }, this);
    iniciar_x = 2;
    arr = ['48', '47', '46', '45', '44', '43', '42', '41', '31', '32', '33', '34', '35', '36', '37', '38'];
    arr.forEach(function (entry) {
        if (entry != "1") {
            inicio_y = 315;
            context.fillText(entry, iniciar_x + 10, 372);
            dibuja_contorno(context, iniciar_x, inicio_y, medida, entry, registro);
            if (entry == "48" || entry == "47" || entry == "46" || entry == "36" || entry == "37" || entry == "38") {
                dibuja_raiz(context, iniciar_x, medida, inicio_y + 47, colo_cab, "bot_duo");
            }
            else if (entry == "41" || entry == "42" || entry == "43" || entry == "31" || entry == "32" || entry == "33") {

                dibuja_raiz(context, iniciar_x, medida, inicio_y + 47, colo_cab, "bot");
            }
            else if (entry == "44" || entry == "45" || entry == "34" || entry == "35") {

                dibuja_raiz(context, iniciar_x, medida, inicio_y + 47, colo_cab, "bot_one");
            }
            dibuja_ControlBot(context, iniciar_x - 12, inicio_y + 50, medida, registro, entry);
            context.fillStyle = 'blue';
            //SetFinding(context, iniciar_x, inicio_y, medida, entry, registro);
        }
        iniciar_x = iniciar_x + 24;
    }, this);
    CallFindinf(context, registro)
}

export function CallFindinf(context, registro) {
    context.font = '8pt Calibri';
    context.textAlign = 'center';
    context.fillStyle = 'blue';
    var medida = 21;
    var iniciar_x = 0;
    var inicio_y = 0;
    var x = 0;
    iniciar_x = 2;
    var arr = ['18', '17', '16', '15', '14', '13', '12', '11', '21', '22', '23', '24', '25', '26', '27', '28'];
    arr.forEach(function (entry) {
        inicio_y = 75;
        SetFinding(context, iniciar_x, inicio_y, medida, entry, registro);
        iniciar_x = iniciar_x + 24;
    }, this);
    iniciar_x = 2;
    arr = ['1', '1', '1', '55', '54', '53', '52', '51', '61', '62', '63', '64', '65', '1', '1', '1'];
    arr.forEach(function (entry) {
        if (entry != "1") {
            inicio_y = 180;
            SetFinding(context, iniciar_x, inicio_y, medida, entry, registro);
        }
        iniciar_x = iniciar_x + 24;
    }, this);
    iniciar_x = 2;
    arr = ['1', '1', '1', '85', '84', '83', '82', '81', '71', '72', '73', '74', '75', '1', '1', '1'];
    arr.forEach(function (entry) {
        if (entry != "1") {
            inicio_y = 213;
            SetFinding(context, iniciar_x, inicio_y, medida, entry, registro);
        }
        iniciar_x = iniciar_x + 24;
    }, this);
    iniciar_x = 2;
    arr = ['48', '47', '46', '45', '44', '43', '42', '41', '31', '32', '33', '34', '35', '36', '37', '38'];
    arr.forEach(function (entry) {
        if (entry != "1") {
            inicio_y = 315;
            SetFinding(context, iniciar_x, inicio_y, medida, entry, registro);
        }
        iniciar_x = iniciar_x + 24;
    }, this);
}
function dibuja_contorno(context, inicio_x, inicio_y, med, pieza, registro) {
    var ctx = context;
    var cua = med / 4;
    var ter = cua * 3;
    var color_line = 'black';
    if (ctx) {
        ctx.strokeStyle = color_line;
        ctx.beginPath();
        ctx.moveTo(inicio_x, inicio_y);
        ctx.lineTo(med + inicio_x, inicio_y);
        ctx.lineTo(ter + inicio_x, cua + inicio_y);
        ctx.lineTo(cua + inicio_x, cua + inicio_y);
        ctx.closePath();
        ctx.stroke();
    }
    if (ctx) {
        ctx.strokeStyle = color_line;
        ctx.beginPath();
        ctx.moveTo(ter + inicio_x, cua + inicio_y);
        ctx.lineTo(med + inicio_x, inicio_y);
        ctx.lineTo(med + inicio_x, med + inicio_y);
        ctx.lineTo(ter + inicio_x, ter + inicio_y);
        ctx.closePath();
        ctx.stroke();
    }
    if (ctx) {
        ctx.strokeStyle = color_line;
        ctx.beginPath();
        ctx.moveTo(cua + inicio_x, ter + inicio_y);
        ctx.lineTo(ter + inicio_x, ter + inicio_y);
        ctx.lineTo(med + inicio_x, med + inicio_y);
        ctx.lineTo(inicio_x, med + inicio_y);
        ctx.closePath();
        ctx.stroke();
    }
    if (ctx) {
        ctx.strokeStyle = color_line;
        ctx.beginPath();
        ctx.moveTo(inicio_x, inicio_y);
        ctx.lineTo(cua + inicio_x, cua + inicio_y);
        ctx.lineTo(cua + inicio_x, ter + inicio_y);
        ctx.lineTo(inicio_x, med + inicio_y);
        ctx.closePath();
        ctx.stroke();
    }
    dibuja_seccion(ctx, pieza, 1, "#37DFBB", med, inicio_x, inicio_y)
    dibuja_seccion(ctx, pieza, 2, "#37DFBB", med, inicio_x, inicio_y)
    dibuja_seccion(ctx, pieza, 3, "#37DFBB", med, inicio_x, inicio_y)
    dibuja_seccion(ctx, pieza, 4, "#37DFBB", med, inicio_x, inicio_y)
    dibuja_seccion(ctx, pieza, 5, "#37DFBB", med, inicio_x, inicio_y)
}
function dibuja_raiz(contexto, inicio_x, medida, inicio_y, color, tipo) {
    var ctx = contexto;
    var med = medida;
    ctx.beginPath();
    ctx.strokeStyle = color;
    if (tipo == "bot") {
        ctx.moveTo(inicio_x + 1, inicio_y - 25);
        ctx.lineTo(inicio_x + 10, inicio_y - 5);
        ctx.moveTo(inicio_x + 20, inicio_y - 25);
        ctx.lineTo(inicio_x + 10, inicio_y - 5);
    }
    else if (tipo == "top") {
        ctx.moveTo(inicio_x + 10, inicio_y - 22);
        ctx.lineTo(inicio_x + 20, inicio_y);
        ctx.moveTo(inicio_x + 10, inicio_y - 22);
        ctx.lineTo(inicio_x, inicio_y);
    }
    else if (tipo == "top_one") {
        ctx.moveTo(inicio_x + 10, inicio_y - 22);
        ctx.lineTo(inicio_x + 17, inicio_y);
        ctx.moveTo(inicio_x + 10, inicio_y - 22);
        ctx.lineTo(inicio_x + 5, inicio_y);
    }
    else if (tipo == "top_duo") {
        ctx.moveTo(inicio_x + 13, inicio_y - 22);
        ctx.lineTo(inicio_x + 20, inicio_y);
        ctx.moveTo(inicio_x + 13, inicio_y - 22);
        ctx.lineTo(inicio_x + 9, inicio_y);
        ctx.moveTo(inicio_x + 5, inicio_y - 22);
        ctx.lineTo(inicio_x + 10, inicio_y);
        ctx.moveTo(inicio_x + 5, inicio_y - 22);
        ctx.lineTo(inicio_x, inicio_y);


    }
    else if (tipo == "top_tri") {
        ctx.moveTo(inicio_x + 5, inicio_y - 22);
        ctx.lineTo(inicio_x + 10, inicio_y);
        ctx.moveTo(inicio_x + 5, inicio_y - 22);
        ctx.lineTo(inicio_x, inicio_y);

        ctx.moveTo(inicio_x + 17, inicio_y - 22);
        ctx.lineTo(inicio_x + 21, inicio_y);
        ctx.moveTo(inicio_x + 17, inicio_y - 22);
        ctx.lineTo(inicio_x + 10, inicio_y);

        ctx.moveTo(inicio_x + 10, inicio_y - 22);
        ctx.lineTo(inicio_x + 15, inicio_y - 10);
        ctx.moveTo(inicio_x + 10, inicio_y - 22);
        ctx.lineTo(inicio_x + 7, inicio_y - 10);
    }
    else if (tipo == "bot_duo") {
        ctx.moveTo(inicio_x, inicio_y - 25);
        ctx.lineTo(inicio_x + 5, inicio_y - 5);
        ctx.moveTo(inicio_x + 11, inicio_y - 25);
        ctx.lineTo(inicio_x + 15, inicio_y - 5);

        ctx.moveTo(inicio_x + 11, inicio_y - 25);
        ctx.lineTo(inicio_x + 5, inicio_y - 5);
        ctx.moveTo(inicio_x + 21, inicio_y - 25);
        ctx.lineTo(inicio_x + 15, inicio_y - 5);
    }
    else if (tipo == "bot_one") {
        ctx.moveTo(inicio_x + 5, inicio_y - 25);
        ctx.lineTo(inicio_x + 11, inicio_y - 5);
        ctx.moveTo(inicio_x + 17, inicio_y - 25);
        ctx.lineTo(inicio_x + 11, inicio_y - 5);
    }
    ctx.stroke();
    ctx.lineWidth = 1;
}
function dibuja_seccion(contexto, num_diente, seccion, color_pas, medida, inicio_x, inicio_y) {
    var ctx = contexto;
    var med = medida;
    var cua = med / 4;
    var ter = cua * 3;
    var color_line = color_pas;
    var color_line2 = 'white';
    if (seccion == 1) {
        if (ctx) {
            ctx.fillStyle = color_line;
            ctx.beginPath();
            ctx.moveTo(inicio_x, inicio_y);
            ctx.lineTo(med + inicio_x, inicio_y);
            ctx.lineTo(ter + inicio_x, cua + inicio_y);
            ctx.lineTo(cua + inicio_x, cua + inicio_y);
            ctx.closePath();
            ctx.fill();
            ctx.strokeStyle = color_line2;
            ctx.stroke();
        }
    }
    /* 2da zona */
    if (seccion == 2) {
        if (ctx) {
            ctx.fillStyle = color_line;
            ctx.beginPath();
            ctx.moveTo(ter + inicio_x, cua + inicio_y);
            ctx.lineTo(med + inicio_x, inicio_y);
            ctx.lineTo(med + inicio_x, med + inicio_y);
            ctx.lineTo(ter + inicio_x, ter + inicio_y);
            ctx.closePath();
            ctx.fill();
            ctx.strokeStyle = color_line2;
            ctx.stroke();
        }
    }
    /* 3ra zona */
    if (seccion == 3) {
        if (ctx) {
            ctx.fillStyle = color_line;
            ctx.beginPath();
            ctx.moveTo(cua + inicio_x, ter + inicio_y);
            ctx.lineTo(ter + inicio_x, ter + inicio_y);
            ctx.lineTo(med + inicio_x, med + inicio_y);
            ctx.lineTo(inicio_x, med + inicio_y);
            ctx.closePath();
            ctx.fill();
            ctx.strokeStyle = color_line2;
            ctx.stroke();
        }
    }
    /* 4ta zona */
    if (seccion == 4) {
        if (ctx) {
            ctx.fillStyle = color_line;
            ctx.beginPath();
            ctx.moveTo(inicio_x, inicio_y);
            ctx.lineTo(cua + inicio_x, cua + inicio_y);
            ctx.lineTo(cua + inicio_x, ter + inicio_y);
            ctx.lineTo(inicio_x, med + inicio_y);
            ctx.closePath();
            ctx.fill();
            ctx.strokeStyle = color_line2;
            ctx.stroke();
        }
    }
    /* 5ta zona(medio) */
    if (seccion == 5) {
        if (ctx) {
            ctx.fillStyle = color_line;
            ctx.beginPath();
            ctx.moveTo(cua + inicio_x, cua + inicio_y);
            ctx.lineTo(ter + inicio_x, cua + inicio_y);
            ctx.lineTo(ter + inicio_x, ter + inicio_y);
            ctx.lineTo(cua + inicio_x, ter + inicio_y);
            ctx.closePath();
            ctx.fill();
            ctx.strokeStyle = color_line2;
            ctx.stroke();
        }
    }
}
function dibuja_ControlTop(ctx, inicio_x, inicio_y, med, registro, pieza) {
    var cua = med / 2;
    var ter = cua * 3;
    ctx.fillStyle = 'transparent';
    ctx.beginPath();
    ctx.moveTo(cua + inicio_x, cua + inicio_y);
    ctx.lineTo(ter + inicio_x, cua + inicio_y);
    ctx.lineTo(ter + inicio_x, ter + inicio_y);
    ctx.lineTo(cua + inicio_x, ter + inicio_y);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#bfbfbf';
    ctx.stroke();
}
function dibuja_ControlBot(ctx, inicio_x, inicio_y, med, registro, pieza) {
    var cua = med / 2;
    var ter = cua * 3;
    ctx.fillStyle = 'transparent';
    ctx.beginPath();
    ctx.moveTo(cua + inicio_x, cua + inicio_y);
    ctx.lineTo(ter + inicio_x, cua + inicio_y);
    ctx.lineTo(ter + inicio_x, ter + inicio_y);
    ctx.lineTo(cua + inicio_x, ter + inicio_y);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#bfbfbf';
    ctx.stroke();
}
function SetFinding(context, iniciar_x, inicio_y, medida, diente, registro) {
    if (registro != undefined) {
        const _dienteSelect = listaDeDientesCombo.filter((elem) => elem.value == diente);
        const Hallazgos = registro.filter((elem) => elem.diente == diente);
        if (Hallazgos.length > 0) {
            Hallazgos.forEach(hzgo => {
                var seccion = 0;
                switch (hzgo?.posicion) {
                    case "arriba":
                        seccion = 1;
                        break;
                    case "izquierda":
                        seccion = 4;
                        break;
                    case "centro":
                        seccion = 5;
                        break;
                    case "derecha":
                        seccion = 2;
                        break;
                    case "abajo":
                        seccion = 3;
                        break;
                    default:
                        seccion = 0;
                        break;
                }
                const hzgoMatriz = listaDeHallazgos.filter((elem) => elem.value == hzgo?.hallazgo);
                if (hzgoMatriz.length > 0) {
                    if (hzgoMatriz[0]?.esDirecto == "NO") {
                        dibuja_seccion(context, diente, seccion, hzgoMatriz[0]?.Color, medida, iniciar_x, inicio_y)
                    }
                    else {
                        var simb = (hzgoMatriz[0]?.SimboloAlterno != "") ? hzgoMatriz[0]?.SimboloAlterno : hzgoMatriz[0]?.Simbolo;
                        let dienteAlterno = listaDeDientesCombo.filter((elem) => elem.value == hzgo?.dienteAlterno);
                        let _ancho = hzgoMatriz[0]?.ancho;
                        if (hzgoMatriz[0]?.Replicable_Intermedio == "NO") {
                            if (dienteAlterno.length > 0) {
                                _ancho = (dienteAlterno[0]?.indice - _dienteSelect[0]?.indice + 2) * _ancho;
                            }
                            if (_dienteSelect[0]?.grupo == "G1" || _dienteSelect[0]?.grupo == "G2") {

                                FindingGraphic(context, iniciar_x + hzgoMatriz[0]?.masX, inicio_y + hzgoMatriz[0]?.masY, _ancho, hzgoMatriz[0]?.alto, simb, hzgoMatriz[0]?.sigla, medida)
                            }
                            if (_dienteSelect[0]?.grupo == "G3" || _dienteSelect[0]?.grupo == "G4") {
                                FindingGraphic(context, iniciar_x + hzgoMatriz[0]?.masX, inicio_y - hzgoMatriz[0]?.masY - hzgoMatriz[0]?.PosicionAlt, _ancho, hzgoMatriz[0]?.alto, simb, hzgoMatriz[0]?.sigla, medida)
                            }
                        }
                        else {
                            if (hzgoMatriz[0]?.Replicable_Intermedio == "RE") {
                                if (_dienteSelect[0]?.grupo == "G1" || _dienteSelect[0]?.grupo == "G2") {

                                    FindingGraphic(context, iniciar_x + hzgoMatriz[0]?.masX, inicio_y + hzgoMatriz[0]?.masY, _ancho, hzgoMatriz[0]?.alto, simb, hzgoMatriz[0]?.sigla, medida)
                                }
                                if (_dienteSelect[0]?.grupo == "G3" || _dienteSelect[0]?.grupo == "G4") {
                                    FindingGraphic(context, iniciar_x + hzgoMatriz[0]?.masX, inicio_y - hzgoMatriz[0]?.masY - hzgoMatriz[0]?.PosicionAlt, _ancho, hzgoMatriz[0]?.alto, simb, hzgoMatriz[0]?.sigla, medida)
                                }
                                /* let dientesReplicables = listaDeDientesCombo.filter((elem) => elem.grupo == _dienteSelect[0]?.grupo && elem.indice >= _dienteSelect[0]?.indice && elem.indice <= dienteAlterno[0]?.indice);
                                let _enx = 0;
                                let _eny = 0;
                                dientesReplicables.forEach(element => {
                                    _enx = iniciar_x + hzgoMatriz[0]?.masX + _enx;
                                    _eny = inicio_y + hzgoMatriz[0]?.masY + _eny;
                                    if (_dienteSelect[0]?.grupo == "G1" || _dienteSelect[0]?.grupo == "G2") {
                                        console.log(_enx)
                                        FindingGraphic(context, _enx, _eny, _ancho, hzgoMatriz[0]?.alto, simb, hzgoMatriz[0]?.sigla, medida)
                                    }
                                    if (_dienteSelect[0]?.grupo == "G3" || _dienteSelect[0]?.grupo == "G4") {
                                        FindingGraphic(context, _enx, _eny - hzgoMatriz[0]?.PosicionAlt, _ancho, hzgoMatriz[0]?.alto, simb, hzgoMatriz[0]?.sigla, medida)
                                    }
                                });*/
                            }
                        }
                    }
                    if (_dienteSelect[0]?.grupo == "G1" || _dienteSelect[0]?.grupo == "G2") {
                        FindingText(context, iniciar_x - 12, inicio_y - 71, hzgoMatriz[0]?.sigla, medida, hzgoMatriz[0]?.Color)
                    }
                    if (_dienteSelect[0]?.grupo == "G3" || _dienteSelect[0]?.grupo == "G4") {
                        FindingText(context, iniciar_x - 12, inicio_y + 55, hzgoMatriz[0]?.sigla, medida, hzgoMatriz[0]?.Color)
                    }
                }
            });
        }
    }
}
function FindingGraphic(contexto, inicio_x, inicio_y, ancho, alto, Simbolo, sigla, med) {
    var ctx = contexto;
    var cua = med / 2;
    ctx.beginPath();
    ctx.lineWidth = 2;
    var img = new Image();
    img.src = "../../../src/assets/imagenes/" + Simbolo + ".png";
    img.onload = function () {
        ctx.drawImage(img, inicio_x, inicio_y, ancho, alto);
    }
    ctx.stroke();
    ctx.lineWidth = 1;
}
function FindingText(contexto, inicio_x, inicio_y, sigla, med, color) {
    var ctx = contexto;
    var cua = med / 2;
    ctx.fillStyle = color;
    ctx.fillText(sigla, cua * 2 + inicio_x, cua * 2 + inicio_y);
    ctx.beginPath();
    ctx.stroke();
    ctx.lineWidth = 1;
    ctx.fillStyle = 'blue';
}
export function clearcanvas(id) {
    var canvas = document.getElementById(id);
    var contexto = canvas.getContext("2d");
    contexto.clearRect(0, 0, canvas.width, canvas.height);
    document.getElementById("comboHallazgo").value = ""
    document.getElementById("comboPieza").value = ""
    var alerta = document.getElementById("VistaDiente");
    alerta.style.display = "block"
}
export function limpiarCaries() {
    var stle = "width: 100%; height:60px;";
    document.getElementById("btntopcar").style = stle + "border-radius: 90% 90% 0% 0%;";
    document.getElementById("btnleftCar").style = stle;
    document.getElementById("btncenterCar").style = stle;
    document.getElementById("btnrigthCar").style = stle;
    document.getElementById("btnbotCar").style = stle + " border-radius: 0% 0% 90% 90%;";
    piezaleftCar.value = "0";
    piezacenterCar.value = "0";
    piezarigthCar.value = "0";
    piezatopcar.value = "0";
    piezabotCar.value = "0";
    return false;
}