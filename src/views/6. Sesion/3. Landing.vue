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
import CallToActionForm from "./componentes/9.CallToActionForm.vue"

const {push} = useRouter()

const CallToActionDialog = ref(false)
</script>
<template lang="pug">
Nav( v-model='CallToActionDialog' )
Header( v-model='CallToActionDialog' )
Solucion( v-model='CallToActionDialog' )
PropuestaDeValor1( v-model='CallToActionDialog' )
PropuestaDeValor2( v-model='CallToActionDialog' )
PropuestaDeValor3( v-model='CallToActionDialog' )
Precio( v-model='CallToActionDialog' )
Preguntas( v-model='CallToActionDialog' )
    Footer( v-model='CallToActionDialog' )
CallToActionForm( v-model='CallToActionDialog' )
</template>

