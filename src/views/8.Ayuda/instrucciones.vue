<script setup>
import { onUnmounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import ejemDiag from '../../config/EjemDiagnostico.json';
import ejemTrata from '../../config/EjemTratamiento.json';
import { leerEnRegistro as ObtenerOdontograma, item as itemodontograma, eliminar } from '../../store/formodontograma';

const { push } = useRouter()
</script>
<template lang="pug">

.container
  div(style="background-color: white; border-radius: 2%;")
    table.table.table-hover
      thead
        tr 
          th Ejemplos de voz
          th Hallazgo clínico
          th.d-none.d-md-table-cell Norma técnica

      tbody(v-if="itemodontograma?.tipo === 'Diagnóstico'")
        tr(v-for="comandoD of ejemDiag.EJEMP")
          td {{comandoD.orden}} 
          td {{comandoD.descripcion}}
          td.d-none.d-md-table-cell {{comandoD.ejemplo}}
      
      tbody(v-if="itemodontograma?.tipo === 'Tratamiento'")
        tr(v-for="comandoT of ejemTrata.EJEMP")
          td {{comandoT.orden}}
          td {{comandoT.descripcion}}
          td.d-none.d-md-table-cell {{comandoT.ejemplo}}
                  
</template>
<style lang="sass" scoped>
</style>