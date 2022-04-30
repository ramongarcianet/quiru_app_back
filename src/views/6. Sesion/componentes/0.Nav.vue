<script setup>
import { useRouter } from "vue-router";
import Logo from "../../../assets/logoQuiru.vue";
import marketing from "../../../store/marketing";
const { push } = useRouter();
const {registrarEvento} = marketing

const rutas = [
  { title: "Beneficios", ruta: "#beneficios" },
  { title: "Producto", ruta: "#producto" },
  { title: "Precio", ruta: "#precio" },
  { title: "Contacto", ruta: "#contacto" },
];
const router = [
//    { title: "Alpha", ruta: () => push({ name: "iniciar-sesion" }) }
];
</script>
<template lang="pug">
nav.w-100
    .container.d-flex.w-100
        Img(src="https://firebasestorage.googleapis.com/v0/b/app-keepers.appspot.com/o/Group%2073%20(1).png?alt=media&token=13f628f8-46ea-41f4-a4f4-b4d2aa604323")
        .d-none.d-md-flex.align-items-center
            a( v-for='{title, ruta} of rutas' :href='ruta') 
                h4 {{title}}
            a( v-for='{title, ruta} of router' @click='()=>ruta()') 
                h4 {{title}}
            
        button.btn.btn-primary.ms-auto( @click='$emit("update:modelValue", true), registrarEvento("activacion_btn_nav")' ) Probar
//-Primer segmento     

</template>

<style scoped lang="sass">

nav
    position: fixed
    top: 0
    left: 0
    background-color: #ffffff
    height: 100px
    display: flex
    align-items: center
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
