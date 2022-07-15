<script setup>
import { onUnmounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { obtenerTodos, registro, eliminar } from '../../store/diccionario'
import {
    previousPage,
    nextPage,
    setList,
    registro_,
    searchDiccionario
} from "../../config/Paginator";
const obtenerRegistro = obtenerTodos()
const { push } = useRouter()
const confirmar = ref(false)
const confirmarEliminar = id => eliminar(id).then(() => confirmar.value = false)
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
        input#SearchInput.form-control(type='text', v-on:keyup='searchDiccionario(registro)', placeholder='Buscar por Código/Descripción.', title='Type in a name', style="width: 100% !important;")
.div(style="background-color: white; border-radius: 2%;")
    table.table.table-hover
        thead
            tr
                th Código
                th Descripción
                th
                th
        tbody
            tr(v-for="item of registro_", :key="item.id", :item="item")
                td {{ item.codigo }}
                td {{ item.descripcion }}
                td
                td.dropdown
                    button.ms-auto.btn( @click="push({ name: 'diccionario', params: { idDiccionario: item.id } })")
                        i.fa.fa-pencil-square-o(aria-hidden='true')
                td.dropdown
                    button.ms-auto.btn(@click="confirmar == false ? confirmar = true : confirmarEliminar(item.id)") {{ confirmar ? '¿Está seguro?' : '' }}    
                        i.fa.fa-trash-o(aria-hidden='true' style="color: black;")
    .div(style="text-align: center;")
        button#prevButton.btn.btn-primary(@click="previousPage(registro)") 
            i.fa.fa-angle-double-left(aria-hidden='true' style="font-size: 1em; font-weight: bold; color: white;") 
        button#nextButton.btn.btn-primary(@click="nextPage(registro)") 
            i.fa.fa-angle-double-right(aria-hidden='true' style="font-size: 1em; font-weight: bold; color: white;") 
</template>

