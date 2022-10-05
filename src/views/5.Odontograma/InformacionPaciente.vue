<script setup>
import { useRoute } from "vue-router";
import { obtenerTodos } from "../../store/formodontograma";
import { onUnmounted } from "vue";
const route = useRoute()
let obtener

if (route.params.idPaciente) {
  obtener = obtenerTodos(route.params.idPaciente);
}
onUnmounted(()=>{
  if(obtener) obtener()
})
</script>
<template lang="pug">
router-view
</template>