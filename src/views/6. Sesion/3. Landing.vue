<script setup>
import { useRouter } from "vue-router";
import Logo from "../../assets/logoQuiru.vue"

const {push} = useRouter()
</script>
<template lang="pug">
nav
    .container
        .logo
            Logo( fill="currentcolor" )
            h1 Quiru
        div
            button.light-outlined( @click='push({name:"registro"})' ) Crear cuenta
            button.light-outlined( @click='push({name:"iniciar-sesion"})' ) Iniciar sesion

.container
    h1 Bienvenido a quiru


</template>

<style scoped lang="sass">
nav 
    background: var(--color-primary)
    .logo
        display: flex
        align-items: center
        h1
            margin: 0
            margin-left: .5rem
            color: var(--color-white)
        svg
            height: 50px
            width: 50px
            color: var(--color-white)
        
    .container
        display: flex
        justify-content: space-between
        align-items: center
        height: 70px
</style>