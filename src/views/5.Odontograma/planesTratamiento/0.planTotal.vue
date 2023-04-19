<script setup>
import { useRoute, useRouter} from "vue-router"
import planArriba from './1.planArriba.vue'
import planMedio from './2.planMedio.vue'
import PlanAbajo from './3.planAbajo.vue'

const {back, push} = useRouter()
</script>
<template lang="pug">
.row
  .col-8
    h1 Datos del plan de tratamiento
    button.btn.btn-outline-primary.border-0(@click="back()" )
      i.fa-solid.fa-arrow-left-long.fa-xl
.row
  .col.m-2
    planArriba
</template>