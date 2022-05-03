<script setup>
import { onUnmounted, ref } from "vue";
import { useRoute } from "vue-router";
import {
  obtenerTodos,
  registro,
  eliminar,
} from "../../store/odonto";

const route = useRoute()

let unsub 
if (route.params.idOdontograma) unsub = obtenerTodos(route.params.idOdontograma);
onUnmounted(()=>{
    if(unsub) unsub()
})

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
                button(@click="confirmar == false ? confirmar = true : confirmarEliminar(route.params.idOdontograma, item.id) ") {{confirmar ? '¿Está seguro?' : 'Borrar'}}
   
</template>
