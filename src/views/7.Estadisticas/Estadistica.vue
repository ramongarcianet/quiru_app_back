<script setup>
import { onUnmounted, ref } from "vue";
import { useRouter } from "vue-router";
import { obtenerTodosOdo, registroodontoTodo } from "../../store/formodontograma";
import { miUsuario } from "../../store/sesion";

const { push } = useRouter()
const datoOdontogramas = ref([])
const intentoLoco = async () => {
  const registroodontoTodo = await obtenerTodosOdo(miUsuario().uid)
  datoOdontogramas.value = registroodontoTodo.length
}

intentoLoco()
</script>

<template lang="pug">
.d-flex.align-content-start.flex-wrap
  h1(style="color: #37DFBB; font-weight:bold; font-size: 1.5em; font-family: var(--font-family)") Bienvenido
.container.fluid
  .row
    p.primary-text Diagnósticos
    p {{ datoOdontogramas }}
  .row
    p.primary-text Pacientes
    p {{ }}

</template>