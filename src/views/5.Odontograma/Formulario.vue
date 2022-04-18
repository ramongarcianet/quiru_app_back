<script setup>
import {onMounted, ref} from 'vue'
import {diagnostico,tratamiento, procesar,cerrar, limpiar, grabar} from '../../store/odontograma'
//import {} from '../5.Odontograma/Hallasgos/ddlPiezas.html'
const guardarOActualizar = () => {
  if (item.value.id) actualizar(item.value).then(() => (limpiar()));
  else guardar(item.value).then(() => (limpiar()));
};
onMounted (()=>{
        var divNuevo = document.getElementById('divNuevo');
        divNuevo.style.display = 'none';
        var headerVozSmall = document.getElementById('headerVozSmall');
        headerVozSmall.style.display = 'none';
        var modalOdongramaDuplicado = document.getElementById('modalOdongramaDuplicado');
        modalOdongramaDuplicado.style.display = 'none';
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
            <button type="submit" class="btn" style="background-image: linear-gradient( 135deg, #331575 20%, #bb0b7c);" @click="diagnostico()" id="btnDiagnostico">
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
                    <button type="submit" class="btn" style="background-image: linear-gradient( 135deg, #331575 20%, #bb0b7c);" @click="grabar('manual')">
                        <span style="color:white">Grabar</span>
                    </button>
                    <button type="submit" class="btn" style="background-image: linear-gradient( 135deg, #331575 20%, #bb0b7c);" @click="cerrar()">
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

</style>