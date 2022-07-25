<script setup>
import { onUnmounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import {obtenerTodos, eliminar,registro} from "../../store/paciente";
import {previousPage,nextPage,setList,registro_,search, setListDelete, SetPage} from "../../config/Paginator";
const obtenerRegistro = obtenerTodos();
const confirmar = ref(false);
const confirmarEliminar = (id) => eliminar(id).then(() => (confirmar.value = false),
    () => {
        setListDelete(registro.value);
    }
);
const { push } = useRouter();
watch(
    () => registro.value,
    () => {
        setList(registro.value,1);
    }
)
</script>

<template lang="pug">
.row
    .col
    .col
        input#SearchInput.form-control(type='text', v-on:keyup='search(registro)', placeholder='Buscar por Tipo/Número Doc/Nombre.', title='Type in a name', style="width: 100% !important;")
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
                    button.ms-auto.btn( @click="push({ name: 'pacienteVer', params: { idPaciente: item.id } })")
                        i.fa.fa-solid.fa-tooth
                td.dropdown
                    button.ms-auto.btn( @click="push({ name: 'paciente', params: { idPaciente: item.id } })")
                        i.fa-solid.fa-pen-clip
                td.dropdown
                    BotonSeguro( :onSuccess= '() => eliminar(item.id)')
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
</template>
