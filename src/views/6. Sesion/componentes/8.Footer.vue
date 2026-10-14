<script setup>
import { useRouter } from "vue-router";
import BrandLogo from '../../../components/BrandLogo.vue'

const { push } = useRouter();

const listaDeRedes = [
  { icono: "bi bi-facebook", ruta: "https://www.facebook.com/QUIRUOFICIAL" },
  { icono: "bi bi-instagram", ruta: "https://www.instagram.com/Quiru_app/" },
  { icono: "bi bi-linkedin", ruta: "https://www.linkedin.com/company/quiru/" },

  
];
</script>

<template lang="pug">

.container.d-flex.w-100
    .d-flex.w-100.justify-content-between.align-items-center
        div
            BrandLogo(compact)
            p.m-0
                small QUIRU Dent AI es un producto de QUIRU Labs.
            a.labs-link(href='https://quirulabs.web.app/' target='_blank' rel='noopener noreferrer') AI &amp; Software Solutions
        .d-flex
            a(v-for='{icono, ruta} of listaDeRedes'  :href='ruta' target='_blank').me-3
                i.fs-3.primary-text(:class='icono')
    
</template>

<style lang="sass" scoped>

button
    padding: 1rem

.container
    padding-top: 7rem

.labs-link
    color: var(--brand-blue)
    font-size: .8rem
    font-weight: 700
    text-decoration: none
</style>
