<script setup>
import { cerrarSesion, miUsuario } from "../store/sesion";
import {alertMensaje} from "../store/helper"
import { useRouter, useRoute } from "vue-router";
import Logo from "../assets/logoQuiru.vue";
import { ref, computed, watchEffect, watch} from "vue";
import Nav from "../components/Nav.vue";
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
 
]);
const rutasMoviles = computed(() => [
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
.container-fluid.vh-100.d-flex.px-0.pb-4.light
  #body.py-5
    .container.mb-3
      router-view
</template>
<style lang="sass" scoped>

#body
  height: 100%
  width: 100%
  overflow-y: auto
  background-color: var(--color-light)

</style>
