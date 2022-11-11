<script setup>
import { onUnmounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import comandos from '../../config/Ejemplos.json';

const {push} = useRouter()
</script>
<template lang="pug">

.container
    div.overflow-x(style="background-color: white; border-radius: 2%;")
        table.table.table-hover
            thead
                tr
                    th Comando de voz
                    th.d-none.d-md-table-cell Acción en odontrograma
                    th Ejemplos
                    th.d-none.d-md-table-cell Norma técnica

            tbody
                tr(v-for="comando of comandos.EJEMP")
                    td {{comando.orden}}
                    td.d-none.d-md-table-cell {{comando.descripcion}}
                    td {{comando.ejemplo}}
                    td.d-none.d-md-table-cell 
                        .thumbwrap
                            button.thumb(href='#')
                                i.fa-solid.fa-eye
                                span
                                    img(:src='comando.ima' alt='')
</template>
<style lang="sass" scoped>
.thumbwrap
  position: relative
.thumb
  span
    position: absolute
    visibility: hidden
  &:hover
    visibility: visible
    top: 0
    z-index: 1
    span
      visibility: visible
      top: 0
      left: -520px
      z-index: 1
button
  border: none
  background: none
table
  border: 1px

@media (max-width: 540px)
    .thumbwrap
        position: relative
        width: 100px
    .thumb
        span
            position: absolute
            visibility: hidden
        &:hover
            visibility: visible
            z-index: 1
            span
                visibility: visible
                left: -300px
                z-index: 1
    button
        border: none
        background: none
    table
        border: 1px

</style>