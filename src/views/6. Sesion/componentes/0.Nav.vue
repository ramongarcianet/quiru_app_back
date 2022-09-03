<script setup>
import { useRoute, useRouter } from "vue-router";
import Logo from "../../../assets/logoQuiru.vue";
import marketing from "../../../store/marketing";
const { push } = useRouter();
const {registrarEvento} = marketing
const route = useRoute()
const rutas = [
  { title: "Beneficios", ruta: "#beneficios" },
  { title: "Producto", ruta: "#producto" },
  { title: "Precio", ruta: "#precio" },
  { title: "Contacto", ruta: "#contacto" },
];
const router = [
   { title: "Demo", ruta: () => push({ name: "demo" }) }
];
</script>
<template lang="pug">
nav.navbar.navbar-expand-lg.bg-light
  .container
    Img.navbar-brand(src="https://firebasestorage.googleapis.com/v0/b/app-keepers.appspot.com/o/Group%2073%20(1).png?alt=media&token=13f628f8-46ea-41f4-a4f4-b4d2aa604323")
    button.navbar-toggler.ms-auto.me-2(type="button", data-bs-toggle="collapse", data-bs-target="#navbarSupportedContent", aria-controls="navbarSupportedContent", aria-expanded="false", aria-label="Toggle navigation")
        i.fa-solid.fa-bars

    .collapse.navbar-collapse#navbarSupportedContent
        ul.navbar-nav.me-auto.mb-2.mb-lg-0
            li.nav-item( v-for='{title, ruta} of rutas' ) 
                a.nav-link(:href='ruta')  {{title}}
            li.nav-item( v-for='{title, ruta} of router')
                a.nav-link( @click='()=>ruta()' href='#')   {{title}}
    
    button.btn.btn-primary( @click='push({ name: "iniciar-sesion" }), registrarEvento("activacion_btn_alpha")' ) Únete al alpha
        

</template>

<style scoped lang="sass">

button
    padding: 1rem

nav
    
    img
        width: 120px!important
        height: auto
    a
        text-decoration: none
    h4
        cursor: pointer
        color: var(--color-primary)
        margin: 0 2rem
        font-weight: 400
        &:hover
            color: var(--color-primary-tint)
</style>
