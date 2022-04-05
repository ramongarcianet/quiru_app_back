<script setup>
import { onUnmounted, ref } from 'vue'
import {obtenerTodos, registro, leerEnRegistro, eliminar} from '../../store/usuario'
import Item from './Item.vue'
const obtenerRegistro = obtenerTodos()

const confirmar = ref(false)

const confirmarEliminar = id => eliminar(id).then(()=> confirmar.value = false)

</script>

<template>

<ul>
    <Item  v-for="item of registro"  :key="item.id"  :item="item">
        
    </Item>
</ul>
   
</template>

