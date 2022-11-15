<script setup>
import { onUnmounted, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { item, leer, registro, leerEnRegistro } from '../store/usuario'
import { cerrarSesion, miUsuario } from '../store/sesion'

const route = useRoute()
const { push } = useRouter()
onMounted(() => {
  leer(miUsuario().uid);
});
watch(
    () => registro.value,
    () => {
        let valores= registro.value.find(item => item.idUsuario == miUsuario().uid)
        if(valores !=undefined) {
            leerEnRegistro(miUsuario().uid);
        }
    }
);
const adios = ()=> {
  location.replace('https://quiru.app/')
  }
</script>

<template lang="pug">
.dropdown
  .row.perfil
    .cuadro
      .avatar.dropdown-toggle(type='button' data-bs-toggle='dropdown')
        .text {{item.nombre.substr(0,1) + item.apellidoPaterno.substr(0,1)}}
      .col.dropdown-menu.dropdown-menu-end.dropdown-menu-lg-start
        li.d-flex(@click="push({name:'usuario'})" style="cursor: pointer")
          .row.px-1
            .col
              i.fa-solid.fa-gear
            .col.p-0.m-0
              p Configuración
        li.d-flex(@click="cerrarSesion(), adios()" style="cursor: pointer")
          .row.px-1
            .col
              i.fa-solid.fa-right-from-bracket
            .col.p-0.m-0
              p Salir
</template>
<style lang="sass" scoped>
.perfil
  width: 100%
  height: 90px
  margin-top: -50px
  margin-left: 0px
  margin-right: 0px
  margin-bottom: 0px
  padding: 0px
  .cuadro
    display: flex
    flex-direction: row
    justify-content: end
    align-items: center
    .avatar
      display: flex
      flex-direction: column
      justify-content: center
      align-items: center
      width: 50px
      height: 50px
      border-radius: 60px
      background-color: var(--color-primary)
      .text
        font-size: 20px
        color: var(--color-light)

</style>