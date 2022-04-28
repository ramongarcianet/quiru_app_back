<script setup>
import Logo from '../../../assets/logoQuiru.vue'
const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])
</script>
<template lang="pug">
aside.d-flex.flex-column( :class='{active: modelValue}' )
    form
        Logo.light-text
        p.mt-4.light-text Obtén tu acceso para ser de nuestros 
            strong primeros usuarios
        .d-flex
            input.w-100( placeholder='Ingresa tu correo' )
            button.light
                i.fa-solid.fa-chevron-right.primary-text
#background( :class='{active: modelValue}' )
button#close.transparent( @click='$emit("update:modelValue", false)' :class='{active: modelValue}' )
    i.fa-solid.fa-times.fa-3x.light-text
</template>

<style lang="sass" scoped>
svg
    height: 4rem
    width: 4rem
p
    font-size: 3em
aside
    position: fixed
    left: -100%
    transition: .3s all
#background
    position: fixed
    right: -100%
    transition: .3s all
#close
    cursor: pointer
    position: fixed
    right: -100%
    top: -100%
    z-index: 110
    transition: .3s all
    &.active
        right: 4rem
        top: 2rem

aside.active
    position: fixed
    top: 0
    left: 0
    height: 100%
    width: 60% 
    padding: 1rem 
    clip-path: polygon(100% 0, 0% 0%, 0% 99%, 75% 100%)     
    background: rgba( var(--color-primary-rgb), 1) 
    z-index: 100
    justify-content: center
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
        form
            width: 100%
        &.active
            width: calc(100% )
            height: calc( 100vh - 4rem) 
            clip-path: polygon(100% 0, 0% 0%, 0% 100%, 100% 85%)
            justify-content: start
           
</style>