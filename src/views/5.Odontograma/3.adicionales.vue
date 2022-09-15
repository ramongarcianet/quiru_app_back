<script setup>
import { watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { actualizar,leerOdonto,item} from "../../store/formodontograma";
import { onMounted } from "@vue/runtime-core";
const { push } = useRouter();
const route = useRoute()
onMounted(()=> {
    var mensaje = document.getElementById('mensaje');
    mensaje.style.display = "none";
})
if (route.params.idOdontograma) {
  leerOdonto(route.params.idOdontograma)
}
const grabarAdicionales = (idOdontograma)=>{
  actualizar(idOdontograma);
  var mensaje = document.getElementById('mensaje');
  mensaje.style.display = "block";
}
</script>
<template lang="pug">
h1 Datos Adicionales
.row
  .col.m-2
    .row
      label.form-label.mb-1 Especficaciones
      textarea#inputDescription.form-control( rows="4" v-model="item.especificaciones")
    .row.mt-2
      label.form-label.mb-1 Observaciones
      textarea#inputObservacion.form-control( rows="4" v-model="item.observaciones" )
    .row.mt-2
      label.form-label.mb-1 Receta
      textarea#inputReceta.form-control( rows="4" v-model="item.receta")
    .row.mt-2
      #mensaje.alert.alert-success.alert-dismissible(style='display:none') Se registró correctamente
  .d-flex.mt-2
    button.btn.btn-primary( @click='push({name: "Detalle", params: {idOdontograma: route.params.idOdontograma,idPaciente: route.params.idPaciente, tipoOdonto: route.params.tipoOdonto}})') Volver
    button.ms-auto.btn.btn-primary(type="submit", @click="grabarAdicionales(route.params.idOdontograma);") Guardar
</template>

<style lang="sass" scoped>

#myCanvas
  border: 1px solid #9c9898

</style>