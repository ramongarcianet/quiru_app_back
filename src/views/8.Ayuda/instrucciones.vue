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
.row
    h3(v-for="comando of comandos.EJEMP") {{comando.orden}}
    h3(v-for="comando of comandos.EJEMP") {{comando.descripcion}}

</template>