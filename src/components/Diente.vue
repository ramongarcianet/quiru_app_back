<script setup>
import {computed, watch} from 'vue'
import {
  item as itemModel,
  Hallazgo
} from "../../src/store/odontograma";
const props = defineProps( ['item'])
const emit = defineEmits(['update:ubicacion', 'update:hallazgo', 'update:diente'])

const ubicaciones = ['vestibular','distal','oclusal','mesial','palatino','lingual', 'incisal']
const ubicacion_ = computed({
    get: ()=>props.item.hallazgos,
    set: val => {
        const index = (props.item.hallazgos)?props.item.hallazgos.findIndex( i => i.ubicacion = i.ubicacion):0
        if ( index > -1) 
            if(props.item.hallazgos) props.item.hallazgos.splice( index, 1)
        else return
    }
})

const diente = computed(()=> (Number(props.item.diente)/10).toFixed(1) || "00") 
//'@click='ubicacion_ = ubicacion'

function slelecteditem(ubicacion)
{ 
    const index  = itemModel.value.hallazgos.findIndex( i => i.hallazgo == Hallazgo.value   && i.ubicacion == ubicacion)
    if( index > -1 ) { 
        itemModel.value.hallazgos.splice( index, 1)
    }
    else 
    { 
        itemModel.value.hallazgos.push({hallazgo: Hallazgo.value, ubicacion})
    }
}
</script>
<template lang="pug">
#diente( v-bind='$attrs' :class='item.clase')
    h1 
        span {{diente }} 
    #raices
    #button-diente( :class='item.hallazgos.map(({hallazgo}) => hallazgo).join(" ")' )
        div(
            v-for='ubicacion of ubicaciones' 
            :id='ubicacion'            
            @click='slelecteditem(ubicacion)' 
            :class='(item.hallazgos)?`${item.hallazgos.filter(i => i.ubicacion == ubicacion).map(({hallazgo})=>hallazgo).join(" ")} ${item.hallazgos.map(({ubicacion}) => ubicacion).some( item => item == ubicacion ) ? "active" : ""}`:""'
        )
        #aspaIzquierda
        #aspaDerecha

</template>


<style lang="sass" scoped>
#diente
    --background-color: var(--bs-light)
    --size: 140px
    --border-diente: 6px
    --border-radius-top: 1.2rem!important
    --border-radius-bottom: 0rem!important
    --border: 2px
    --weight: 6px
    display: flex
    flex-direction: column
    &.toDown
        flex-direction: column-reverse
        --border-radius-top: 0rem!important
        --border-radius-bottom: 1.2rem!important
    &.small
        --size: 1.2rem!important
        --border-diente: 1.4px!important
        --border-radius-top: .24rem!important
        --border-radius-bottom: .24rem!important
        --border: .2px!important
        --weight: 2px!important
    
        h1 
            font-size: .7rem!important
            margin: .2rem 0
    &.toDown.small
        flex-direction: column-reverse
        --border-radius-top: .24rem!important
        --border-radius-bottom: .24rem!important
    h1 
        width: 100%
        text-align: center
        font-size: 2rem
        font-weight: bold
        color: var(--color-dark) !important
    &.toDown
        #vestibular, #lingual
            transform: rotate(180deg) 
            bottom: 0!important
            top: unset!important
        #vestibular
            display: none !important
        #lingual
            display: flex !important
        #palatino
            transform: rotate(180deg) 
            top:  0!important
            bottom: unset!important
        #raices
            transform: rotate(180deg)    
    &.toLeft
        #mesial
            transform: rotate(180deg) 
            left: 0!important
            right: unset!important        
        #distal
            transform: rotate(180deg) 
            right:  0!important
            left: unset!important
    &.toCenter
        #oclusal
            display: none !important
        #incisal
            display: flex !important
    #raices  
        position: relative 
        height: calc( var(--size) * 0.4)
        width: var(--size) 
        &:before
            content: ''
            position: absolute
            width: 100%
            height: 100%
            background: rgba( 255, 255, 255, .4)
        &:after
            content: ''
            position: absolute
            width: 100%
            height: 100%
            --min: var(--border-diente)
            background: var(--bs-primary)
    &.raiz-0
        #raices
            &:before
                height: 10%
                display: none
            &:after
                height: 10%
                display: none

    &.raiz-1
        #raices
            &:before
                clip-path: polygon( 0% 100%, 100% 100%, 50% 0%)
            &:after
                clip-path: polygon( calc(0% + var(--min)) 100%, calc(100% - var(--min)) 100%, 50% calc( var(--min)*1.2))

    &.raiz-2
        #raices
            &:before
                clip-path: polygon(0% 0%, 0% 100%, 100% 100%, 100% 0, 50% 50%)
            &:after
                clip-path: polygon( calc(0% + var(--min)) calc( var(--min)*1.5 ), calc(0% + var(--min)) 100%, calc(100% - var(--min)) 100%, calc(100% - var(--min))  calc(var(--min) * 1.5), 50% calc(50% + var(--min)*1.0))

    &.raiz-3
        #raices
            &:before
                clip-path: polygon(0% 0%, 0% 100%, 100% 100%, 100% 0, 75% 50%, 50% 0%, 25% 50%)
            &:after
                clip-path: polygon( calc(0% + var(--min)) calc( var(--min)*2.5 ), calc(0% + var(--min)) 100%, calc(100% - var(--min)) 100%, calc(100% - var(--min))  calc(var(--min) * 2.5), 75% calc(50% + var(--min)*1.2), 50%  calc(var(--min) * 1.5), 25% calc(50% + var(--min)*1.5))

    
        
    #button-diente
        border-radius: 1rem
        background: var(--background-color)
        position: relative
        height: var(--size)
        width: var(--size)
        
        #vestibular, #lingual, #incisal, #distal, #oclusal, #mesial, #palatino
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
        #lingual
            display: none
        #incisal
            display: none
        div
            *
                color: transparent
        #vestibular, #lingual
            height: var(--proporcion-inicial)
            width: 100%
            bottom: unset
            clip-path: polygon(var(--min) 0%, var(--max) 0%, var(--proporcion-final) 100%, var(--proporcion-inicial) 100%)
            border-top-right-radius: var(--border-radius-top)
            border-top-left-radius: var(--border-radius-top)

        #distal
            height: 100%
            width: var(--proporcion-inicial)
            right: unset
            clip-path: polygon(var(--min) 0, 100% var(--proporcion-inicial), 100% var(--proporcion-final), 0% var(--max))
            border-top-left-radius: var(--border-radius-top)
            border-bottom-left-radius: var(--border-radius-bottom)

        #oclusal, #incisal
            height: var(--proporcion-central)
            width: var(--proporcion-central)
            clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%)

        #mesial
            height: 100%
            width: calc(100% / 4)
            left: unset
            clip-path: polygon( 0 var(--proporcion-inicial), 100% var(--min), 100%  var(--max), 0 var(--proporcion-final))
            border-top-right-radius: var(--border-radius-top)
            border-bottom-right-radius: var(--border-radius-bottom)
            

        #palatino
            height: calc(100% / 4)
            width: 100%
            top: unset
            clip-path: polygon(var(--proporcion-inicial) 0%, var(--proporcion-final) 0%, var(--max) 100%, var(--min) 100%)
            border-bottom-left-radius: var(--border-radius-bottom)
            border-bottom-right-radius: var(--border-radius-bottom)

        #vestibular, #lingual, #incisal, #distal, #oclusal, #mesial, #palatino
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
        #vestibular::before, #lingual::before
            clip-path: polygon(var(--min) var(--border), var(--max) var(--border), var(--proporcion-final) 100%,var(--proporcion-inicial) 100%)
            border-top-left-radius: var(--border-radius-top)
            border-top-right-radius: var(--border-radius-top)
        #distal::before
            clip-path: polygon( var(--border) var(--min), 100% var(--proporcion-inicial), 100% var(--proporcion-final), var(--border) var(--max))
            border-bottom-left-radius: var(--border-radius-bottom)
            border-top-left-radius: var(--border-radius-top)

        #oclusal::before, #incisal::before
            clip-path: var(--clip-path)
        #mesial::before
            clip-path: polygon( 0 var(--proporcion-inicial), var(--border-right) var(--min), var(--border-right)  var(--max), 0 var(--proporcion-final))
            border-bottom-right-radius: var(--border-radius-bottom)
            border-top-right-radius: var(--border-radius-top)

        #palatino::before
            clip-path: polygon(var(--proporcion-inicial) 0%, var(--proporcion-final) 0%, var(--max) var(--border-right), var(--min) var(--border-right))
            border-bottom-left-radius: var(--border-radius-bottom)
            border-bottom-right-radius: var(--border-radius-bottom)

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
@media screen and (min-width: 600px) 
    #diente
        &.small
            --size: 1.8rem!important
            --border-diente: 2.1px!important
            --border-radius-top: .36rem!important
            --border-radius-bottom: .36rem!important
            --border: .3px!important
            --weight: 3px!important
        
            h1 
                font-size: 1.1rem!important
                margin: .3rem 0
    

</style>