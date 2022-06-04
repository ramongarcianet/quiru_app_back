<script setup>
import { watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { actualizar,leerOdonto,item} from "../../store/formodontograma";
import { onMounted } from "@vue/runtime-core";
const { push } = useRouter();
const route = useRoute()
onMounted(()=> {
    let mensaje = document.getElementById('mensaje');
    mensaje.innerText = '';
})
if (route.params.idOdontograma) {
  leerOdonto(route.params.idOdontograma)
}
const grabarAdicionales = (idOdontograma)=>{
  actualizar(idOdontograma);
  let mensaje = document.getElementById('mensaje');
  mensaje.innerText = 'Se registro correctamente';
}
</script>
<template lang="pug">
h1 Datos Adicionales
.row
  .col
    .row
      label.form-label Especficaciones
      textarea#inputDescription.form-control( rows="4" v-model="item.especificaciones")
    .row
      label.form-label Observaciones
      textarea#inputObservacion.form-control( rows="4" v-model="item.observaciones" )
    .row
      label.form-label Receta
      textarea#inputReceta.form-control( rows="4" v-model="item.receta")
    .row.mt-3
      span#mensaje(style="color: red; font-weight:bold;")
  .d-flex.mt-4
    button.btn.btn-primary( @click='push({name: "Detalle", params: {idOdontograma: route.params.idOdontograma,idPaciente: route.params.idPaciente}})') Volver
    button.ms-auto.btn.btn-primary(type="submit", @click="grabarAdicionales(route.params.idOdontograma);") Grabar
</template>

<style lang="sass" scoped>

#myCanvas
  border: 1px solid #9c9898

</style>