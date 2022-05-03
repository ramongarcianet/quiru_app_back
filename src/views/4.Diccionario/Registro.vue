<script setup>
import { onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import {obtenerTodos, registro, leerEnRegistro, eliminar, dialog} from '../../store/diccionario'

const obtenerRegistro = obtenerTodos()

const {push} = useRouter()
const confirmar = ref(false)

const confirmarEliminar = id => eliminar(id).then(()=> confirmar.value = false)

</script>

<template lang="pug">
table.table.table-striped.table-light
    thead
        tr
            th Código
            th Descripción
            th
    tbody
        tr(v-for="item of registro", :key="item.id", :item="item")
            td {{item.codigo}}
            td {{item.descripcion}}
            td
                .dropdown
                    button.btn.btn-primary.dropdown-toggle#dropdownMenuLink(data-bs-toggle="dropdown") Opciones
                    ul.dropdown-menu
                        li 
                            a.dropdown-item( @click="push({name: 'diccionario', params: {idDiccionario: item.id}})") Editar 
                        li
                            a.dropdown-item( @click="confirmar == false ? confirmar = true : confirmarEliminar(item.id) " ) {{confirmar ? '¿Está seguro?' : 'Borrar'}}


</template>

