<script setup>
import { onMounted } from "vue";
import {
  DienteCaries,
  ChangeHallazgo,
} from "../../store/OdontoJS";
import {
  obtenerTodoDiccionario,
  obtenerTodoPieza,
  obtenerTodoHallazgo,
  obtenerTodoCaries,
} from "../../store/odonto";
import {
  procesar,
  agregarLista,
  isSpeech,
  terminar,
} from "../../store/odontograma";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const listaDiccionario = obtenerTodoDiccionario();
const listaPieza = obtenerTodoPieza();
const listaHallazgo = obtenerTodoHallazgo();
const listaCaries = obtenerTodoCaries();
const {push} = useRouter()

onMounted(() => {
  terminar();
});

const listaDeDientes = [
11,12,13,14,15,16,17,18,
21,22,23,24,25,26,27,28,
31,32,33,34,35,36,37,38,
41,42,43,44,45,46,47,48,
51,52,53,54,55,61,62,63,64,65,
71,72,73,74,75,81,82,83,84,85
]
const listaDeHallazgos = [
    {value: 'caries',        text: 'Caries'},
    {value: 'extraccion',    text: 'Extracción'},
    {value: 'ausente',       text: 'Ausente'},
    {value: 'fractura',      text: 'Fractura'},
    {value: 'restauracion',  text: 'Restauración'}

]

</script>

<template lang="pug">

#button-microfono
    button.NotpulsingButton#btnActivar(v-if="!isSpeech" type="submit" style="visibility:visible;" @click="procesar()")
        i.fa.fa-microphone
    button.pulsingButton#btnEscuchando(v-if="isSpeech" type="submit" style="visibility:visible;" @click="procesar()")
        .pulse-ring
            svg(width="60", height="60", viewBox="40 0 150 300")
            polyline(stroke-linejoin="round" points="50,150 125,50 200,150" stroke="white" stroke-width="25" fill="none")
            polyline(stroke-linejoin="bevel" points="50,250 125,150 200,250" stroke="white" stroke-width="25" fill="none")
        i.fa.fa-microphone
.row
    .col
        input#tipoReg(type="hidden", value="0")

        .input-group
            select.form-select#comboHallazgo(@change="ChangeHallazgo($event)")
                option(selected disabled) Hallazgo
                option(v-for='{text, value} of listaDeHallazgos' :value="value") {{text}}

            select.form-select#comboPieza
                option(selected disabled) Pieza
                option(v-for="item of listaDeDientes", :value="item") {{item}}
.row
    .col
        canvas#cvhallazgo(width="150" height="200") Su navegador no soporta canvas :(
    .col
        #button-diente
            input#piezatopcar( type="hidden", value="0" )
            #btntopcar( value="0" @click="DienteCaries('btntopcar')" ) Vestibular
            input#piezaleftCar( type="hidden", value="0" )
            #btnleftCar( value="0" @click="DienteCaries('btnleftCar')" ) Distal
            input#piezacenterCar( type="hidden", value="0" )
            #btncenterCar( value="0" @click="DienteCaries('btncenterCar')" ) Oclusal
            input#piezarigthCar( type="hidden", value="0" )
            #btnrigthCar( value="0" @click="DienteCaries('btnrigthCar')" ) Mesial
            input#piezabotCar(type="hidden", value="0")
            #btnbotCar( value="0" @click="DienteCaries('btnbotCar')" ) Palatino
.row
    .col
        button.btn.btn-primary(type="submit", @click="agregarLista(route.params.idOdontograma)") Agregar a la lista

</template>

<style lang="sass">

#button-diente
    position: relative
    height: 200px
    width: 200px
    #btntopcar,  #btnleftCar, #btncenterCar, #btnrigthCar, #btnbotCar
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

        &:hover
            &::before
                background: mix(red, #37DFBB, 10%)
    #btntopcar
        height: calc(100% / 4)
        width: 100%  
        bottom: unset  
        --clip-path: polygon(0% 0%, 100% 0%, calc(100% / 4 * 3) 100%, calc(100% / 4) 100%)
        clip-path: var(--clip-path)
    #btnleftCar
        height: 100% 
        width: calc(100% / 4)
        right: unset
        --clip-path: polygon(0 0, 100% calc(100% / 4), 100% calc(100% / 4 * 3), 0% 100%)
        clip-path: var(--clip-path)

    #btncenterCar
        height: calc(100% / 4 * 2)
        width: calc(100% / 4 * 2) 
        --clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%)
        clip-path: var(--clip-path)

    #btnrigthCar
        height: 100% 
        width: calc(100% / 4)
        left: unset
        --clip-path: polygon( 0 calc(100% / 4 ), 100% 0, 100% 100%, 0 calc(100% / 4 * 3))
        clip-path: var(--clip-path)

    #btnbotCar
        height: calc(100% / 4)
        width: 100% 
        top: unset
        --clip-path: polygon(calc(100% / 4) 0%, calc(100% / 4 * 3) 0%, 100% 100%, 0% 100%)
        clip-path: var(--clip-path)
        
    #btntopcar, #btnleftCar, #btncenterCar, #btnrigthCar, #btnbotCar
        &::before
            position: absolute
            width: calc( 100% - 8px)
            height: calc( 100% - 8px)
            margin: auto
            z-index: 0
            content: ''
            background: var(--bs-primary)
            clip-path: var(--clip-path)
            transition: .3s

#button-microfono
    position: fixed
    top: 0
    right: 0
.NotpulsingButton 
  border: none
  padding: 0
  border-radius: 100%
  width: 70px
  height: 70px
  font-size: 3em
  color: #fff
  padding: 0
  margin: 0
  background: rgb(139, 199, 252)
  position: relative
  z-index: 999
  display: inline-block
  line-height: 100px
  text-align: center
  white-space: nowrap
  vertical-align: middle
  touch-action: manipulation
  cursor: pointer
  user-select: none
  background-image: none

.pulsingButton 
  border: none
  padding: 0
  border-radius: 100%
  width: 70px
  height: 70px
  font-size: 3em
  color: #fff
  padding: 0
  margin: 0
  background: red
  position: relative
  z-index: 999
  display: inline-block
  line-height: 100px
  text-align: center
  white-space: nowrap
  vertical-align: middle
  touch-action: manipulation
  cursor: pointer
  user-select: none
  background-image: none


</style>
