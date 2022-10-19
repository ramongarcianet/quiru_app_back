<script setup>
import { onMounted, watch } from 'vue'
import { useRouter } from "vue-router"
import {  miUsuario } from '../store/sesion'

const { push } = useRouter()



</script>

<template lang="pug">
.row.perfil
  .cuadro 
    .avatar(@click="push({name:'usuario'})")
      .text AF
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
      opacity: .3
      .text
        font-size: 20px
        color: var(--color-light)

</style>