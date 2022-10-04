<script setup>
import {ref, computed, onMounted, watch} from "vue"
import { useRoute, useRouter } from 'vue-router';
import { obtenerTodos, registro, updateEstado } from "../../store/citas";
import { previousPage, nextPage, setList, registro_, search, setListDelete, SetPage } from "../../config/Paginator";
import Calendario from '../../components/Calendario.vue';
const route = useRoute()
const {push} = useRouter()
const obtenerRegistro = obtenerTodos();

watch(
    () => registro.value,
    () => {
        setList(registro.value, 1);
    }
)
</script>

<template lang="pug">
//-.row
    .col-4.col-md-9
        h1.my-0(style="color: #395D56; font-size: 1.5em; font-family: var(--font-family)") Lista
        h1(style="color: #37DFBB; font-weight:bold; font-size: 1.5em; font-family: var(--font-family)") de citas
Calendario(mostrar="slim")
    
.row 
    .contenido
        .citas
            button.outline-quiru(  @click="push({name: 'crearCita'})")
                .contenido
                    .title Crear
                    .subtitle Nueva cita
                ion-icon(name="add-outline").icono
            .cita(v-for='item of registro'   :key="item.id"  :item="item" @click="push({name: 'verCita'})" ) 
                .imagen
                    .inicial {{item.nombre.substring(0, 1)}}{{item.apellidoPaterno.substring(0, 1)}}
                .descripcion
                    h5.evento {{item.nombreDeCita}}
                    h4.nombre {{item.nombre}} {{item.apellidoPaterno}}
                span.hora {{item.horaDeCita}}

</template>
<style lang="sass">

.outline-quiru
    width: 360px
    height: 74px
    margin: 5px
    border: none
    border-radius: 40px
    background-color: var(--color-primary)
    display: flex
    flex-direction: row
    justify-content: space-around
    align-items: center
    .contenido
      display: flex
      flex-direction: column
      align-items: start
      justify-content: start
      .title
        font-weight: 700
        color: var(--color-white)
      .subtitle
        font-weight: 400
        color: var(--color-white)
    .icono
      font-size: 26px
      color: var(--color-white)
 

.contenido
    .citas
        display: flex
        flex-direction: column
        justify-content: center
        align-items: center
        margin-top: 35px
        .cita
            margin: 6px
            display: flex
            flex-direction: row
            align-items: center
            justify-content: start
            width: 360px
            height: 74px
            background-color: var(--color-white)
            border-radius: 40px
            padding-left: 20px
            padding-right: 20px
            .descripcion
                width: 49.3%
                margin-left: 10px
                .evento ,.nombre
                    font-weight: 400
                    color: var(--color-dark)
                    margin: 0
                .nombre
                    margin-top: 5px
                    font-weight: 300

            .imagen
                width: 26%
                .inicial
                    width: 60px
                    height: 60px
                    border-radius: 50%
                    background-color: var(--color-primary)
                    opacity: .3
                    display: flex
                    justify-content: center
                    align-items: center
                    font-size: 18px
                    font-weight: 500
                    text-transform: uppercase
                    color: var(--color-white)
            .hora
                display: flex
                justify-content: center
                width: 26.6%
                font-size: 20px
                font-weight: 500
                color: var(--color-dark)

        
</style>