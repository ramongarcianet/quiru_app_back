<script setup>
import { injectProp } from '@vue/compiler-core';
import { onUnmounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { obtenerTodos, registro, updateEstado } from "../../store/paciente";
import { previousPage, nextPage, setList, registro_, search, setListDelete, SetPage } from "../../config/Paginator";
import { registroodonto, obtenerTodos as obtenerOdontograma } from "../../store/formodontograma";
import { printHistoriaClinicaPaciente } from "../../store/historiaClinica";
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
function printHistoriaClinica(idPaciente) {
    printHistoriaClinicaPaciente(idPaciente);

}

</script>

<template lang="pug">
.row
    .col-5
    .col-7
        input#SearchInput.form-control.mb-2.ms-auto(v-on:keyup='search(registro)', placeholder="Buscar")
.div.mb-5
    .card.mb-1.d-none.d-md-block(style="border-radius: 30px; background-color:#f5f5f5;")
        .row.align-items-center.p-1
            .col-3.ps-4.d-none.d-md-block Documento
            .col-3.d-none.d-md-block Nombre
            .col-2.d-none.d-md-block Teléfono
            .col-2.d-none.d-md-block Email
            .col-1
            .col-1
    .card.mb-2.p-2.d-block.d-md-none(v-for="item of registro_"  :key="item.id"  :item="item" @click="push({ name: 'pacienteVer', params: { idPaciente: item.id } })" style="border-radius: 40px")
        .row.align-items-center.p-1(style="cursor: pointer")
            .col-10 {{item.tipoDocumento + ' ' +item.numeroDocumento }}
            .col-1.dropdown(style="max-height: 24px")
                button.ms-auto.btn.p-0.m-0(title='Odontograma')
                    i.fa.fa-solid.fa-tooth
            .col-10 {{ item.nombre + ' ' + item.apellidoPaterno + ' ' + item.apellidoMaterno }}

    .card.mb-2.p-2.d-none.d-md-block(v-for="item of registro_"  :key="item.id"  :item="item" style="border-radius: 40px" )
        .row.align-items-center.p-1(style="cursor: pointer")
            .col.ps-3(@click="push({ name: 'pacienteVer', params: { idPaciente: item.id } })") {{item.tipoDocumento}}
            .col-2(@click="push({ name: 'pacienteVer', params: { idPaciente: item.id } })") {{ item.numeroDocumento }}
            .col-3(@click="push({ name: 'pacienteVer', params: { idPaciente: item.id } })") {{ item.nombre + ' ' + item.apellidoPaterno + ' ' + item.apellidoMaterno }} 
            .col-2(@click="push({ name: 'pacienteVer', params: { idPaciente: item.id } })") {{item.telefono}}
            .col-2(@click="push({ name: 'pacienteVer', params: { idPaciente: item.id } })") {{item.email}}
            .col-1.dropdown
                //button.ms-auto.btn(title='Historia Clínica' @click="printHistoriaClinica(item.id)")
                    i.fa-solid.fa-briefcase-medical            
            .col-1.dropdown
                button.ms-auto.btn(title='Odontograma' @click="push({ name: 'pacienteVer', params: { idPaciente: item.id } })")
                    i.fa.fa-solid.fa-user
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
</template>