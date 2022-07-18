<script setup>
import { onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import {obtenerTodos, eliminar,registro} from "../../store/precios";
import {previousPage,nextPage,setList,registro_,searchPrecio, setListDelete, SetPage} from "../../config/Paginator";
const obtenerRegistro = obtenerTodos();
const confirmar = ref(false);
let _TotalPage = 0;
const confirmarEliminar = (id) => eliminar(id).then(() => (confirmar.value = false),
    () => {
        setListDelete(registro.value);
    });
const { push } = useRouter();
watch(
    () => registro.value,
    () => {
        setList(registro.value,1);
    }
);
</script>

<template lang="pug">
.row
    .col
    .col
        input#SearchInput.form-control(type='text', v-on:keyup='searchPrecio(registro)', placeholder='Buscar por Hallazgo/Precio.', title='Type in a name', style="width: 100% !important;")
.div(style="background-color: white; border-radius: 2%;").mt-1
    table.table.table-hover
        thead
            tr
                th Hallazgo
                th Precio 

        tbody
            tr(v-for="item of registro_"  :key="item.id"  :item="item")
                td {{ item.tipo }}
                td S/. {{ item.precio }}.00
                td
                    button.ms-auto.btn( @click="push({ name: 'formulario', params: { idPaciente: item.id } })")
                        i.fa-solid.fa-pen-clip
                td(width="25%")
                    BotonSeguro( :onSuccess= '() => eliminar(item.id)' )
                        i.fa.fa-trash-o(aria-hidden='true')
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
<style scoped>

</style>
