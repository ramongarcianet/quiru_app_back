<script setup>

import { useRouter } from 'vue-router'
import Registro from './Registro.vue'
const { push } = useRouter()
</script>
<template  lang="pug">

.d-flex.justify-content-between
  i.bi.bi-list-ul(style="color: var(--brand-blue); font-weight:bold; font-size: 1.5em;")
    |  Diccionario
  br
row
  .container.container-fluid
    .container
      registro
      .div(style="text-align: right;")
        button.btn.btn-primary(style="border-radius: 50%;" @click="push({name: 'diccionario'})")
          i.bi.bi-plus-lg(aria-hidden='true' style="font-size: 2em; font-weight: bold; color: white;")
</template>
