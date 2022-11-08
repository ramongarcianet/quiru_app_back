<script setup>
import { useRouter } from "vue-router";
import Logo from "../../../assets/logoQuiru.vue";

const { push } = useRouter();

const listaDeRedes = [
  { icono: "fa-brands fa-facebook", ruta: "https://www.facebook.com/QUIRUOFICIAL" },
  { icono: "fa-brands fa-instagram", ruta: "https://www.instagram.com/Quiru_app/" },
  { icono: "fa-brands fa-linkedin", ruta: "https://www.linkedin.com/company/quiru/" },

  
];
</script>

<template lang="pug">

.container.d-flex.w-100
    .d-flex.w-100.justify-content-between.align-items-center
        div
            Img( height='50' src="https://firebasestorage.googleapis.com/v0/b/app-keepers.appspot.com/o/Group%2073%20(1).png?alt=media&token=13f628f8-46ea-41f4-a4f4-b4d2aa604323")
            p.m-0
                small 2022 Quiru | Trujillo - Perú
        .d-flex
            a(v-for='{icono, ruta} of listaDeRedes'  :href='ruta' target='_blank').me-3
                i.fa-2x.primary-text(:class='icono')
    
</template>

<style lang="sass" scoped>

button
    padding: 1rem

.container
    padding-top: 7rem
</style>
