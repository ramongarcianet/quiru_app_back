<script setup>
import {ref, watch} from 'vue'
const props = defineProps(['onSuccess'])
const quitarSeguro = ref(false)
watch(
  ()=> quitarSeguro.value && setTimeout( 
         ()=> quitarSeguro.value = false,
        3500
       )
)
</script>
<template lang='pug'>
button.btn( @click='quitarSeguro ? onSuccess() : quitarSeguro = true' :class='quitarSeguro? "btn-danger" : ""' )
  span( v-if='quitarSeguro') ¿Seguro?
  template( v-else )
    slot
</template>