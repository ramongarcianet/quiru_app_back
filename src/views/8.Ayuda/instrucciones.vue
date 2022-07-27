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
                th Comando de Voz
                th Acción en odontrograma 

        tbody
            tr(v-for="comando of comandos.EJEMP")
                td {{comando.orden}}
                td {{comando.descripcion}}

</template>