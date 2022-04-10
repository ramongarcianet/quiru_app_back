<script setup>
import {ref} from 'vue'
import {item, guardar, actualizar}  from '../../store/usuario'

const guardarOActualizar = () => {
    if (item.value.id) actualizar(item.value).then(()=>item.value = {})
    else guardar( item.value).then(()=>item.value = {})
}

import {dialog} from '../../store/usuario'

</script>

<template>

<div id="headerVoz">
    <div class="row">
        <div class="col-sm-12 col-md-12 col-lg-12" style="text-align:center;">
            <button type="submit" class="pulsingButton m-left type2" id="btnActivar" onclick="procesar()">
                <i class="fa fa-microphone" style="font-size: 150px;" aria-hidden="true">
                </i>
                <p style="color: #bb0b7c; font-weight:bold; font-size:40px; font-family:Calibri; position:absolute; margin-top:-22px;">
                    Oye quiru
                </p>
            </button>
            <button type="submit" class="pulsingButton" id="btnEscuchando" onclick="procesar()" hidden="hidden">
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
            <button type="submit" class="btn" style="background-image: linear-gradient( 135deg, #331575 20%, #bb0b7c);" onclick="diagnostico('manual')" id="btnDiagnostico">
                <span style="color:white">Diagnóstico</span>
            </button>
            <button type="submit" class="btn" style="background-image: linear-gradient( 135deg, #331575 20%, #bb0b7c);" onclick="tratamiento()">
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