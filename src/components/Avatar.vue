<script setup>
import { onUnmounted, onMounted, ref, watch, computed } from 'vue'
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
const siglas = computed ( ()=> item.nombre.charAt(0) + item.apellido.charAt(0)||"")
const adios = ()=> {
  location.replace('https://app.quiru.app/')
  }
</script>

<template lang="pug">
.dropdown(v-if="item.nombre")
  .row.perfil
    .cuadro
      .avatar(type='button' data-bs-toggle='dropdown')
        .text(v-if="item.nombre") {{item.nombre.substr(0,1) + item.nombre.substr(1,1)}}
        .tuerca(v-else)
          i.fa-solid.fa-user.fa-sm(style="color: var(--color-light)")
          
      .col.dropdown-menu.dropdown-menu-end.dropdown-menu-lg-start
        li.d-flex(@click="push({name:'usuario'})" style="cursor: pointer")
        li                    
          a.dropdown-item(@click="push({name:'usuario'})" style="cursor: pointer") 
            i.fa-solid.fa-gear.fa-sm(style="color: var(--color-primary)")
            |     Configuración
        li
        li                    
          a.dropdown-item(@click="cerrarSesion(), adios()" style="cursor: pointer") 
            i.fa-solid.fa-right-from-bracket.fa-sm(style="color: var(--color-primary)")
            |     Salir
.puerta(v-else)
  a(@click="cerrarSesion(), landing()" style="cursor: pointer") 
    i.fa-solid.fa-right-from-bracket.fa-sm(style="color: var(--color-primary)")
    |     Salir
</template>
<style lang="sass" scoped>
.puerta
  display: flex
  flex-direction: row
  justify-content: end
  padding: 10px 20px
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