<script setup>
import {onMounted, ref} from 'vue'
import {diagnostico,tratamiento, procesar, limpiar, agregarLista} from '../../store/odontograma'
import {DienteCaries,DienteAusente,ChangeHallazgo,DienteFracturado} from '../../store/OdontoJS'
import {obtenerTodos, registro, leerEnRegistro, eliminar, dialog, guardar, obtenerTodoDiccionario, obtenerTodoPieza,obtenerTodoHallazgo,obtenerTodoCaries} from '../../store/odonto'

import Registro from './Registro.vue'

const listaDiccionario = obtenerTodoDiccionario()
const listaPieza = obtenerTodoPieza()
const listaHallazgo= obtenerTodoHallazgo()
const listaCaries = obtenerTodoCaries()
onMounted (()=>{
        var divNuevo = document.getElementById('divNuevo');
        divNuevo.style.display = 'none';
        var headerVozSmall = document.getElementById('headerVozSmall');
        //headerVozSmall.style.display = 'none';
        var modalOdongramaDuplicado = document.getElementById('modalOdongramaDuplicado');
        //modalOdongramaDuplicado.style.display = 'none';
        document.getElementById("btnEscuchando").hidden = true;//stop
        document.getElementById("btnActivar").hidden = false;

})

</script>

<template>
 <Row>

<div id="headerVoz">
    <Col>
        <div class="col-sm-12 col-md-12 col-lg-12" style="text-align:center;">

             <button type="submit" class="NotpulsingButton" style="visibility:visible;" id="btnActivar" @click="procesar()" >
                <i class="fa fa-microphone" ></i>
                <p style="color: #bb0b7c; font-weight:bold; font-size:20px; font-family:Calibri; position:relative; margin-top:-22px;">
                    QUIRU
                </p>
            </button>
            <button type="submit" class="pulsingButton" style="visibility:hidden;" id="btnEscuchando" @click="procesar()" hidden="hidden">
                <div class="pulse-ring">
                    <svg width="60" height="60" viewBox="40 0 150 300">
                        <polyline stroke-linejoin="round" points="50,150 125,50 200,150" stroke="white" stroke-width="25" fill="none"></polyline>
                        <polyline stroke-linejoin="bevel" points="50,250 125,150 200,250" stroke="white" stroke-width="25" fill="none"></polyline>
                    </svg>
                </div>
                <i class="fa fa-microphone" ></i>
                <p style="color: #bb0b7c; font-weight:bold; font-size:20px; font-family:Calibri; position:absolute; margin-top:-22px;">
                    Escuchando
                </p>
            </button>
        </div>
    </Col>
    <div class="row">
        <div class="col-sm-12 col-md-12 col-lg-12">
            <br />
            <br />
        </div>
    </div>
    <div class="row">
        <div class="col-sm-12 col-md-12 col-lg-12" style="text-align:center;">
            <button type="submit" class="btn" style="background-image: linear-gradient( 135deg, #331575 20%, #bb0b7c);" @click="diagnostico('manual')" id="btnDiagnostico">
                <span style="color:white">Diagnóstico</span>
            </button>
            <button type="submit" class="btn" style="background-image: linear-gradient( 135deg, #331575 20%, #bb0b7c);" @click="tratamiento('manual')">
                <span style="color:white">Tratamiento</span>
            </button>
        </div>
    </div>
    <div class="row">
        <div class="col-sm-12 col-md-12 col-lg-12">
            <br />
            <br />
        </div>
    </div>
</div>
</Row>

<div class="row">
    <div class="col-sm-3 col-md-3 col-lg-3">

    </div>
    <div class="col-sm-6 col-md-6 col-lg-6">
        <div id="divNuevo" style="visibility: hidden;">
            <div class="modal-content">
                <div class="modal-header" style="background-image: linear-gradient( 135deg, #331575 20%, #bb0b7c);">
                    <br />
                    <h5 class="modal-title" id="exampleModalLabel" style="color:white">
                        <span class="card-title" id="tituloTratamiento"></span>
                    </h5>
                    <br />
                </div>
                <div class="modal-body">
                    <input id="tipoReg" type="hidden" value="0"/>
                    <div class="row">
                        <div class="col-6">
                             <div class="col-4"><h4>Hallazgo:</h4></div>
                              <div class="col-8"><select class="form-control" id="comboHallazgo" @change="ChangeHallazgo($event)" >
                                    <option value="caries" selected="selected">Lesión de caries dental</option>
                                    <option value="extraccion">Extracción</option>
                                    <option value="ausente">Ausente</option>
                                    <option value="fractura">Fractura</option>
                                    <option value="fosas">Fosas y fisuras profundas</option>
                                  </select></div>
                        </div>
                        <div class="col-6">
                             <div class="col-4"><h4>Pieza:</h4></div>
                               <div class="col-8"> <select class="form-control" id="comboPieza">
                                    <option selected>":::Seleccione Pieza:::</option>
                                    <option value="1.1" selected>1.1</option>
                                    <option value="1.2">1.2</option>
                                    <option value="1.3">1.3</option>
                                    <option value="1.4">1.4</option>
                                    <option value="1.5">1.5</option>
                                    <option value="1.6">1.6</option>
                                    <option value="1.7">1.7</option>
                                    <option value="1.8">1.8</option>
                                    <option value="2.1">2.1</option>
                                    <option value="2.2">2.2</option>
                                    <option value="2.3">2.3</option>
                                    <option value="2.4">2.4</option>
                                    <option value="2.5">2.5</option>
                                    <option value="2.6">2.6</option>
                                    <option value="2.7">2.7</option>
                                    <option value="2.8">2.8</option>
                                    <option value="3.1">3.1</option>
                                    <option value="3.2">3.2</option>
                                    <option value="3.3">3.3</option>
                                    <option value="3.4">3.4</option>
                                    <option value="3.5">3.5</option>
                                    <option value="3.6">3.6</option>
                                    <option value="3.7">3.7</option>
                                    <option value="3.8">3.8</option>
                                    <option value="4.1">4.1</option>
                                    <option value="4.2">4.2</option>
                                    <option value="4.3">4.3</option>
                                    <option value="4.4">4.4</option>
                                    <option value="4.5">4.5</option>
                                    <option value="4.6">4.6</option>
                                    <option value="4.7">4.7</option>
                                    <option value="4.8">4.8</option>
                                    <option value="5.1">5.1</option>
                                    <option value="5.2">5.2</option>
                                    <option value="5.3">5.3</option>
                                    <option value="5.4">5.4</option>
                                    <option value="5.5">5.5</option>
                                    <option value="6.1">6.1</option>
                                    <option value="6.2">6.2</option>
                                    <option value="6.3">6.3</option>
                                    <option value="6.4">6.4</option>
                                    <option value="6.5">6.5</option>
                                    <option value="7.1">7.1</option>
                                    <option value="7.2">7.2</option>
                                    <option value="7.3">7.3</option>
                                    <option value="7.4">7.4</option>
                                    <option value="7.5">7.5</option>
                                    <option value="8.1">8.1</option>
                                    <option value="8.2">8.2</option>
                                    <option value="8.3">8.3</option>
                                    <option value="8.4">8.4</option>
                                    <option value="8.5">8.5</option>
                                </select></div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-3">

                        </div>
                        <div class="col-3" style="text-align:center">
                           <table border="0" style="width: 100%; border: 0px; border-collapse: collapse; border-spacing: 0px; border-style: none;">
                            <tr>
                            <td colspan="6" style="border: 0px; width: 240px;">
                            <input id="piezatopcar" type="hidden" value="0"/>
                            <button class="btn btn-primary start" ID="btntopcar" value="0" Style="width: 100%; height: 60px; border-radius: 90% 90% 0% 0%; "
                            @click="DienteCaries('btntopcar')">
                            Vestibular
                            </button>
                            </td>
                            </tr>
                            <tr>
                            <td colspan="2" style="border: 0px; width: 80px;">
                            <input id="piezaleftCar" type="hidden" value="0"/>
                            <button class="btn btn-primary start" ID="btnleftCar" value="0" Style="width: 100%; height:60px;" @click="DienteCaries('btnleftCar')">Distal</button>
                            </td>
                            <td colspan="2" style="border: 0px; width: 80px;">
                            <input id="piezacenterCar" type="hidden" value="0"/>
                             <canvas id="cvhallazgo" width="150" height="200" style="position: absolute;margin-top: -50px;    margin-left: -40px;">Su navegador no soporta canvas :( </canvas>
                            <button class="btn btn-primary start" ID="btncenterCar" value="0" Style="width: 100%; height:60px;" @click="DienteCaries('btncenterCar')">Oclusal</button>
                            </td>
                            <td colspan="2" style="border: 0px; width: 80px;">
                            <input id="piezarigthCar" type="hidden" value="0"/>
                            <button class="btn btn-primary start" ID="btnrigthCar" value="0" Style="width: 100%; height:60px;" @click="DienteCaries('btnrigthCar')">Mesial</button>
                            </td>
                            </tr>
                            <tr>
                            <td colspan="6" style="border: 0px; width: 240px;">
                            <input id="piezabotCar" type="hidden" value="0"/>
                            <button class="btn btn-primary start" ID="btnbotCar" value="0" Style="width: 100%; height: 60px; border-radius: 0% 0% 90% 90%;" @click="DienteCaries('btnbotCar')">Palatino</button>
                            </td>
                            </tr>
                            </table>
                        </div>
                    </div>
                      <Row>
                        <Col>
                            <button type="submit" class="btn" @click="agregarLista('manual')">
                                <span style="color:white">Agregar a la lista</span>
                            </button>
                        </Col>
                    </Row>
                    <div class="row">
                        <div class="col-12">
                            <Registro />
                        </div>
                    </div>
                </div>
                <div class="modal-footer">

                </div>
            </div>
        </div>
    </div>
    <div class="col-sm-3 col-md-3 col-lg-3">

    </div>
</div>



</template>

<style>
    .botonMicrofono {
        border: none;
        background: transparent
    }

    .imagenMicrofonoActivar {
        height: 37px;
        width: 16px;
    }

    .imagenMicrofonoEscuchar {
        height: 37px;
        width: 31px;
        margin: auto
    }

    .dataTables_wrapper .dataTables_filter {
        float: right;
        text-align: right;
        visibility: hidden;
    }


.NotpulsingButton {
    border: none;
    padding: 0;
    border-radius: 100%;
    width: 70px;
    height: 70px;
    font-size: 3em;
    color: #fff;
    padding: 0;
    margin: 0;
    background: rgb(139, 199, 252);
    position: relative;
    z-index: 999;
    display: inline-block;
    line-height: 100px;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    background-image: none;
}
.pulsingButton {
    border: none;
    padding: 0;
    border-radius: 100%;
    width: 70px;
    height: 70px;
    font-size: 3em;
    color: #fff;
    padding: 0;
    margin: 0;
    background: red;
    position: relative;
    z-index: 999;
    display: inline-block;
    line-height: 100px;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    background-image: none;
}

.pulse-ring {
    content: '';
    width: 70px;
    height: 70px;
    background: #189BFF;
    border: 5px solid #189BFF;
    border-radius: 50%;
    position: absolute;
    top: 0px;
    left: 0px;
    animation: pulsate infinite 1.5s;
}

@-webkit-keyframes pulsate {
    0% {
        -webkit-transform: scale(1, 1);
        opacity: 1;
    }

    100% {
        -webkit-transform: scale(1.3, 1.3);
        opacity: 0;
    }
}

.modal-header {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: start;
  align-items: flex-start;
  -ms-flex-pack: justify;
  justify-content: space-between;
  padding: 1rem 1rem;
  border-bottom: 1px solid #dee2e6;
  border-top-left-radius: 0.3rem;
  border-top-right-radius: 0.3rem;
}

.modal-header .close {
  padding: 1rem 1rem;
  margin: -1rem -1rem -1rem auto;
}

.modal-title {
  margin-bottom: 0;
  line-height: 1.5;
}

.modal-body {
  position: relative;
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;
  padding: 1rem;
}

.modal-footer {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  -ms-flex-pack: end;
  justify-content: flex-end;
  padding: 1rem;
  border-top: 1px solid #dee2e6;
  border-bottom-right-radius: 0.3rem;
  border-bottom-left-radius: 0.3rem;
}

</style>