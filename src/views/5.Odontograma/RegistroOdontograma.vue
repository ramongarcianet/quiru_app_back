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
table.table.table-hover
  thead
    tr
      th Tipo
      th Fecha
      th Ver
      th Agregar
      th Borrar
  tbody
    tr(v-for="item of registroodonto" :key="item.id" :item="item")
      td {{item.tipo}}
      td {{item.fechaRegistro}}
      td
        .dropdown
          button.ms-auto.btn(type="button", @click="push({name: 'Detalle', params: {idOdontograma: item.id,idPaciente: item.idPaciente} })")
            i.fa.fa-solid.fa-tooth
      td(v-if="item.esultimo==='2' && item.hallazgos")
        .dropdown
          button.ms-auto.btn(type="button", @click="guardarOdontograma(route.params.idPaciente, 'Tratamiento','2',item.id)")
            i.fa.fa-solid.fa-circle-plus
      td(v-else="item.esultimo==='1' || item.esultimo==='0'")
        .dropdown
          button.ms-auto.btn(type="button")
      td(v-if="item.esultimo==='2'")
        .dropdown
          button.ms-auto.btn.btn-primary(type="button", @click="confirmar == false ? confirmar = true : confirmarEliminar(item.id) ") {{confirmar ? '¿Está seguro?' : 'Borrar'}}
      td(v-else="item.esultimo==='1' || item.esultimo==='0'")
        .dropdown
          button.ms-auto.btn(type="button")
</template>
