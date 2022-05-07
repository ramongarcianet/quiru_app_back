<script setup>
import {computed, watch} from 'vue'
const props = defineProps({
    diente: String,
    hallazgo: String,
    pieza: Array
})
const emit = defineEmits(['update:pieza', 'update:hallazgo', 'update:diente'])

const piezas = ['vestibular','distal','oclusal','mesial','palatino']

const pieza_ = computed({
    get: ()=>props.pieza,
    set: val => {
        const index = props.pieza.indexOf(val)
        if ( index == -1) props.pieza.push(val)
        else props.pieza.splice( index, 1)
    }
})

watch(
    ()=> props.hallazgo,
    ()=> emit('update:pieza', [])
 )

</script>
<template lang="pug">
#diente
    h1 {{diente || "00"}}
    #button-diente( :class='hallazgo' )
        div(v-for='pieza of piezas' :id='pieza' @click='pieza_ = pieza' :class='{active: props.pieza.indexOf(pieza) > -1}')
            span {{pieza}}
        #aspaIzquierda
        #aspaDerecha

</template>

<style lang="sass" scoped>
h1 
    width: 100%
    text-align: center
    font-size: 3rem
    font-weight: bold
    margin-bottom: 0rem
    margin-top: 0

#button-diente
    background: black
    border-radius: 1rem
    --size: 200px
    position: relative
    height: var(--size)
    width: var(--size)
    #vestibular,  #distal, #oclusal, #mesial, #palatino
        position: absolute
        top: 0
        left: 0
        right: 0
        bottom: 0
        margin: auto
        display: flex
        align-items: center
        justify-content: center
        transition: .3s
        background: var(--bs-gray-dark)
        --max: 100%
        --min: 0%
        --proporcion-final: calc( 100% / 4 * 3 )
        --proporcion-inicial: calc( 100% / 4 * 1 )
        --proporcion-central: calc( 100% / 4 * 2 )
        
       
    #vestibular
        height: var(--proporcion-inicial)
        width: 100%
        bottom: unset
        clip-path: polygon(var(--min) 0%, var(--max) 0%, var(--proporcion-final) 100%, var(--proporcion-inicial) 100%)
        border-top-left-radius: 1rem
        border-top-right-radius: 1rem
    #distal
        height: 100%
        width: var(--proporcion-inicial)
        right: unset
        clip-path: polygon(var(--min) 0, 100% var(--proporcion-inicial), 100% var(--proporcion-final), 0% var(--max))
        border-top-left-radius: 1rem
        border-bottom-left-radius: 1rem

    #oclusal
        height: var(--proporcion-central)
        width: var(--proporcion-central)
        clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%)

    #mesial
        height: 100%
        width: calc(100% / 4)
        left: unset
        clip-path: polygon( 0 var(--proporcion-inicial), 100% var(--min), 100%  var(--max), 0 var(--proporcion-final))
        border-top-right-radius: 1rem
        border-bottom-right-radius: 1rem

    #palatino
        height: calc(100% / 4)
        width: 100%
        top: unset
        clip-path: polygon(var(--proporcion-inicial) 0%, var(--proporcion-final) 0%, var(--max) 100%, var(--min) 100%)
        border-bottom-left-radius: 1rem
        border-bottom-right-radius: 1rem

    #vestibular, #distal, #oclusal, #mesial, #palatino
        &::before
            position: absolute
            margin: auto
            z-index: 0
            content: ''
            background: var(--bs-primary)
            --min: calc( 6px)
            --max: calc(100% - var(--min))
            --border: 2px
            --border-right: calc(100% - var( --border ) )
            clip-path: var(--clip-path)
            transition: .3s
            width: calc( 100% - var(--min))
            height: calc( 100% - var(--min))
            --border-radius: 1.2rem
    #vestibular::before
        clip-path: polygon(var(--min) var(--border), var(--max) var(--border), var(--proporcion-final) 100%,var(--proporcion-inicial) 100%)
        border-top-left-radius: var(--border-radius)
        border-top-right-radius: var(--border-radius)
    #distal::before
        clip-path: polygon( var(--border) var(--min), 100% var(--proporcion-inicial), 100% var(--proporcion-final), var(--border) var(--max))
        border-top-left-radius: var(--border-radius)
        border-bottom-left-radius: var(--border-radius)
    #oclusal::before
        clip-path: var(--clip-path)
    #mesial::before
        clip-path: polygon( 0 var(--proporcion-inicial), var(--border-right) var(--min), var(--border-right)  var(--max), 0 var(--proporcion-final))
        border-top-right-radius: var(--border-radius)
        border-bottom-right-radius: var(--border-radius)
    #palatino::before
        clip-path: polygon(var(--proporcion-inicial) 0%, var(--proporcion-final) 0%, var(--max) var(--border-right), var(--min) var(--border-right))
        border-bottom-left-radius: var(--border-radius)
        border-bottom-right-radius: var(--border-radius)

    #aspaIzquierda, #aspaDerecha
        position: absolute
        height: 261px
        width: 6px
        top: 0
        bottom: 0
        right: 0
        left: 0
        margin: auto
        transform-origin: 50%
        pointer-events: none
        background: transparent
        transition: .3s
    #aspaIzquierda
        transform: rotate(45deg)
    #aspaDerecha
        transform: rotate(-45deg)

    &.caries, &.restauración
        div
            *
                user-select: none
                position: relative
                z-index: 10
                text-transform: capitalize
                font-size: .8rem
                opacity: .6
            &:hover
                &::before
                    background: mix(black, #37DFBB, 10%)!important
    &.caries
        div
            &.active
                color: var(--bs-white)
                &::before
                    background: var(--bs-red)!important
    &.restauración
        div
            &.active
                color: var(--bs-white)
                &::before
                    background: var(--bs-blue)!important
    &.extraccion
        #aspaIzquierda, #aspaDerecha
            background: var(--bs-red)
    &.ausente
        #aspaIzquierda, #aspaDerecha
            background: var(--bs-blue)
    &.fractura
        #aspaDerecha
            background: var(--bs-red)

</style>