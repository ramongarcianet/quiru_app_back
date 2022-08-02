<script setup>
import { onUnmounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import comandos from '../../config/Ejemplos.json';

const {push} = useRouter()
</script>
<template lang="pug">

.d-flex.align-content-start.flex-wrap
    i.fa-solid.fa-circle-info.me-2(style="color: #37DFBB; font-weight:bold; font-size: 1.5em;")
    h1(style="color: #37DFBB; font-weight:bold; font-size: 1.5em; font-family: var(--font-family)") Ayuda
.div(style="background-color: white; border-radius: 2%;").mt-1
    table.table.table-hover
        thead
            tr
                th Comando de voz
                th Acción en odontrograma
                th Ejemplos
                th Norma técnica

        tbody
            tr(v-for="comando of comandos.EJEMP")
                td {{comando.orden}}
                td {{comando.descripcion}}
                td {{comando.ejemplo}}
                td
                    #thumbwrap
                        button.thumb(href='#')
                            i.fa-solid.fa-eye
                            span
                                img(:src='comando.ima' alt='')
</template>
<style scoped>

    #thumbwrap {
        position:relative;
    }
    .thumb span { 
        position:absolute;
        visibility:hidden;
    }
    .thumb:hover, .thumb:hover span { 
        visibility:visible;
        top:0;
        left:-520px; 
        z-index:1;
    }
    button {
        border: none;
        background: none;
    }
    table {
        border: 1px;
    }
</style>