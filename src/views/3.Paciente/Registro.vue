<script setup>
import { injectProp } from '@vue/compiler-core';
import { onUnmounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { obtenerTodos, registro, updateEstado } from "../../store/paciente";
import { previousPage, nextPage, setList, registro_, search, setListDelete, SetPage } from "../../config/Paginator";
import { registroodonto, obtenerTodos as obtenerOdontograma } from "../../store/formodontograma";
const obtenerRegistro = obtenerTodos();
const confirmar = ref(false);
const { push } = useRouter();
let itemseleccionado = {};
watch(
    () => registro.value,
    () => {
        setList(registro.value, 1);
    }
)
function CallConfirm(item) {
    itemseleccionado = item;
    obtenerOdontograma(item.id);
    var modal = document.getElementById('id01');
    modal.style.display = 'block';
}
function EliminarPasiente() {
    var alerta = document.getElementById("alerta");
    var modal = document.getElementById('id01');
    if (registroodonto.value.length > 0) {
        alerta.style.display = "block";
        modal.style.display = 'none';
    }
    else {
        alerta.style.display = "none";
        modal.style.display = 'none';
        updateEstado(itemseleccionado)
    }
}
function Cancelar() {
    var alerta = document.getElementById("alerta");
    var modal = document.getElementById('id01');
        alerta.style.display = "none";
        modal.style.display = 'none';
}
</script>

<template lang="pug">
.row
    .col
    .col
        input#SearchInput.form-control(type='text', v-on:keyup='search(registro)', placeholder='Buscar por Tipo/Número Doc/Nombre.', title='Type in a name', style="width: 100% !important;")
#alerta.alert.alert-danger.alert-dismissible(style='display:none')
    
    strong Cuidado!
        |  Este paciente no se puede eliminar por que tiene un diagnostico/tratamiento registrado
    a.close(@click="Cancelar()" href='#' data-dismiss='alert' aria-label='close') &times;
.div(style="background-color: white; border-radius: 2%;")
    table.table.table-hover
        thead
            tr
            tr
                th.d-none.d-md-table-cell Tip Doc.
                th.d-none.d-md-table-cell Número Doc.
                th Nombres
                th.d-none.d-md-table-cell Fecha Ingreso
                th.d-none.d-md-table-cell Sexo
                th
                th
                th
        tbody
            tr(v-for="item of registro_"  :key="item.id"  :item="item")

                td.d-none.d-md-table-cell {{ (item.tipoDocumento == 'DNI') ? 'DNI' : 'CARNET DE EXTRANJERIA' }}
                td.d-none.d-md-table-cell {{ item.numeroDocumento }}
                td
                    span.d-block.d-md-none {{ item.numeroDocumento }} -
                    | {{ item.nombre + ' ' + item.apellidoPaterno + ' ' + item.apellidoMaterno }}
                td.d-none.d-md-table-cell {{ item.fechaIngreso }}
                td.d-none.d-md-table-cell {{ (item.sexo == 'M') ? 'MASCULINO' : 'FEMENINO' }}
                td.dropdown
                    button.ms-auto.btn(title='Odontograma' @click="push({ name: 'pacienteVer', params: { idPaciente: item.id } })")
                        i.fa.fa-solid.fa-tooth
                td.dropdown
                    button.ms-auto.btn(title='Editar' @click="push({ name: 'paciente', params: { idPaciente: item.id } })")
                        i.fa-solid.fa-pen-clip
                td.dropdown
                    button.ms-auto.btn(title='Eliminar' @click="CallConfirm(item)")
                        i.fa-solid.fa-trash
    .div(v-if="registro.length > 8",style="text-align: center;")
        nav.d-flex.justify-content-center(aria-label='Page navigation example')
            ul.pagination
                li.page-item
                    a.page-link(href='#', aria-label='Previous', @click="previousPage(registro)")
                        span(aria-hidden='true',style="font-size: 1rem; font-weight: bold;") &laquo;
                li.page-item(v-for="n in (Math.trunc(registro.length / 8) + (((registro.length % 8) > 0) ? 1 : 0))") 
                    a.page-link(href='#', @click='SetPage(registro, n)') {{ n }}    
                li.page-item
                    a.page-link(href='#', aria-label='Next', @click="nextPage(registro)")
                        span(aria-hidden='true', style="font-size: 1rem; font-weight: bold;") &raquo;
#id01.modal(style="display:none;")
    
    .modal-content.modal-sm
        .container
            p(style="color: #37DFBB; font-weight:bold; font-size: 1.5em; font-family: var(--font-family)") Eliminar Paciente
            p ¿Esta seguro que desea eliminar?
            .clearfix
                button.btn.btn-secondary.cancelbtn(@click="Cancelar()") Cancelar
                button.btn.btn-danger.deletebtn(@click="EliminarPasiente(), mostrar = false") Aceptar

</template>
<style scoped>
body {
    font-family: Arial, Helvetica, sans-serif;
}

* {
    box-sizing: border-box;
}

#id01 {
    background-color: rgba(0, 0, 0, 0.6);
}

button {
    margin-top: 6px;
    border: none;
    opacity: 0.85;
    background: none;
}

.cancelbtn,
.deletebtn {
    float: left;
    width: 50%;
}

.cancelbtn {
    background-color: rgb(189, 189, 189);

}

.deletebtn {
    background-color: #f44336;
}

.container {
    padding: 16px;
    text-align: center;
}

.modal {
    display: block;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    opacity: 1;
    padding-top: 50px;

}

.modal-content {
    background-color: #fefefe;
    margin: 5% auto 15% auto;
    border: 1px solid #888;
    width: 80%;
}

hr {
    border: 1px solid #f1f1f1;
    margin-bottom: 25px;
}

.close {
    position: relative;
    font-size: 20px;
    font-weight: bold;
    color: black;
}

.close:focus {
    cursor: pointer;
}

.clearfix::after {
    content: "";
    clear: both;
    display: table;
}

@media screen and (max-width: 300px) {

    .cancelbtn,
    .deletebtn {
        width: 100%;
    }
}
</style>
