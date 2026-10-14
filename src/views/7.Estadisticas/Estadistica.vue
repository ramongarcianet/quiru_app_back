<script setup>
import { onUnmounted, ref } from "vue";
import { useRouter } from "vue-router";
import { obtenerTodosOdo, registroodontoTodo } from "../../store/formodontograma";
import { obtenerTodos, registro, updateEstado } from "../../store/paciente";
import { miUsuario } from "../../store/sesion";
const { push } = useRouter()
const datoOdontogramas = ref([])
const obtenerRegistro = obtenerTodos();
const datoPacientes = registro.value.length
const cargaOdontogramas = async () => {
  const registroOdontoTodo = await obtenerTodosOdo(miUsuario().uid)
  datoOdontogramas.value = registroOdontoTodo.length
}

cargaOdontogramas()
</script>

<template lang="pug">
.d-flex.align-content-start.flex-wrap
  h1(style="color: var(--brand-blue); font-weight:bold; font-size: 1.5em") Bienvenido
.container.fluid.row
  .col-4
    .card.p-2
      p.primary-text Diagnósticos
      p {{ datoOdontogramas }}
      p.primary-text ahora 
      p 2
  .col-4
    p esta vista para editarla la encuentras en 7.Estadisticas
    |  Saludos  😊
    //.card.p-2
      p.primary-text Pacientes
      p {{ datoPacientes }}
  .col-4
    .card.p-2
      p.primary-text Ganancias
      p 3000

</template>
