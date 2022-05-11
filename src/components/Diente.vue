<script setup>
import {computed, watch} from 'vue'
const props = defineProps( ['item'])
const emit = defineEmits(['update:ubicacion', 'update:hallazgo', 'update:diente'])

const ubicaciones = ['vestibular','distal','oclusal','mesial','palatino']
const ubicacion_ = computed({
    get: ()=>props.item.hallazgos,
    set: val => {
        const index = props.item.hallazgos.findIndex( i => i.ubicacion = i.ubicacion)
        if ( index > -1) props.item.hallazgos.splice( index, 1)
        else return
    }
})


</script>
<template lang="pug">
#diente( v-bind='$attrs')
    h1 
        span {{item.diente || "00"}}
    #button-diente.mx-auto( :class='item.hallazgos.map(({hallazgo}) => hallazgo).join(" ")' )
        div(
            v-for='ubicacion of ubicaciones' 
            :id='ubicacion' 
            @click='ubicacion_ = ubicacion' 
            :class='`${item.hallazgos.filter(i => i.ubicacion == ubicacion).map(({hallazgo})=>hallazgo).join(" ")} ${item.hallazgos.map(({ubicacion}) => ubicacion).some( item => item == ubicacion ) ? "active" : ""}`'
        )
            span {{ubicacion}}
        #aspaIzquierda
        #aspaDerecha

</template>

<style lang="sass" scoped>
#diente
    --background-color: var(--bs-light)
    --size: 140px
    --border-diente: 6px
    --border-radius: 1.2rem
    --border: 2px
    --weight: 6px
    &.small
        --size: 1.25rem!important
        --border-diente: 1px!important
        --border-radius: .25rem!important
        --border: .1px!important
        --weight: 2px!important


        h1 
            font-size: .7rem!important
            margin-bottom: .15rem
    h1 
        width: 100%
        text-align: center
        font-size: 2rem
        font-weight: bold
        margin-bottom: 1rem
        margin-top: 0
        color: var(--background-color)
        

    #button-diente
        border-radius: 1rem
        background: var(--background-color)
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
            background: var(--background-color)
            --max: 100%
            --min: 0%
            --proporcion-final: calc( 100% / 4 * 3 )
            --proporcion-inicial: calc( 100% / 4 * 1 )
            --proporcion-central: calc( 100% / 4 * 2 )
        div
            *
                color: transparent
        #vestibular
            height: var(--proporcion-inicial)
            width: 100%
            bottom: unset
            clip-path: polygon(var(--min) 0%, var(--max) 0%, var(--proporcion-final) 100%, var(--proporcion-inicial) 100%)
            border-top-left-radius: var(--border-radius)
            border-top-right-radius: var(--border-radius)
        #distal
            height: 100%
            width: var(--proporcion-inicial)
            right: unset
            clip-path: polygon(var(--min) 0, 100% var(--proporcion-inicial), 100% var(--proporcion-final), 0% var(--max))
            border-top-left-radius: var(--border-radius)
            border-bottom-left-radius: var(--border-radius)

        #oclusal
            height: var(--proporcion-central)
            width: var(--proporcion-central)
            clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%)

        #mesial
            height: 100%
            width: calc(100% / 4)
            left: unset
            clip-path: polygon( 0 var(--proporcion-inicial), 100% var(--min), 100%  var(--max), 0 var(--proporcion-final))
            border-top-right-radius: var(--border-radius)
            border-bottom-right-radius: var(--border-radius)

        #palatino
            height: calc(100% / 4)
            width: 100%
            top: unset
            clip-path: polygon(var(--proporcion-inicial) 0%, var(--proporcion-final) 0%, var(--max) 100%, var(--min) 100%)
            border-bottom-left-radius: var(--border-radius)
            border-bottom-right-radius: var(--border-radius)

        #vestibular, #distal, #oclusal, #mesial, #palatino
            &::before
                position: absolute
                margin: auto
                z-index: 0
                content: ''
                background: var(--bs-primary)
                --min: calc( var(--border-diente))
                --max: calc(100% - var(--min))
                
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
            height: calc( var(--size) * 1.24 )
            width: var(--weight)
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


        
        div
            &.caries, &.restauración
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
                &.active
                    color: var(--bs-white)
                    &::before
                        background: var(--bs-red)!important
            &.restauración
                &.active
                    color: var(--bs-white)
                    &::before
                        background: var(--bs-blue)!important
        &.extracción
            #aspaIzquierda, #aspaDerecha
                background: var(--bs-red)
        &.ausente
            #aspaIzquierda, #aspaDerecha
                background: var(--bs-blue)
        &.fractura
            #aspaDerecha
                background: var(--bs-red)

</style>