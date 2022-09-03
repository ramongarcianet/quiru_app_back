<script setup>
import { useRouter } from "vue-router";
import { ref } from 'vue'
import Nav from "./componentes/0.Nav.vue"
import Header from "./componentes/1.Header.vue"
import Solucion from "./componentes/2.Solucion.vue"
import PropuestaDeValor1 from "./componentes/3.PropuestaDeValor1.vue"
import PropuestaDeValor2 from "./componentes/4.PropuestaDeValor2.vue"
import PropuestaDeValor3 from "./componentes/5.PropuestaDeValor3.vue"
import Precio from "./componentes/6.Precio.vue"
import Preguntas from "./componentes/7.Preguntas.vue"
import Footer from "./componentes/8.Footer.vue"

const {push} = useRouter()

const CallToActionDialog = ref(false)
</script>
<template lang="pug">
Nav
Header
Solucion
PropuestaDeValor1
PropuestaDeValor2
PropuestaDeValor3
Precio
Preguntas
    Footer
</template>

