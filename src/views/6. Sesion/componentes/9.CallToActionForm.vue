<script setup>
import Logo from "../../../assets/logoQuiru.vue";
import marketing from "../../../store/marketing";
import Demo from "../../1.Admision/index.vue"
import {ref} from 'vue'
const props = defineProps(["modelValue"]);
const emit = defineEmits(["update:modelValue"]);

const { item, agregar, registrarEvento } = marketing;
const mensajeDeRegistro = ref(false)

const registroExitoso = ()=> {
registrarEvento("act_btn_price")
mensajeDeRegistro.value = true
}
</script>
<template lang="pug">
aside( :class='{active: modelValue}' )
    div.h-100.d-flex.flex-column
        Demo
        .dark.p-2
            Form.d-flex.flex-column.mt-0.w-100.py-2.px-2( :onPromise='()=> agregar(item.email)' :onSuccess='()=>registroExitoso() ')
                .input-group
                    input.form-control( type='email' required placeholder='Ingresa tu correo' v-model='item.email')
                    button.btn.btn-light(type='submit')
                        i.fa-solid.fa-chevron-right.primary-text
                h6.light-text.pt-1 Sin pago requerido
                h5(v-if='mensajeDeRegistro').light-text ¡Gracias! {{item.email}}, nos comunicaremos contigo para el lanzamiento de 
                    strong Quiru
#background( :class='{active: modelValue}' @click='$emit("update:modelValue", false)')
button#close.btn.btn-nav( @click='$emit("update:modelValue", false)' :class='{active: modelValue}' )
    i.fa-solid.fa-times.fa-3x.light-text
</template>

<style lang="sass" scoped>
svg
    height: 4rem
    width: 4rem
p
    font-size: 2em
h5
    text-align: center
aside
    position: fixed
    left: -100%
    transition: .3s left
    height: -webkit-fill-available
    > div
        width: 60%
#background
    position: fixed
    right: -100%
    transition: .3s right
#close
    cursor: pointer
    position: fixed
    right: -100%
    top: -100%
    z-index: 110
    transition: .3s right
    &.active
        right: 4rem
        top: 2rem

aside.active
    position: fixed
    top: 0
    left: 0
    height: 100%
    width: 60%
    clip-path: polygon(100% 0, 0% 0%, 0% 100%, 75% 100%)
    background: rgba( var(--color-primary-rgb), 1)
    z-index: 100
    justify-content: center
    transition: .3s left
    form
        width: 80%

#background.active
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100vh
    background: rgba( var(--color-primary-rgb), 0.3)
    z-index: 90

@media (max-width: 576px)
    #close
        &.active
            right: 1rem
            top: 1rem
    p
        font-size: 2em
    aside
        position: fixed
        left: 0%
        top: -100%
        >div
            width: 100%
        form
            width: 100%
        &.active
            width: calc(100% )
            clip-path: polygon(100% 0, 0% 0%, 0% 100%, 100% 100%)
            justify-content: start
</style>
