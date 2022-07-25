<script setup>
import { onUnmounted, ref } from "vue";
import {
  registroodonto,
  eliminar,
  guardar as guardarOdontograma,
  actualizarEsUltimo
} from "../../store/formodontograma";

import { obtenerTodos } from "../../store/formodontograma";
import { useRouter, useRoute } from "vue-router";

const confirmar = ref(false);

const { push } = useRouter();
const route = useRoute()
let obtener

if (route.params.idPaciente) {
  obtener = obtenerTodos(route.params.idPaciente);
}
const confirmarEliminar = (id) => eliminar(id).then(() => {
  confirmar.value = false
  });

onUnmounted(()=>{
  if(obtener) obtener()
})

</script>

<template lang="pug"> 
.div(style="background-color: white; border-radius: 2%;")
  table.table.table-hover
    thead
      tr
        th Tipo
        th Fecha
        th.d-none.d-md-table-cell Ver
        th.d-none.d-md-table-cell Presupuesto
        th.d-none.d-md-table-cell Agregar
        th.d-none.d-md-table-cell Borrar
    tbody
      tr(v-for="item of registroodonto" :key="item.id" :item="item")
        td {{item.tipo}}
        td {{item.fechaRegistro}}
        td
          .dropdown
            button.ms-auto.btn(type="button", @click="push({name: 'Detalle', params: {idOdontograma: item.id,idPaciente: item.idPaciente} })")
              i.fa.fa-solid.fa-tooth
        td
          .dropdown
            button.ms-auto.btn(type="button", @click="push({name: 'cotizacion', params: {idOdontograma: item.id,idPaciente: item.idPaciente} })")
              i.fa.fa-usd
        td(v-if="item.esultimo==='2' && item.hallazgos")
          .dropdown
            button.ms-auto.btn(type="button", @click="guardarOdontograma(route.params.idPaciente, 'Tratamiento','2',item.id)")
              i.fa.fa-solid.fa-circle-plus
        td(v-else="item.esultimo==='1' || item.esultimo==='0'")
          .dropdown
            button.ms-auto.btn(type="button", disabled)
             i.fa.fa-solid.fa-circle-plus
        td(v-if="item.esultimo==='2'" width="25%")
          .dropdown
            BotonSeguro( :onSuccess= '() => eliminar(item.id)' )
                i.fa.fa-trash-o
        td(v-else="item.esultimo==='1' || item.esultimo==='0'")
          .dropdown
            button.ms-auto.btn(type="button", disabled)
              i.fa.fa-trash-o(aria-hidden='true')

</template>
<style scoped>
  .btn:disabled, .btn.disabled, fieldset:disabled .btn {
    opacity: 0.35;
}

</style>
