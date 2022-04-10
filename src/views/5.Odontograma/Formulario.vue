
<script setup>

import {ref} from 'vue'
import {item, guardar, actualizar}  from '../../store/usuario'
import {diagnostico,tratamiento, procesar} from '../../store/odontograma'
/*
const guardarOActualizar = () => {
    if (item.value.id) actualizar(item.value).then(()=>item.value = {})
    else guardar( item.value).then(()=>item.value = {})
}
*/
</script>

<template>

<div id="headerVoz">
    <div class="row">
        <div class="col-sm-12 col-md-12 col-lg-12" style="text-align:center;">
            <button type="submit" class="pulsingButton m-left type2" id="btnActivar" @click="procesar()">
                <i class="fa fa-microphone" style="font-size: 150px;" aria-hidden="true">
                </i>
                <p style="color: #bb0b7c; font-weight:bold; font-size:40px; font-family:Calibri; position:absolute; margin-top:-22px;">
                    Oye quiru
                </p>
            </button>
            <button type="submit" class="pulsingButton" id="btnEscuchando" @click="procesar()" hidden="hidden">
                <div class="pulse-ring">
                    <svg width="250" height="200" viewBox="50 0 250 400">
                        <polyline stroke-linejoin="round" points="50,150 125,50 200,150" stroke="white" stroke-width="25" fill="none"></polyline>
                        <polyline stroke-linejoin="bevel" points="50,250 125,150 200,250" stroke="white" stroke-width="25" fill="none"></polyline>
                        <polyline stroke-linejoin="miter" points="50,350 125,250 200,350" stroke="white" stroke-width="25" fill="none"></polyline>
                    </svg>
                </div>
                <i class="fa fa-microphone" style="font-size: 150px;" aria-hidden="true"></i>
                <p style="color: #bb0b7c; font-weight:bold; font-size:40px; font-family:Calibri; position:absolute; margin-top:-22px;">
                    Escuchando
                </p>
            </button>
        </div>
    </div>
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
            <button type="submit" class="btn" style="background-image: linear-gradient( 135deg, #331575 20%, #bb0b7c);" @click="tratamiento()">
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

<div class="row" id="headerVozSmall">    
    <div class="col-sm-12 col-md-12 col-lg-12" style="text-align:center;">
        <button type="submit" class="pulsingButton m-left type2" id="btnActivarSmall" style="width:40px;height:40px;font-size:1em;line-height:1px">
            <i class="fa fa-microphone" style="font-size: 28px;" aria-hidden="true">
            </i>
        </button>
        <button type="submit" class="pulsingButton" style="width:40px;height:40px;font-size:1em;line-height:1px" id="btnEscuchandoSmall">
            <div class="pulse-ring" style="width:40px;height:40px">
                <svg width="30" height="30" viewBox="40 0 150 300">
                    <polyline stroke-linejoin="round" points="50,150 125,50 200,150" stroke="white" stroke-width="25" fill="none"></polyline>
                    <polyline stroke-linejoin="bevel" points="50,250 125,150 200,250" stroke="white" stroke-width="25" fill="none"></polyline>
                    <polyline stroke-linejoin="miter" points="50,350 125,250 200,350" stroke="white" stroke-width="25" fill="none"></polyline>
                </svg>
            </div>
            <i class="fa fa-microphone" style="font-size: 28px;" aria-hidden="true"></i>
        </button>
    </div>

</div>


<div class="row">
    <div class="col-sm-3 col-md-3 col-lg-3">

    </div>
    <div class="col-sm-6 col-md-6 col-lg-6">
        <div id="divNuevo">
            <div class="modal-content">
                <div class="modal-header" style="background-image: linear-gradient( 135deg, #331575 20%, #bb0b7c);">
                    <br />
                    <h5 class="modal-title" id="exampleModalLabel" style="color:white">
                        <span class="card-title" id="tituloTratamiento"></span>
                    </h5>
                    <br />
                </div>
                <div class="modal-body">

                    <div class="row">
                        <div class="col-6">
                            <div class="form-group-sm">
                                <label>Hallazgo:</label>
                                <select class="form-control" id="comboHallazgo">
                                    <option value="caries" selected="selected">Lesión de caries dental</option>
                                    <option value="restauración">Restauración</option>
                                    <option value="extracción">Extracción</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="form-group-sm">
                                <div class="dvPiezas" id="dvPiezas"></div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-3">

                        </div>
                        <div class="col-3" style="text-align:center">
                            <div class="DienteCareiesDiv" id="DienteCareiesDiv"></div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <table border="1">
                                <tr>
                                    <th>Nro</th>
                                    <th width="12%">Diente</th>
                                    <th>Hallazgo</th>
                                    <th>Pieza</th>
                                    <th width="12%">Eliminar</th>
                                </tr>
                                <tbody id="tablaDetalle"></tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="submit" class="btn" style="background-image: linear-gradient( 135deg, #331575 20%, #bb0b7c);" onclick="grabar('manual')">
                        <span style="color:white">Grabar</span>
                    </button>
                    <button type="submit" class="btn" style="background-image: linear-gradient( 135deg, #331575 20%, #bb0b7c);" onclick="cerrar('manual')">
                        <span style="color:white">Salir</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
    <div class="col-sm-3 col-md-3 col-lg-3">

    </div>
</div>

<!-- Modal duplicado-->
<div class="modal fade" id="modalOdongramaDuplicado" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-header" style="background-image: linear-gradient( 135deg, #331575 20%, #bb0b7c);">
                <h5 class="modal-title" id="exampleModalLabel" style="color:white">Diagnóstico</h5>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-12">
                        <p style="text-align:center">El hallazgo y la pieza seleccionada ya existen en la lista</p>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" style="background-image: linear-gradient( 135deg, #331575 20%, #bb0b7c);">Aceptar</button>
            </div>
        </div>
    </div>
</div>

<form @submit.prevent="e => guardarOActualizar()">
</form>
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
</style>