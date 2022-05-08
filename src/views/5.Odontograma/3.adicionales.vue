<script setup>
import { watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { actualizar} from "../../store/formodontograma";
import { onMounted } from "@vue/runtime-core";
const { push } = useRouter();
const route = useRoute()
onMounted(()=> {

})

</script>
<template lang="pug">
h1 Datos Adicionales
.row 
  .col
    .row
      label.form-label Especficaciones
      textarea#inputDescription.form-control( rows="4" ) 
    .row
      label.form-label Observaciones
      textarea#inputObservacion.form-control( rows="4" ) 
    .row
      label.form-label Receta
      textarea#inputReceta.form-control( rows="4") 
  .d-flex.mt-5
    button( @click='push({name: "Detalle", params: {idOdontograma: route.params.idOdontograma}})') Regresar a odontograma
    button.btn.btn-primary(type="submit", @click="actualizar(route.params.idOdontograma)") Grabar
</template>

<style lang="sass" scoped>

#myCanvas 
  border: 1px solid #9c9898

</style>