<script setup>
import Formulario from "./Formulario.vue";
import { watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { VerFormato } from "../../store/Canvas";

import {leerEnRegistro,item as itemodontograma} from '../../store/formodontograma';
import { onMounted } from "@vue/runtime-core";
const { push } = useRouter();
const route = useRoute()

leerEnRegistro(route.params.idOdontograma);
onMounted(()=> {

VerFormato(itemodontograma?.value?.hallazgos);

  watch(
    () => itemodontograma.value.hallazgos,
    () => {
      VerFormato(itemodontograma.value.hallazgos);
    }
  );
})



</script>
<template lang="pug">
.row
  .col#imprimir
    canvas#myCanvas( width="384" height="397" style="border: 0; left:0px; top:0px;")
</template>
<style lang="sass" scoped>
#myCanvas
  border: 1px solid #9c9898
</style>