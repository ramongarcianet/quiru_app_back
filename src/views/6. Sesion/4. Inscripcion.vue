<script setup>
import {ref, computed, onMounted} from 'vue'
import marketing from "../../store/marketing";
import { useRouter, useRoute } from 'vue-router';
const { item, agregar, registrarEvento } = marketing;
const mensajeDeRegistro = ref(false)
const {push} = useRouter()
const route = useRoute()
registrarEvento("view_inscripcion")
const registroExitoso = ()=> {
    registrarEvento("act_btn_price")
    mensajeDeRegistro.value = true
}

onMounted(()=>{
    item.value.codigo = route.params.codigo
})

</script>
<template lang="pug">
.container-fluid.vh-100
    .row.h-100
        .col-12.col-md-6.d-flex.flex-column.justify-content-center.px-5
            .row.mb-auto.mt-5
                Img.logo(  @click='push({ name: "landingConCodigo", params: {codigo: route.params.codigo} })' src="iniciar-sesion")

            h1.primary-text.my-5 Hola Doc. 
            p La versión completa saldrá el
                strong  06 de Junio, 
                | bríndanos tu correo electrónico, para enviarte el acceso y ser de los primero en usar Quiru. 
                strong No hay pago anticipado, inscríbete gratis.
            Form.d-flex.flex-column.w-100.mt-2.mb-5( :onPromise='()=> agregar(item)' :onSuccess='()=>registroExitoso() ')
                .input-group
                    input.form-control( type='email' required placeholder='Ingresa tu correo' v-model='item.email')
                    button.btn.btn-primary.btn-block(type='submit')
                        i.fa-solid.fa-chevron-right
                h5.mt-2( v-if='item.codigo' ) Tu cupón es: 
                    strong {{item.codigo}}
                h5(v-if='mensajeDeRegistro') ¡Gracias! {{item.email}}, nos comunicaremos contigo para el lanzamiento de 
                    strong Quiru
        .col-12.col-md-6.px-0
            Img.background.w-100( src='https://firebasestorage.googleapis.com/v0/b/quiru-b444f.appspot.com/o/landing%2FMask-group-_1_.webp?alt=media&token=0fc4d737-3ec0-4d3f-aada-375bfeee9657')


</template>

<style lang="sass" scoped>
svg
    height: 4rem
    width: 4rem

h1
    font-weight: bold
    font-size: 3rem
img
    &.background
        height: 100%
        object-fit: cover
    &.logo
        height: 3rem
        width: auto

</style>