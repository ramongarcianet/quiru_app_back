<script setup>
import { useRouter } from "vue-router";
import { ref } from 'vue'
import Nav from "./componentes/0.Nav.vue"
import Header from "./componentes/1.Header.vue"
import Beneficios from "./componentes/2.Beneficios.vue"
import Refuerzo from "./componentes/3.Refuerzo.vue"
import Producto from "./componentes/4.Producto.vue"
import Refuerzo2 from "./componentes/5.Refuerzo2.vue"
import CallToAction from "./componentes/6.Refuerzo3.vue"
import Preguntas from "./componentes/7.Preguntas.vue"
import Footer from "./componentes/8.Footer.vue"
import CallToActionForm from "./componentes/9.CallToActionForm.vue"

const {push} = useRouter()

const CallToActionDialog = ref(false)
</script>
<template lang="pug">
Nav( v-model='CallToActionDialog' )
Header( v-model='CallToActionDialog' )
Beneficios( v-model='CallToActionDialog' )
Refuerzo( v-model='CallToActionDialog' )
Producto( v-model='CallToActionDialog' )
Refuerzo2( v-model='CallToActionDialog' )
CallToAction( v-model='CallToActionDialog' )
Preguntas( v-model='CallToActionDialog' )
    Footer( v-model='CallToActionDialog' )
CallToActionForm( v-model='CallToActionDialog' )
</template>

