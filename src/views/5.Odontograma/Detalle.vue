<script setup>
import Formulario from "./Formulario.vue";
import RegistroOdontograma from "./RegistroOdontograma.vue";
import { obtenerTodos, guardar } from "../../store/formodontograma";
import { leer as leerPaciente } from "../../store/paciente";
import { useRoute, useRouter } from "vue-router";
import { onUnmounted } from "@vue/runtime-core";
const { push } = useRouter();
const route = useRoute();
let obtener;

if (route.params.idPaciente) {
  leerPaciente(route.params.idPaciente);
  obtener = obtenerTodos(route.params.idPaciente);
}

onUnmounted(() => {
  if (obtener) obtener();
});

</script>
<template>
  <h1>Odontograma</h1>
  <row>
    <Container class="fluid">
      <Container>
        <Formulario />
        <Button @click="push({ name: 'odontograma', params: {} })"> Volver </Button>
      </Container>
    </Container>
  </row>
</template>
