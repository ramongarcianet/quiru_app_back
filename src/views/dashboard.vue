<script setup>
import { cerrarSesion, miUsuario } from "../store/sesion";
import {alertMensaje} from "../store/helper"
import { useRouter, useRoute } from "vue-router";
import Logo from "../assets/logoQuiru.vue";
import { ref, computed, watchEffect, watch} from "vue";
import Nav from "../components/Nav.vue";
import Avatar from "../components/Avatar.vue";
const { push } = useRouter();
const route = useRoute();
const verDialog = ref(false)
watch(
  ()=> alertMensaje.value,
  ()=> {
    verDialog.value = true}
)
const rutas = computed(() => [
  {
    name: "Admisión",
    onClick: () => push({ name: "admision" }),
    icon: "fa-solid fa-calendar",
    routeName: "admision",
    aditionalClass: "d-none d-sm-block",
  },
  {
    name: "Pacientes",
    onClick: () => push({ name: "pacientes" }),
    icon: "fa-solid fa-address-book",
    routeName: "paciente",
  },
  {
    name: "Precios",
    onClick: () => push({ name: "precios" }),
    icon: "fa-solid fa-coins",
    routeName: "precios",
  },
  {
    name: "Resumen",
    onClick: () => push({ name: "resumen" }),
    icon: "fas fa-question-circle",
    routeName: "resumen",
  },
  {
    name: "Menú",
    onClick: () => (isActive.value = !isActive.value),
    icon: isActive.value ? "fa-solid fa-times" : "fa-solid fa-bars",
    aditionalClass: "d-sm-none only-bottom-nav",
  },
 
]);
const rutasMoviles = computed(() => [
  {
    name: "Paciente",
    onClick: () => push({ name: "pacientes" }),
    icon: "fa-solid fa-address-book",
    routeName: "paciente",
  },
  {
    name: "Precios",
    onClick: () => push({ name: "precios" }),
    icon: "fa-solid fa-coins",
    routeName: "precios",
  },
  /*{
    name: "Ayuda",
    onClick: () => push({ name: "ayuda" }),
    icon: "fa-solid fa-question-circle",
    routeName: "ayuda",
  },*/
  {
    name: "Cerrar sesión",
    onClick: () => cerrarSesion(),
    icon: "fa-solid fa-sign-out",
  },
]);
const rutasAdministrador = [
  /*{
    name: "Usuarios",
    onClick: () => push({ name: "usuarios" }),
    icon: "fa-solid fa-user-doctor",
    routeName: "usuarios",
  },

  {
    name: "Diccionario",
    onClick: () => push({ name: "diccionarios" }),
    icon: "fa-solid fa-book",
    routeName: "diccionario",
  },*/
];
const rutasInferior = [
  {
    name: "Cerrar sesión",
    onClick: () => cerrarSesion(),
    icon: "fa-solid fa-sign-out",
  },
];

const isActive = ref(false);
let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty("--vh", `${vh}px`);
window.addEventListener("resize", () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
});
</script>
<template lang="pug">

Dialog( v-model='verDialog' )
  template(#title) Quiru
  template(#body) {{alertMensaje}}
  template(#footer)
    button.btn.btn-primary(type='button' data-bs-dismiss='modal') Aceptar

.container-fluid.vh-100.d-flex.px-0.pb-4.light
  #body.py-1
    .container.mb-3
      Img(style="position: initial ; opacity: 1; justify-content: start !important; align-items: start!important;" src="https://firebasestorage.googleapis.com/v0/b/quiru-b444f.appspot.com/o/landing%2FGroup-73.webp?alt=media&token=e2d6eb8c-a303-4119-b361-5a16e8c84f9c")
      Avatar
      router-view
  Nav
</template>
<style lang="sass" scoped>

#body
  height: 100%
  width: 100%
  overflow-y: auto
  background-color: #fff
</style>
