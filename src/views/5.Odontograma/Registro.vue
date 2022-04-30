<script setup>
import { onUnmounted, ref } from "vue";
import {
  obtenerTodos,
  registro,
  leerEnRegistro,
  eliminar,
  dialog,
} from "../../store/odonto";
const obtenerRegistro = obtenerTodos();

const confirmar = ref(false);

const confirmarEliminar = (id) => eliminar(id).then(() => (confirmar.value = false));
</script>

<template lang="pug">

table.table.table-striped.table-light
    thead 
        tr 
            th Diente
            th Hallazgo
            th Piezas
            th
    tbody
        tr(v-for="item of registro" :key="item.id" :item="item")
            td {{item.diente}}
            td {{item.hallazgo}}
            td {{item.pieza}}
            td 
                button(@click="confirmar == false ? confirmar = true : confirmarEliminar(item.id) ") {{confirmar ? '¿Está seguro?' : 'Borrar'}}
   
</template>
