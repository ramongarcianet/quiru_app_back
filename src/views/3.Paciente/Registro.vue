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
</script>

<template lang="pug">
.row
    .col-5
    .col-7
        input#SearchInput.form-control.mb-2.ms-auto(v-on:keyup='search(registro)', placeholder="Buscar")
.div.mb-5(style="background-color: white; border-radius: 2%;")
    table.table.table-hover(style="cursor: pointer")
        thead
            td.d-none.d-md-table-cell Tipo Doc.
            td.d-none.d-md-table-cell Número Doc.
            td.d-none.d-md-table-cell Nombre
            td.d-none.d-md-table-cell Teléfono
            td.d-none.d-md-table-cell Correo
            td.d-none.d-md-table-cell 
        tbody
            tr(v-for="item of registro_"  :key="item.id"  :item="item" @click="push({ name: 'pacienteVer', params: { idPaciente: item.id } })")
                td.d-none.d-md-table-cell {{item.tipoDocumento}}
                td.d-none.d-md-table-cell {{ item.numeroDocumento }}
                td
                    span.d-block.d-md-none {{item.tipoDocumento + ' ' +item.numeroDocumento }}
                    | {{ item.nombre + ' ' + item.apellidoPaterno + ' ' + item.apellidoMaterno }}
                td.d-none.d-md-table-cell {{item.telefono}}
                td.d-none.d-md-table-cell {{item.email}}
                td.dropdown
                    button.ms-auto.btn(title='Odontograma')
                        i.fa.fa-solid.fa-tooth
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