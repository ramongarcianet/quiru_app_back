<script setup>
import { onMounted, ref } from "vue";
import { guardar, actualizar, leerEnRegistro, obtenerTodos, registro }  from '../../../store/planTratamiento.js'
import { useRoute } from "vue-router";
const route = useRoute()
const idPaciente = route.params.idPaciente
const item = ref({
  descripDiagnostico: '',
  descripPlan: '',
  idPac: idPaciente,
  detallePlan: [],
  id: '',
})

const guardarOActualizar = async () => {
  if (item.value.id) {
    await actualizar(item.value)
  } else {
    const id = await guardar(item.value)
    item.value.id = id
  }
}
onMounted(() => {
  const id = route.params.idPlan
  if (id) {
    leerEnRegistro(id)
    item.value.id = id
  }
})
</script>
<template lang="pug">
Form( :onPromise="() => guardarOActualizar()" )
  .row
    .col-6
      label.form-label.mb-1 Diagónsticos
      textarea.form-control( rows="6" v-model="item.descripDiagnostico")
    .col-6
      label.form-label.mb-1 Comentario del plan de trabajo y presupuesto total
      textarea.form-control( rows="6" v-model="item.descripPlan")
    .d-flex.mt-2
      button.ms-auto.btn.btn-primary(type="submit") Guardar

</template>